const { UserInputError } = require('apollo-server');
const { gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

module.exports = {
  typeDef: gql`
    extend type Query {
      me: User
    }

    extend type Mutation {
      createUser(username: String!, favoriteGenre: String!): User
      login(username: String!, password: String!): Token
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
  `,
  resolvers: {
    Query: {
      me: (root, args, { currentUser }) => currentUser
    },
    Mutation: {
      createUser: async (root, args) => {
        const { username, favoriteGenre } = args;
        try {
          const user = new User({ username, favoriteGenre });
          return user.save();
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          });
        }
      },
      login: async (root, args) => {
        const { username, password } = args;
        try {
          const user = await User.findOne({ username });
          if (!user || password !== 'secret') {
            throw new UserInputError('wrong credentials');
          }

          const userForToken = {
            username: user.username,
            id: user._id
          };

          return { value: jwt.sign(userForToken, JWT_SECRET) };
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          });
        }
      }
    }
  }
};
