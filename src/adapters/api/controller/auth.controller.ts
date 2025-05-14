import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../core/usecases/create-user.use-case';
import { LoginUseCase } from '../../../core/usecases/login.use-case';
import { CreateUserRequest } from '../request/create-user.request';
import { User } from '../../../core/domain/model/User';
import { UserMapper } from '../mapper/user.mapper';
import { LoginMapper } from '../mapper/login.mapper';
import { LoginResponse } from '../response/create-user.response';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Controller('/auth')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'User successfully registered',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or validation error',
  })
  @ApiConflictResponse({
    description: 'User already exists or registration failed due to conflict',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async register(@Body() body: CreateUserRequest): Promise<User> {
    const command = UserMapper.toDomain(body);
    return this.createUserUseCase.execute(command);
  }

  @Post('/login')
  @ApiCreatedResponse({
    description: 'User successfully logged in',
    type: LoginResponse,
  })
  @ApiNotFoundResponse({
    description: 'User not found or invalid credentials',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async login(@Body() body: CreateUserRequest): Promise<LoginResponse> {
    const command = UserMapper.toDomain(body);
    const token = await this.loginUseCase.execute(command);
    return LoginMapper.fromDomain(token);
  }
}
