import { Body, Controller, Post } from '@nestjs/common';
import { CreateTalkUseCase } from '../../../core/usecases/create-talk.use-case';
import { Talk } from '../../../core/domain/model/Talk';
import { CreateTalkRequest } from '../request/create-talk.request';
import { TalkMapper } from '../mapper/talk.mapper';

@Controller('/talks')
export class TalkController {
  constructor(private readonly createTalkUseCase: CreateTalkUseCase) {}

  @Post()
  async createTalk(@Body() body: CreateTalkRequest): Promise<Talk> {
    const command = TalkMapper.toDomain(body);
    return this.createTalkUseCase.execute(command);
  }
}
