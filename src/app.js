import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {execute, subscribe} from 'graphql';
import bodyParser from 'body-parser';
import {createServer} from 'http';
import schema from './graphql';
import express from 'express';

const PORT = 3000;

var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}));

const server = createServer(app);
server.listen(PORT, () => {
  SubscriptionServer.create(
    {execute, subscribe, schema},
    {server, path: '/subscriptions'},
  );
  console.log(`Example GraphQL Architecture server running on port ${PORT}`);
});