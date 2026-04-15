import { User } from '../entities/user.entity';
import { Email } from '@parkealo/shared';
import { UserId } from '@parkealo/shared';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findById(id: UserId): Promise<User | null>;
  abstract findByEmail(email: Email): Promise<User | null>;
}
