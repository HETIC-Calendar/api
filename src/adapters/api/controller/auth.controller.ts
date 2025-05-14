import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../core/usecases/create-user.use-case';
import { LoginUseCase } from '../../../core/usecases/login.use-case';
import { CreateUserRequest } from '../request/create-user.request';
import { User } from '../../../core/domain/model/User';
import { UserMapper } from '../mapper/user.mapper';
import { LoginMapper } from '../mapper/login.mapper';
import { LoginResponse } from '../response/create-user.response';

@Controller('/auth')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserRequest): Promise<User> {
    const command = UserMapper.toDomain(body);
    return this.createUserUseCase.execute(command);
  }

  @Post('/login')
  async login(@Body() body: CreateUserRequest): Promise<LoginResponse> {
    const command = UserMapper.toDomain(body);
    const token = await this.loginUseCase.execute(command);
    return LoginMapper.fromDomain(token);
  }
}
