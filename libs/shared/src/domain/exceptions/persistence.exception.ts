import { DomainException } from './domain.exception';

export class ConnectionStringNotFoundException extends DomainException {
  constructor() {
    super(
      'CONNECTION_STRING_NOT_FOUND',
      'Make sure your env. file exists and is properly configured',
      {},
    );
  }
}
