import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotification } from '../store/actions/notificationActions';
import { login } from '../store/actions/userActions';
import { initializeBlogs } from '../store/actions/blogActions';
import { useField } from '../hooks';

const LoginForm = ({
  login,
  timerId,
  blogs,
  setNotification,
  initializeBlogs
}) => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  const handleSubmit = async (event, username, password) => {
    event.preventDefault();
    const credentials = { username, password };
    try {
      const res = await login(credentials);
      const { name } = res.payload;
      setNotification(`Welcome back ${name}!`, '', timerId);
      if (blogs.length < 1) initializeBlogs();
    } catch (e) {
      setNotification('Wrong username or password', 'error', timerId);
    }
  };

  return (
    <div>
      <h3>log in to application</h3>
      <form onSubmit={e => handleSubmit(e, username.value, password.value)}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type={username.type}
            name={username.name}
            value={username.value}
            onChange={username.onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type={password.type}
            name={password.name}
            value={password.value}
            onChange={password.onChange}
            required
          />
        </div>
        <button id="login" type="submit">
          log in
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  timerId: state.notification.id,
  blogs: state.blogs
});

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  timerId: PropTypes.number
};

export default connect(mapStateToProps, {
  login,
  setNotification,
  initializeBlogs
})(LoginForm);
