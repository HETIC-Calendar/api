import { TalkRepository } from '../../domain/repository/talk.repository';
import { InMemoryTalkRepository } from '../../../adapters/in-memory/in-memory-talk.repository';
import { InMemoryRoomRepository } from '../../../adapters/in-memory/in-memory-room.repository';
import { RoomRepository } from '../../domain/repository/room.repository';
import { TalkSubject } from '../../domain/type/TalkSubject';
import { TalkStatus } from '../../domain/type/TalkStatus';
import { TalkLevel } from '../../domain/type/TalkLevel';
import { UserType } from '../../domain/type/UserType';
import { UserRepository } from '../../domain/repository/user.repository';
import { InMemoryUserRepository } from '../../../adapters/in-memory/in-memory-user.repository';
import { DeleteTalkCommand, DeleteTalkUseCase } from '../delete-talk.use-case';

describe('UpdateTalkCreationRequestUseCase', () => {
  let talkRepository: TalkRepository;
  let roomRepository: RoomRepository;
  let userRepository: UserRepository;
  let deleteTalkUseCase: DeleteTalkUseCase;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    userRepository = new InMemoryUserRepository();
    talkRepository = new InMemoryTalkRepository(roomRepository, userRepository);
    await talkRepository.removeAll();
    await roomRepository.removeAll();
    deleteTalkUseCase = new DeleteTalkUseCase(talkRepository);
  });

  it('should be defined', () => {
    expect(deleteTalkUseCase).toBeDefined();
  });

  it('should return deleted talk', async () => {
    // Given
    await createTalk(
      'talk-1',
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: DeleteTalkCommand = {
      currentUser: {
        id: 'planner-1',
        type: UserType.PLANNER,
      },
      talkId: 'talk-1',
    };

    // When
    const result = await deleteTalkUseCase.execute(command);

    // Then
    expect(result).toBeUndefined();
    const talk = await talkRepository.findById('talk-1');
    expect(talk).toBeNull();
  });

  it('should throw error if talk not found', async () => {
    // Given
    const command: DeleteTalkCommand = {
      currentUser: {
        id: 'planner-1',
        type: UserType.PLANNER,
      },
      talkId: 'talk-1',
    };

    // When & Then
    await expect(deleteTalkUseCase.execute(command)).rejects.toThrow(
      'Talk with ID talk-1 not found!',
    );
  });

  it('should throw error if user not allowed to delete talk', async () => {
    // Given
    await createTalk(
      'talk-1',
      TalkStatus.PENDING_APPROVAL,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );
    const command: DeleteTalkCommand = {
      currentUser: {
        id: 'speaker-1',
        type: UserType.SPEAKER,
      },
      talkId: 'talk-1',
    };

    // When & Then
    await expect(deleteTalkUseCase.execute(command)).rejects.toThrow(
      'User not allowed to delete talk',
    );
  });

  async function createTalk(
    id: string,
    status: TalkStatus,
    startTime: Date,
    endTime: Date,
  ): Promise<void> {
    await userRepository.create({
      id: 'speaker-1',
      email: 'john.doe@example.com',
      password: 'password123',
      type: UserType.SPEAKER,
    });
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
