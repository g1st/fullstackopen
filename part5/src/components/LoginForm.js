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
      <form
        className="w-64"
        onSubmit={e => handleSubmit(e, username.value, password.value)}
      >
        <div className="mb-2">
          <label htmlFor="username" />
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            placeholder="username"
            id="username"
            type={username.type}
            name={username.name}
            value={username.value}
            onChange={username.onChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" />
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            placeholder="password"
            id="password"
            type={password.type}
            name={password.name}
            value={password.value}
            onChange={password.onChange}
            required
          />
        </div>
        <button
          className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          id="login"
          type="submit"
        >
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
