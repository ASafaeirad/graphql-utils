/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import createRetriableFetch from './retriable-fetch';


const createApolloClient = ({ intialState, storage, endpoint, onLogin, onLogout, refreshTokenMutation, debug, resolvers }) => {
  const inMemoryCache = new InMemoryCache();

  const retriableFetch = createRetriableFetch({ endpoint, storage, cache: inMemoryCache, onLogin, onLogout, refreshTokenMutation });

  const request = async (operation) => {
    const { token } = storage;
    if (!token) return;

    operation.setContext({ headers: { authorization: token } });
  };

  const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  }));

  const errorHandler = ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.assert(debug, graphQLErrors[0]);
    }
    if (networkError) {
      console.assert(debug, networkError);
    }

    if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].name === 'UnauthorizedError') {
      console.assert(debug, 'User not found, Loggin out...');
      onLogout(Storage, inMemoryCache);
    }
  };

  const client = new ApolloClient({
    cache: inMemoryCache,
    link: ApolloLink.from([
      onError(errorHandler),
      requestLink,
      withClientState({
        cache: inMemoryCache,
        defaults: intialState,
        resolvers,
      }),
      new HttpLink({
        uri: endpoint,
        fetch: retriableFetch,
      }),

    ]),
  });
  return client;
};

export default createApolloClient;
