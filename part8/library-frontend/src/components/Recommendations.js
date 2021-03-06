import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import BOOKS_BY_GENRE from '../graphql/queries/allBooksByGenre';

const Recommendations = ({ show, favoriteGenre }) => {
  const variables = { genre: favoriteGenre };
  const skip = favoriteGenre === undefined;
  const { loading, error, data: dataBooks } = useQuery(BOOKS_BY_GENRE, {
    variables,
    skip
  });
  if (!show) {
    return null;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {dataBooks &&
            dataBooks.allBooks.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published === 0 ? '' : book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
