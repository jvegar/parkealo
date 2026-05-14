import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { PasswordHasher, UserRegisteredEvent } from '@parkealo/shared';
import {
  PrismaUserRepository,
  EventDispatcher,
} from './infrastructure/persistence/prisma-user.repository';
import { PrismaService } from './infrastructure/persistence/prisma.service';
import { UserRepository } from './domain/repositories';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: EventDispatcher,
      useFactory: () => new EventDispatcher<UserRegisteredEvent>(),
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PasswordHasher,
    RegisterUserUseCase,
    GetUserByIdUseCase,
    GetUsersUseCase,
  ],
})
export class UserModule {}
