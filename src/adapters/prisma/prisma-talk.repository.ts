import { TalkRepository } from '../../core/domain/repository/talk.repository';
import { Talk } from '../../core/domain/model/Talk';
import { PrismaService } from './prisma.service';
import { PrismaTalkMapper } from './mapper/prisma-talk.mapper';
import { Injectable } from '@nestjs/common';
import { TalkStatus } from '../../core/domain/type/TalkStatus';

@Injectable()
export class PrismaTalkRepository implements TalkRepository {
  private mapper: PrismaTalkMapper = new PrismaTalkMapper();

  constructor(private readonly prisma: PrismaService) {
    this.mapper = new PrismaTalkMapper();
  }

  async create(talk: Talk): Promise<Talk> {
    const entity = this.mapper.fromDomain(talk);
    const createdEntity = await this.prisma.talk.create({ data: entity });
    return this.mapper.toDomain(createdEntity);
  }

  async findById(id: string): Promise<Talk | null> {
    const entity = await this.prisma.talk.findUnique({ where: { id } });
    if (!entity) {
      return null;
    }
    return this.mapper.toDomain(entity);
  }

  async findAll(): Promise<Talk[]> {
    const entities = await this.prisma.talk.findMany();
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByRoomId(roomId: string): Promise<Talk[]> {
    const entities = await this.prisma.talk.findMany({
      where: { roomId },
    });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByStatus(status: TalkStatus): Promise<Talk[]> {
    const entities = await this.prisma.talk.findMany({
      where: { status },
    });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async update(id: string, talk: Talk): Promise<Talk | null> {
    const updatedEntity = await this.prisma.talk.update({
      where: { id },
      data: talk,
    });
    if (!updatedEntity) {
      return null;
    }
    return this.mapper.toDomain(updatedEntity);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.talk.delete({ where: { id } });
  }

  removeAll(): void {
    throw new Error('Method not implemented.');
  }
}
