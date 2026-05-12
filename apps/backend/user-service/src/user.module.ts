import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
// import { UserService } from './domain/services/user.service';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { PasswordHasher, UserRepository, UserRegisteredEvent } from '@parkealo/shared';
import {
  PrismaUserRepository,
  EventDispatcher,
} from './infrastructure/persistence/prisma-user.repository';
import { PrismaClient } from 'apps/backend/user-service/generated/prisma/client';
import { prisma } from '../lib/prisma';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    // UserService,
    {
      provide: PrismaClient,
      useValue: prisma,
    },
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
