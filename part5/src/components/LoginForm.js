import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ username, password, handleSubmit }) => (
  <div>
    <h3>log in to application</h3>
    <form onSubmit={e => handleSubmit(e, username.value, password.value)}>
      <div>
        <label htmlFor="username">username</label>
        <input
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
          type={password.type}
          name={password.name}
          value={password.value}
          onChange={password.onChange}
          required
        />
      </div>
      <button type="submit">log in</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default LoginForm;
