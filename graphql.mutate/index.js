'use strict';

const { gql } = require('apollo-boost');

const mergeData = require('../mergeData.js');

module.exports = (NODE) => {
  const clientsIn = NODE.getInputByName('clients');

  const variablesIn = NODE.getInputByName('variables');

  const triggerIn = NODE.getInputByName('trigger');
  triggerIn.on('trigger', async (conn, state) => {
    const [clients, variables] = await Promise.all([
      clientsIn.getValues(state),
      variablesIn.getValues(state)
    ]);

    const data = await Promise.all(clients.map(async (client) => {
      return client.mutate({
        mutation: gql`${NODE.data.mutation}`,
        variables
      });
    }));

    state.set(NODE, { data: mergeData(data) });
    doneOut.trigger(state);
  });

  const doneOut = NODE.getOutputByName('done');

  const dataOut = NODE.getOutputByName('data');
  dataOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    return thisState.data;
  });
};
