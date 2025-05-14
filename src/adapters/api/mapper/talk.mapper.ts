import { CreateTalkCommand } from '../../../core/usecases/create-talk.use-case';
import { CreateTalkRequest } from '../request/create-talk.request';

export class TalkMapper {
  static toDomain(request: CreateTalkRequest): CreateTalkCommand {
    return {
      title: request.title,
      description: request.description,
      speaker: request.speaker,
      roomId: request.roomId,
      startTime: new Date(request.startTime),
      endTime: new Date(request.endTime),
    };
  }
}
