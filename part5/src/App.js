import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useField } from './hooks';
import blogService from './services/blogService';
import loginService from './services/loginService';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';
import { setNotification } from './store/actions/notificationActions';
import { initializeBlogs } from './store/actions/blogActions';

const App = ({ setNotification, timerId, initializeBlogs, blogs }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const username = useField('text', 'username');
  const password = useField('password', 'password');
  const blogFormRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      initializeBlogs();
    }
  }, [initializeBlogs]);

  const handleSubmit = async (event, username, password) => {
    event.preventDefault();
    const credentials = { username, password };
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem('user', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setNotification(`Welcome back ${loggedUser.name}!`, '', timerId);
      if (blogs.length < 1) initializeBlogs();
    } catch (e) {
      setError('Wrong credentials');
      setNotification('Wrong username or password', 'error', timerId);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setNotification(`user ${user.name} logged out`, 'error', timerId);
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
      <Notification setError={setError} error={error} />
      {!user && loginForm()}
      {user && (
        <div>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <hr />
          <Togglable buttonLabel="new blog post" ref={blogFormRef}>
            <NewBlogForm user={user} setError={setError} />
          </Togglable>
        </div>
      )}
      {user && (
        <div className="blogs">
          {blogs.map((blog, id) => (
            <Blog blog={blog} key={id + blog.title} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

const sortByLikes = blogs =>
  blogs.sort((firstBlog, nextBlog) => nextBlog.likes - firstBlog.likes);

const mapStateToProps = state => ({
  timerId: state.notification.id,
  blogs: sortByLikes(state.blogs)
});

export default connect(mapStateToProps, {
  setNotification,
  initializeBlogs
})(App);
