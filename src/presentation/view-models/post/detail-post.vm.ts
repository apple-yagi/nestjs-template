import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { Post } from 'domain/models/post';
import { UserVM } from '../user/user.vm';

export class DetailPostVM {
  @Expose()
  @ApiProperty({
    description: 'The id of the post',
    example: '64fa25f6-f618-4c85-9334-d5c853d7b816',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The title of the post',
    example: 'Title',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'The body of the post',
    example: 'This is body.',
  })
  body: string;

  @Expose()
  @ApiProperty({
    description: 'The user of the post',
  })
  user: UserVM;

  @Expose()
  @ApiProperty({ description: 'The crational date of the post' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'The date of the last post update' })
  updatedAt: Date;

  static toViewModel(post: Post): DetailPostVM {
    const userVM = UserVM.toViewModel(post.user);

    return plainToClass(
      DetailPostVM,
      { ...post, user: userVM },
      { excludeExtraneousValues: true },
    );
  }
}
