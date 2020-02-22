import { gql } from 'apollo-boost';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    genres
    author {
      name
      id
      bookCount
      born
    }
  }
`;
