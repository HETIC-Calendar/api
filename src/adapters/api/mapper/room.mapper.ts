import { CreateRoomRequest } from '../request/create-room.request';
import { CreateRoomCommand } from '../../../core/usecases/create-room.use-case';

export class RoomMapper {
  static toDomain(request: CreateRoomRequest): CreateRoomCommand {
    return { name: request.name, capacity: request.capacity };
  }
}
