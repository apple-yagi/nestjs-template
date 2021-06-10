import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';
import { User as UserEntity } from 'domain/entities/user.entity';
import { Task as TaskEntity } from 'domain/entities/task.entity';

@Entity()
export class Task {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('boolean', { default: () => false })
  done: boolean;

  @Column()
  userId: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @ManyToOne(
    () => User,
    user => user.tasks,
  )
  @JoinColumn({ name: 'userId' })
  readonly user?: User;

  public toTaskEntity(): TaskEntity {
    return new TaskEntity({
      id: this.id,
      title: this.title,
      description: this.description,
      done: this.done,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: new UserEntity({
        id: this.user.id,
        name: this.user.name,
        email: this.user.name,
      }),
    });
  }
}
