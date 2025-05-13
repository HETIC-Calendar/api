import { EntityMapper } from '../../../core/base/entity-mapper';
import { Talk } from '../../../core/domain/model/Talk';
import { Talk as TalkEntity } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTalkMapper implements EntityMapper<Talk, TalkEntity> {
  fromDomain(model: Talk): TalkEntity {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      speaker: model.speaker,
      roomId: model.roomId,
      startTime: model.startTime,
      endTime: model.endTime,
      updatedAt: model.updatedAt,
      createdAt: model.createdAt,
    };
  }

  toDomain(entity: TalkEntity): Talk {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      speaker: entity.speaker,
      roomId: entity.roomId,
      startTime: entity.startTime,
      endTime: entity.endTime,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
