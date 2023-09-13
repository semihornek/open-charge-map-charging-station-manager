import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './graphql/schema';
import resolvers from './graphql/resolvers';

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000, path: '/graphql' } });
  console.log(`🚀 Server is ready at: ${url}`);
})();
