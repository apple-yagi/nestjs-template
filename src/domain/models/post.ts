import { User } from './user';

export class Post {
  readonly id?: string;

  readonly title: string;

  readonly description: string;

  readonly userId?: string;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  readonly user?: User;

  constructor({
    id,
    title,
    description,
    userId,
    createdAt,
    updatedAt,
    user,
  }: {
    id?: string;
    title: string;
    description: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }
}
