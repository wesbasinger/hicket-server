const express = require('express');
const graphqlHTTP = require('express-graphql');

const { makeExecutableSchema } = require('graphql-tools');

const {tickets} = require('./connector');

const typeDefs = `

    type Ticket {
        id: Int
        text: String
    }

    type Query {
        tickets: [Ticket]
    }
`
const resolvers = {
    Query : {
        tickets: () => {
            return tickets()
        }
    }
}


const schema = makeExecutableSchema({typeDefs, resolvers})


const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
 
app.listen(8080);