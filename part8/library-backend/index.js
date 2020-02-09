require('dotenv').config();
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

mongoose.set('useFindAndModify', false);

const { MONGODB_URI, JWT_SECRET } = process.env;

mongoose
  .connect(MONGODB_URI, {
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      try {
        return Book.countDocuments();
      } catch (e) {
        throw new UserInputError(e.message);
      }
    },
    authorCount: async () => {
      try {
        return Author.countDocuments();
      } catch (e) {
        throw new UserInputError(e.message);
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
        throw new UserInputError(e.message);
      }
    },
    me: (root, args, { currentUser }) => currentUser
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
    },
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
  },
  Author: {
    bookCount: async root => {
      try {
        return Book.countDocuments({ author: root.id });
      } catch (e) {
        throw new UserInputError(e.message);
      }
    }
  },
  Book: {
    author: async root => {
      try {
        const author = await Author.findOne({ _id: root.author });
        return author;
      } catch (e) {
        throw new UserInputError(e.message);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
