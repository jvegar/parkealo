import { UserRepository } from '@parkealo/shared';
import { GetUsersQuery } from '../queries/get-users.query';
import { UserResponse } from '../responses/user.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(_query: GetUsersQuery): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserResponse.fromUser);
  }
}
