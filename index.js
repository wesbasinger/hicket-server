const express = require('express');
const graphqlHTTP = require('express-graphql');

const { makeExecutableSchema } = require('graphql-tools');

const {add, ticket, tickets} = require('./connector');

const typeDefs = `

    type Ticket {
        _id: String
        text: String
    }

    type Query {
        tickets: [Ticket]
        ticket(_id: String): Ticket
    }
    
    type Mutation {
        add(text: String): Ticket
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
    }, 
    Mutation: {
        add: (_, args) => {
            return add(args.text)
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