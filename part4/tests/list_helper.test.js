const list_helper = require("../utils/list_helper");
const { initialBlogs } = require("./test_helper");

describe("list_helper", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = list_helper.dummy(blogs);

    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];
  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 1,
      __v: 0
    }
  ];

  test("of empty list is zero", () => {
    const result = list_helper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = list_helper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = list_helper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(6);
  });
});

describe("favorite blog", () => {
  test("with most likes", () => {
    const result = list_helper.favoriteBlog(initialBlogs);

    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  });
});

describe("most blogs", () => {
  test("author with most blogs", () => {
    const result = list_helper.mostBlogs(initialBlogs);

    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});

describe("most likes", () => {
  test("author with most likes", () => {
    const result = list_helper.mostLikes(initialBlogs);

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
});
