import React, { useState, useEffect } from "react";
import { getAll } from "./services/blogs";
import { loginUser } from "./services/login";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // noteService.setToken(user.token)
    }
    const getBlogs = async () => {
      try {
        const blo = await getAll();
        setBlogs(blo);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    };
    getBlogs();
  }, []);

  const handleSubmit = async (event, username, password) => {
    event.preventDefault();
    console.log(`subimitng with username ${username}, password ${password}`);
    const config = { username, password };
    try {
      const loggedUser = await loginUser(config);
      window.localStorage.setItem("user", JSON.stringify(loggedUser));
      // here setting token as well
      setUser(loggedUser);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <header>
        <h1>Bloglist</h1>
      </header>
      {!user && (
        <>
          <LoginForm handleSubmit={handleSubmit} />
          {error && <p>{error}</p>}
        </>
      )}
      {user && (
        <div>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <hr />
          {blogs.map(blog => (
            <Blog blog={blog} key={blog.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
