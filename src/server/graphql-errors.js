import { ApolloError } from 'apollo-server';

export { ForbiddenError, UserInputError } from 'apollo-server';

export class NotFoundError extends ApolloError {
  constructor(resource, info) {
    super(`${resource} not found`, 'NOT_FOUND', info);
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

export class AlreadyExistedError extends ApolloError {
  constructor(resource, info) {
    super(`${resource} already existed`, 'ALREADY_EXISTED', info);
    Object.defineProperty(this, 'name', { value: 'AlreadyExistedError' });
  }
}

export class AlreadyAuthenticatedError extends ApolloError {
  constructor(message, info) {
    super(message, 'ALREADY_AUTHENTICATED', info);
    Object.defineProperty(this, 'name', { value: 'AlreadyAuthenticatedError' });
  }
}

export class UnauthorizedError extends ApolloError {
  constructor(message, info) {
    super(message, 'UNAUTHORIZED', info);
    Object.defineProperty(this, 'name', { value: 'UnauthorizedError' });
  }
}

export class UnknownError extends ApolloError {
  constructor(message, info) {
    super(message, 'UNKNOWN', info);
    Object.defineProperty(this, 'name', { value: 'UnknownError' });
  }
}
