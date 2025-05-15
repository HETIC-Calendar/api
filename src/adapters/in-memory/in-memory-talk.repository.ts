import { Injectable } from '@nestjs/common';
import { TalkRepository } from '../../core/domain/repository/talk.repository';
import { Talk } from '../../core/domain/model/Talk';
import { TalkStatus } from '../../core/domain/type/TalkStatus';
import { RoomRepository } from '../../core/domain/repository/room.repository';
import { TalkWithDetail } from '../../core/domain/model/TalkWithDetail';
import { Room } from '../../core/domain/model/Room';
import { User } from '../../core/domain/model/User';
import { UserRepository } from '../../core/domain/repository/user.repository';

@Injectable()
export class InMemoryTalkRepository implements TalkRepository {
  private talks: Map<string, Talk> = new Map();

  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
  ) {}

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

  async findByStatusWithDetails(
    status?: TalkStatus,
  ): Promise<TalkWithDetail[]> {
    const rooms = await this.roomRepository.findAll();
    const speakers = await this.userRepository.findAll();
    const talks = status
      ? Array.from(this.talks.values()).filter((talk) => talk.status === status)
      : Array.from(this.talks.values());

    return this.enrichTalksWithDetails(talks, rooms, speakers);
  }

  async findAllWithRoomDetail(): Promise<TalkWithDetail[]> {
    const rooms = await this.roomRepository.findAll();
    const speakers = await this.userRepository.findAll();
    const talks = Array.from(this.talks.values());
    return this.enrichTalksWithDetails(talks, rooms, speakers);
  }

  private enrichTalksWithDetails(
    talks: Talk[],
    rooms: Room[],
    speakers: User[],
  ): TalkWithDetail[] {
    return talks.map((talk) => {
      const room = rooms.find((room) => room.id === talk.roomId);
      const speaker = speakers.find((speaker) => speaker.id === talk.speakerId);
      return new TalkWithDetail(
        talk.id,
        talk.status,
        talk.title,
        talk.subject,
        talk.description,
        talk.speakerId,
        talk.roomId,
        talk.level,
        talk.startTime,
        talk.endTime,
        room || ({} as Room),
        speaker || ({} as User),
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
