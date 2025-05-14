import { ApiProperty } from '@nestjs/swagger';
import { TalkStatus } from '../../../core/domain/type/TalkStatus';

export class GetAllTalksByStatusRequest {
  @ApiProperty({ enum: TalkStatus })
  status: TalkStatus;

  constructor(status: TalkStatus) {
    this.status = status;
  }
}
