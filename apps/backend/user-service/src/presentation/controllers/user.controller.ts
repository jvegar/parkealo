import { Body, Controller, Post, Get, Param, HttpCode } from '@nestjs/common';
import {
  GetUserByIdUseCase,
  GetUsersUseCase,
  RegisterUserUseCase,
} from '@user-service/application/use-cases';

import {
  RegisterUserResponse,
  UserResponse,
} from '@user-service/application/responses';
import { RegisterUserRequestDTO } from '@user-service/presentation/dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @HttpCode(201)
  @Post()
  async register(
    @Body() dto: RegisterUserRequestDTO,
  ): Promise<RegisterUserResponse> {
    return this.registerUserUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    return this.getUsersUseCase.execute({});
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponse> {
    return this.getUserByIdUseCase.execute({ userId: id });
  }
}
