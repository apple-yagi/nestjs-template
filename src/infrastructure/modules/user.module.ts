import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'presentation/controllers/user.controller';
import { UserUseCase } from 'usecases/user.usecase';
import { User } from '../database/models/user.model';
import { UserRepositoryImpl } from '../database/repositories/user.repositoryImpl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserUseCase,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
