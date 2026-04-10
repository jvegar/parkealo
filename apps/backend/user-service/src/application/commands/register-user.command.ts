import { UserRole } from '../../domain/enums/user-role.enum';

export class RegisterUserCommand {
  constructor(
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phone: string,
    public readonly role: UserRole,
    public readonly rawPassword: string,
  ) {}
}
