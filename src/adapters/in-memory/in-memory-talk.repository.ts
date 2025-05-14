import { Injectable } from '@nestjs/common';
import { TalkRepository } from '../../core/domain/repository/talk.repository';
import { Talk } from '../../core/domain/model/Talk';
import { TalkStatus } from '../../core/domain/type/TalkStatus';

@Injectable()
export class InMemoryTalkRepository implements TalkRepository {
  private talks: Map<string, Talk> = new Map();

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

  findByStatus(status: TalkStatus): Promise<Talk[]> | Talk[] {
    return Array.from(this.talks.values()).filter(
      (talk) => talk.status === status,
    );
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
