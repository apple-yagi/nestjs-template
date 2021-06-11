import { Post } from 'domain/models/post';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post>;
  create(post: Post): Promise<Post>;
}
