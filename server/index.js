const {ApolloServer, gql} = require('apollo-server');
const {MongoClient} = require('mongodb');

const typeDefs = gql`
  type Example {
    answer: String
    ok: Boolean
    time: Int
  }

  type User {
    _id: String
    username: String
    avatar: String
    birthdate: String    
  }

  type Query {
    examples(input: Int!): [Example!]!
    usersByName(name: String!): [User!]!
    users: [User!]!
  }

`;

const resolvers = {
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
    },

    async users(parent, args, context, info) {
      let client = await MongoClient.connect('mongodb://workshop:workshop@ds227939.mlab.com:27939/workshop');
      const result = await client
          .db('workshop')
          .collection('users')
          .find({})
          .toArray();
      if (client) client.close();
      return result;
    },

    async usersByName(parent, args, context, info) {
      let client = await MongoClient.connect('mongodb://workshop:workshop@ds227939.mlab.com:27939/workshop');
      const result = await client
          .db('workshop')
          .collection('users')
          .find( { username: args.name })
          .toArray();
      result.push({_id: "customid",
        username: "myUser",
        avatar: "url",
        birthdate: "date"});
      if (client) client.close();
      return result;
    }
  }

};

const server = new ApolloServer({resolvers, typeDefs});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
