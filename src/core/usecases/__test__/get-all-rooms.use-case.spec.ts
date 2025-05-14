import { InMemoryRoomRepository } from '@adapters/in-memory/in-memory-room.repository';
import { RoomRepository } from '@core/domain/repository/room.repository';
import {
  CreateRoomCommand,
  CreateRoomUseCase,
} from '@core/usecases/create-room.use-case';
import { GetAllRoomsUseCase } from '@core/usecases/get-all-rooms.use-case';

describe('GetAllRoomsUseCase', () => {
  let roomRepository: RoomRepository;
  let getAllRoomsUseCase: GetAllRoomsUseCase;
  let createRoomUseCase: CreateRoomUseCase;

  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    createRoomUseCase = new CreateRoomUseCase(roomRepository);
    getAllRoomsUseCase = new GetAllRoomsUseCase(roomRepository);
  });

  it('should be defined', () => {
    expect(getAllRoomsUseCase).toBeDefined();
  });

  it('should return all rooms', async () => {
    // Given
    const command: CreateRoomCommand = {
      name: 'Koln',
      capacity: 10,
    };

    // When
    const room = await createRoomUseCase.execute(command);

    expect(room).toBeDefined();

    // When
    const result = await getAllRoomsUseCase.execute();

    // Then
    expect(result.length).toEqual(1);
    expect(result).toEqual([expect.objectContaining(room)]);
  });
});
