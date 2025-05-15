import { GetAllTalksWithDetailResponse } from '../response/get-all-talks-with-detail.response';
import { TalkWithDetail } from '../../../core/domain/model/TalkWithDetail';

export class GetAllTalksWithDetailMapper {
  static fromDomain(
    talksWithDetail: TalkWithDetail[],
  ): GetAllTalksWithDetailResponse {
    return {
      talks: talksWithDetail.map((talk) => ({
        id: talk.id,
        status: talk.status,
        title: talk.title,
        subject: talk.subject,
        description: talk.description,
        level: talk.level,
        startTime: talk.startTime.toISOString(),
        endTime: talk.endTime.toISOString(),
        room: {
          id: talk.room.id,
          name: talk.room.name,
          capacity: talk.room.capacity,
        },
        speaker: {
          id: talk.speaker.id,
          email: talk.speaker.email,
          type: talk.speaker.type,
        },
        createdAt: talk.createdAt,
        updatedAt: talk.updatedAt,
      })),
    };
  }
}
