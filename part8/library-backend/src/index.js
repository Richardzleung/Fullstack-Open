const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

// DO NOT INCLUDE 'XsVfBzngqidjlSBn' WHEN COMMITING TO GITHUB 
const MONGODB_URI = 'mongodb+srv://fullstack:XsVfBzngqidjlSBn@cluster0.ohnga.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Subscription {
    bookAdded: Books!
  }   
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Books {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: String
  }
  type Authors {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Books!]!
      allAuthors: [Authors!]!
      me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      name: String!
      born: Int
      genres: [String!]!
    ) : Books
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Authors
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  } 
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {  
      if (!args.author && !args.genre) 
        return Book.find({})
      else if (args.author && args.genre) 
        return books.filter(p => (p.author === args.author && p.genres.includes(args.genre)))
      else if (args.author) 
        return Book.find({author: args.author})//books.filter(p => p.author === args.author)
      else if (args.genre) 
        return Book.find({ genres: {$in: [args.genre]} })//books.filter(p => p.genres.includes(args.genre))

    },
    allAuthors: () => Author.find({}),
    me: (root,args,context) => {
      return context.currentUser
    }
  },
  Books: {
    author: async (root) => {
      const { name, born } = await Author.findById(root.author)
      return {
        name,
        born
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (args.name < 3) throw new UserInputError(error.message, {
        invalidArgs: args,
      })

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const existingAuthor = await Author.findOne({ name: args.name })
      if (!existingAuthor) {
        const person = new Author({ name:args.name, bookCount: 1, born:args.born })
        await person.save()
      } 
      else {
        await Author.findByIdAndUpdate(existingAuthor._id, { bookCount: existingAuthor.bookCount + 1}, { new: true})
      }

      const findAuthor = await Author.findOne({ name: args.name }).exec()
      const book = new Book({ ...args, author: findAuthor._id, id: uuidv4()})
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name:args.name })
      author.born = args.setBornTo
      return author.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {    
    bookAdded: {      
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])    
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})