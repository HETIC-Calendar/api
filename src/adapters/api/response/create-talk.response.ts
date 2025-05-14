import { ApiProperty } from '@nestjs/swagger';
import { TalkStatus } from '../../../core/domain/type/TalkStatus';
import { TalkSubject } from '../../../core/domain/type/TalkSubject';

export class CreateTalkResponse {
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

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

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
    roomId: string,
    startTime: string,
    endTime: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.status = status;
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.speaker = speaker;
    this.roomId = roomId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
