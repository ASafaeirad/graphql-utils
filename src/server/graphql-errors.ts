import { ApolloError } from 'apollo-server';

export { ForbiddenError, UserInputError } from 'apollo-server';

export class NotFoundError extends ApolloError {
  constructor(resource: string, properties?: Record<string, any>) {
    super(`${resource} not found`, 'NOT_FOUND', properties);
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

export class AlreadyExistedError extends ApolloError {
  constructor(resource: string, properties?: Record<string, any>) {
    super(`${resource} already existed`, 'ALREADY_EXISTED', properties);
    Object.defineProperty(this, 'name', { value: 'AlreadyExistedError' });
  }
}

export class AlreadyAuthenticatedError extends ApolloError {
  constructor(message = 'AlreadyAuthenticatedError', properties?: Record<string, any>) {
    super(message, 'ALREADY_AUTHENTICATED', properties);
    Object.defineProperty(this, 'name', { value: 'AlreadyAuthenticatedError' });
  }
}

export class UnknownError extends ApolloError {
  constructor(message = 'UnknownError', properties?: Record<string, any>) {
    super(message, 'UNKNOWN', properties);
    Object.defineProperty(this, 'name', { value: 'UnknownError' });
  }
}
