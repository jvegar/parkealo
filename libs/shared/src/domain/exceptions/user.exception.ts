import { DomainException } from './domain.exception';

export class UserAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super('USER_ALREADY_EXISTS', `User already exists with email: ${email}`, {
      email,
    });
  }
}
