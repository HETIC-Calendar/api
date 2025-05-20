import { PrismaTalkMapper } from '../prisma-talk.mapper';
import { Talk } from '../../../../core/domain/model/Talk';
import { $Enums, Talk as TalkEntity } from '@prisma/client';
import { TalkStatus } from '../../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../../core/domain/type/TalkLevel';

describe('PrismaTalkMapper', () => {
  const mapper = new PrismaTalkMapper();

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

  it.each(talkStatusMappings)(
    'should map Talk to TalkEntity for status %s',
    ({ domain, prisma }) => {
      // Given
      const talk = getTalkModel(
        domain,
        TalkSubject.WEB_DEVELOPMENT,
        TalkLevel.BEGINNER,
      );

      // When
      const entity = mapper.fromDomain(talk);

      // Then
      expect(entity).toEqual({
        id: 'talk-1',
        status: prisma,
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
    },
  );

  it.each(talkStatusMappings)(
    'should map TalkEntity to Talk for status %s',
    ({ domain, prisma }) => {
      // Given
      const entity = getTalkEntity(
        prisma,
        $Enums.TalkSubject.WEB_DEVELOPMENT,
        $Enums.TalkLevel.BEGINNER,
      );

      // When
      const talk = mapper.toDomain(entity);

      // Then
      expect(talk).toEqual({
        id: 'talk-1',
        status: domain,
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
    },
  );

  it.each(talkSubjectMappings)(
    'should map Talk to TalkEntity for subject %s',
    ({ domain, prisma }) => {
      // Given
      const talk = getTalkModel(
        TalkStatus.PENDING_APPROVAL,
        domain,
        TalkLevel.BEGINNER,
      );

      // When
      const entity = mapper.fromDomain(talk);

      // Then
      expect(entity).toEqual({
        id: 'talk-1',
        status: $Enums.TalkStatus.PENDING_APPROVAL,
        title: 'Introduction to TypeScript',
        subject: prisma,
        description: 'A beginner-friendly talk on TypeScript.',
        speakerId: 'user-1',
        roomId: 'room-1',
        level: $Enums.TalkLevel.BEGINNER,
        startTime: new Date('2023-10-02T09:00:00Z'),
        endTime: new Date('2023-10-02T10:00:00Z'),
        updatedAt: new Date('2023-10-01T08:00:00Z'),
        createdAt: new Date('2023-10-01T08:00:00Z'),
      });
    },
  );

  it.each(talkSubjectMappings)(
    'should map TalkEntity to Talk for subject %s',
    ({ domain, prisma }) => {
      // Given
      const entity = getTalkEntity(
        $Enums.TalkStatus.PENDING_APPROVAL,
        prisma,
        $Enums.TalkLevel.BEGINNER,
      );

      // When
      const talk = mapper.toDomain(entity);

      // Then
      expect(talk).toEqual({
        id: 'talk-1',
        status: TalkStatus.PENDING_APPROVAL,
        title: 'Introduction to TypeScript',
        subject: domain,
        description: 'A beginner-friendly talk on TypeScript.',
        speakerId: 'user-1',
        roomId: 'room-1',
        level: TalkLevel.BEGINNER,
        startTime: new Date('2023-10-02T09:00:00Z'),
        endTime: new Date('2023-10-02T10:00:00Z'),
        updatedAt: new Date('2023-10-01T08:00:00Z'),
        createdAt: new Date('2023-10-01T08:00:00Z'),
      });
    },
  );

  it.each(talkLevelMappings)(
    'should map Talk to TalkEntity for level %s',
    ({ domain, prisma }) => {
      // Given
      const talk = getTalkModel(
        TalkStatus.PENDING_APPROVAL,
        TalkSubject.WEB_DEVELOPMENT,
        domain,
      );

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
        level: prisma,
        startTime: new Date('2023-10-02T09:00:00Z'),
        endTime: new Date('2023-10-02T10:00:00Z'),
        updatedAt: new Date('2023-10-01T08:00:00Z'),
        createdAt: new Date('2023-10-01T08:00:00Z'),
      });
    },
  );

  it.each(talkLevelMappings)(
    'should map TalkEntity to Talk for level %s',
    ({ domain, prisma }) => {
      // Given
      const entity = getTalkEntity(
        $Enums.TalkStatus.PENDING_APPROVAL,
        $Enums.TalkSubject.WEB_DEVELOPMENT,
        prisma,
      );

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
        level: domain,
        startTime: new Date('2023-10-02T09:00:00Z'),
        endTime: new Date('2023-10-02T10:00:00Z'),
        updatedAt: new Date('2023-10-01T08:00:00Z'),
        createdAt: new Date('2023-10-01T08:00:00Z'),
      });
    },
  );

  it('should throw an error for an invalid talk status', () => {
    // Given
    const invalidEntity = getTalkEntity(
      'INVALID_STATUS' as $Enums.TalkStatus,
      $Enums.TalkSubject.WEB_DEVELOPMENT,
      $Enums.TalkLevel.BEGINNER,
    );

    // When / Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow('Invalid talk status');
  });

  it('should throw an error for an invalid talk subject', () => {
    // Given
    const invalidEntity = getTalkEntity(
      $Enums.TalkStatus.PENDING_APPROVAL,
      'INVALID_SUBJECT' as $Enums.TalkSubject,
      $Enums.TalkLevel.BEGINNER,
    );

    // When / Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow(
      'Invalid talk subject',
    );
  });

  it('should throw an error for an invalid talk level', () => {
    // Given
    const invalidEntity = getTalkEntity(
      $Enums.TalkStatus.PENDING_APPROVAL,
      $Enums.TalkSubject.WEB_DEVELOPMENT,
      'INVALID_LEVEL' as $Enums.TalkLevel,
    );

    // When / Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow('Invalid talk level');
  });

  function getTalkModel(
    status: TalkStatus,
    subject: TalkSubject,
    level: TalkLevel,
  ): Talk {
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
    };
  }

  function getTalkEntity(
    status: $Enums.TalkStatus,
    subject: $Enums.TalkSubject,
    level: $Enums.TalkLevel,
  ): TalkEntity {
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
    };
  }
});
