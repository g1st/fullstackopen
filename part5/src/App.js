import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blogs from './components/Blogs';
import './index.css';
import { setNotification } from './store/actions/notificationActions';
import { initializeBlogs } from './store/actions/blogActions';
import { userLoginFromLocalStorage, logout } from './store/actions/userActions';

const App = ({
  setNotification,
  timerId,
  initializeBlogs,
  user,
  userLoginFromLocalStorage,
  logout
}) => {
  const blogFormRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userLoginFromLocalStorage(user);
      initializeBlogs();
    }
  }, [initializeBlogs, userLoginFromLocalStorage]);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setNotification(`user ${user.name} logged out`, 'error', timerId);
    logout();
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel={'log in'}>
        <LoginForm />
      </Togglable>
    );
  };

  return (
    <div>
      <header>
        <h1>Bloglist</h1>
      </header>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <hr />
          <Togglable buttonLabel="new blog post" ref={blogFormRef}>
            <NewBlogForm />
          </Togglable>
        </div>
      )}
      {user && <Blogs />}
    </div>
  );
};

const mapStateToProps = state => ({
  timerId: state.notification.id,
  user: state.user
});

export default connect(mapStateToProps, {
  setNotification,
  initializeBlogs,
  userLoginFromLocalStorage,
  logout
})(App);
