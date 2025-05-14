import { CreateRoomRequest } from '@adapters/api/request/create-room.request';
import { CreateRoomResponse } from '@adapters/api/response/create-room.response';
import { Room } from '@core/domain/model/Room';
import { CreateRoomCommand } from '@core/usecases/create-room.use-case';

export class CreateRoomMapper {
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
