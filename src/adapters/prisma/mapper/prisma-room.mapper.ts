import { EntityMapper } from '../../../core/base/entity-mapper';
import { Room } from '../../../core/domain/model/Room';
import { Room as RoomEntity } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRoomMapper implements EntityMapper<Room, RoomEntity> {
  fromDomain(model: Room): RoomEntity {
    return {
      id: model.id,
      name: model.name,
      capacity: model.capacity,
      updatedAt: model.updatedAt,
      createdAt: model.createdAt,
    };
  }

  toDomain(entity: RoomEntity): Room {
    return {
      id: entity.id,
      name: entity.name,
      capacity: entity.capacity,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
