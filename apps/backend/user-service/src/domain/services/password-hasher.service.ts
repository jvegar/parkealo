import * as bcrypt from 'bcrypt';

export class PasswordHasher {
  saltRounds = 10;

  async hash(rawPassword: string) {
    try {
      const hashedPassword = await bcrypt.hash(rawPassword, this.saltRounds);

      return hashedPassword;
    } catch (err) {
      console.log('Error hashing password:', err);
    }
  }
}
