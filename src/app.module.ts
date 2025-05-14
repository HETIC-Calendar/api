import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma/prisma.service';

// Controllers
import { HelloWorldController } from './adapters/api/controller/hello-world.controller';
import { RoomController } from './adapters/api/controller/room.controller';
import { UserController } from './adapters/api/controller/auth.controller';
import { TalkController } from './adapters/api/controller/talk.controller';

// Repositories & Services
import { RoomRepository } from './core/domain/repository/room.repository';
import { PrismaRoomRepository } from './adapters/prisma/prisma-room.repository';
import { UserRepository } from './core/domain/repository/user.repository';
import { PrismaUserRepository } from './adapters/prisma/prisma-user.repository';
import { TalkRepository } from './core/domain/repository/talk.repository';
import { JwtServiceAdapter } from './adapters/jwt/jwt.service';
import { PrismaTalkRepository } from './adapters/prisma/prisma-talk.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './core/domain/service/token.service';

// Use Cases
import { HelloWorldUseCase } from './core/usecases/hello-world.use-case';
import { CreateRoomUseCase } from './core/usecases/create-room.use-case';
import { GetAllRoomsUseCase } from './core/usecases/get-all-rooms.use-case';
import { CreateTalkUseCase } from './core/usecases/create-talk.use-case';
import { CreateUserUseCase } from './core/usecases/create-user.use-case';
import { LoginUseCase } from './core/usecases/login.use-case';

@Module({
  imports: [JwtModule.register({})],
  controllers: [
    HelloWorldController,
    RoomController,
    UserController,
    TalkController,
  ],
  providers: [
    PrismaService,
    JwtService,
    {
      provide: 'TokenService',
      useFactory: (jwtService: JwtService) => new JwtServiceAdapter(jwtService),
      inject: [JwtService],
    },
    {
      provide: RoomRepository,
      useFactory: (prisma: PrismaService) => new PrismaRoomRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: TalkRepository,
      useFactory: (prisma: PrismaService) => new PrismaTalkRepository(prisma),
    },
    {
      provide: UserRepository,
      useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: HelloWorldUseCase,
      useFactory: () => new HelloWorldUseCase(),
    },
    {
      provide: CreateRoomUseCase,
      useFactory: (roomRepository: RoomRepository) =>
        new CreateRoomUseCase(roomRepository),
      inject: [RoomRepository],
    },
    {
      provide: GetAllRoomsUseCase,
      useFactory: (roomRepository: RoomRepository) =>
        new GetAllRoomsUseCase(roomRepository),
      inject: [RoomRepository],
    },
    {
      provide: CreateTalkUseCase,
      useFactory: (
        talkRepository: TalkRepository,
        roomRepository: RoomRepository,
      ) => new CreateTalkUseCase(talkRepository, roomRepository),
      inject: [TalkRepository, RoomRepository],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new CreateUserUseCase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: LoginUseCase,
      useFactory: (
        userRepository: UserRepository,
        tokenService: TokenService,
      ) => new LoginUseCase(userRepository, tokenService),
      inject: [UserRepository, 'TokenService'],
    },
  ],
})
export class AppModule {}
