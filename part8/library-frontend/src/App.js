import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(
    localStorage.getItem('user-token') || null
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message);
    setErrorMessage('bla bla');
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const [login] = useMutation(LOGIN, {
    onError: handleError
  });

  const errorNotification = () =>
    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>;

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      {errorNotification()}
      <Authors show={page === 'authors'} handleError={handleError} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} handleError={handleError} />
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        login={login}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
