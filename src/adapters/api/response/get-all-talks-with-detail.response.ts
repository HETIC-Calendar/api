import { ApiProperty } from '@nestjs/swagger';
import { TalkStatus } from '../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../core/domain/type/TalkSubject';
import { TalkLevel } from '../../../core/domain/type/TalkLevel';
import { UserType } from '../../../core/domain/type/UserType';

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

class SpeakerDetail {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserType })
  type: UserType;

  constructor(id: string, email: string, type: UserType) {
    this.id = id;
    this.email = email;
    this.type = type;
  }
}

class TalksWithDetail {
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

  @ApiProperty({ enum: TalkLevel })
  level: TalkLevel;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty({ type: () => RoomDetail })
  room: RoomDetail;

  @ApiProperty({ type: () => SpeakerDetail })
  speaker: SpeakerDetail;

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
    level: TalkLevel,
    startTime: string,
    endTime: string,
    room: RoomDetail,
    speaker: SpeakerDetail,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.status = status;
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.level = level;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.speaker = speaker;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class GetAllTalksWithDetailResponse {
  @ApiProperty({ type: [TalksWithDetail] })
  talks: TalksWithDetail[];

  constructor(talks: TalksWithDetail[]) {
    this.talks = talks;
  }
}
