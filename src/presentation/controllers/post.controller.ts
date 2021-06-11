import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PostUsecase } from 'usecases/post.usecase';
import { CreatePostVM } from 'presentation/view-models/post/create-post.vm';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PostVM } from 'presentation/view-models/post/post.vm';
import { NotFoundError } from 'presentation/errors/not-found.error';
import { BadRequestError } from 'presentation/errors/bad-request.error';
import { UnprocessableEntityError } from 'presentation/errors/unprocessable-entity.error';
import { DetailPostVM } from 'presentation/view-models/post/detail-post.vm';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postUsecase: PostUsecase) {}

  @Get()
  @ApiOperation({
    summary: 'Find all Posts',
  })
  @ApiOkResponse({ description: 'Posts founded', type: [PostVM] })
  async index(): Promise<PostVM[]> {
    const posts = await this.postUsecase.getPostList();

    return posts.map(post => PostVM.toViewModel(post));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a Post by ID',
  })
  @ApiParam({
    name: 'Id',
    type: String,
    description: 'The post id',
  })
  @ApiOkResponse({ description: 'Post founded.', type: DetailPostVM })
  @ApiNotFoundResponse({
    description: 'If the post not exists.',
    type: NotFoundError,
  })
  async show(@Param('id') id: string): Promise<DetailPostVM> {
    const post = await this.postUsecase.getPostById(id);

    return DetailPostVM.toViewModel(post);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a Post',
  })
  @ApiCreatedResponse({ description: 'User created.', type: PostVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating post',
    type: UnprocessableEntityError,
  })
  async create(
    @Body(ValidationPipe) createPost: CreatePostVM,
  ): Promise<PostVM> {
    const post = await this.postUsecase.createPost(
      CreatePostVM.formViewModel(createPost),
    );

    return PostVM.toViewModel(post);
  }
}
