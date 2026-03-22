import { Injectable } from '@nestjs/common';
import { prisma } from '../../../lib/prisma';
import { UserRole } from '../entities/user.entity';

export type UserDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: UserRole;
};

@Injectable()
export class UserService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  registerUser(userDto: UserDto): any {
    console.log(userDto);
    const user = prisma.user.create({
      data: {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        phone: userDto.phone,
        isVerified: userDto.isVerified,
        role: userDto.role,
      },
    });

    return user;
  }
}
