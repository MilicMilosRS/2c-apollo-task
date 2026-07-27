import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

let users = [];
let nextId = 1;

// Taken from the internet
const emailRegex = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isEmailTaken = (email) => {
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
};

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users(name: String, email: String): [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
    deleteUser(id: ID!): Boolean!
  }
`;

const resolvers = {
    Query: {
        users: (_, { name, email }) => {
            let result = users;

            if (name) {
                result = result.filter((u) =>
                u.name.toLowerCase().includes(name.toLowerCase())
                );
            }

            if (email) {
                result = result.filter((u) =>
                u.email.toLowerCase().includes(email.toLowerCase())
                );
            }

            return result;
        },
    },
    Mutation: {
        addUser: (_, { name, email }) => {
            if (!emailRegex(email)) {
                throw new Error('Email adresa nije validna.');
            }

            if (isEmailTaken(email)) {
                throw new Error('Email je zauzet.');
            }

            const newUser = { id: String(nextId++), name, email };
            users.push(newUser);
            return newUser;
        },
        deleteUser: (_, { id }) => {
            const initialLength = users.length;
            users = users.filter((u) => u.id !== id);

            //Check if the user was filtered out
            return users.length < initialLength;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server running..");