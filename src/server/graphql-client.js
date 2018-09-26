import { graphql } from 'graphql';

export const GraphqlClient = (function (schema, { models, redis }) {
  const run = async (query, variable = {}, user) => graphql(schema, query, {}, { user, models, redis }, variable);

  return {
    run,
  };
});

export default GraphqlClient;
