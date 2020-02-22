const { UserInputError, AuthenticationError } = require('apollo-server');

const Author = require('../models/author');

module.exports = {
  typeDef: `
    extend type Query {
      authorCount: Int!
      allAuthors: [Author!]!
    }

    extend type Mutation {
      editAuthor(name: String!, setBornTo: Int!): Author
    }
  
    type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
    }
  `,
  resolvers: {
    Query: {
      authorCount: async () => {
        try {
          return Author.countDocuments();
        } catch (e) {
          throw new UserInputError(e.message);
        }
      },
      allAuthors: async () => {
        try {
          return Author.find();
        } catch (e) {
          throw new UserInputError(e.message);
        }
      }
    },
    Mutation: {
      editAuthor: async (root, args, { currentUser }) => {
        const { name, setBornTo: born } = args;

        if (!currentUser) {
          throw new AuthenticationError('not authenticated');
        }

        try {
          return Author.findOneAndUpdate({ name }, { born }, { new: true });
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          });
        }
      }
    }
  }
};
