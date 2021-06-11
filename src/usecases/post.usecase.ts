import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Post } from 'domain/models/post';
import { PostRepository } from 'domain/repositories/post.repository';

@Injectable()
export class PostUsecase {
  private readonly logger = new Logger(PostUsecase.name);

  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async getPostList() {
    this.logger.log('Find all posts');

    return await this.postRepository.findAll();
  }

  async getPostById(id: string) {
    this.logger.log(`Find the post: ${id}`);

    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException(`The post {${id}} has not found.`);

    return post;
  }

  async createPost(post: Post) {
    this.logger.log(`Saving a post`);
    return await this.postRepository.create(post);
  }
}
