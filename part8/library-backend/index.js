require('dotenv').config();
const { ApolloServer, UserInputError, gql } = require('apollo-server');
const uuid = require('uuid/v1');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');

mongoose.set('useFindAndModify', false);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.error('error connection to MongoDB:', err.emessage);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      try {
        return Book.countDocuments();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    },
    authorCount: async () => {
      try {
        return Author.countDocuments();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    },
    allBooks: async (root, args) => {
      const { author, genre } = args;
      try {
        if (!author && !genre) {
          return await Book.find({});
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

        const { _id } = await Author.findOne({ name: author }, '_id');
        return Book.find({
          author: _id,
          genres: { $in: genre }
        });
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    },
    allAuthors: async () => {
      try {
        return Author.find();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const { title, author: name } = args;
      try {
        let book = await Book.findOne({ title: title });
        if (book) {
          throw new Error(`Book with title '${title}' already exists`);
        }
        let author = await Author.findOne({ name });
        if (!author) {
          author = new Author({ name });
          await author.save();
        }
        book = new Book({ ...args, author });
        await book.save();
        return book;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    },
    editAuthor: async (root, args) => {
      const { name, setBornTo: born } = args;
      try {
        return Author.findOneAndUpdate({ name }, { born }, { new: true });
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    }
  },
  Author: {
    bookCount: async root => {
      try {
        return Book.countDocuments({ author: root.id });
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    }
  },
  Book: {
    author: async root => {
      try {
        const author = await Author.findOne({ _id: root.author });
        return author;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
