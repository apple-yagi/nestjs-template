import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { Task } from './task.model';
import { User as UserEntity } from 'domain/entities/user.entity';
import { Task as TaskEntity } from 'domain/entities/task.entity';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @OneToMany(
    () => Task,
    task => task.user,
    { cascade: true },
  )
  tasks: Task[];

  public toUserEntity(): UserEntity {
    return new UserEntity({
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tasks:
        this.tasks &&
        this.tasks.map(
          task =>
            new TaskEntity({
              id: task.id,
              title: task.title,
              description: task.description,
              done: task.done,
            }),
        ),
    });
  }
}
