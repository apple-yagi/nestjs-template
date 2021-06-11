import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserVM } from 'presentation/view-models/user/create-user.vm';
import { UserUsecase } from 'usecases/user.usecase';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserVM } from 'presentation/view-models/user/user.vm';
import { NotFoundError } from 'presentation/errors/not-found.error';
import { BadRequestError } from 'presentation/errors/bad-request.error';
import { UnprocessableEntityError } from 'presentation/errors/unprocessable-entity.error';
import { DetailUserVM } from 'presentation/view-models/user/detail-user.vm';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  @Get()
  @Get()
  @ApiOperation({
    summary: 'Find all Users',
  })
  @ApiOkResponse({ description: 'Users founded', type: [UserVM] })
  async index(): Promise<UserVM[]> {
    const users = await this.userUsecase.getUserList();

    return users.map(user => UserVM.toViewModel(user));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a User by ID',
  })
  @ApiParam({
    name: 'Id',
    type: String,
    description: 'The user id',
  })
  @ApiOkResponse({ description: 'User founded.', type: DetailUserVM })
  @ApiNotFoundResponse({
    description: 'If the user not exists.',
    type: NotFoundError,
  })
  async show(@Param('id') id: string): Promise<DetailUserVM> {
    const user = await this.userUsecase.getUserById(id);

    return DetailUserVM.toViewModel(user);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a User',
  })
  @ApiCreatedResponse({ description: 'User created.', type: UserVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  async create(
    @Body(ValidationPipe) createUser: CreateUserVM,
  ): Promise<UserVM> {
    const user = await this.userUsecase.createUser(
      CreateUserVM.formViewModel(createUser),
    );

    return UserVM.toViewModel(user);
  }
}
