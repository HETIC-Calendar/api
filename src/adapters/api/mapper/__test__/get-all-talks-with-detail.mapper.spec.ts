import { GetAllTalksWithDetailMapper } from '../get-all-talks-with-detail.mapper';
import { TalkStatus } from '../../../../core/domain/type/TalkStatus';
import { TalkWithDetail } from '../../../../core/domain/model/TalkWithDetail';
import { TalkSubject } from '../../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../../core/domain/type/TalkLevel';
import { UserType } from '../../../../core/domain/type/UserType';

describe('GetAllTalksWithDetailMapper', () => {
  it('should map TalkWithDetail array to GetAllTalksWithDetailResponse', () => {
    // Given
    const talksWithDetail: TalkWithDetail[] = [
      {
        id: 'talk-1',
        status: TalkStatus.APPROVED,
        title: 'Advanced TypeScript',
        subject: TalkSubject.WEB_DEVELOPMENT,
        description: 'An advanced talk on TypeScript features.',
        level: TalkLevel.INTERMEDIATE,
        speakerId: 'user-1',
        roomId: 'room-1',
        startTime: new Date('2023-10-02T10:00:00Z'),
        endTime: new Date('2023-10-02T11:00:00Z'),
        room: {
          id: 'room-1',
          name: 'Room 1',
          capacity: 50,
          createdAt: new Date('2023-10-01T10:00:00Z'),
          updatedAt: new Date('2023-10-01T11:00:00Z'),
        },
        speaker: {
          id: 'user-1',
          email: 'user@example.com',
          type: UserType.SPEAKER,
          createdAt: new Date('2023-10-01T10:00:00Z'),
          updatedAt: new Date('2023-10-01T11:00:00Z'),
        },
        createdAt: new Date('2023-10-01T10:00:00Z'),
        updatedAt: new Date('2023-10-01T11:00:00Z'),
      },
    ];

    // When
    const response = GetAllTalksWithDetailMapper.fromDomain(talksWithDetail);

    // Then
    expect(response).toEqual({
      talks: [
        {
          id: 'talk-1',
          status: TalkStatus.APPROVED,
          title: 'Advanced TypeScript',
          subject: TalkSubject.WEB_DEVELOPMENT,
          description: 'An advanced talk on TypeScript features.',
          level: TalkLevel.INTERMEDIATE,
          startTime: '2023-10-02T10:00:00.000Z',
          endTime: '2023-10-02T11:00:00.000Z',
          room: {
            id: 'room-1',
            name: 'Room 1',
            capacity: 50,
          },
          speaker: {
            id: 'user-1',
            email: 'user@example.com',
            type: UserType.SPEAKER,
          },
          createdAt: new Date('2023-10-01T10:00:00Z'),
          updatedAt: new Date('2023-10-01T11:00:00Z'),
        },
      ],
    });
  });
});
