const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => 'This is the API of a hackernews clone',
    feed: (parent, args, { prisma }, info) => {
      return prisma.links()
    }
  },
  Mutation: {
    post: (parent, args, { prisma }) => {
      return prisma.createLink({
        url: args.url,
        description: args.description
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log(`http://localhost:4000 에서 서버 가동중`))
