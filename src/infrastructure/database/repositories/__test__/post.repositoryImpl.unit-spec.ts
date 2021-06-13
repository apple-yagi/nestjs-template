import { PostRepository } from 'domain/repositories/post.repository';
import * as config from 'infrastructure/database/config/ormconfig.testing';
import { PostEntity } from 'infrastructure/database/entities/post.entity';
import { PostFactory } from 'infrastructure/database/factories/post.factory';
import { PostRepositoryImpl } from 'infrastructure/database/repositories/post.repositoryImpl';
import { Connection, createConnection } from 'typeorm';

describe('PostRepositoryImpl Database', () => {
  let postRepository: PostRepository;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection(config);
    postRepository = new PostRepositoryImpl(connection);
  });

  afterAll(async () => {
    await connection.createQueryRunner().manager.query(`DELETE FROM posts`);
    await connection.createQueryRunner().manager.query(`DELETE FROM users`);
    await connection.close();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const createdPostEntities = await PostFactory.createList(1);
      const expectedPosts = createdPostEntities.map(postEntity =>
        PostEntity.toPost(postEntity),
      );

      const actualPosts = await postRepository.findAll();

      expect(actualPosts).toEqual(expectedPosts);
    });
  });
});
