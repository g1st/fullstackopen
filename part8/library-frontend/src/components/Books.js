import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import ALL_BOOKS from '../graphql/queries/allBooks';

const Books = props => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('all genres');

  if (!props.show) {
    return null;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const extractGenres = data => {
    const genres = data.allBooks.reduce(
      (acc, book) => {
        for (const genre of book.genres) {
          if (!acc.includes(genre)) {
            acc.push(genre);
          }
        }
        return acc;
      },
      ['all genres']
    );
    return genres;
  };

  const genreButtons = extractGenres(data).map(genre => (
    <button key={genre} onClick={() => setGenre(genre)}>
      {genre}
    </button>
  ));

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <strong>{genre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(book => {
            if (book.genres.includes(genre) || genre === 'all genres') {
              return (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published === 0 ? '' : book.published}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <br />
      <div>{genreButtons}</div>
    </div>
  );
};

export default Books;
