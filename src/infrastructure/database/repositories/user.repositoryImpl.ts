import { Injectable } from '@nestjs/common';
import { User } from 'domain/models/user';
import { UserRepository } from 'domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { BaseRepositoryImpl } from './base.repositoryImpl';

@Injectable()
export class UserRepositoryImpl extends BaseRepositoryImpl
  implements UserRepository {
  findAll(): Promise<User[]> {
    return this.manager.find(UserEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.manager.findOne(UserEntity, id, {
      relations: ['posts'],
    });

    if (!userEntity) return null;

    return userEntity;
  }

  async create(user: User): Promise<User> {
    const insertResult = await this.queryBuilder
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();

    return insertResult.generatedMaps[0] as User;
  }
}
