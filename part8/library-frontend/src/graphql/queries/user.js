import { gql } from 'apollo-boost';

const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export default USER;
