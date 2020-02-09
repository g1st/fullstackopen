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
    bookCount: () => {
      return books.length;
    },
    authorCount: () => {
      return authors.length;
    },
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      }

      if (!args.genre) {
        const authorQuery = book => book.author === args.author;

        return books.filter(authorQuery);
      }

      if (!args.author) {
        const genreQuery = book => book.genres.includes(args.genre);

        return books.filter(genreQuery);
      }

      const authorANDgenre = book =>
        book.author === args.author && book.genres.includes(args.genre);

      return books.filter(authorANDgenre);
    },
    allAuthors: () => authors
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let book = await Book.findOne({ title: args.title });
        if (book) {
          throw new Error(`Book with title '${args.title}' already exists`);
        }
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
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
    editAuthor: (root, args) => {
      const authorNames = authors.map(author => author.name);
      if (!authorNames.includes(args.name)) {
        return null;
      }

      authors.map(author => {
        if (author.name === args.name) {
          author.born = args.setBornTo;
        }
        return author;
      });
      return authors.find(author => author.name === args.name);
    }
  },
  Author: {
    bookCount: root => {
      let counter = 0;
      books.forEach(book => {
        if (book.author === root.name) counter++;
      });
      return counter;
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
