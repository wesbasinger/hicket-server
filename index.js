const express = require('express');
const graphqlHTTP = require('express-graphql');

const { makeExecutableSchema } = require('graphql-tools');

const {ticket, tickets} = require('./connector');

const typeDefs = `

    type Ticket {
        _id: String
        text: String
    }

    type Query {
        tickets: [Ticket]
        ticket(_id: String): Ticket
    }
`
const resolvers = {
    Query : {
        tickets: () => {
            return tickets()
        },
        ticket: (_, args) => {
            return ticket(args._id)
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