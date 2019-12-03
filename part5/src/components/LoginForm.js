import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <div>
    <h3>log in to application</h3>
    <form onSubmit={e => handleSubmit(e, username, password)}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">log in</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
