import { UserRole } from '@parkealo/shared';

export class UserResponse {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly fullName: string,
    public readonly phone: string,
    public readonly isVerified: boolean,
    public readonly role: UserRole,
  ) {}

  static fromUser(user: {
    id: { value: string };
    email: { value: string };
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
    isVerified: boolean;
    role: UserRole;
  }): UserResponse {
    return new UserResponse(
      user.id.value,
      user.email.value,
      user.firstName,
      user.lastName,
      user.fullName,
      user.phone,
      user.isVerified,
      user.role,
    );
  }
}
