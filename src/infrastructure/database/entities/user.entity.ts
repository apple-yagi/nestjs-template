import { User } from 'domain/models/user';
import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @OneToMany(
    () => PostEntity,
    post => post.user,
    { cascade: true },
  )
  posts: PostEntity[];

  static toUser(userEntity: UserEntity): User {
    const posts = userEntity.posts
      ? userEntity.posts.map(postEntity => PostEntity.toPost(postEntity))
      : [];

    return new User({ ...userEntity, posts: posts });
  }
}
