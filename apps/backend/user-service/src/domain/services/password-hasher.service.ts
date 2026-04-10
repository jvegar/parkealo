import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PasswordHashingException } from '../exceptions/passwor-hasher.exception';

@Injectable()
export class PasswordHasher {
  saltRounds = 10;

  async hash(rawPassword: string) {
    try {
      const hashedPassword = await bcrypt.hash(rawPassword, this.saltRounds);

      return hashedPassword;
    } catch (err) {
      throw new PasswordHashingException();
    }
  }
}
