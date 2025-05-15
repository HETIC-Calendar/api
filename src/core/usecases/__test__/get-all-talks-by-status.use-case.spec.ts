import { GetAllTalksByStatusUseCase } from '../get-all-talks-by-status.use-case';
import { InMemoryTalkRepository } from '../../../adapters/in-memory/in-memory-talk.repository';
import { TalkRepository } from '../../domain/repository/talk.repository';
import { TalkStatus } from '../../domain/type/TalkStatus';
import { TalkSubject } from '../../domain/type/TalkSubject';
import { RoomRepository } from '../../domain/repository/room.repository';
import { InMemoryRoomRepository } from '../../../adapters/in-memory/in-memory-room.repository';
import { TalkLevel } from '../../domain/type/TalkLevel';
import { InMemoryUserRepository } from '../../../adapters/in-memory/in-memory-user.repository';
import { UserRepository } from '../../domain/repository/user.repository';

describe('GetAllTalksByStatusUseCase', () => {
  let talkRepository: TalkRepository;
  let roomRepository: RoomRepository;
  let userRepository: UserRepository;
  let getAllTalksByStatusUseCase: GetAllTalksByStatusUseCase;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    userRepository = new InMemoryUserRepository();
    talkRepository = new InMemoryTalkRepository(roomRepository, userRepository);
    await talkRepository.removeAll();
    await roomRepository.removeAll();
    getAllTalksByStatusUseCase = new GetAllTalksByStatusUseCase(talkRepository);
  });

  it('should be defined', () => {
    expect(getAllTalksByStatusUseCase).toBeDefined();
  });

  it('should return all talks', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    await createTalk(TalkStatus.APPROVED);
    await createTalk(TalkStatus.REJECTED);
    const command = {};

    // When
    const talks = await getAllTalksByStatusUseCase.execute(command);

    // Then
    expect(talks.length).toEqual(3);
    expect(talks[0]?.status).toEqual(TalkStatus.PENDING_APPROVAL);
    expect(talks[1]?.status).toEqual(TalkStatus.APPROVED);
    expect(talks[2]?.status).toEqual(TalkStatus.REJECTED);
  });

  it('should return talks with status PENDING_APPROVAL', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    await createTalk(TalkStatus.APPROVED);
    await createTalk(TalkStatus.REJECTED);
    const command = {
      status: TalkStatus.PENDING_APPROVAL,
    };

    // When
    const talks = await getAllTalksByStatusUseCase.execute(command);

    // Then
    expect(talks.length).toEqual(1);
    expect(talks[0]?.status).toEqual(TalkStatus.PENDING_APPROVAL);
  });

  it('should return talks with status APPROVED', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    await createTalk(TalkStatus.APPROVED);
    await createTalk(TalkStatus.REJECTED);
    const command = {
      status: TalkStatus.APPROVED,
    };

    // When
    const talks = await getAllTalksByStatusUseCase.execute(command);

    // Then
    expect(talks.length).toEqual(1);
    expect(talks[0]?.status).toEqual(TalkStatus.APPROVED);
  });

  it('should return talks with status REJECTED', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    await createTalk(TalkStatus.APPROVED);
    await createTalk(TalkStatus.REJECTED);
    const command = {
      status: TalkStatus.REJECTED,
    };

    // When
    const talks = await getAllTalksByStatusUseCase.execute(command);

    // Then
    expect(talks.length).toEqual(1);
    expect(talks[0]?.status).toEqual(TalkStatus.REJECTED);
  });

  it('should return empty array when no talks found', async () => {
    // Given
    const command = {
      status: TalkStatus.PENDING_APPROVAL,
    };

    // When
    const talks = await getAllTalksByStatusUseCase.execute(command);

    // Then
    expect(talks.length).toEqual(0);
  });

  it('should return empty array when no talks found with status APPROVED', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    await createTalk(TalkStatus.REJECTED);
    const command = {
      status: TalkStatus.APPROVED,
    };

    // When
    const talks = await getAllTalksByStatusUseCase.execute(command);

    // Then
    expect(talks.length).toEqual(0);
  });

  it('should return talks enriched with room', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    const command = {
      status: TalkStatus.PENDING_APPROVAL,
    };

    // When
    const talks = await getAllTalksByStatusUseCase.execute(command);

    // Then
    expect(talks.length).toEqual(1);
    expect(talks[0]?.room).toBeDefined();
    expect(talks[0]?.room?.id).toEqual('room-1');
    expect(talks[0]?.room?.name).toEqual('Room 1');
    expect(talks[0]?.room?.capacity).toEqual(10);
    expect(talks[0]?.room?.createdAt).toBeDefined();
    expect(talks[0]?.room?.updatedAt).toBeDefined();
  });

  async function createTalk(status: TalkStatus): Promise<void> {
    await roomRepository.create({
      id: 'room-1',
      name: 'Room 1',
      capacity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await talkRepository.create({
      id: crypto.randomUUID(),
      status,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speakerId: 'speaker-1',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
});
