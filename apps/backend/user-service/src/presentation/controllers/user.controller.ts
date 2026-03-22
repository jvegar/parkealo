import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto, UserService } from '../../domain/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getData() {
    return this.userService.getData();
  }

  @Post()
  registerUser(@Body() user: UserDto) {
    return this.userService.registerUser(user);
  }
}
