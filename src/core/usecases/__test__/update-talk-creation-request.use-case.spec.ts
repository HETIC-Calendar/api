import { TalkRepository } from '../../domain/repository/talk.repository';
import { InMemoryTalkRepository } from '../../../adapters/in-memory/in-memory-talk.repository';
import { InMemoryRoomRepository } from '../../../adapters/in-memory/in-memory-room.repository';
import { RoomRepository } from '../../domain/repository/room.repository';
import { RoomNotFoundError } from '../../domain/error/RoomNotFoundError';
import { TalkSubject } from '../../domain/type/TalkSubject';
import { TalkStatus } from '../../domain/type/TalkStatus';
import { TalkLevel } from '../../domain/type/TalkLevel';
import {
  UpdateTalkCommand,
  UpdateTalkCreationRequestUseCase,
} from '../update-talk-creation-request.use-case';
import { TalkNotFoundError } from '../../domain/error/TalkNotFoundError';
import { UserType } from '../../domain/type/UserType';
import { UserRepository } from '../../domain/repository/user.repository';
import { InMemoryUserRepository } from '../../../adapters/in-memory/in-memory-user.repository';
import { UserNotAllowedToUpdateTalkError } from '../../domain/error/UserNotAllowedToUpdateTalkError';
import { TalkAlreadyApprovedOrRejectedError } from '../../domain/error/TalkAlreadyApprovedOrRejectedError';

describe('UpdateTalkCreationRequestUseCase', () => {
  let talkRepository: TalkRepository;
  let roomRepository: RoomRepository;
  let userRepository: UserRepository;
  let updateTalkUseCase: UpdateTalkCreationRequestUseCase;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    userRepository = new InMemoryUserRepository();
    talkRepository = new InMemoryTalkRepository(roomRepository, userRepository);
    await talkRepository.removeAll();
    await roomRepository.removeAll();
    updateTalkUseCase = new UpdateTalkCreationRequestUseCase(
      talkRepository,
      roomRepository,
    );
  });

  it('should be defined', () => {
    expect(updateTalkUseCase).toBeDefined();
  });

  it('should return the updated talk', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    const talk = await updateTalkUseCase.execute(command);

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
      speakerId: 'speaker-1',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedAt: expect.any(Date),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createdAt: expect.any(Date),
    });
  });

  it('should throw error when user not allowed to update talk', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-2',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    try {
      await updateTalkUseCase.execute(command);
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(UserNotAllowedToUpdateTalkError);
      expect((error as Error).message).toEqual(
        'User not allowed to update talk',
      );
    }
  });

  it('should throw error when talk already approved or rejected', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.APPROVED,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    try {
      await updateTalkUseCase.execute(command);
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(TalkAlreadyApprovedOrRejectedError);
      expect((error as Error).message).toEqual(
        `Talk with ID ${talkId} is already APPROVED`,
      );
    }
  });

  it('should throw error when talk not found', async () => {
    // Given
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId: 'talk-1',
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    try {
      await updateTalkUseCase.execute(command);
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(TalkNotFoundError);
      expect((error as Error).message).toEqual(
        'Talk with ID talk-1 not found!',
      );
    }
  });

  it('should throw error when room not found', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-2',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    try {
      await updateTalkUseCase.execute(command);
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(RoomNotFoundError);
      expect((error as Error).message).toEqual(
        'Room with ID room-2 not found!',
      );
    }
  });

  it('should throw error when start time is after end time', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T11:00:00Z'),
      endTime: new Date('2023-10-01T10:00:00Z'),
    };

    // When
    const execute = async () => await updateTalkUseCase.execute(command);

    // Then
    await expect(execute).rejects.toThrow(
      'Talk start time must be before end time.',
    );
  });

  it('should throw error when talk time is outside of allowed hours', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T06:00:00Z'),
      endTime: new Date('2023-10-01T10:00:00Z'),
    };

    // When
    const execute = async () => await updateTalkUseCase.execute(command);

    // Then
    await expect(execute).rejects.toThrow(
      'Talks must be between 7 and 17 hours.',
    );
  });

  it('should throw error when talk overlaps with existing talk', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    await createTalk(
      crypto.randomUUID(),
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:30:00Z'),
      endTime: new Date('2023-10-01T11:30:00Z'),
    };

    // When
    const execute = async () => await updateTalkUseCase.execute(command);

    // Then
    await expect(execute).rejects.toThrow(
      'Talk overlap another talk in the same room.',
    );
  });

  it('should not throw overlap error if existing talk is REJECTED', async () => {
    // Given
    const talkId = crypto.randomUUID();
    await createTalk(
      talkId,
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    await createTalk(
      crypto.randomUUID(),
      TalkStatus.REJECTED,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: UpdateTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:30:00Z'),
      endTime: new Date('2023-10-01T11:30:00Z'),
    };

    // When
    const talk = await updateTalkUseCase.execute(command);

    // Then
    expect(talk).toBeDefined();
  });

  async function createTalk(
    id: string,
    status: TalkStatus,
    startTime: Date,
    endTime: Date,
  ): Promise<void> {
    await roomRepository.create({
      id: 'room-1',
      name: 'Room 1',
      capacity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await talkRepository.create({
      id,
      status,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speakerId: 'speaker-1',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime,
      endTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
});
