import { ApiProperty } from '@nestjs/swagger';
import { TalkLevel } from '../../../core/domain/type/TalkLevel';
import { TalkSubject } from '../../../core/domain/type/TalkSubject';
import {
  IsDateString,
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTalkRequest {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  title: string;

  @ApiProperty({ enum: TalkSubject })
  @IsEnum(TalkSubject)
  subject: TalkSubject;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(512)
  description: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  speaker: string;

  @ApiProperty()
  @IsUUID()
  roomId: string;

  @ApiProperty({ enum: TalkLevel })
  @IsEnum(TalkLevel)
  level: TalkLevel;

  @ApiProperty()
  @IsDateString()
  startTime: string;

  @ApiProperty()
  @IsDateString()
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
