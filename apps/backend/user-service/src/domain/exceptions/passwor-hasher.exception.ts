import { DomainException } from './domain.exception';

export class PasswordHashingException extends DomainException {
  constructor() {
    super(
      'PASSWORD_HASHING_ERROR',
      'There was an error when hashing password',
      {},
    );
  }
}
