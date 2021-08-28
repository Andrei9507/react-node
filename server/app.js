// const express = require("express");
const { ApolloServer, gql } = require('apollo-server');
// const { graphqlHTTP } = require('express-graphql');
const {typeDefs, resolvers} = require('./schema/schema');
// const  = require('./schema/resolvers');
// const {typeDefs, resolvers} = require('./schema/schema');
const mongoose = require("mongoose")
// const cors = require("cors")

// const app = express();
// allow cross origin request
// app.use(cors())

mongoose.connect('mongodb://localhost:27017/crud',  { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open', () => {
    console.log("connected to db")
});


// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }));

const server = new ApolloServer({
	cors: {
		origin: '*',			// <- allow request from all domains
		credentials: true
    },		// <- enable CORS response for requests with credentials (cookies, http authentication)
	typeDefs,
	resolvers
});


server
  .listen()
  .then(({ url }) => `GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);