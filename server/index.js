const {ApolloServer, gql} = require('apollo-server');
const {MongoClient} = require('mongodb');

const server = new ApolloServer({
  resolvers: {
    Query: {
      async examples(parent, args, context, info) {
        // Tip 1: MongoDB connection.
        // let client;
        // try {
        //  client = await MongoClient.connect('mongodb://login:password@host:port/db');
        //   return client
        //     .db('db')
        //     .collection('collection')
        //     .find({})
        //     .toArray();
        // } finally {
        //   if (client) client.close();
        // }

        // Tip 2: Delay the response a bit.
        // await new Promise(resolve => setTimeout(resolve, 1000));

        return [{
          answer: 'Hello there!',
          ok: true,
          time: 1337
        }, {
          answer: 'Nope.',
          ok: false,
          time: 420
        }, {
          answer: 'Input?',
          ok: args.input > 0,
          time: args.input
        }];
      }
    }
  },
  typeDefs: gql`
    type Example {
      answer: String
      ok: Boolean
      time: Int
    }

    type Query {
      examples(input: Int!): [Example!]!
    }
  `
});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
