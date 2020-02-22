import { gql } from 'apollo-boost';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export default ALL_AUTHORS;
