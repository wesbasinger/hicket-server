const express = require('express');
const graphqlHTTP = require('express-graphql');

const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `

    type Ticket {
        id: Int
        text: String
    }

    type Query {
        ticket(id:Int) : Ticket
        tickets: [Ticket]
    }
`
const resolvers = {
    
}


const schema = makeExecutableSchema({typeDefs, resolvers})


const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
 
app.listen(8080);