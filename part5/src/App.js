import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Landing from './components/Landing';
import Users from './components/Users';
import User from './components/User';
import SingleBlog from './components/SingleBlog';
import Login from './components/Login';
import './styles/index.css';
import { initializeBlogs } from './store/actions/blogActions';
import { userLoginFromLocalStorage } from './store/actions/userActions';

const App = ({ blogs, initializeBlogs, user, userLoginFromLocalStorage }) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userLoginFromLocalStorage(user);
      initializeBlogs();
    }
  }, [initializeBlogs, userLoginFromLocalStorage]);

  const loginForm = () => {
    return (
      <Togglable buttonLabel={'log in'}>
        <LoginForm />
      </Togglable>
    );
  };

  return (
    <div className="container px-4 py-2 mx-auto">
      <Router>
        <header>
          <nav>
            <ul className="flex">
              <li className="mr-6">
                <Link to="/" className="text-blue-500 hover:text-blue-800">
                  Blogs
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  data-cy="link-users"
                  to="/users"
                  className="text-blue-500 hover:text-blue-800"
                >
                  Users
                </Link>
              </li>
              <li className="ml-auto">
                <Login />
              </li>
            </ul>
          </nav>
          <Notification />
          <h1 className="text-2xl text-center">Bloglist</h1>
        </header>
        {!user && loginForm()}
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog blogs={blogs} />
        </Route>
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  blogs: state.blogs
});

export default connect(mapStateToProps, {
  initializeBlogs,
  userLoginFromLocalStorage
})(App);
