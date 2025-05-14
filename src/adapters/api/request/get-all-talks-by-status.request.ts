import { ApiProperty } from '@nestjs/swagger';
import { TalkStatus } from '../../../core/domain/type/TalkStatus';
import { IsEnum } from 'class-validator';

export class GetAllTalksByStatusRequest {
  @ApiProperty({ enum: TalkStatus })
  @IsEnum(TalkStatus)
  status: TalkStatus;

  constructor(status: TalkStatus) {
    this.status = status;
  }
}
