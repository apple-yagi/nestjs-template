import { User } from './user.entity';

export class Task {
  readonly id?: string;

  readonly title: string;

  readonly description: string;

  readonly done?: boolean;

  readonly userId?: string;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  readonly user?: User;

  constructor({
    id,
    title,
    description,
    done,
    userId,
    createdAt,
    updatedAt,
    user,
  }: {
    id?: string;
    title: string;
    description: string;
    done?: boolean;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }
}
