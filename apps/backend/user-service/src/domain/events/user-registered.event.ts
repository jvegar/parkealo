import { DomainEvent } from '../common/aggregate-root';
import { UserRole } from '../enums/user-role.enum';

export class UserRegisteredEvent implements DomainEvent {
  public readonly occurredAt: Date;
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
    public readonly eventType: string,
  ) {
    this.occurredAt = new Date();
    this.eventId = crypto.randomUUID();
  }
}
