import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import mongoose from "mongoose";
import { Auth } from './services/auth.service';

import { typeDefs } from './graphql/schema/index';
import { resolvers } from './graphql/resolve/index';

mongoose.connect(
    "mongodb://localhost:27017/brutal-tats",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )


export const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const port = 4000;

server.listen({ port }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
})