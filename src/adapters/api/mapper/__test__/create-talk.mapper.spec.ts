import { CreateTalkMapper } from '../create-talk.mapper';
import { CreateTalkRequest } from '../../request/create-talk.request';
import { ProfileRequest } from '../../request/profile.request';
import { TalkSubject } from '../../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../../core/domain/type/TalkLevel';
import { Talk } from '../../../../core/domain/model/Talk';
import { TalkStatus } from '../../../../core/domain/type/TalkStatus';
import { UserType } from '../../../../core/domain/type/UserType';

describe('CreateTalkMapper', () => {
  it('should map CreateTalkRequest and ProfileRequest to CreateTalkCommand', () => {
    // Given
    const profileRequest: ProfileRequest = {
      id: 'user-1',
      email: 'user@example.com',
      type: UserType.SPEAKER,
    };

    const createTalkRequest: CreateTalkRequest = {
      title: 'Introduction à TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'Une présentation sur les bases de TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: '2023-10-01T10:00:00Z',
      endTime: '2023-10-01T11:00:00Z',
    };

    // When
    const command = CreateTalkMapper.toDomain(
      profileRequest,
      createTalkRequest,
    );

    // Then
    expect(command).toEqual({
      currentUser: profileRequest,
      title: 'Introduction à TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'Une présentation sur les bases de TypeScript.',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z'),
    });
  });

  it('should map Talk to CreateTalkResponse', () => {
    // Given
    const talk: Talk = new Talk(
      'talk-1',
      TalkStatus.PENDING_APPROVAL,
      'Introduction à TypeScript',
      TalkSubject.WEB_DEVELOPMENT,
      'Une présentation sur les bases de TypeScript.',
      'user-1',
      'room-1',
      TalkLevel.BEGINNER,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T10:00:00Z'),
    );

    // When
    const response = CreateTalkMapper.fromDomain(talk);

    // Then
    expect(response).toEqual({
      id: 'talk-1',
      status: TalkStatus.PENDING_APPROVAL,
      title: 'Introduction à TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'Une présentation sur les bases de TypeScript.',
      speakerId: 'user-1',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: '2023-10-01T10:00:00.000Z',
      endTime: '2023-10-01T11:00:00.000Z',
      createdAt: new Date('2023-10-01T10:00:00Z'),
      updatedAt: new Date('2023-10-01T10:00:00Z'),
    });
  });
});
