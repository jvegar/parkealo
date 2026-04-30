import { AggregateRoot } from '../common/aggregate-root';
import { UserRole } from '../enums/user-role.enum';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { Email } from '../value-objects/email.value-object';
import { UserId } from '../value-objects/user-id.value-object';

export class User extends AggregateRoot<UserId, UserRegisteredEvent> {
  private constructor(
    id: UserId,
    private readonly _email: Email,
    private _firstName: string,
    private _lastName: string,
    private _phone: string,
    private _isVerified: boolean = false,
    private _role: UserRole,
    private _hashedPassword: string,
  ) {
    super(id);
  }

  public static register(
    id: UserId,
    email: Email,
    firstName: string,
    lastName: string,
    phone: string,
    role: UserRole,
    hashedPassword: string,
  ): User {
    if (!firstName || !lastName) {
      throw new Error('User names are required for registration.');
    }

    const user = new User(
      id,
      email,
      firstName,
      lastName,
      phone,
      false,
      role,
      hashedPassword,
    );

    user.recordEvent(
      new UserRegisteredEvent(
        user.id.value,
        user.email.value,
        user.firstName,
        user.lastName,
        user.phone,
        user.isVerified,
        user.role,
        user.hashedPassword,
        '',
      ),
    );
    return user;
  }

  public get email(): Email {
    return this._email;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get phone(): string {
    return this._phone;
  }

  public get isVerified(): boolean {
    return this._isVerified;
  }

  public get role(): UserRole {
    return this._role;
  }

  public get hashedPassword(): string {
    return this._hashedPassword;
  }

  public verifyEmail(): void {
    this._isVerified = true;
  }

  public get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  public static rehydrate(
    userId: UserId,
    email: Email,
    firstName: string,
    lastName: string,
    phone: string,
    isVerified: boolean,
    role: UserRole,
    hashedPassword: string,
  ): User {
    return new User(
      userId,
      email,
      firstName,
      lastName,
      phone,
      isVerified,
      role,
      hashedPassword,
    );
  }
}
