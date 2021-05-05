const express = require('express');
const next = require('next');

const { ApolloServer, gql } = require('apollo-server-express');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
//This is built in nextjs request handling
const handle = app.getRequestHandler();

//resolvers
const { portfolioQueries, portfolioMutations } = require('./graphql/resolvers');
//types
const { portfolioTypes } = require('./graphql/types');

app.prepare().then(() => {
  const server = express();

  //Construct a schema, using GRAPHQL schema language
  const typeDefs = gql`
    ${portfolioTypes}

    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
    }
  `;
  // The root provides a resolver for each api endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
    },
  };

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  apolloServer.applyMiddleware({ app: server });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
