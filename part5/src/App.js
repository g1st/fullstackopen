import React, { useState, useEffect, useRef } from 'react';
import { useField, useResource } from './hooks';
import blogService from './services/blogService';
import loginService from './services/loginService';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';

const App = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url');
  const username = useField('text', 'username');
  const password = useField('password', 'password');
  const [blogz, blogsService] = useResource('http://localhost:3003/api/blogs');
  const blogFormRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const clearBlogForm = () => {
    author.reset();
    title.reset();
    url.reset();
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
      await blogsService.create({
        title,
        author,
        url,
        token: user.token
      });
      blogFormRef.current.toggleVisibility();
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
              author={author}
              url={url}
            />
          </Togglable>
        </div>
      )}
      {user && (
        <div className="blogs">
          {blogz.map((blog, id) => (
            <Blog
              blog={blog}
              key={id + blog.title}
              blogs={blogz}
              handleBlogsChange={blogsService.setResource}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
