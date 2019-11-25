import React, { useState, useEffect } from "react";
import { getAll } from "./services/blogs";
import { loginUser } from "./services/login";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [user, setuser] = useState(null);

  useEffect(() => {
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
      console.log(loggedUser);
      setuser(loggedUser);
    } catch (e) {
      setError(e.message);
    }
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
          <p>{user.name} logged in</p>
          {blogs.map(blog => (
            <Blog blog={blog} key={blog.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
