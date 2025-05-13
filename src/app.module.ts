import { Module } from '@nestjs/common';
import { HelloWorldUseCase } from './core/usecases/hello-world.use-case';
import { HelloWorldController } from './adapters/api/controller/hello-world.controller';
import { CreateRoomUseCase } from './core/usecases/create-room.use-case';
import { RoomRepository } from './core/domain/repository/room.repository';
import { PrismaRoomRepository } from './adapters/prisma/prisma-room.repository';
import { PrismaService } from './adapters/prisma/prisma.service';
import { RoomController } from './adapters/api/controller/room.controller';
import { GetAllRoomsUseCase } from './core/usecases/get-all-rooms.use-case';
import { TalkRepository } from './core/domain/repository/talk.repository';
import { CreateTalkUseCase } from './core/usecases/create-talk.use-case';
import { PrismaTalkRepository } from './adapters/prisma/prisma-talk.repository';
import { TalkController } from './adapters/api/controller/talk.controller';

@Module({
  controllers: [HelloWorldController, RoomController, TalkController],
  providers: [
    PrismaService,
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
  ],
})
export class AppModule {}
