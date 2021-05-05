const express = require('express');
const next = require('next');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
//This is built in nextjs request handling
const handle = app.getRequestHandler();

const data = {
  portfolios: [
    {
      _id: '7567564gfbhg',
      title: 'Job in USA',
      jobTitle: 'Chef',
      daysOfExperience: 100,
      current: false,
    },
    {
      _id: '57576fhhcfh',
      title: 'Job in Barcelona',
      content: 'It was very sunny',
      jobTitle: 'Developer',
      current: true,
    },
    {
      _id: '575743737272dfjdj',
      title: 'Job in Ukraine',
      content: 'It was very cold',
      jobTitle: 'Manager',
      daysOfExperience: 30,
      current: false,
    },
  ],
};

app.prepare().then(() => {
  const server = express();

  //Construct a schema, using GRAPHQL schema language
  const schema = buildSchema(`

  type Portfolio {
    _id: ID!
    title: String,
    content: String,
    jobTitle: String,
    daysOfExperience: Int,
    current: Boolean
  },
      type Query {
        hello: String
        portfolio: Portfolio
        portfolios: [Portfolio]

      }
  `);
  // The root provides a resolver for each api endpoint
  const root = {
    hello: () => {
      return 'Hello World!';
    },
    portfolio: () => {
      return data.portfolios[0];
    },
    portfolios: () => {
      return data.portfolios;
    },
  };

  server.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
