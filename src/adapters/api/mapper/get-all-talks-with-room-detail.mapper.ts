import { GetAllTalksWithRoomDetailResponse } from '../response/get-all-talks-with-room-detail.response';
import { TalkWithRoomDetail } from '../../../core/domain/model/TalkWithRoomDetail';

export class GetAllTalksWithRoomDetailMapper {
  static fromDomain(
    talksWithRoomDetail: TalkWithRoomDetail[],
  ): GetAllTalksWithRoomDetailResponse {
    return {
      talks: talksWithRoomDetail.map((talk) => ({
        id: talk.id,
        status: talk.status,
        title: talk.title,
        subject: talk.subject,
        description: talk.description,
        speaker: talk.speaker,
        level: talk.level,
        startTime: talk.startTime.toISOString(),
        endTime: talk.endTime.toISOString(),
        room: {
          id: talk.room.id,
          name: talk.room.name,
          capacity: talk.room.capacity,
        },
        createdAt: talk.createdAt,
        updatedAt: talk.updatedAt,
      })),
    };
  }
}
