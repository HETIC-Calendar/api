import { PrismaTalkWithDetailMapper } from '../prisma-talk-with-detail.mapper';
import { TalkWithDetail } from '../../../../core/domain/model/TalkWithDetail';
import {
  Talk as TalkEntity,
  Room as RoomEntity,
  User as UserEntity,
  $Enums,
} from '@prisma/client';
import { TalkStatus } from '../../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../../core/domain/type/TalkLevel';
import { UserType } from '../../../../core/domain/type/UserType';

describe('PrismaTalkWithDetailMapper', () => {
  const mapper = new PrismaTalkWithDetailMapper();

  it('should map TalkWithDetail to TalkEntityWithDetail', () => {
    // Given
    const talk: TalkWithDetail = {
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
      room: {
        id: 'room-1',
        name: 'Room 1',
        capacity: 50,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
      speaker: {
        id: 'user-1',
        email: 'user@example.com',
        type: UserType.SPEAKER,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
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
      room: {
        id: 'room-1',
        name: 'Room 1',
        capacity: 50,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
      speaker: {
        id: 'user-1',
        email: 'user@example.com',
        type: $Enums.UserType.SPEAKER,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
    });
  });

  it('should map TalkEntityWithDetail to TalkWithDetail', () => {
    // Given
    const entity: TalkEntity & {
      room: RoomEntity;
      speaker: Omit<UserEntity, 'password'>;
    } = {
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
      room: {
        id: 'room-1',
        name: 'Room 1',
        capacity: 50,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
      speaker: {
        id: 'user-1',
        email: 'user@example.com',
        type: $Enums.UserType.SPEAKER,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
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
      room: {
        id: 'room-1',
        name: 'Room 1',
        capacity: 50,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
      speaker: {
        id: 'user-1',
        email: 'user@example.com',
        type: UserType.SPEAKER,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
    });
  });
});
