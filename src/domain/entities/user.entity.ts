import { Task } from './task.entity';

export class User {
  readonly id?: string;

  readonly name: string;

  readonly email: string;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  readonly tasks?: Task[];

  constructor({
    id,
    name,
    email,
    createdAt,
    updatedAt,
    tasks,
  }: {
    id?: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    tasks?: Task[];
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tasks = tasks;
  }
}
