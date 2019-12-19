const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a hackernews clone',
    feed: () => links
  },
  Link: {
    id: parent => parent.id
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        ...args
      }

      links.push(link)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`http://localhost:4000 에서 서버 가동중`))
