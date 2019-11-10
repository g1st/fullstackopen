const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const list_helper = require('../utils/list_helper');
const { initialBlogs, blogsInDb } = require('./test_helper');
const Blog = require('../modules/blog');
const api = supertest(app);

describe('list_helper', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = list_helper.dummy(blogs);

    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];
  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }
  ];

  test('of empty list is zero', () => {
    const result = list_helper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = list_helper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = list_helper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(6);
  });
});

describe('favorite blog', () => {
  test('with most likes', () => {
    const result = list_helper.favoriteBlog(initialBlogs);

    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });
});

describe('most blogs', () => {
  test('author with most blogs', () => {
    const result = list_helper.mostBlogs(initialBlogs);

    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});

describe('most likes', () => {
  test('author with most likes', () => {
    const result = list_helper.mostLikes(initialBlogs);

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});

describe.only('api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogs = initialBlogs.map(blog => new Blog(blog));
    const blogPromises = blogs.map(blog => blog.save());

    await Promise.all(blogPromises);
  });

  test('returns the correct amount of blog posts in the JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(initialBlogs.length);
  });

  test('unique identifier property of the blog posts is named id (instead of _id)', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const firstBlog = response.body[0];

    expect(firstBlog.id).toBeDefined();
  });

  test('POST request to the /api/blogs url successfully creates a new blog post', async () => {
    const blogsAtStart = await blogsInDb();
    const newBlog = {
      title: 'test',
      author: 'john',
      url: 'http://test.com',
      likes: 1
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1);

    const addedBlog = await Blog.findOne({ title: 'test' });

    expect(addedBlog.id).toBeDefined();
    expect(addedBlog.title).toBeDefined();
    expect(addedBlog.author).toBeDefined();
    expect(addedBlog.url).toBeDefined();
    expect(addedBlog.likes).toBeDefined();
  });

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'test',
      author: 'john',
      url: 'http://test.com'
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const addedBlog = await Blog.findOne({ title: 'test' });
    expect(addedBlog.likes).toBe(0);
  });

  test('POST to /api/blogs if the title and url properties are missing responds with 400', async () => {
    const newBlogWithoutTitle = {
      author: 'john',
      likes: 12,
      url: 'url'
    };
    const newBlogWithoutUrl = {
      author: 'john',
      likes: 12,
      title: 'title'
    };

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400);
  });

  test('deletes a post successfully', async () => {
    const blogsAtStart = await blogsInDb();
    const firstBlog = blogsAtStart[0];

    await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
  });

  test('updates a post successfully', async () => {
    const blogsAtStart = await blogsInDb();
    const firstBlogAtStart = blogsAtStart[0];

    await api
      .patch(`/api/blogs/${firstBlogAtStart.id}?title=test title`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();
    const firstBlogAtEnd = blogsAtEnd[0];
    expect(firstBlogAtStart.title).not.toBe(firstBlogAtEnd.title);
    expect(firstBlogAtEnd.title).toBe('test title');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
