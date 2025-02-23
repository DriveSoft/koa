import http from "http";
import Koa from "koa";
import 'dotenv/config';
import { Model } from "objection";
import Knex from "knex";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema.mjs";
import { resolvers } from "./graphql/resolvers.mjs";
import { getUser, getUserByToken } from "./controllers/users.controller.mjs";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import { KoaContextFunctionArgument, koaMiddleware } from '@as-integrations/koa';

// Initialize knex.
const knex = Knex({
  client: 'postgresql',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

Model.knex(knex);

// knex.raw('SELECT 1')
// .then(() => console.log('Connected to PostgreSQL'))
// .catch(err => console.error('Connection failed:', err)); 

const app = new Koa();
const httpServer = http.createServer(app.callback());

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], 
});

await server.start();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(bodyParser());
app.use(
  koaMiddleware(server, {
    context: async ({ ctx }) => {

      // Get token from Authorization header
      const token = ctx.headers.authorization?.replace('Bearer ', '');
      if (token === undefined) return { koaCtx: ctx, user: null };
      const user = await getUserByToken(token);
      return { koaCtx: ctx, user };
    },
  })
);

await new Promise((resolve) => {
  httpServer.listen({ port: 4000 }, () => resolve)
  console.log(`🚀 Server ready at http://localhost:4000`);
});
