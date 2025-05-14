import { ApiProperty } from '@nestjs/swagger';
import { CreateTalkResponse } from './create-talk.response';

export class GetAllTalksResponse {
  @ApiProperty({ type: [CreateTalkResponse] })
  talks: CreateTalkResponse[];

  constructor(talks: CreateTalkResponse[]) {
    this.talks = talks;
  }
}
