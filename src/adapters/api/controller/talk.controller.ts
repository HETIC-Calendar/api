import { Body, Controller, Post } from '@nestjs/common';
import { CreateTalkCreationRequestUseCase } from '../../../core/usecases/create-talk-creation-request.use-case';
import { CreateTalkRequest } from '../request/create-talk.request';
import { TalkMapper } from '../mapper/talk.mapper';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateTalkResponse } from '../response/create-talk.response';

@Controller('/talks')
export class TalkController {
  constructor(
    private readonly createTalkUseCase: CreateTalkCreationRequestUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new talk' })
  @ApiCreatedResponse({
    description: 'Talk successfully created',
    type: CreateTalkRequest,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or validation error',
  })
  @ApiNotFoundResponse({
    description:
      'Referenced resource not found (e.g. linked room if applicable)',
  })
  @ApiConflictResponse({
    description:
      'Talk creation failed due to conflict (e.g. duplicate talk or scheduling overlap)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async createTalk(
    @Body() body: CreateTalkRequest,
  ): Promise<CreateTalkResponse> {
    const command = TalkMapper.toDomain(body);
    const talk = await this.createTalkUseCase.execute(command);
    return TalkMapper.fromDomain(talk);
  }
}
