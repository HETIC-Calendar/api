import { EntityMapper } from '../../../core/base/entity-mapper';
import { Talk as TalkEntity, Room as RoomEntity, $Enums } from '@prisma/client';
import { TalkSubject } from '../../../core/domain/type/TalkSubject';
import { TalkStatus } from '../../../core/domain/type/TalkStatus';
import { TalkLevel } from '../../../core/domain/type/TalkLevel';
import { TalkWithRoomDetail } from '../../../core/domain/model/TalkWithRoomDetail';

type TalkEntityWithRoom = TalkEntity & { room: RoomEntity };

export class PrismaTalkWithRoomMapper
  implements EntityMapper<TalkWithRoomDetail, TalkEntityWithRoom>
{
  fromDomain(model: TalkWithRoomDetail): TalkEntityWithRoom {
    return {
      id: model.id,
      status: model.status,
      title: model.title,
      subject: model.subject,
      description: model.description,
      speaker: model.speaker,
      roomId: model.roomId,
      level: model.level,
      startTime: model.startTime,
      endTime: model.endTime,
      updatedAt: model.updatedAt,
      createdAt: model.createdAt,
      room: {
        id: model.room.id,
        name: model.room.name,
        capacity: model.room.capacity,
        updatedAt: model.room.updatedAt,
        createdAt: model.room.createdAt,
      },
    };
  }

  toDomain(entity: TalkEntityWithRoom): TalkWithRoomDetail {
    return {
      id: entity.id,
      status: this.mapTalkStatusToDomain(entity.status),
      title: entity.title,
      subject: this.mapTalkSubjectToDomain(entity.subject),
      description: entity.description,
      speaker: entity.speaker,
      roomId: entity.roomId,
      level: this.mapTalkLevelToDomain(entity.level),
      startTime: entity.startTime,
      endTime: entity.endTime,
      room: {
        id: entity.room.id,
        name: entity.room.name,
        capacity: entity.room.capacity,
        updatedAt: entity.room.updatedAt,
        createdAt: entity.room.createdAt,
      },
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }

  private mapTalkStatusToDomain(status: $Enums.TalkStatus): TalkStatus {
    switch (status) {
      case 'PENDING_APPROVAL':
        return TalkStatus.PENDING_APPROVAL;
      case 'APPROVED':
        return TalkStatus.APPROVED;
      case 'REJECTED':
        return TalkStatus.REJECTED;
      default:
        throw new Error('Invalid talk status');
    }
  }

  private mapTalkSubjectToDomain(subject: $Enums.TalkSubject): TalkSubject {
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

  private mapTalkLevelToDomain(level: $Enums.TalkLevel): TalkLevel {
    switch (level) {
      case 'BEGINNER':
        return TalkLevel.BEGINNER;
      case 'INTERMEDIATE':
        return TalkLevel.INTERMEDIATE;
      case 'ADVANCED':
        return TalkLevel.ADVANCED;
      default:
        throw new Error('Invalid talk level');
    }
  }
}
