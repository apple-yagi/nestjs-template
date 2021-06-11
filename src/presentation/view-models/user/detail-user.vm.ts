import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { User } from 'domain/models/user';
import { PostVM } from '../post/post.vm';

export class DetailUserVM {
  @Expose()
  @ApiProperty({
    description: 'The id of the user',
    example: '64fa25f6-f618-4c85-9334-d5c853d7b816',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The unique email of the user',
    example: 'john.doe@gmail.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'The posts of the user',
  })
  posts: PostVM[];

  @Expose()
  @ApiProperty({ description: 'The crational date of the user' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'The date of the last user update' })
  updatedAt: Date;

  static toViewModel(user: User): DetailUserVM {
    const postsVM = user.posts.map(post => PostVM.toViewModel(post));

    return plainToClass(
      DetailUserVM,
      { ...user, posts: postsVM },
      { excludeExtraneousValues: true },
    );
  }
}
