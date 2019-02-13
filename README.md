# @frontendmonster/graphql-utils

## Client Module

### API

The simple way to generate apollo-client with jwt refresh token and authentication helpers.

| api                    | description |
| ---                    | ---         |
|`createApolloClient`    | create zero-config apollo-client with retriable-fetch.|
|`createRetriableFetch`  | create apollo-http-link fetch that refreshes token when jwt token is expired. |

```javascript
import { createApolloClient } from '@frontendmonster/graphql-utils/client';

const apolloClinet = createApolloClient({
    endpoint: 'http://localhost:3000/graphql',
    intialState: {},
    refreshTokenMutation: `graphqlMutationToRefreshToken($userId, $refreshToken) { token, refreshToken } `,
    resolvers: {},
    debug: isDev,
    storage: MyStorage,
    onLogin: (storage, cache, user, accessToken, refreshToken) => console.log(`${user} logged in let's save that on storage and update apollo-cache.`),
    onLogout: (storage, cache) => console.log('user logged out lets reset the apollo-cache and storage'),
  });
};
```

---

## Server Module

### graphql-errors

Extending [apollo-server-errors](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-errors)

* NotFoundError
* AlreadyExistedError
* ForbiddenError
* AlreadyAuthenticatedError
* UnknownError
* UserInputError
* ForbidenError
* AuthenticationError
* ValidationError

#### Usage

```javascript
import { NotFoundError } from '@frontendmonster/graphql-utils/server';

const resolvers = {
  user: (root, input, context) => {
    // ...
    if(user == null) {
      throw new NotFoundError('user'); // throws NOT_FOUND error with UserNotFound message
    }
    // ...
  }
}
```

### graphql-client

Simple graphql client for testing purpose.
You can inject mongodb models and redis instance.

#### Usage

1. Create a graphql-client instance with schema, mongoose models and redis client.
2. Use `instance.run(query)`;

#### GraphqlClient Instace Api

`run<T>:: (query, [user], [variables]) => Promise<T>`

arguments:

* `query`: graphql query
* `user`: will pass to query context for authorization purpos
* `variables`: query variables

#### Example

```javascript
import { GraphqlClient } from '@frontendmonster/graphql-utils/server';
import { schema, context } from './schema';

const graphqlClient = new GraphqlClient({ schema, context });

const query = `{
  hello
}`;

const result = await graphqlClient.run(query); // result.data.hello > 'world'

```
