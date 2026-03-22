import { UserRole } from '../entities/user.entity';

export class UserRegisteredEvent {
  public readonly occurredOn: Date;
  public readonly eventId: string;
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phone: string,
    public readonly isVerified: boolean,
    public readonly role: UserRole,
    public readonly hashedPassword: string,
  ) {
    this.occurredOn = new Date();
    this.eventId = crypto.randomUUID();
  }
}
