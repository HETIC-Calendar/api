import { RoomRepository } from '../../core/domain/repository/room.repository';
import { Room } from '../../core/domain/model/Room';
import { PrismaService } from './prisma.service';
import { PrismaRoomMapper } from './mapper/prisma-room.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
  private mapper: PrismaRoomMapper = new PrismaRoomMapper();

  constructor(private readonly prisma: PrismaService) {
    this.mapper = new PrismaRoomMapper();
  }

  async create(room: Room): Promise<Room> {
    const entity = this.mapper.fromDomain(room);
    const createdEntity = await this.prisma.room.create({ data: entity });
    return this.mapper.toDomain(createdEntity);
  }

  async findById(id: string): Promise<Room | null> {
    const entity = await this.prisma.room.findUnique({ where: { id } });
    if (!entity) {
      return null;
    }
    return this.mapper.toDomain(entity);
  }

  async findAll(): Promise<Room[]> {
    const entities = await this.prisma.room.findMany();
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async update(id: string, room: Room): Promise<Room | null> {
    const updatedEntity = await this.prisma.room.update({
      where: { id },
      data: room,
    });
    if (!updatedEntity) {
      return null;
    }
    return this.mapper.toDomain(updatedEntity);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.room.delete({ where: { id } });
  }
}
