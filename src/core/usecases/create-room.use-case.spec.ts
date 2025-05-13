import { CreateRoomCommand, CreateRoomUseCase } from './create-room.use-case';
import { RoomRepository } from '../domain/repository/room.repository';
import { InMemoryRoomRepository } from '../../adapters/in-memory/in-memory-room.repository';

describe('CreateRoomUseCase', () => {
  let roomRepository: RoomRepository;
  let createRoomUseCase: CreateRoomUseCase;

  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    createRoomUseCase = new CreateRoomUseCase(roomRepository);
  });

  it('should be defined', () => {
    expect(createRoomUseCase).toBeDefined();
  });

  it('should return created room', async () => {
    // Given
    const command: CreateRoomCommand = {
      name: 'Koln',
      capacity: 10,
    };

    // When
    const room = await createRoomUseCase.execute(command);

    // Then
    const rooms = await roomRepository.findAll();
    expect(rooms.length).toEqual(1);
    expect(room).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(String),
      name: 'Koln',
      capacity: 10,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createdAt: expect.any(Date),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedAt: expect.any(Date),
    });
  });
});
