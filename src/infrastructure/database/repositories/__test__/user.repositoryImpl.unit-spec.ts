import { UserRepository } from 'domain/repositories/user.repository';
import * as config from 'infrastructure/database/config/ormconfig.testing';
import { UserEntity } from 'infrastructure/database/entities/user.entity';
import { UserFactory } from 'infrastructure/database/factories/user.factory';
import { Connection, createConnection } from 'typeorm';
import { UserRepositoryImpl } from '../user.repositoryImpl';

describe('UserRepositoryImpl Database', () => {
  let userRepository: UserRepository;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection(config);
    userRepository = new UserRepositoryImpl(connection);
  });

  afterAll(async () => {
    await connection.createQueryRunner().manager.query(`DELETE FROM posts`);
    await connection.createQueryRunner().manager.query(`DELETE FROM users`);
    await connection.close();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const createdUserEntities = await UserFactory.createList(1);
      const expectedUsers = createdUserEntities.map(userEntity =>
        UserEntity.toUser(userEntity),
      );

      const actualUsers = await userRepository.findAll();

      expect(actualUsers).toEqual(expectedUsers);
    });
  });
});
