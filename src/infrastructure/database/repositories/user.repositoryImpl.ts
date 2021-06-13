import { Injectable } from '@nestjs/common';
import { User } from 'domain/models/user';
import { UserRepository } from 'domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { BaseRepositoryImpl } from './base.repositoryImpl';

@Injectable()
export class UserRepositoryImpl extends BaseRepositoryImpl
  implements UserRepository {
  async findAll(): Promise<User[]> {
    const userEntities = await this.manager.find(UserEntity);

    return userEntities.map(userEntity => UserEntity.toUser(userEntity));
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.manager.findOne(UserEntity, id, {
      relations: ['posts'],
    });

    if (!userEntity) return null;

    return UserEntity.toUser(userEntity);
  }

  async create(user: User): Promise<User> {
    const insertResult = await this.queryBuilder
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();

    return UserEntity.toUser(insertResult.generatedMaps[0] as UserEntity);
  }
}
