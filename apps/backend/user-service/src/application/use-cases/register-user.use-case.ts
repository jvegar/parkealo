import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsException } from '../../domain/exceptions/user.exception';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PasswordHasher } from '../../domain/services/password-hasher.service';
import { Email } from '../../domain/value-objects/email.value-object';
import { UserId } from '../../domain/value-objects/userid.value-object';
import { RegisterUserCommand } from '../commands/register-user.command';
import { RegisterUserResponse } from '../responses/register-user.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public async execute(command: RegisterUserCommand): Promise<RegisterUserResponse> {
    const emailVO = Email.create(command.email);
    const existingUser = await this.userRepository.findByEmail(emailVO);

    if (existingUser) {
      throw new UserAlreadyExistsException(command.email);
    }

    const hashedPassword = await this.passwordHasher.hash(command.rawPassword);
    const userId = UserId.random();

    const user = User.register(
      new UserId(userId),
      emailVO,
      command.firstName,
      command.lastName,
      command.phone,
      command.role,
      hashedPassword,
    );

    await this.userRepository.save(user);

    return new RegisterUserResponse(userId, command.email);
  }
}
