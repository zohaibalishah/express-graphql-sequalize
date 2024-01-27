import 'dotenv/config';
import './config/dbconnection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import Users from './model/Users.js';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
  type Mutation{
    update(userId:Int,firstName:String,lastName:String,email:String,password:String):String

  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    update: async (_, args) => {
      try {
        const { userId, firstName, lastName, email, password } = args;

        const result = await Users.update(
          {
            firstName,
            lastName,
            email,
            password,
          },
          {
            where: { id: userId },
          }
        );
        return 'updated';
      } catch (e) {
        console.log('error', e);
      }
    },
  },
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.get('/api', (req, res) => {
  res.json({ messgae: 'apis' });
});

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
