export class Password {
  private constructor(public readonly value: string) {}

  static create(hash: string): Password {
    if (!hash) {
      throw new Error('Password cannot be empty');
    }

    return new Password(hash);
  }
}
