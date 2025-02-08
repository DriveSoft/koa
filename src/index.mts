import Koa from "koa";
import router from "./router.mjs";
import parser from "koa-bodyparser";
import 'dotenv/config'; 

import { Model } from "objection";
import Knex from "knex";

import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema.mjs";
import { resolvers } from "./graphql/resolvers.mjs";

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

app.use(parser()).use(router.routes()).use(router.allowedMethods());

app.on('error', err => {
   console.error('server error', err)
 });

app.listen(3500);


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
  **/
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});