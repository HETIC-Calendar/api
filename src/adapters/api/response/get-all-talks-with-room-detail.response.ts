import { ApiProperty } from '@nestjs/swagger';
import { TalkStatus } from '../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../core/domain/type/TalkLevel';

class RoomDetail {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  capacity: number;

  constructor(id: string, name: string, capacity: number) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
  }
}

class TalksWithRoomDetail {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: TalkStatus })
  status: TalkStatus;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: TalkSubject })
  subject: TalkSubject;

  @ApiProperty()
  description: string;

  @ApiProperty()
  speaker: string;

  @ApiProperty({ enum: TalkLevel })
  level: TalkLevel;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty({ type: () => RoomDetail })
  room: RoomDetail;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(
    id: string,
    status: TalkStatus,
    title: string,
    subject: TalkSubject,
    description: string,
    speaker: string,
    level: TalkLevel,
    startTime: string,
    endTime: string,
    room: RoomDetail,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.status = status;
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.speaker = speaker;
    this.level = level;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class GetAllTalksWithRoomDetailResponse {
  @ApiProperty({ type: [TalksWithRoomDetail] })
  talks: TalksWithRoomDetail[];

  constructor(talks: TalksWithRoomDetail[]) {
    this.talks = talks;
  }
}
