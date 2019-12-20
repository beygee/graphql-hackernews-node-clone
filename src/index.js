const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')

const resolvers = {
  Query,
  Mutation,
  Link,
  User
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: ctx => {
    return {
      ...ctx,
      prisma
    }
  }
})

server.start(() => console.log(`http://localhost:4000 에서 서버 가동중`))
