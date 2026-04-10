export abstract class DomainException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly metadata?: Record<string, any>,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
