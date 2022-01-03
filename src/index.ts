// get env vars
const dotenv = require("dotenv");
dotenv.config();

import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const { dbConnector } = require('./db/mongodb.connector');
import { Auth } from './services/auth.service';

import { typeDefs } from './graphql/schema/index';
import { resolvers } from './graphql/resolve/index';

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const port = 4000;

server.listen({ port }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
})