import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '@adapters/api/decorator/current-user.decorator';
import { JwtAuthGuard } from '@adapters/api/guards/jwt-auth.guard';
import { LoginMapper } from '@adapters/api/mapper/login.mapper';
import { ProfileMapper } from '@adapters/api/mapper/profile.mapper';
import { UserMapper } from '@adapters/api/mapper/user.mapper';
import { CreateUserRequest } from '@adapters/api/request/create-user.request';
import { ProfileRequest } from '@adapters/api/request/profile.request';
import { LoginResponse } from '@adapters/api/response/create-user.response';
import { User } from '@core/domain/model/User';
import { CreateUserUseCase } from '@core/usecases/create-user.use-case';
import { LoginUseCase } from '@core/usecases/login.use-case';

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

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOkResponse({
    description: 'User profile retrieved successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access',
  })
  getMe(@CurrentUser() user: ProfileRequest): ProfileRequest {
    return ProfileMapper.fromDomain(user);
  }
}
