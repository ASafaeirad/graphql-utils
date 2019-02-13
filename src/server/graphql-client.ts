/// <reference types="graphql" />
import { graphql, GraphQLSchema } from 'graphql';

interface Option {
  schema: GraphQLSchema;
  context?: any;
}

export class GraphqlClient {
  constructor(private option: Option) {}

  async run<T>(query: string, user: any = {}, variable: any = {}) {
    return graphql<T>(
      this.option.schema,
      query,
      {},
      { user, ...this.option.context },
      variable,
    );
  }
}
