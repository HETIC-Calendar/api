import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ApproveOrRejectTalkRequest {
  @ApiProperty()
  @IsBoolean()
  isApproved: boolean;

  constructor(isApproved: boolean) {
    this.isApproved = isApproved;
  }
}
