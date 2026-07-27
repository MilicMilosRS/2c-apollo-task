import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

let users = [];
let nextId = 1;

// Taken from the internet
const emailRegex = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
  },
  Mutation: {
    addUser: (_, { name, email }) => {
      const newUser = { id: String(nextId++), name, email };
      users.push(newUser);
      return newUser;
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server running..");