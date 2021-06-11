import { Injectable } from '@nestjs/common';
import { Post } from 'domain/models/post';
import { PostRepository } from 'domain/repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { BaseRepositoryImpl } from './base.repositoryImpl';

@Injectable()
export class PostRepositoryImpl extends BaseRepositoryImpl
  implements PostRepository {
  findAll(): Promise<Post[]> {
    return this.manager.find(PostEntity);
  }

  async findById(id: string): Promise<Post | null> {
    const postEntity = await this.manager.findOne(PostEntity, id, {
      relations: ['user'],
    });

    if (!postEntity) return null;

    return postEntity;
  }

  async create(post: Post): Promise<Post> {
    const insertResult = await this.queryBuilder
      .insert()
      .into(PostEntity)
      .values(post)
      .execute();

    return insertResult.generatedMaps[0] as Post;
  }
}
