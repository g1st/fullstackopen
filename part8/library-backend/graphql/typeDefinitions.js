const { gql } = require('apollo-server');

module.exports = {
  typeDefs: gql`
    type Token {
      value: String!
    }

    type Query {
      _empty: String
    }

    type Mutation {
      _empty: String
    }

    type Subscription {
      _empty: String
    }
  `
};
