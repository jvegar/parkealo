import { GetUsersQuery } from '@user-service/application/queries';
import { UserResponse } from '@user-service/application/responses';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@user-service/domain/repositories';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(_query: GetUsersQuery): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserResponse.fromUser);
  }
}
