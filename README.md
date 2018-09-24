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

## Server Module

### ALC Resolvers

ALC-Resolvers Provides a pattern for creating access controll based resolvers.

| api                         | description |
| ---                         | ---         |
|`isAuthenticatedResolver`    | is an [apollo-resover](https://github.com/thebigredgeek/apollo-resolvers) that throw error when `context.user` promise get rejected or resolving object w/o id field |
|`isNotAuthenticatedResolver` | is an [apollo-resover](https://github.com/thebigredgeek/apollo-resolvers) that throw error when `context.user` promise resolving with id field |
|`shoudAuthenticatedResolver` | is an [apollo-resover](https://github.com/thebigredgeek/apollo-resolvers) that check `context.user` promise add it to `context.user` if user exist |

### usage

```javascript
import { isAuthenticatedResolver } from '@frontendmonster/graphql-utils/server';

const context = (req) => {
  const user = req.user
    ? User.findById(req.user.id)
    : Promise.resolve(null);
}

const profile = isAuthenticatedResolver.createResolver(
  (root, input, context) => // resolver profile
  (root, input, context, error) => // handle errors,
);


const resolvers = {
  profile
}
```

### graphql-errors

Extending [apollo-server-errors](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-errors)

* ForbiddenError
* UserInputError
* NotFoundError
* AlreadyExistedError
* AlreadyAuthenticatedError
* UnauthorizedError
* UnknownError

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

### graphql-import

Import graphql definitions from _.graphql_ files.

#### Usage

```javascript
import { importSchema } from '@frontendmonster/graphl-utils/server';

const typeDefs = importSchema('./schema.graphql');
```

Assume the following directory structure:

```
.
└── schema.graphql
```
