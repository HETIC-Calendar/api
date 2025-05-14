import { CreateTalkCommand } from '../../../core/usecases/create-talk-creation-request.use-case';
import { CreateTalkRequest } from '../request/create-talk.request';
import { TalkSubject } from '../../../core/domain/type/TalkSubject';

export class TalkMapper {
  static toDomain(request: CreateTalkRequest): CreateTalkCommand {
    return {
      title: request.title,
      subject: this.mapTalkSubjectToDomain(request.subject),
      description: request.description,
      speaker: request.speaker,
      roomId: request.roomId,
      startTime: new Date(request.startTime),
      endTime: new Date(request.endTime),
    };
  }

  private static mapTalkSubjectToDomain(subject: string): TalkSubject {
    switch (subject) {
      case 'AI':
        return TalkSubject.AI;
      case 'WEB_DEVELOPMENT':
        return TalkSubject.WEB_DEVELOPMENT;
      case 'MOBILE_DEVELOPMENT':
        return TalkSubject.MOBILE_DEVELOPMENT;
      case 'DATA_SCIENCE':
        return TalkSubject.DATA_SCIENCE;
      case 'CLOUD_COMPUTING':
        return TalkSubject.CLOUD_COMPUTING;
      case 'DEVOPS':
        return TalkSubject.DEVOPS;
      case 'CYBER_SECURITY':
        return TalkSubject.CYBER_SECURITY;
      case 'BLOCKCHAIN':
        return TalkSubject.BLOCKCHAIN;
      case 'IOT':
        return TalkSubject.IOT;
      case 'GAME_DEVELOPMENT':
        return TalkSubject.GAME_DEVELOPMENT;
      default:
        throw new Error('Invalid talk subject');
    }
  }
}
