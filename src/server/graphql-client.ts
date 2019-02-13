/// <reference types="graphql" />
import { graphql, GraphQLSchema } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';

interface Option {
  schema: GraphQLSchema;
  context?: any;
}

export class GraphqlClient {
  constructor(private option: Option) {}

  async run<T=ExecutionResultDataDefault>(query: string, user: any = {}, variable: any = {}) {
    return graphql<T>(
      this.option.schema,
      query,
      {},
      { user, ...this.option.context },
      variable,
    );
  }
}
