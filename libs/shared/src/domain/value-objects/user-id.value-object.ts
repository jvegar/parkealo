export class UserId {
  constructor(public readonly value: string) {}

  static random(): string {
    return crypto.randomUUID();
  }
}
