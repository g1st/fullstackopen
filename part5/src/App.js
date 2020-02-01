import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Landing from './components/Landing';
import Users from './components/Users';
import User from './components/User';
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
      <Router>
        <header>
          <h1>Bloglist</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Notification />
        {!user && loginForm()}
        {user && (
          <div>
            <span>{user.name} logged in </span>
            <button onClick={handleLogout}>logout</button>
            <hr />
          </div>
        )}
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
      </Router>
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
