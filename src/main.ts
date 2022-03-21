import { resolver } from "./apollo/resolver.js";
import { TypeDef } from "./apollo/schema.js";
import { server } from "./router.js";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { FastifyInstance } from "fastify";
import { Resolver } from '@apollo/client';

// server.register(FastifySSEPlugin);

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function startApolloServer(typeDefs: any, resolvers: any) {
  // const app = fastify();
  const appolo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      fastifyAppClosePlugin(server),
      ApolloServerPluginDrainHttpServer({ httpServer: server.server }),
    ],
    context:({request})=>{
      return request
    }
  });

  await appolo.start();
  // server.register(FastifyCors)
  server.register(appolo.createHandler({ cors: true}));

  await server.listen(process.env.PORT ?? 4000);
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${appolo.graphqlPath}`
  );
}

startApolloServer(TypeDef, resolver);