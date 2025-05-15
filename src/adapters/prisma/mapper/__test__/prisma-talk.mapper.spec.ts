import { PrismaTalkMapper } from '../prisma-talk.mapper';
import { Talk } from '../../../../core/domain/model/Talk';
import { Talk as TalkEntity, $Enums } from '@prisma/client';
import { TalkStatus } from '../../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../../core/domain/type/TalkLevel';

describe('PrismaTalkMapper', () => {
  const mapper = new PrismaTalkMapper();

  it('should map Talk to TalkEntity', () => {
    // Given
    const talk: Talk = {
      id: 'talk-1',
      status: TalkStatus.PENDING_APPROVAL,
      title: 'Introduction to TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'A beginner-friendly talk on TypeScript.',
      speakerId: 'user-1',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-02T09:00:00Z'),
      endTime: new Date('2023-10-02T10:00:00Z'),
      updatedAt: new Date('2023-10-01T08:00:00Z'),
      createdAt: new Date('2023-10-01T08:00:00Z'),
    };

    // When
    const entity = mapper.fromDomain(talk);

    // Then
    expect(entity).toEqual({
      id: 'talk-1',
      status: $Enums.TalkStatus.PENDING_APPROVAL,
      title: 'Introduction to TypeScript',
      subject: $Enums.TalkSubject.WEB_DEVELOPMENT,
      description: 'A beginner-friendly talk on TypeScript.',
      speakerId: 'user-1',
      roomId: 'room-1',
      level: $Enums.TalkLevel.BEGINNER,
      startTime: new Date('2023-10-02T09:00:00Z'),
      endTime: new Date('2023-10-02T10:00:00Z'),
      updatedAt: new Date('2023-10-01T08:00:00Z'),
      createdAt: new Date('2023-10-01T08:00:00Z'),
    });
  });

  it('should map TalkEntity to Talk', () => {
    // Given
    const entity: TalkEntity = {
      id: 'talk-1',
      status: $Enums.TalkStatus.PENDING_APPROVAL,
      title: 'Introduction to TypeScript',
      subject: $Enums.TalkSubject.WEB_DEVELOPMENT,
      description: 'A beginner-friendly talk on TypeScript.',
      speakerId: 'user-1',
      roomId: 'room-1',
      level: $Enums.TalkLevel.BEGINNER,
      startTime: new Date('2023-10-02T09:00:00Z'),
      endTime: new Date('2023-10-02T10:00:00Z'),
      updatedAt: new Date('2023-10-01T08:00:00Z'),
      createdAt: new Date('2023-10-01T08:00:00Z'),
    };

    // When
    const talk = mapper.toDomain(entity);

    // Then
    expect(talk).toEqual({
      id: 'talk-1',
      status: TalkStatus.PENDING_APPROVAL,
      title: 'Introduction to TypeScript',
      subject: TalkSubject.WEB_DEVELOPMENT,
      description: 'A beginner-friendly talk on TypeScript.',
      speakerId: 'user-1',
      roomId: 'room-1',
      level: TalkLevel.BEGINNER,
      startTime: new Date('2023-10-02T09:00:00Z'),
      endTime: new Date('2023-10-02T10:00:00Z'),
      updatedAt: new Date('2023-10-01T08:00:00Z'),
      createdAt: new Date('2023-10-01T08:00:00Z'),
    });
  });
});
