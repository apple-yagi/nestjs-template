import { Post } from 'domain/models/post';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @ManyToOne(
    () => UserEntity,
    user => user.posts,
  )
  @JoinColumn({ name: 'userId' })
  readonly user?: UserEntity;

  static toPost(postEntity: PostEntity): Post {
    const user = postEntity.user ?? UserEntity.toUser(postEntity.user);
    return new Post({ ...postEntity, user: user });
  }
}
