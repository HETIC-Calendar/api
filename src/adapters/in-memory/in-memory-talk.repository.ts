import { Injectable } from '@nestjs/common';
import { TalkRepository } from '../../core/domain/repository/talk.repository';
import { Talk } from '../../core/domain/model/Talk';
import { TalkStatus } from '../../core/domain/type/TalkStatus';
import { RoomRepository } from '../../core/domain/repository/room.repository';
import { TalkWithRoomDetail } from '../../core/domain/model/TalkWithRoomDetail';
import { Room } from '../../core/domain/model/Room';

@Injectable()
export class InMemoryTalkRepository implements TalkRepository {
  private talks: Map<string, Talk> = new Map();

  constructor(private readonly roomRepository: RoomRepository) {}

  create(talk: Talk): any {
    this.talks.set(talk.id, talk);
    return talk;
  }

  findById(id: string): Talk | null {
    return this.talks.get(id) || null;
  }

  findAll(): Talk[] {
    return Array.from(this.talks.values());
  }

  findByRoomIdAndStatuses(
    roomId: string,
    statuses: TalkStatus[] = [],
  ): Promise<Talk[]> | Talk[] {
    return Array.from(this.talks.values()).filter(
      (talk) => talk.roomId === roomId && statuses.includes(talk.status),
    );
  }

  async findByStatusWithRoomDetails(
    status?: TalkStatus,
  ): Promise<TalkWithRoomDetail[]> {
    const rooms = await this.roomRepository.findAll();
    const talks = status
      ? Array.from(this.talks.values()).filter((talk) => talk.status === status)
      : Array.from(this.talks.values());

    return this.enrichTalksWithRoomDetails(talks, rooms);
  }

  async findAllWithRoomDetail(): Promise<TalkWithRoomDetail[]> {
    const rooms = await this.roomRepository.findAll();
    const talks = Array.from(this.talks.values());
    return this.enrichTalksWithRoomDetails(talks, rooms);
  }

  private enrichTalksWithRoomDetails(
    talks: Talk[],
    rooms: Room[],
  ): TalkWithRoomDetail[] {
    return talks.map((talk) => {
      const room = rooms.find((room) => room.id === talk.roomId);
      return new TalkWithRoomDetail(
        talk.id,
        talk.status,
        talk.title,
        talk.subject,
        talk.description,
        talk.speaker,
        talk.roomId,
        talk.level,
        talk.startTime,
        talk.endTime,
        room || ({} as Room),
        talk.updatedAt,
        talk.createdAt,
      );
    });
  }

  update(id: string, talk: Talk): Talk | null {
    if (!this.talks.has(id)) {
      return null;
    }
    this.talks.set(id, talk);
    return talk;
  }

  remove(id: string): void {
    this.talks.delete(id);
  }

  removeAll(): void {
    this.talks.clear();
  }
}
