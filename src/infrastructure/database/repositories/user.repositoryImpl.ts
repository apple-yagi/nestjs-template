import { Injectable } from '@nestjs/common';
import { User as UserEntity } from 'domain/entities/user.entity';
import { UserRepository } from 'domain/repositories/user.repository';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { User as UserModel } from '../models/user.model';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private queryBuilder: SelectQueryBuilder<any>;

  constructor(private connection: Connection) {
    this.queryBuilder = connection.createQueryBuilder();
  }

  async findAll(): Promise<UserEntity[]> {
    const userModels = await this.queryBuilder
      .select('user')
      .from(UserModel, 'user')
      .leftJoin('user.tasks', 'task')
      .getMany();

    console.log(userModels);
    return userModels.map(um => um.toUserEntity());
  }

  async findById(id: string): Promise<UserEntity | null> {
    const userModel = await this.queryBuilder
      .select('user')
      .from(UserModel, 'user')
      .leftJoin('post.userId', 'user.id')
      .where('user.id = :id', { id: id })
      .getOne();

    if (!userModel) return null;

    return userModel.toUserEntity();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userModel = await this.queryBuilder
      .insert()
      .into(UserModel)
      .values(user)
      .execute();

    return userModel.generatedMaps[0] as UserEntity;
  }
}
