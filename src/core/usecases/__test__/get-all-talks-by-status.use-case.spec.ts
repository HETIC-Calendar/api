import { InMemoryRoomRepository } from '@adapters/in-memory/in-memory-room.repository';
import { InMemoryTalkRepository } from '@adapters/in-memory/in-memory-talk.repository';
import { RoomRepository } from '@core/domain/repository/room.repository';
import { TalkLevel } from '@core/domain/type/TalkLevel';
import { TalkStatus } from '@core/domain/type/TalkStatus';
import { TalkSubject } from '@core/domain/type/TalkSubject';
import { GetAllTalksByStatusUseCase } from '@core/usecases/get-all-talks-by-status.use-case';
import { TalkRepository } from '@/core/domain/repository/talk.repository';

describe('GetAllTalksByStatusUseCase', () => {
  let talkRepository: TalkRepository;
  let roomRepository: RoomRepository;
  let getAllTalksByStatusUseCase: GetAllTalksByStatusUseCase;

  beforeEach(async () => {
    talkRepository = new InMemoryTalkRepository();
    roomRepository = new InMemoryRoomRepository();
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
      speaker: 'John Doe',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
});
