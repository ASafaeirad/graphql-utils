/// <reference types="graphql" />
import { graphql, GraphQLSchema } from 'graphql';

interface Option {
  schema: GraphQLSchema;
  context?: any;
}

export class GraphqlClient {
  constructor(private option: Option) {}

  run = async (query: string, variable: any = {}, user?: any) => graphql(
    this.option.schema,
    query,
    {},
    { user, ...this.option.context },
    variable,
  )
}
