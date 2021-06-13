import { Injectable } from '@nestjs/common';
import { Post } from 'domain/models/post';
import { PostRepository } from 'domain/repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { BaseRepositoryImpl } from './base.repositoryImpl';

@Injectable()
export class PostRepositoryImpl extends BaseRepositoryImpl
  implements PostRepository {
  async findAll(): Promise<Post[]> {
    const postEntities = await this.manager.find(PostEntity, {
      relations: ['user'],
    });

    return postEntities.map(postEntity => PostEntity.toPost(postEntity));
  }

  async findById(id: string): Promise<Post | null> {
    const postEntity = await this.manager.findOne(PostEntity, id, {
      relations: ['user'],
    });

    if (!postEntity) return null;

    return PostEntity.toPost(postEntity);
  }

  async create(post: Post): Promise<Post> {
    const insertResult = await this.queryBuilder
      .insert()
      .into(PostEntity)
      .values(post)
      .execute();

    return PostEntity.toPost(insertResult.generatedMaps[0] as PostEntity);
  }
}
