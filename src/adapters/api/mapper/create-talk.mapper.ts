import { CreateTalkCommand } from '../../../core/usecases/create-talk-creation-request.use-case';
import { CreateTalkRequest } from '../request/create-talk.request';
import { CreateTalkResponse } from '../response/create-talk.response';
import { Talk } from '../../../core/domain/model/Talk';

export class CreateTalkMapper {
  static toDomain(
    speakerId: string,
    request: CreateTalkRequest,
  ): CreateTalkCommand {
    return {
      title: request.title,
      subject: request.subject,
      description: request.description,
      speakerId: speakerId,
      roomId: request.roomId,
      level: request.level,
      startTime: new Date(request.startTime),
      endTime: new Date(request.endTime),
    };
  }

  static fromDomain(talk: Talk): CreateTalkResponse {
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
