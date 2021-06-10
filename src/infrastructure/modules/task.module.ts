import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'infrastructure/database/models/task.model';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [],
  providers: [],
})
export class TaskModule {}
