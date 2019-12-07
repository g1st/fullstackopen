import React, { useState, useEffect, useRef } from 'react';
import blogService from './services/blogService';
import loginService from './services/loginService';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const blo = await blogService.getAll();
      const sortedBlogs = blo.sort(
        (firstBlog, nextBlog) => nextBlog.likes - firstBlog.likes
      );
      setBlogs(sortedBlogs);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setNotification(e.message);
    }
  };

  const clearBlogForm = () => {
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  const handleSubmit = async (event, username, password) => {
    event.preventDefault();
    const credentials = { username, password };
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem('user', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
    } catch (e) {
      setError('Wrong credentials');
      setNotification('Wrong username or password');
    }
  };

  const handleBlogSubmit = async (event, title, author, url) => {
    event.preventDefault();
    try {
      const addedBlog = await blogService.postNewBlog({
        title,
        author,
        url,
        token: user.token
      });
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(addedBlog));
      clearBlogForm();
      setNotification(`a new blog ${title} added`);
    } catch (e) {
      console.error(e);
      setError('Bad request');
      setNotification('Bad request');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setNotification(`user ${user.name} logged out`);
    setUser(null);
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel={'log in'}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleSubmit}
        />
      </Togglable>
    );
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
      {!user && loginForm()}
      {user && (
        <div>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <hr />
          <Togglable buttonLabel="new blog post" ref={blogFormRef}>
            <NewBlogForm
              handleSubmit={handleBlogSubmit}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </Togglable>
        </div>
      )}
      {user && (
        <div className="blogs">
          {blogs.map((blog, id) => (
            <Blog
              blog={blog}
              key={id + blog.title}
              blogs={blogs}
              handleBlogsChange={setBlogs}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
