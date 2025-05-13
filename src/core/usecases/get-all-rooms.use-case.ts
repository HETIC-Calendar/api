import { UseCase } from '../base/use-case';
import { RoomRepository } from '../domain/repository/room.repository';
import { Room } from '../domain/model/Room';

export class GetAllRoomsUseCase implements UseCase<void, Room[]> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(): Promise<Room[]> {
    return await this.roomRepository.findAll();
  }
}
