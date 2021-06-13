import { Factory } from 'typeorm-factory';
import { UserEntity } from '../entities/user.entity';

export const UserFactory = new Factory(UserEntity)
  .sequence('name', i => `John ${Math.random() * 100000}`)
  .sequence('email', i => `john.doe${Math.random() * 100000}@gmail.com`);
