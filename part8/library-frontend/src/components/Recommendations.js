import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      id
      genres
      author {
        name
      }
    }
  }
`;

const Recommendations = props => {
  const { data: { me: { favoriteGenre } = {} } = {} } = useQuery(USER);
  const variables = { genre: favoriteGenre };
  const skip = favoriteGenre === undefined;
  const { loading, error, data: dataBooks } = useQuery(ALL_BOOKS, {
    variables,
    skip
  });
  if (!props.show) {
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
