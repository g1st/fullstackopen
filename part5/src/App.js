import React, { useState, useEffect } from "react";
import { getAll, postNewBlog, setToken } from "./services/blogService";
import loginService from "./services/loginService";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
    const getBlogs = async () => {
      try {
        const blo = await getAll();
        setBlogs(blo);
      } catch (e) {
        console.error(e);
        setError(e.message);
        setNotification(e.message);
      }
    };
    getBlogs();
  }, []);

  const clearBlogForm = () => {
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  const handleSubmit = async (event, username, password) => {
    event.preventDefault();
    const credentials = { username, password };
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem("user", JSON.stringify(loggedUser));
      setToken(loggedUser.token);
      setUser(loggedUser);
    } catch (e) {
      setError("Wrong credentials");
      setNotification("Wrong username or password");
    }
  };

  const handleBlogSubmit = async (event, title, author, url) => {
    event.preventDefault();
    try {
      const addedBlog = await postNewBlog({
        title,
        author,
        url,
        token: user.token
      });
      setBlogs(blogs.concat(addedBlog));
      clearBlogForm();
      setNotification(`a new blog ${title} added`);
    } catch (e) {
      console.error(e);
      setError("Bad request");
      setNotification("Bad request");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setNotification(`user ${user.name} logged out`);
    setUser(null);
  };

  return (
    <div>
      <header>
        <h1>Bloglist</h1>
      </header>
      {notification && (
        <Notification
          message={notification}
          setNotification={setNotification}
          setError={setError}
          error={error}
        />
      )}
      {!user && (
        <>
          <LoginForm handleSubmit={handleSubmit} />
        </>
      )}
      {user && (
        <div>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <hr />
          <NewBlogForm
            handleSubmit={handleBlogSubmit}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          {blogs.map((blog, id) => (
            <Blog blog={blog} key={id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
