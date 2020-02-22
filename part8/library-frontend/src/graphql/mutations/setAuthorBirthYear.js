import { gql } from 'apollo-boost';

const SET_AUTHOR_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
      id
    }
  }
`;

export default SET_AUTHOR_BIRTHYEAR;
