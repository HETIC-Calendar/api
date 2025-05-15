import { TalkRepository } from '../../domain/repository/talk.repository';
import { InMemoryTalkRepository } from '../../../adapters/in-memory/in-memory-talk.repository';
import { TalkSubject } from '../../domain/type/TalkSubject';
import { TalkStatus } from '../../domain/type/TalkStatus';
import { ApproveOrRejectTalkUseCase } from '../approve-or-reject-talk-use.case';
import { RoomRepository } from '../../domain/repository/room.repository';
import { InMemoryRoomRepository } from '../../../adapters/in-memory/in-memory-room.repository';
import { TalkAlreadyApprovedOrRejectedError } from '../../domain/error/TalkAlreadyApprovedOrRejectedError';
import { TalkNotFoundError } from '../../domain/error/TalkNotFoundError';

describe('ApproveOrRejectTalkUseCase', () => {
  let talkRepository: TalkRepository;
  let roomRepository: RoomRepository;
  let approveOrRejectTalkUseCase: ApproveOrRejectTalkUseCase;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    talkRepository = new InMemoryTalkRepository(roomRepository);
    await talkRepository.removeAll();
    await roomRepository.removeAll();
    approveOrRejectTalkUseCase = new ApproveOrRejectTalkUseCase(talkRepository);
  });

  it('should be defined', () => {
    expect(approveOrRejectTalkUseCase).toBeDefined();
  });

  it('should return approve talk', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    const command = {
      talkId: 'talk-1',
      isApproved: true,
    };

    // When
    await approveOrRejectTalkUseCase.execute(command);

    // Then
    const updatedTalk = await talkRepository.findById('talk-1');
    expect(updatedTalk).toBeDefined();
    expect(updatedTalk?.status).toEqual(TalkStatus.APPROVED);
  });

  it('should return reject talk', async () => {
    // Given
    await createTalk(TalkStatus.PENDING_APPROVAL);
    const command = {
      talkId: 'talk-1',
      isApproved: false,
    };

    // When
    await approveOrRejectTalkUseCase.execute(command);

    // Then
    const updatedTalk = await talkRepository.findById('talk-1');
    expect(updatedTalk).toBeDefined();
    expect(updatedTalk?.status).toEqual(TalkStatus.REJECTED);
  });

  it('should throw TalkNotFoundError when talk is not found', async () => {
    // Given
    const command = {
      talkId: 'talk-1',
      isApproved: true,
    };

    // When & Then
    await expect(approveOrRejectTalkUseCase.execute(command)).rejects.toThrow(
      new TalkNotFoundError('talk-1'),
    );
  });

  it('should throw TalkAlreadyAcceptedOrRejectedError when talk is already approved', async () => {
    // Given
    await createTalk(TalkStatus.APPROVED);
    const command = {
      talkId: 'talk-1',
      isApproved: true,
    };

    // When & Then
    await expect(approveOrRejectTalkUseCase.execute(command)).rejects.toThrow(
      new TalkAlreadyApprovedOrRejectedError('talk-1', TalkStatus.APPROVED),
    );
  });

  it('should throw TalkAlreadyAcceptedOrRejectedError when talk is already rejected', async () => {
    // Given
    await createTalk(TalkStatus.REJECTED);
    const command = {
      talkId: 'talk-1',
      isApproved: false,
    };

    // When & Then
    await expect(approveOrRejectTalkUseCase.execute(command)).rejects.toThrow(
      new TalkAlreadyApprovedOrRejectedError('talk-1', TalkStatus.REJECTED),
    );
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
      id: 'talk-1',
      status,
      title: 'La Clean Architecture pour les nuls',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description:
        'Une introduction à la Clean Architecture dans le monde TypeScript.',
      speaker: 'John Doe',
      roomId: 'room-1',
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
});
