import { ApiProperty } from '@nestjs/swagger';
import { CreateRoomResponse } from './create-room.response';

export class GetAllRoomsResponse {
  @ApiProperty({ type: [CreateRoomResponse] })
  rooms: CreateRoomResponse[];

  constructor(rooms: CreateRoomResponse[]) {
    this.rooms = rooms;
  }
}
