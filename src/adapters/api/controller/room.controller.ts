import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoomUseCase } from '../../../core/usecases/create-room.use-case';
import { CreateRoomRequest } from '../request/create-room.request';
import { Room } from '../../../core/domain/model/Room';
import { RoomMapper } from '../mapper/room.mapper';
import { GetAllRoomsUseCase } from '../../../core/usecases/get-all-rooms.use-case';

@Controller('/rooms')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly getAllRoomsUseCase: GetAllRoomsUseCase,
  ) {}

  @Post()
  async createRoom(@Body() body: CreateRoomRequest): Promise<Room> {
    const command = RoomMapper.toDomain(body);
    return this.createRoomUseCase.execute(command);
  }

  @Get()
  async getAllRooms(): Promise<Room[]> {
    return this.getAllRoomsUseCase.execute();
  }
}
