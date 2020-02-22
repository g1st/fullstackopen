import { gql } from 'apollo-boost';
import { BOOK_DETAILS } from '../fragments';

const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export default ALL_BOOKS;
