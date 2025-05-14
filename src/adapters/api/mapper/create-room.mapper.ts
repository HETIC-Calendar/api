import { CreateRoomRequest } from '../request/create-room.request';
import { CreateRoomCommand } from '../../../core/usecases/create-room.use-case';
import { CreateRoomResponse } from '../response/create-room.response';
import { Room } from '../../../core/domain/model/Room';

export class RoomMapper {
  static toDomain(request: CreateRoomRequest): CreateRoomCommand {
    return { name: request.name, capacity: request.capacity };
  }

  static fromDomain(room: Room): CreateRoomResponse {
    return {
      id: room.id,
      name: room.name,
      capacity: room.capacity,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
