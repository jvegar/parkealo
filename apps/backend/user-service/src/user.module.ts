import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './domain/services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
