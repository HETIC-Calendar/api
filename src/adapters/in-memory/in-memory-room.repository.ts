import { Injectable } from '@nestjs/common';
import { Room } from '@core/domain/model/Room';
import { RoomRepository } from '@core/domain/repository/room.repository';

@Injectable()
export class InMemoryRoomRepository implements RoomRepository {
  private rooms: Map<string, Room> = new Map();

  create(room: Room): any {
    this.rooms.set(room.id, room);
    return room;
  }

  findById(id: string): Room | null {
    return this.rooms.get(id) || null;
  }

  findAll(): Room[] {
    return Array.from(this.rooms.values());
  }

  update(id: string, room: Room): Room | null {
    if (!this.rooms.has(id)) {
      return null;
    }
    this.rooms.set(id, room);
    return room;
  }

  remove(id: string): void {
    this.rooms.delete(id);
  }

  removeAll(): void {
    this.rooms.clear();
  }
}
