import { UseCase } from '@core/base/use-case';
import { Room } from '@core/domain/model/Room';
import { RoomRepository } from '@core/domain/repository/room.repository';

export type CreateRoomCommand = {
  name: string;
  capacity: number;
};

export class CreateRoomUseCase implements UseCase<CreateRoomCommand, Room> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(command: CreateRoomCommand): Promise<Room> {
    const room = new Room(crypto.randomUUID(), command.name, command.capacity);
    return this.roomRepository.create(room);
  }
}
