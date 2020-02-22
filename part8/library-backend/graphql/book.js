const { UserInputError, PubSub } = require('apollo-server');
const Author = require('../models/author');
const Book = require('../models/book');

const pubsub = new PubSub();

module.exports = {
  typeDef: `
    extend type Query {
      allBooks(author: String, genre: String): [Book!]!
      bookCount: Int!
    }

    extend type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book
    }

    extend type Subscription {
      bookAdded: Book!
    }
  
    type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }
  `,
  resolvers: {
    Book: {
      author: async root => {
        try {
          const author = await Author.findOne({ _id: root.author });
          return author;
        } catch (e) {
          throw new UserInputError(e.message);
        }
      }
    },
    Query: {
      allBooks: async (root, args) => {
        const { author, genre } = args;
        try {
          if (!author && !genre) {
            return Book.find({});
          }

          if (!genre) {
            const { _id } = await Author.findOne({ name: author }, '_id');
            return Book.find({
              author: _id
            });
          }

          if (!author) {
            return Book.find({
              genres: { $in: genre }
            });
          }
          const singleAuthor = await Author.findOne({ name: author }, '_id');
          if (singleAuthor === null) {
            return [];
          }
          return Book.find({
            author: singleAuthor._id,
            genres: { $in: genre }
          });
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          });
        }
      },
      bookCount: async () => {
        try {
          return Book.countDocuments();
        } catch (e) {
          throw new UserInputError(e.message);
        }
      }
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        const { title, author: name } = args;
        if (!currentUser) {
          throw new AuthenticationError('not authenticated');
        }

        try {
          let book = await Book.findOne({ title: title });
          if (book) {
            throw new Error(`Book with title '${title}' already exists`);
          }
          let author = await Author.findOne({ name });

          if (!author) {
            author = new Author({ name });
          }

          book = new Book({ ...args, author });
          await book.save();

          author.books.push(book._id);
          await author.save();

          pubsub.publish('BOOK_ADDED', { bookAdded: book });
          return book;
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          });
        }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      }
    }
  }
};
