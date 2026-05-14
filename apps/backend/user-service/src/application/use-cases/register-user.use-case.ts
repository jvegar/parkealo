import {
  UserAlreadyExistsException,
  PasswordHasher,
  Email,
  UserId,
} from '@parkealo/shared';
import { Injectable } from '@nestjs/common';
import { User } from '@user-service/domain/aggregates';
import { UserRepository } from '@user-service/domain/repositories';
import { RegisterUserCommand } from '@user-service/application/commands';
import { RegisterUserResponse } from '@user-service/application/responses';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public async execute(
    command: RegisterUserCommand,
  ): Promise<RegisterUserResponse> {
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
