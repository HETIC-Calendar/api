import { UpdateTalkMapper } from '../update-talk.mapper';
import { UpdateTalkRequest } from '../../request/update-talk.request';
import { ProfileRequest } from '../../request/profile.request';
import { Talk } from '../../../../core/domain/model/Talk';
import { TalkStatus } from '../../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../../core/domain/type/TalkLevel';
import { UserType } from '../../../../core/domain/type/UserType';

describe('UpdateTalkMapper', () => {
  it('should map UpdateTalkRequest and ProfileRequest to UpdateTalkCommand', () => {
    // Given
    const profileRequest: ProfileRequest = {
      id: 'user-1',
      email: 'user@example.com',
      type: UserType.SPEAKER,
    };

    const updateTalkRequest: UpdateTalkRequest = {
      title: 'Advanced TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'An advanced talk on TypeScript features.',
      roomId: 'room-2',
      level: TalkLevel.INTERMEDIATE,
      startTime: '2023-10-02T10:00:00Z',
      endTime: '2023-10-02T11:00:00Z',
    };

    const talkId = 'talk-1';

    // When
    const command = UpdateTalkMapper.toDomain(
      profileRequest,
      talkId,
      updateTalkRequest,
    );

    // Then
    expect(command).toEqual({
      currentUser: profileRequest,
      talkId: 'talk-1',
      title: 'Advanced TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'An advanced talk on TypeScript features.',
      roomId: 'room-2',
      level: TalkLevel.INTERMEDIATE,
      startTime: new Date('2023-10-02T10:00:00Z'),
      endTime: new Date('2023-10-02T11:00:00Z'),
    });
  });

  it('should map Talk to UpdateTalkResponse', () => {
    // Given
    const talk: Talk = new Talk(
      'talk-1',
      TalkStatus.APPROVED,
      'Advanced TypeScript',
      TalkSubject.WEB_DEVELOPMENT,
      'An advanced talk on TypeScript features.',
      'user-1',
      'room-2',
      TalkLevel.INTERMEDIATE,
      new Date('2023-10-02T10:00:00Z'),
      new Date('2023-10-02T11:00:00Z'),
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T10:00:00Z'),
    );

    // When
    const response = UpdateTalkMapper.fromDomain(talk);

    // Then
    expect(response).toEqual({
      id: 'talk-1',
      status: TalkStatus.APPROVED,
      title: 'Advanced TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'An advanced talk on TypeScript features.',
      speakerId: 'user-1',
      roomId: 'room-2',
      level: TalkLevel.INTERMEDIATE,
      startTime: '2023-10-02T10:00:00.000Z',
      endTime: '2023-10-02T11:00:00.000Z',
      createdAt: new Date('2023-10-01T10:00:00Z'),
      updatedAt: new Date('2023-10-01T10:00:00Z'),
    });
  });
});
