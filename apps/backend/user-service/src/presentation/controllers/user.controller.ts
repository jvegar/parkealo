import { Body, Controller, Post, Get, Param, HttpCode } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { RegisterUserRequestDTO } from '../dto/register-user.request.dto';
import { RegisterUserResponse } from '../../application/responses/register-user.response';
import { UserResponse } from '../../application/responses/user.response';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @HttpCode(201)
  @Post()
  async register(@Body() dto: RegisterUserRequestDTO): Promise<RegisterUserResponse> {
    return this.registerUserUseCase.execute(dto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponse> {
    return this.getUserByIdUseCase.execute({ userId: id });
  }
}
