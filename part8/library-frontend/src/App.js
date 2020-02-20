import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import {
  useMutation,
  useApolloClient,
  useSubscription
} from '@apollo/react-hooks';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { BOOK_DETAILS } from './fragments';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(
    localStorage.getItem('user-token') || null
  );
  const [errorMessage, setErrorMessage] = useState(null);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
    }
  });

  const handleError = error => {
    let errorMessage;
    if (
      error.hasOwnProperty('graphQLErrors') &&
      error.graphQLErrors.length > 0
    ) {
      errorMessage = error.graphQLErrors[0].message;
    } else {
      errorMessage = error.message;
    }
    setErrorMessage(errorMessage);
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
    setPage('authors');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      {errorNotification()}
      <Authors show={page === 'authors'} handleError={handleError} />
      <Books show={page === 'books'} />
      {page === 'add' && (
        <NewBook show={page === 'add'} handleError={handleError} />
      )}
      {page === 'recommendations' && (
        <Recommendations
          show={page === 'recommendations'}
          handleError={handleError}
        />
      )}
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
