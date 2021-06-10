import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserVM } from 'presentation/view-models/create-user.vm';
import { User } from 'domain/entities/user.entity';
import { UserUseCase } from 'usecases/user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly userUsecase: UserUseCase) {}

  @Get()
  index(): Promise<User[]> {
    return this.userUsecase.getUserList();
  }

  @Post()
  create(@Body(ValidationPipe) createUserVM: CreateUserVM) {
    return this.userUsecase.createUser(CreateUserVM.toUserEntity(createUserVM));
  }
}
