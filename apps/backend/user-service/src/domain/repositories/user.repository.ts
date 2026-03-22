import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.value-object';
import { UserId } from '../value-objects/userid.value-object';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
}
