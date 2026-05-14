import { User } from '@user-service/domain/aggregates';
import { User as PrismaUser } from '../../../generated/prisma/client';
import { UserRole, Email, UserId } from '@parkealo/shared';

export class UserMapper {
  public static toPersistance(user: User): any {
    return {
      id: user.id.value,
      email: user.email.value,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isVerified: user.isVerified,
      role: user.role,
      hashedPassword: user.hashedPassword,
    };
  }

  public static toDomain(raw: PrismaUser): User {
    return User.rehydrate(
      new UserId(raw.id),
      new Email(raw.email),
      raw.firstName,
      raw.lastName,
      raw.phone,
      raw.isVerified,
      raw.role as UserRole,
      raw.hashedPassword,
    );
  }
}
