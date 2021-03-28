'use strict';

const ApolloBoost = require('apollo-boost');
const fetch = require('node-fetch')

const ApolloClient = ApolloBoost.default;
const { InMemoryCache } = ApolloBoost;

module.exports = (NODE) => {
  const clientOut = NODE.getOutputByName('client');
  clientOut.on('trigger', async (conn, state) => {
    return new ApolloClient({
      uri: NODE.data.uri,
      fetch,
      cache: new InMemoryCache({
        addTypename: false
      })
    });
  });
};
