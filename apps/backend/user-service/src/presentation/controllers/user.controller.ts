import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterUserRequestDTO } from '../dto/register-user.request.dto';
import { RegisterUserResponse } from '../../application/responses/register-user.response';

@Controller('users')
export class UserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @HttpCode(201)
  @Post()
  async register(@Body() dto: RegisterUserRequestDTO): Promise<RegisterUserResponse> {
    return this.registerUserUseCase.execute(dto);
  }
}
