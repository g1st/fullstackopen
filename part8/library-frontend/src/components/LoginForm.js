import React, { useState } from 'react';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!props.show) {
    return null;
  }

  const submit = async e => {
    e.preventDefault();

    const result = await props.login({
      variables: { username, password }
    });

    if (result) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem('user-token', token);
      props.setPage('authors');
    }
  };

  return (
    <form onSubmit={submit}>
      <br />
      <div>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">log in</button>
    </form>
  );
};

export default LoginForm;
