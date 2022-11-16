const express = require('express');
const { authMiddleware } = require('./utils/auth')

// import Apollo Server
const { ApolloServer } = require('apollo-server-express')
const path = require('path');
const { typeDefs, resolvers } = require('./schemas')

// mongoDB declared in /config/connection
const db = require('./config/connection');

// const routes = require('./routes'); --- *** THIS LINE IS UNECESSARY

const app = express();
const PORT = process.env.PORT || 3001;

// server variable declared to handle tyeDefs and resolvers from /server/schemas
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// set up 'app' for urlencoded data and json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

// app.use(routes); *** THIS LINE IS UNECESSARY

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

startApolloServer(typeDefs, resolvers)