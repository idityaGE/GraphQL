import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  app.use(
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
  )

  await server.start()

  app.use('/graphql', expressMiddleware(server));

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });
}

startServer();