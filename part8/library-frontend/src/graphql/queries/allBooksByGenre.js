import { gql } from 'apollo-boost';

import { BOOK_DETAILS } from '../fragments';

const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export default BOOKS_BY_GENRE;
