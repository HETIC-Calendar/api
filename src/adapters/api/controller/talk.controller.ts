import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateTalkCreationRequestUseCase } from '../../../core/usecases/create-talk-creation-request.use-case';
import { ApproveOrRejectTalkUseCase } from '../../../core/usecases/approve-or-reject-talk-use.case';
import { CreateTalkRequest } from '../request/create-talk.request';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateTalkResponse } from '../response/create-talk.response';
import { ApproveOrRejectTalkMapper } from '../mapper/approve-or-reject-talk.mapper';
import { ApproveOrRejectTalkRequest } from '../request/approve-or-reject-talk.request';
import { CreateTalkMapper } from '../mapper/create-talk.mapper';

@Controller('/talks')
export class TalkController {
  constructor(
    private readonly createTalkUseCase: CreateTalkCreationRequestUseCase,
    private readonly approveOrRejectTalkUseCase: ApproveOrRejectTalkUseCase,
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
    const command = CreateTalkMapper.toDomain(body);
    const talk = await this.createTalkUseCase.execute(command);
    return CreateTalkMapper.fromDomain(talk);
  }

  @Post('/:talkId/approve-or-reject')
  @ApiOperation({ summary: 'Accept or reject a talk' })
  @ApiNoContentResponse({
    description: 'Talk successfully accepted or rejected',
    type: CreateTalkRequest,
  })
  @ApiNotFoundResponse({
    description: 'Talk not found (e.g. invalid talk ID or talk does not exist)',
  })
  @ApiConflictResponse({
    description:
      'Talk already approved or rejected (e.g. cannot change status)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async approveOrRejectTalk(
    @Param('talkId') talkId: string,
    @Body() body: ApproveOrRejectTalkRequest,
  ): Promise<void> {
    const command = ApproveOrRejectTalkMapper.toDomain(talkId, body);
    await this.approveOrRejectTalkUseCase.execute(command);
  }
}
