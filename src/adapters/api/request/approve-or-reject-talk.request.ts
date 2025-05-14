import { ApiProperty } from '@nestjs/swagger';

export class ApproveOrRejectTalkRequest {
  @ApiProperty()
  isApproved: boolean;

  constructor(isApproved: boolean) {
    this.isApproved = isApproved;
  }
}
