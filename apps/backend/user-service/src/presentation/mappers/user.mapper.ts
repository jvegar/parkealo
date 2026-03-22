import { User as PrismaUser } from '../../../generated/prisma/client';
import { User, UserRole } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.value-object';
import { UserId } from '../../domain/value-objects/userid.value-object';

export class UserMapper {
  public static toPersistance(user: User): any {
    return {
      id: user.id.value,
      email: user.email.value,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
      role: user.role,
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
    );
  }
}
