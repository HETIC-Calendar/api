import { Module } from '@nestjs/common';
import { HelloWorldUseCase } from './core/usecases/hello-world.use-case';
import { HelloWorldController } from './adapters/api/controller/hello-world.controller';
import { CreateRoomUseCase } from './core/usecases/create-room.use-case';
import { RoomRepository } from './core/domain/repository/room.repository';
import { PrismaRoomRepository } from './adapters/prisma/prisma-room.repository';
import { PrismaService } from './adapters/prisma/prisma.service';

@Module({
  controllers: [HelloWorldController],
  providers: [
    PrismaService,
    {
      provide: RoomRepository,
      useFactory: (prisma: PrismaService) => new PrismaRoomRepository(prisma),
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
  ],
})
export class AppModule {}
