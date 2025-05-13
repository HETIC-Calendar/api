import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HelloWorldUseCase } from '../../../core/usecases/hello-world.use-case';
import { HelloWorldMapper } from '../mapper/hello-world.mapper';
import { HelloWorldRequest } from '../request/hello-world.request';
import { CreateRoomUseCase } from '../../../core/usecases/create-room.use-case';
import { CreateRoomRequest } from '../request/create-room.request';
import { Room } from '../../../core/domain/model/Room';
import { RoomMapper } from '../mapper/room.mapper';

@Controller()
export class HelloWorldController {
  constructor(
    private readonly helloWorldUseCase: HelloWorldUseCase,
    private readonly createRoomUseCase: CreateRoomUseCase,
  ) {}

  @Get()
  getHello(@Query('name') name: string): string {
    const request: HelloWorldRequest = { name };
    const command = HelloWorldMapper.toDomain(request);
    return this.helloWorldUseCase.execute(command);
  }

  @Post('/room')
  async createRoom(@Body() body: CreateRoomRequest): Promise<Room> {
    const command = RoomMapper.toDomain(body);
    return this.createRoomUseCase.execute(command);
  }
}
