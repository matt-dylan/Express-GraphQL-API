const express = require("express");
const graphqlHTTP = require("express-graphql"); //middleware
const schema = require("./schema/schema");

const server = express();
const port = process.env.PORT || 8080;

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true //Provides interface for GraphQL queries
  })
);

server.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
