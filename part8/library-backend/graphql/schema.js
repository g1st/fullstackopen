const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const { typeDefs } = require('./typeDefinitions.js');
const { typeDef: book, resolvers: bookResolvers } = require('./book');
const { typeDef: author, resolvers: authorResolvers } = require('./author');
const { typeDef: user, resolvers: userResolvers } = require('./user');

module.exports = {
  schema: makeExecutableSchema({
    typeDefs: [typeDefs, author, book, user],
    resolvers: merge(bookResolvers, authorResolvers, userResolvers)
  })
};
