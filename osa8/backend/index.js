const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)

// database address loaded from enviromental variable
const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && args.genre) {
        return Book.find({ genres: args.genre })
      }
      if (args.author && !args.genre) {
        return Book.find({ author: args.author })
      }
      if (args.author && args.genre) {
        return Book.find({ $and: [{ author: args.author }, { genres: args.genre }] })
      }
      return Book.find({})
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      return Book.find({ author: root.id }).count()
    }
  },
  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      let author = await Author.findOne({ name: args.author })
      if (author === null) {
        author = new Author({ name: args.author })
        author = await author.save()
      }
      book.author = author
      return book.save()
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        return author.save()
      }
      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
