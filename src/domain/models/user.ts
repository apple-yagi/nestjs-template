import { Post } from './post';

export class User {
  readonly id?: string;

  readonly name: string;

  readonly email: string;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  readonly posts?: Post[];

  constructor({
    id,
    name,
    email,
    createdAt,
    updatedAt,
    posts,
  }: {
    id?: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    posts?: Post[];
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.posts = posts;
  }
}
