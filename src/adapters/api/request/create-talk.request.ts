import { ApiProperty } from '@nestjs/swagger';
import { TalkLevel } from '../../../core/domain/type/TalkLevel';
import { TalkSubject } from '../../../core/domain/type/TalkSubject';

export class CreateTalkRequest {
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

  @ApiProperty({ enum: TalkLevel })
  level: TalkLevel;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  constructor(
    title: string,
    subject: TalkSubject,
    description: string,
    speaker: string,
    roomId: string,
    level: TalkLevel,
    startTime: string,
    endTime: string,
  ) {
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.speaker = speaker;
    this.roomId = roomId;
    this.level = level;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
