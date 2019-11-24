const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const {
  initialBlogs,
  initializeUsers,
  blogsInDb,
  usersInDb,
  loginUser
} = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);
let token;

describe.only("api tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const users = await initializeUsers();

    initialBlogs.map(blog => {
      blog.user = users[0]._id.toString();
    });
    const blogs = initialBlogs.map(blog => new Blog(blog));
    const blogPromises = blogs.map(blog => blog.save());
    await Promise.all(blogPromises);
    token = await loginUser();
  });

  test("returns the correct amount of blog posts in the JSON format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.length).toBe(initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id (instead of _id)", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const firstBlog = response.body[0];

    expect(firstBlog.id).toBeDefined();
  });

  test("POST request to the /api/blogs url successfully creates a new blog post", async () => {
    const blogsAtStart = await blogsInDb();
    const newBlog = {
      title: "test",
      author: "john",
      url: "http://test.com",
      likes: 1
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1);

    const addedBlog = await Blog.findOne({ title: "test" });

    expect(addedBlog.id).toBeDefined();
    expect(addedBlog.title).toBeDefined();
    expect(addedBlog.author).toBeDefined();
    expect(addedBlog.url).toBeDefined();
    expect(addedBlog.likes).toBeDefined();
  });

  test("if the likes property is missing from the request, it will default to the value 0", async () => {
    const newBlog = {
      title: "test",
      author: "john",
      url: "http://test.com"
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const addedBlog = await Blog.findOne({ title: "test" });
    expect(addedBlog.likes).toBe(0);
  });

  test("POST to /api/blogs if the title and url properties are missing responds with 400", async () => {
    const newBlogWithoutTitle = {
      author: "john",
      likes: 12,
      url: "url"
    };
    const newBlogWithoutUrl = {
      author: "john",
      likes: 12,
      title: "title"
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlogWithoutTitle)
      .expect(400);

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlogWithoutUrl)
      .expect(400);
  });

  test("deletes a post successfully", async () => {
    const blogsAtStart = await blogsInDb();
    const firstBlog = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
  });

  test("updates a post successfully", async () => {
    const blogsAtStart = await blogsInDb();
    const firstBlogAtStart = blogsAtStart[0];

    await api
      .patch(`/api/blogs/${firstBlogAtStart.id}?title=test title`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();
    const firstBlogAtEnd = blogsAtEnd[0];
    expect(firstBlogAtStart.title).not.toBe(firstBlogAtEnd.title);
    expect(firstBlogAtEnd.title).toBe("test title");
  });

  test("POST /api/users saves user to db", async () => {
    const usersAtStart = await usersInDb();

    // add user1
    const user = { username: "test", name: "John", password: "secret" };

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(201);

    const usersAtEnd = await usersInDb();

    expect(result.body.id).toBeDefined();
    expect(result.body.name).toBe(user.name);
    expect(result.body.username).toBe(user.username);
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
  });

  test("GET /api/users returns array of users with data", async () => {
    const usersAtStart = await usersInDb();

    await api.get("/api/users").expect(200);
    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("users with same username are not created", async () => {
    const usersAtStart = await usersInDb();

    const user = {
      username: "test",
      name: "John",
      password: "secret"
    };
    const userWithSameUsername = {
      username: "test",
      name: "Doe",
      password: "pass"
    };
    await api
      .post("/api/users")
      .send(user)
      .expect(201);
    const response = await api
      .post("/api/users")
      .send(userWithSameUsername)
      .expect(400);
    const usersAtEnd = await usersInDb();

    expect(response.body.error).toContain("expected `username` to be unique");
    expect(usersAtStart.length + 1).toBe(usersAtEnd.length);
  });

  test("user with shorter than 3 chars username isn't saved", async () => {
    const usersAtStart = await usersInDb();

    const user = {
      username: "us",
      name: "John",
      password: "secret"
    };
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400);
    const usersAtEnd = await usersInDb();

    expect(response.body.error).toContain("minimum allowed length (3)");
    expect(usersAtStart.length).toBe(usersAtEnd.length);
  });

  test("user with shorter than 3 chars password isn't saved", async () => {
    const usersAtStart = await usersInDb();

    const user = {
      username: "Test",
      name: "John",
      password: "pa"
    };
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400);
    const usersAtEnd = await usersInDb();

    expect(response.body.error.message).toContain(
      "Password must be at least 3 characters long"
    );
    expect(usersAtStart.length).toBe(usersAtEnd.length);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
