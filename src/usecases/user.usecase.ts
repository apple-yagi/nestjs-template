import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from 'domain/models/user';
import { UserRepository } from 'domain/repositories/user.repository';

@Injectable()
export class UserUsecase {
  private readonly logger = new Logger(UserUsecase.name);

  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async getUserList() {
    this.logger.log('Find all users');

    return await this.userRepository.findAll();
  }

  async getUserById(id: string) {
    this.logger.log(`Find the user: ${id}`);

    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`The user {${id}} has not found.`);

    return user;
  }

  async createUser(user: User) {
    this.logger.log(`Saving a user`);
    return await this.userRepository.create(user);
  }
}
