import { TalkRepository } from '../domain/repository/talk.repository';
import {
  CreateTalkCommand,
  CreateTalkCreationRequestUseCase,
} from './create-talk-creation-request.use-case';
import { InMemoryTalkRepository } from '../../adapters/in-memory/in-memory-talk.repository';
import { InMemoryRoomRepository } from '../../adapters/in-memory/in-memory-room.repository';
import { RoomRepository } from '../domain/repository/room.repository';
import { RoomNotFoundError } from '../domain/error/RoomNotFoundError';
import { TalkSubject } from '../domain/type/TalkSubject';
import { TalkStatus } from '../domain/type/TalkStatus';

describe('CreateTalkCreationRequestUseCase', () => {
  let talkRepository: TalkRepository;
  let roomRepository: RoomRepository;
  let createTalkUseCase: CreateTalkCreationRequestUseCase;

  beforeEach(async () => {
    talkRepository = new InMemoryTalkRepository();
    roomRepository = new InMemoryRoomRepository();
    await talkRepository.removeAll();
    await roomRepository.removeAll();
    createTalkUseCase = new CreateTalkCreationRequestUseCase(
      talkRepository,
      roomRepository,
    );
  });

  it('should be defined', () => {
    expect(createTalkUseCase).toBeDefined();
  });

  it('should return created talk', async () => {
    // Given
    const roomEntity = {
      id: 'room-1',
      name: 'Room 1',
      capacity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await roomRepository.create(roomEntity);
    const command: CreateTalkCommand = {
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    const talk = await createTalkUseCase.execute(command);

    // Then
    const talks = await talkRepository.findAll();
    expect(talks.length).toEqual(1);
    expect(talk).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(String),
      status: TalkStatus.PENDING_APPROVAL,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedAt: expect.any(Date),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createdAt: expect.any(Date),
    });
  });

  it('should throw error when room not found', async () => {
    // Given
    const command: CreateTalkCommand = {
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    try {
      await createTalkUseCase.execute(command);
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(RoomNotFoundError);
      expect((error as Error).message).toEqual(
        'Room with ID room-1 not found!',
      );
    }
  });

  it('should throw error when start time is after end time', async () => {
    // Given
    const command: CreateTalkCommand = {
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T11:00:00Z'),
      endTime: new Date('2023-10-01T10:00:00Z'),
    };

    // When
    const execute = async () => await createTalkUseCase.execute(command);

    // Then
    await expect(execute).rejects.toThrow(
      'Talk start time must be before end time.',
    );
  });

  it('should throw error when talk time is outside of allowed hours', async () => {
    // Given
    const command: CreateTalkCommand = {
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T08:00:00Z'),
      endTime: new Date('2023-10-01T10:00:00Z'),
    };

    // When
    const execute = async () => await createTalkUseCase.execute(command);

    // Then
    await expect(execute).rejects.toThrow(
      'Talks must be between 9 and 19 hours.',
    );
  });

  it('should throw error when talk overlaps with existing talk', async () => {
    // Given
    const roomEntity = {
      id: 'room-1',
      name: 'Room 1',
      capacity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await roomRepository.create(roomEntity);
    const command1: CreateTalkCommand = {
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };
    await createTalkUseCase.execute(command1);

    const command2: CreateTalkCommand = {
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T10:30:00Z'),
      endTime: new Date('2023-10-01T11:30:00Z'),
    };

    // When
    const execute = async () => await createTalkUseCase.execute(command2);

    // Then
    await expect(execute).rejects.toThrow(
      'Talk overlap another talk in the same room.',
    );
  });
});
