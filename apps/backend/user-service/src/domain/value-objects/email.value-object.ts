import { InvalidEmailException } from '../exceptions/value-object.exception';

export class Email {
  constructor(public readonly value: string) {}

  static create(email: string): Email {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      throw new InvalidEmailException(email);
    }

    return new Email(email.toLowerCase());
  }
}
