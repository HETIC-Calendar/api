import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserController } from '@adapters/api/controller/auth.controller';
import { HelloWorldController } from '@adapters/api/controller/hello-world.controller';
import { RoomController } from '@adapters/api/controller/room.controller';
import { TalkController } from '@adapters/api/controller/talk.controller';
import { JwtAuthGuard } from '@adapters/api/guards/jwt-auth.guard';
import { JwtServiceAdapter } from '@adapters/jwt/jwt.service';
import { PrismaRoomRepository } from '@adapters/prisma/prisma-room.repository';
import { PrismaTalkRepository } from '@adapters/prisma/prisma-talk.repository';
import { PrismaUserRepository } from '@adapters/prisma/prisma-user.repository';
import { PrismaService } from '@adapters/prisma/prisma.service';
import { RoomRepository } from '@core/domain/repository/room.repository';
import { TalkRepository } from '@core/domain/repository/talk.repository';
import { UserRepository } from '@core/domain/repository/user.repository';
import { TokenService } from '@core/domain/service/token.service';
import { ApproveOrRejectTalkUseCase } from '@core/usecases/approve-or-reject-talk-use.case';
import { CreateRoomUseCase } from '@core/usecases/create-room.use-case';
import { CreateTalkCreationRequestUseCase } from '@core/usecases/create-talk-creation-request.use-case';
import { CreateUserUseCase } from '@core/usecases/create-user.use-case';
import { GetAllRoomsUseCase } from '@core/usecases/get-all-rooms.use-case';
import { GetAllTalksByStatusUseCase } from '@core/usecases/get-all-talks-by-status.use-case';
import { HelloWorldUseCase } from '@core/usecases/hello-world.use-case';
import { LoginUseCase } from '@core/usecases/login.use-case';

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
    JwtAuthGuard,
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
      inject: [PrismaService],
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
      provide: CreateTalkCreationRequestUseCase,
      useFactory: (
        talkRepository: TalkRepository,
        roomRepository: RoomRepository,
      ) => new CreateTalkCreationRequestUseCase(talkRepository, roomRepository),
      inject: [TalkRepository, RoomRepository],
    },
    {
      provide: ApproveOrRejectTalkUseCase,
      useFactory: (talkRepository: TalkRepository) =>
        new ApproveOrRejectTalkUseCase(talkRepository),
      inject: [TalkRepository],
    },
    {
      provide: GetAllTalksByStatusUseCase,
      useFactory: (talkRepository: TalkRepository) =>
        new GetAllTalksByStatusUseCase(talkRepository),
      inject: [TalkRepository],
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
