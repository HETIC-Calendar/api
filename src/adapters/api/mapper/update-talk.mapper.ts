import { Talk } from '../../../core/domain/model/Talk';
import { UpdateTalkRequest } from '../request/update-talk.request';
import { UpdateTalkCommand } from '../../../core/usecases/update-talk-creation-request.use-case';
import { UpdateTalkResponse } from '../response/update-talk.response';
import { ProfileRequest } from '../request/profile.request';

export class UpdateTalkMapper {
  static toDomain(
    currentUser: ProfileRequest,
    talkId: string,
    request: UpdateTalkRequest,
  ): UpdateTalkCommand {
    return {
      currentUser,
      talkId,
      title: request.title,
      subject: request.subject,
      description: request.description,
      roomId: request.roomId,
      level: request.level,
      startTime: new Date(request.startTime),
      endTime: new Date(request.endTime),
    };
  }

  static fromDomain(talk: Talk): UpdateTalkResponse {
    return {
      id: talk.id,
      status: talk.status,
      title: talk.title,
      subject: talk.subject,
      description: talk.description,
      speakerId: talk.speakerId,
      roomId: talk.roomId,
      level: talk.level,
      startTime: talk.startTime.toISOString(),
      endTime: talk.endTime.toISOString(),
      createdAt: talk.createdAt,
      updatedAt: talk.updatedAt,
    };
  }
}
