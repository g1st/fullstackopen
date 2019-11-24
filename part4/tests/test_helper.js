const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blogs = require("../models/blog");
const Users = require("../models/user");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
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
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

const initialUsers = [
  {
    username: "username1",
    name: "name1",
    password: "password1"
  },
  {
    username: "username2",
    name: "name2",
    password: "password2"
  }
];

const blogsInDb = async () => {
  const blogs = await Blogs.find({});
  return blogs.map(blog => blog.toJSON());
};

const initializeUsers = async () => {
  const hashPasswords = initialUsers.map(async user => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 10);
      delete user.password;
    }
    return user;
  });
  const hashed = await Promise.all(hashPasswords);
  const users = hashed.map(user => new Users(user));
  const userPromises = users.map(user => user.save());
  const returnedusers = await Promise.all(userPromises);
  return returnedusers;
};

const usersInDb = async () => {
  const users = await Users.find({});
  return users.map(user => user.toJSON());
};

const loginUser = async () => {
  const res = await api
    .post("/api/login")
    .send({
      username: "username1",
      password: "password1"
    })
    .expect(200);

  return res.body.token;
};

module.exports = {
  initialBlogs,
  initializeUsers,
  blogsInDb,
  usersInDb,
  loginUser
};
