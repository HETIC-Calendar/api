import { UseCase } from '../base/use-case';
import { RoomRepository } from '../domain/repository/room.repository';
import { Room } from '../domain/model/Room';
import { RoomNotFoundError } from '../domain/error/RoomNotFoundError';

export class GetRoomByIdUseCase implements UseCase<string, Room> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(id: string): Promise<Room> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new RoomNotFoundError(id);
    }

    return room;
  }
}
