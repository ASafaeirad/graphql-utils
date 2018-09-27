import { graphql } from 'graphql';

export class GraphqlClient {
  constructor({ schema, models, redis }) {
    this.schema = schema;
    this.models = models;
    this.redis = redis;
  }

  run = async (query, variable = {}, user) => graphql(
    this.schema,
    query,
    {},
    { user, models: this.models, redis: this.redis },
    variable,
  );
}

export default GraphqlClient;
