import { PrismaTalkWithDetailMapper } from '../prisma-talk-with-detail.mapper';
import { TalkWithDetail } from '../../../../core/domain/model/TalkWithDetail';
import {
  $Enums,
  Room as RoomEntity,
  Talk as TalkEntity,
  User as UserEntity,
} from '@prisma/client';
import { TalkStatus } from '../../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../../core/domain/type/TalkLevel';
import { UserType } from '../../../../core/domain/type/UserType';

describe('PrismaTalkWithDetailMapper', () => {
  const mapper = new PrismaTalkWithDetailMapper();

  const talkStatusMappings: {
    domain: TalkStatus;
    prisma: $Enums.TalkStatus;
  }[] = [
    {
      domain: TalkStatus.PENDING_APPROVAL,
      prisma: $Enums.TalkStatus.PENDING_APPROVAL,
    },
    { domain: TalkStatus.APPROVED, prisma: $Enums.TalkStatus.APPROVED },
    { domain: TalkStatus.REJECTED, prisma: $Enums.TalkStatus.REJECTED },
  ];

  const talkSubjectMappings: {
    domain: TalkSubject;
    prisma: $Enums.TalkSubject;
  }[] = [
    { domain: TalkSubject.AI, prisma: $Enums.TalkSubject.AI },
    {
      domain: TalkSubject.WEB_DEVELOPMENT,
      prisma: $Enums.TalkSubject.WEB_DEVELOPMENT,
    },
    {
      domain: TalkSubject.MOBILE_DEVELOPMENT,
      prisma: $Enums.TalkSubject.MOBILE_DEVELOPMENT,
    },
    {
      domain: TalkSubject.DATA_SCIENCE,
      prisma: $Enums.TalkSubject.DATA_SCIENCE,
    },
    {
      domain: TalkSubject.CLOUD_COMPUTING,
      prisma: $Enums.TalkSubject.CLOUD_COMPUTING,
    },
    { domain: TalkSubject.DEVOPS, prisma: $Enums.TalkSubject.DEVOPS },
    {
      domain: TalkSubject.CYBER_SECURITY,
      prisma: $Enums.TalkSubject.CYBER_SECURITY,
    },
    { domain: TalkSubject.BLOCKCHAIN, prisma: $Enums.TalkSubject.BLOCKCHAIN },
    { domain: TalkSubject.IOT, prisma: $Enums.TalkSubject.IOT },
    {
      domain: TalkSubject.GAME_DEVELOPMENT,
      prisma: $Enums.TalkSubject.GAME_DEVELOPMENT,
    },
  ];

  const talkLevelMappings: { domain: TalkLevel; prisma: $Enums.TalkLevel }[] = [
    { domain: TalkLevel.BEGINNER, prisma: $Enums.TalkLevel.BEGINNER },
    { domain: TalkLevel.INTERMEDIATE, prisma: $Enums.TalkLevel.INTERMEDIATE },
    { domain: TalkLevel.ADVANCED, prisma: $Enums.TalkLevel.ADVANCED },
  ];

  const userTypeMappings: { domain: UserType; prisma: $Enums.UserType }[] = [
    { domain: UserType.PLANNER, prisma: $Enums.UserType.PLANNER },
    { domain: UserType.SPEAKER, prisma: $Enums.UserType.SPEAKER },
  ];

  it.each(talkStatusMappings)(
    'should map Talk to TalkEntity for status %s',
    ({ domain, prisma }) => {
      // Given
      const talk: TalkWithDetail = getTalkWithDetailModel(
        domain,
        TalkSubject.WEB_DEVELOPMENT,
        TalkLevel.BEGINNER,
        UserType.SPEAKER,
      );

      // When
      const entity = mapper.fromDomain(talk);

      // Then
      expect(entity).toEqual(
        getTalkWithDetailEntity(
          prisma,
          $Enums.TalkSubject.WEB_DEVELOPMENT,
          $Enums.TalkLevel.BEGINNER,
          $Enums.UserType.SPEAKER,
        ),
      );
    },
  );

  it.each(talkStatusMappings)(
    'should map TalkEntity to Talk for status %s',
    ({ domain, prisma }) => {
      // Given
      const entity: TalkEntity & {
        room: RoomEntity;
        speaker: Omit<UserEntity, 'password'>;
      } = getTalkWithDetailEntity(
        prisma,
        $Enums.TalkSubject.WEB_DEVELOPMENT,
        $Enums.TalkLevel.BEGINNER,
        $Enums.UserType.SPEAKER,
      );

      // When
      const talk = mapper.toDomain(entity);

      // Then
      expect(talk).toEqual(
        getTalkWithDetailModel(
          domain,
          TalkSubject.WEB_DEVELOPMENT,
          TalkLevel.BEGINNER,
          UserType.SPEAKER,
        ),
      );
    },
  );

  it.each(talkSubjectMappings)(
    'should map Talk to TalkEntity for subject %s',
    ({ domain, prisma }) => {
      // Given
      const talk: TalkWithDetail = getTalkWithDetailModel(
        TalkStatus.PENDING_APPROVAL,
        domain,
        TalkLevel.BEGINNER,
        UserType.SPEAKER,
      );

      // When
      const entity = mapper.fromDomain(talk);

      // Then
      expect(entity).toEqual(
        getTalkWithDetailEntity(
          $Enums.TalkStatus.PENDING_APPROVAL,
          prisma,
          $Enums.TalkLevel.BEGINNER,
          $Enums.UserType.SPEAKER,
        ),
      );
    },
  );

  it.each(talkSubjectMappings)(
    'should map TalkEntity to Talk for subject %s',
    ({ domain, prisma }) => {
      // Given
      const entity: TalkEntity & {
        room: RoomEntity;
        speaker: Omit<UserEntity, 'password'>;
      } = getTalkWithDetailEntity(
        $Enums.TalkStatus.PENDING_APPROVAL,
        prisma,
        $Enums.TalkLevel.BEGINNER,
        $Enums.UserType.SPEAKER,
      );

      // When
      const talk = mapper.toDomain(entity);

      // Then
      expect(talk).toEqual(
        getTalkWithDetailModel(
          TalkStatus.PENDING_APPROVAL,
          domain,
          TalkLevel.BEGINNER,
          UserType.SPEAKER,
        ),
      );
    },
  );

  it.each(talkLevelMappings)(
    'should map Talk to TalkEntity for level %s',
    ({ domain, prisma }) => {
      // Given
      const talk: TalkWithDetail = getTalkWithDetailModel(
        TalkStatus.PENDING_APPROVAL,
        TalkSubject.WEB_DEVELOPMENT,
        domain,
        UserType.SPEAKER,
      );

      // When
      const entity = mapper.fromDomain(talk);

      // Then
      expect(entity).toEqual(
        getTalkWithDetailEntity(
          $Enums.TalkStatus.PENDING_APPROVAL,
          $Enums.TalkSubject.WEB_DEVELOPMENT,
          prisma,
          $Enums.UserType.SPEAKER,
        ),
      );
    },
  );

  it.each(talkLevelMappings)(
    'should map TalkEntity to Talk for level %s',
    ({ domain, prisma }) => {
      // Given
      const entity: TalkEntity & {
        room: RoomEntity;
        speaker: Omit<UserEntity, 'password'>;
      } = getTalkWithDetailEntity(
        $Enums.TalkStatus.PENDING_APPROVAL,
        $Enums.TalkSubject.WEB_DEVELOPMENT,
        prisma,
        UserType.SPEAKER,
      );

      // When
      const talk = mapper.toDomain(entity);

      // Then
      expect(talk).toEqual(
        getTalkWithDetailModel(
          TalkStatus.PENDING_APPROVAL,
          TalkSubject.WEB_DEVELOPMENT,
          domain,
          UserType.SPEAKER,
        ),
      );
    },
  );

  it.each(userTypeMappings)(
    'should map Talk to TalkEntity for userType %s',
    ({ domain, prisma }) => {
      // Given
      const talk: TalkWithDetail = getTalkWithDetailModel(
        TalkStatus.PENDING_APPROVAL,
        TalkSubject.WEB_DEVELOPMENT,
        TalkLevel.BEGINNER,
        domain,
      );

      // When
      const entity = mapper.fromDomain(talk);

      // Then
      expect(entity).toEqual(
        getTalkWithDetailEntity(
          $Enums.TalkStatus.PENDING_APPROVAL,
          $Enums.TalkSubject.WEB_DEVELOPMENT,
          $Enums.TalkLevel.BEGINNER,
          prisma,
        ),
      );
    },
  );

  it.each(userTypeMappings)(
    'should map TalkEntity to Talk for userType %s',
    ({ domain, prisma }) => {
      // Given
      const entity: TalkEntity & {
        room: RoomEntity;
        speaker: Omit<UserEntity, 'password'>;
      } = getTalkWithDetailEntity(
        $Enums.TalkStatus.PENDING_APPROVAL,
        $Enums.TalkSubject.WEB_DEVELOPMENT,
        $Enums.TalkLevel.BEGINNER,
        prisma,
      );

      // When
      const talk = mapper.toDomain(entity);

      // Then
      expect(talk).toEqual(
        getTalkWithDetailModel(
          TalkStatus.PENDING_APPROVAL,
          TalkSubject.WEB_DEVELOPMENT,
          TalkLevel.BEGINNER,
          domain,
        ),
      );
    },
  );

  it('should throw an error for an invalid talk status', () => {
    // Given
    const invalidEntity = getTalkWithDetailEntity(
      'INVALID_STATUS' as $Enums.TalkStatus,
      $Enums.TalkSubject.WEB_DEVELOPMENT,
      $Enums.TalkLevel.BEGINNER,
      $Enums.UserType.SPEAKER,
    );

    // When & Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow('Invalid talk status');
  });

  it('should throw an error for an invalid talk subject', () => {
    // Given
    const invalidEntity = getTalkWithDetailEntity(
      $Enums.TalkStatus.PENDING_APPROVAL,
      'INVALID_SUBJECT' as $Enums.TalkSubject,
      $Enums.TalkLevel.BEGINNER,
      $Enums.UserType.SPEAKER,
    );

    // When & Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow(
      'Invalid talk subject',
    );
  });

  it('should throw an error for an invalid talk level', () => {
    // Given
    const invalidEntity = getTalkWithDetailEntity(
      $Enums.TalkStatus.PENDING_APPROVAL,
      $Enums.TalkSubject.WEB_DEVELOPMENT,
      'INVALID_LEVEL' as $Enums.TalkLevel,
      $Enums.UserType.SPEAKER,
    );

    // When & Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow('Invalid talk level');
  });

  it('should throw an error for an invalid user type', () => {
    // Given
    const invalidEntity = getTalkWithDetailEntity(
      $Enums.TalkStatus.PENDING_APPROVAL,
      $Enums.TalkSubject.WEB_DEVELOPMENT,
      $Enums.TalkLevel.BEGINNER,
      'INVALID_TYPE' as $Enums.UserType,
    );

    // When & Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow('Invalid user type');
  });

  function getTalkWithDetailModel(
    status: TalkStatus,
    subject: TalkSubject,
    level: TalkLevel,
    userType: UserType,
  ): TalkWithDetail {
    return {
      id: 'talk-1',
      status,
      title: 'Introduction to TypeScript',
      subject,
      description: 'A beginner-friendly talk on TypeScript.',
      speakerId: 'user-1',
      roomId: 'room-1',
      level,
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
        type: userType,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
    };
  }

  function getTalkWithDetailEntity(
    status: $Enums.TalkStatus,
    subject: $Enums.TalkSubject,
    level: $Enums.TalkLevel,
    userType: $Enums.UserType,
  ): TalkEntity & {
    room: RoomEntity;
    speaker: Omit<UserEntity, 'password'>;
  } {
    return {
      id: 'talk-1',
      status,
      title: 'Introduction to TypeScript',
      subject,
      description: 'A beginner-friendly talk on TypeScript.',
      speakerId: 'user-1',
      roomId: 'room-1',
      level,
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
        type: userType,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      },
    };
  }
});
