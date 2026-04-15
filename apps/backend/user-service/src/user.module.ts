import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
// import { UserService } from './domain/services/user.service';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { PasswordHasher } from '@parkealo/shared';
import { UserRepository } from './domain/repositories/user.repository';
import {
  PrismaUserRepository,
  EventDispatcher,
} from './infrastructure/persistence/prisma-user.repository';
import { PrismaClient } from 'apps/backend/user-service/generated/prisma/client';
import { UserRegisteredEvent } from './domain/events/user-registered.event';
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
  ],
})
export class UserModule {}
