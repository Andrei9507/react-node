const express = require("express");

// const graphqlHTTP = require("express-graphql");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
// allow cross origin request
app.use(cors())

// mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
mongoose.connect('mongodb://localhost:27017/crud',  { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open', () => {
    console.log("connected to db")
});


const db = require("./db")

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
})