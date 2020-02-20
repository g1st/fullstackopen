import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ALL_BOOKS } from './Books';
import { ALL_AUTHORS } from './Authors';
import { USER, BOOKS_BY_GENRE } from './Recommendations';
import { BOOK_DETAILS } from '../fragments';

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const NewBook = props => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const { data: { me: { favoriteGenre } = {} } = {} } = useQuery(USER);
  const variables = { genre: favoriteGenre };

  const [addBook] = useMutation(ADD_BOOK, {
    onError: props.handleError,
    update: (cache, response) => {
      if (
        cache.data.data.ROOT_QUERY[`allBooks({"genre":"${favoriteGenre}"})`]
      ) {
        const booksByGenreInCache = cache.readQuery({
          query: BOOKS_BY_GENRE,
          variables
        });
        booksByGenreInCache.allBooks.push(response.data.addBook);
        cache.writeQuery({
          query: BOOKS_BY_GENRE,
          variables,
          data: booksByGenreInCache
        });
      }

      const booksInCache = cache.readQuery({ query: ALL_BOOKS });
      booksInCache.allBooks.push(response.data.addBook);
      cache.writeQuery({
        query: ALL_BOOKS,
        data: booksInCache
      });

      const authorsInCache = cache.readQuery({ query: ALL_AUTHORS });
      const indexOfExistingAuthor = authorsInCache.allAuthors.findIndex(
        obj => obj.name === author
      );

      if (indexOfExistingAuthor >= 0) {
        authorsInCache.allAuthors[indexOfExistingAuthor].bookCount++;
      } else {
        authorsInCache.allAuthors.push(response.data.addBook.author);
      }
      cache.writeQuery({
        query: ALL_AUTHORS,
        data: authorsInCache
      });
    }
  });

  if (!props.show) {
    return null;
  }

  const submit = async e => {
    e.preventDefault();
    await addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    });

    setTitle('');
    setPublished('');
    setAuhtor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
