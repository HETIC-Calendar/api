import { InMemoryRoomRepository } from '../../../adapters/in-memory/in-memory-room.repository';
import { RoomRepository } from '../../domain/repository/room.repository';
import { CreateRoomCommand, CreateRoomUseCase } from '../create-room.use-case';
import { GetRoomByIdUseCase } from '../get-room-by-id.use-case';

describe('GetRoomByIdUseCase', () => {
  let roomRepository: RoomRepository;
  let getRoomByIdUseCase: GetRoomByIdUseCase;
  let createRoomUseCase: CreateRoomUseCase;

  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    getRoomByIdUseCase = new GetRoomByIdUseCase(roomRepository);
    createRoomUseCase = new CreateRoomUseCase(roomRepository);
  });

  it('should be defined', () => {
    expect(getRoomByIdUseCase).toBeDefined();
  });

  it('should return the room', async () => {
    // Given
    const command: CreateRoomCommand = {
      name: 'Koln',
      capacity: 10,
    };

    // When
    const room = await createRoomUseCase.execute(command);

    expect(room).toBeDefined();

    // When
    const result = await getRoomByIdUseCase.execute(room.id);

    // Then
    expect(result).toBeDefined();
    expect(result.id).toEqual(room.id);
    expect(result.name).toEqual(room.name);
    expect(result.capacity).toEqual(room.capacity);
  });
});
