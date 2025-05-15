import { Room } from './Room';
import { Talk } from './Talk';
import { TalkStatus } from '../type/TalkStatus';
import { TalkSubject } from '../type/TalkSubject';
import { TalkLevel } from '../type/TalkLevel';
import { User } from './User';

export class TalkWithDetail extends Talk {
  room: Room;
  speaker: Omit<User, 'password'>;

  constructor(
    id: string,
    status: TalkStatus,
    title: string,
    subject: TalkSubject,
    description: string,
    speakerId: string,
    roomId: string,
    level: TalkLevel,
    startTime: Date,
    endTime: Date,
    room: Room,
    speaker: User,
    updatedAt?: Date,
    createdAt?: Date,
  ) {
    super(
      id,
      status,
      title,
      subject,
      description,
      speakerId,
      roomId,
      level,
      startTime,
      endTime,
      updatedAt,
      createdAt,
    );
    this.room = room;
    this.speaker = speaker;
  }
}
