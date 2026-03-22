import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PasswordHasher } from '../../domain/services/password-hasher.service';
import { Email } from '../../domain/value-objects/email.value-object';
import { UserId } from '../../domain/value-objects/userid.value-object';
import { RegisterUserCommand } from '../commands/register-user.command';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public async execute(command: RegisterUserCommand): Promise<void> {
    const emailVO = new Email(command.email);
    const existingUser = await this.userRepository.findByEmail(emailVO);

    if (existingUser) {
      throw new Error('User already exists with this email.');
    }

    const hashedPassword = await this.passwordHasher.hash(command.rawPassword);

    const user = User.register(
      new UserId(UserId.random()),
      new Email(command.email),
      command.firstName,
      command.lastName,
      command.phone,
      command.role,
      hashedPassword,
    );

    await this.userRepository.save(user);
  }
}
