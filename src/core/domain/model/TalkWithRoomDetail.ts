import { Room } from './Room';
import { Talk } from './Talk';
import { TalkStatus } from '../type/TalkStatus';
import { TalkSubject } from '../type/TalkSubject';
import { TalkLevel } from '../type/TalkLevel';

export class TalkWithRoomDetail extends Talk {
  room: Room;

  constructor(
    id: string,
    status: TalkStatus,
    title: string,
    subject: TalkSubject,
    description: string,
    speaker: string,
    roomId: string,
    level: TalkLevel,
    startTime: Date,
    endTime: Date,
    room: Room,
    updatedAt?: Date,
    createdAt?: Date,
  ) {
    super(
      id,
      status,
      title,
      subject,
      description,
      speaker,
      roomId,
      level,
      startTime,
      endTime,
      updatedAt,
      createdAt,
    );
    this.room = room;
  }
}
