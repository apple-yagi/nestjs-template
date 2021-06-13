import { Factory } from 'typeorm-factory';
import { PostEntity } from '../entities/post.entity';
import { UserFactory } from './user.factory';

export const PostFactory = new Factory(PostEntity)
  .sequence('title', i => `title ${Math.random() * 100000}`)
  .sequence('body', i => `text ${Math.random() * 100000}`)
  .assocOne('user', UserFactory);
