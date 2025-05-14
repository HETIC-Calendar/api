import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TalkStatus } from '@core/domain/type/TalkStatus';

export class GetAllTalksByStatusRequest {
  @ApiProperty({ enum: TalkStatus })
  @IsEnum(TalkStatus)
  status: TalkStatus;

  constructor(status: TalkStatus) {
    this.status = status;
  }
}
