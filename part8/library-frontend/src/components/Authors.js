import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const SET_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
      id
    }
  }
`;

const Authors = props => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    onError: props.handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS });
      store.writeQuery({
        query: ALL_AUTHORS,
        data: dataInStore
      });
    }
  });
  const [born, setBorn] = useState('');
  const [name, setName] = useState('');
  if (!props.show) {
    return null;
  }

  const submit = async e => {
    e.preventDefault();
    await setBirthyear({
      variables: {
        born: Number(born),
        name
      }
    });

    setName('');
    setBorn('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
            name="authors"
            id="authors"
          >
            <option key="default">Select Author</option>
            {data.allAuthors.map(author => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
