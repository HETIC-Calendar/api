import { UseCase } from '../base/use-case';
import { RoomRepository } from '../domain/repository/room.repository';
import { Room } from '../domain/model/Room';

export type CreateRoomCommand = {
  name: string;
  capacity: number;
};

export class CreateRoomUseCase implements UseCase<CreateRoomCommand, Room> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(command: CreateRoomCommand): Promise<Room> {
    const room = new Room(crypto.randomUUID(), command.name, command.capacity);
    return await this.roomRepository.create(room);
  }
}
