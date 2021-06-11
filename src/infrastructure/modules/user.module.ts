import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'presentation/controllers/user.controller';
import { UserUsecase } from 'usecases/user.usecase';
import { UserEntity } from '../database/entities/user.entity';
import { UserRepositoryImpl } from '../database/repositories/user.repositoryImpl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserUsecase,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
