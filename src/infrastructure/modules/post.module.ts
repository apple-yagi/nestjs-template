import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'infrastructure/database/entities/post.entity';
import { PostRepositoryImpl } from 'infrastructure/database/repositories/post.repositoryImpl';
import { PostController } from 'presentation/controllers/post.controller';
import { PostUsecase } from 'usecases/post.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [
    PostUsecase,
    { provide: 'PostRepository', useClass: PostRepositoryImpl },
  ],
})
export class PostModule {}
