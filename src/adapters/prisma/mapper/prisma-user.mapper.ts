import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '@prisma/client';
import { EntityMapper } from '@core/base/entity-mapper';
import { User } from '@core/domain/model/User';

@Injectable()
export class PrismaUserMapper implements EntityMapper<User, UserEntity> {
  fromDomain(model: User): UserEntity {
    return {
      id: model.id,
      email: model.email,
      password: model.password,
      updatedAt: model.updatedAt,
      createdAt: model.createdAt,
    };
  }

  toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
