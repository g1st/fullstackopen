import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ALL_BOOKS } from './Books';
import { ALL_AUTHORS } from './Authors';

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
      title
      published
      genres
      id
      author {
        name
        id
        bookCount
        born
      }
    }
  }
`;

const NewBook = props => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    onError: props.handleError,
    update: (store, response) => {
      const booksInStore = store.readQuery({ query: ALL_BOOKS });
      booksInStore.allBooks.push(response.data.addBook);
      store.writeQuery({
        query: ALL_BOOKS,
        data: booksInStore
      });
      const authorsInStore = store.readQuery({ query: ALL_AUTHORS });
      authorsInStore.allAuthors.push(response.data.addBook.author);
      store.writeQuery({
        query: ALL_AUTHORS,
        data: authorsInStore
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
