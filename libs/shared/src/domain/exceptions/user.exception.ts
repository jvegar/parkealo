import { DomainException } from './domain.exception';

export class UserAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super('USER_ALREADY_EXISTS', `User already exists with email: ${email}`, {
      email,
    });
  }
}

export class UserNotFoundException extends DomainException {
  constructor(identifier: string) {
    super('USER_NOT_FOUND', `User not found: ${identifier}`, {
      identifier,
    });
  }
}
