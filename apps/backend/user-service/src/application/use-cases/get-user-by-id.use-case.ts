import { UserRepository, UserId, UserNotFoundException } from '@parkealo/shared';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import { UserResponse } from '../responses/user.response';
import { Injectable } from '@nestjs/common';

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
