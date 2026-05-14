import { UserId, UserNotFoundException } from '@parkealo/shared';
import { GetUserByIdQuery } from '@user-service/application/queries';
import { UserResponse } from '@user-service/application/responses';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@user-service/domain/repositories';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(query: GetUserByIdQuery): Promise<UserResponse> {
    const id = new UserId(query.userId);
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(query.userId);
    }

    return UserResponse.fromUser(user);
  }
}
