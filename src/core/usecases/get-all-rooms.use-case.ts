import { UseCase } from '@core/base/use-case';
import { Room } from '@core/domain/model/Room';
import { RoomRepository } from '@core/domain/repository/room.repository';

export class GetAllRoomsUseCase implements UseCase<void, Room[]> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(): Promise<Room[]> {
    return this.roomRepository.findAll();
  }
}
