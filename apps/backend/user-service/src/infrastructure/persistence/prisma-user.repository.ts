import { PrismaClient } from 'apps/backend/user-service/generated/prisma/client';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserRegisteredEvent } from '../../domain/events/user-registered.event';
import { UserId } from '@parkealo/shared';
import { UserMapper } from '../../presentation/mappers/user.mapper';
import { Email } from '@parkealo/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventDispatcher<T> {
  dispatch(event: T): void {
    console.log('Event dispatched:', event);
  }
}

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly eventDispatcher: EventDispatcher<UserRegisteredEvent>,
  ) {
    super();
  }

  async save(user: User): Promise<void> {
    const data = UserMapper.toPersistance(user);

    // upsert: a single, atomic operation that updates a record if it exists or inserts a new one if it does not
    await this.prisma.user.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });

    const events = user.pullEvents();
    events.forEach((event) => this.eventDispatcher.dispatch(event));
  }

  async findById(id: UserId): Promise<User | null> {
    const userRecord = await this.prisma.user.findUnique({
      where: { id: id.value },
    });

    if (!userRecord) return null;

    return UserMapper.toDomain(userRecord);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userRecord = await this.prisma.user.findUnique({
      where: { email: email.value },
    });

    if (!userRecord) return null;

    return UserMapper.toDomain(userRecord);
  }
}
