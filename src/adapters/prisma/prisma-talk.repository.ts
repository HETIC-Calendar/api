import { Injectable } from '@nestjs/common';
import { TalkRepository } from '../../core/domain/repository/talk.repository';
import { Talk } from '../../core/domain/model/Talk';
import { PrismaService } from './prisma.service';
import { PrismaTalkMapper } from './mapper/prisma-talk.mapper';
import { TalkStatus } from '../../core/domain/type/TalkStatus';
import { TalkWithDetail } from '../../core/domain/model/TalkWithDetail';
import { PrismaTalkWithDetailMapper } from './mapper/prisma-talk-with-detail.mapper';

@Injectable()
export class PrismaTalkRepository implements TalkRepository {
  private mapper: PrismaTalkMapper = new PrismaTalkMapper();
  private mapperWithDetail: PrismaTalkWithDetailMapper =
    new PrismaTalkWithDetailMapper();

  constructor(private readonly prisma: PrismaService) {}

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

  async findByRoomIdAndStatuses(
    roomId: string,
    statuses: TalkStatus[] = [],
  ): Promise<Talk[]> {
    const entities = await this.prisma.talk.findMany({
      where: {
        roomId,
        status: { in: statuses },
      },
    });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByStatusWithDetails(
    status?: TalkStatus,
  ): Promise<TalkWithDetail[]> {
    const talks = await this.prisma.talk.findMany({
      where: status ? { status } : undefined,
      include: { room: true, speaker: true },
    });

    return talks.map((entity) => this.mapperWithDetail.toDomain(entity));
  }

  async findAllWithRoomDetail(): Promise<TalkWithDetail[]> {
    const talks = await this.prisma.talk.findMany({
      include: { room: true, speaker: true },
    });

    return talks.map((entity) => this.mapperWithDetail.toDomain(entity));
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
