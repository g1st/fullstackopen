import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`;

const Books = props => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;