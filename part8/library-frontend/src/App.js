import React, { useState, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription
} from '@apollo/react-hooks';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import ALL_BOOKS from './graphql/queries/allBooks';
import ALL_AUTHORS from './graphql/queries/allAuthors';
import BOOKS_BY_GENRE from './graphql/queries/allBooksByGenre';
import { alreadyExists } from './utils';
import LOGIN from './graphql/mutations/login';
import BOOK_ADDED from './graphql/subscriptions/bookAdded';
import USER from './graphql/queries/user';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(
    localStorage.getItem('user-token') || null
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const { data } = useQuery(USER, { skip: !token });

  useEffect(() => {
    if (data) {
      setFavoriteGenre(data.me.favoriteGenre);
    }
  }, [data]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      // update books cache
      const { bookAdded } = subscriptionData.data;
      const { allBooks } = client.readQuery({ query: ALL_BOOKS });
      if (!alreadyExists(allBooks, bookAdded)) {
        allBooks.push(bookAdded);
        client.writeQuery({ query: ALL_BOOKS, data: { allBooks } });
      }

      // update authors cache
      const { allAuthors } = client.readQuery({ query: ALL_AUTHORS });
      if (!alreadyExists(allAuthors, bookAdded.author)) {
        allAuthors.push(bookAdded.author);
        client.writeQuery({ query: ALL_AUTHORS, data: { allAuthors } });
      }

      // update recommendations cache
      if (bookAdded.genres.includes(favoriteGenre)) {
        const booksByGenreInCache = client.readQuery({
          query: BOOKS_BY_GENRE,
          variables: { genre: favoriteGenre }
        });
        booksByGenreInCache.allBooks.push(bookAdded);
        client.writeQuery({
          query: BOOKS_BY_GENRE,
          variables: { genre: favoriteGenre },
          data: booksByGenreInCache
        });
      }
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
      <NewBook
        show={page === 'add'}
        handleError={handleError}
        favoriteGenre={favoriteGenre}
      />
      <Recommendations
        show={page === 'recommendations'}
        handleError={handleError}
        favoriteGenre={favoriteGenre}
      />
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
