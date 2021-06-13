import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Post } from 'domain/models/post';

export class CreatePostVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the post',
    example: 'Title',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The body of the post',
    example: 'This is body.',
  })
  body: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The user id of the post',
    example: '64fa25f6-f618-4c85-9334-d5c853d7b816',
  })
  userId: string;

  static formViewModel(vm: CreatePostVM): Post {
    return new Post({
      title: vm.title,
      body: vm.body,
      userId: vm.userId,
    });
  }
}
