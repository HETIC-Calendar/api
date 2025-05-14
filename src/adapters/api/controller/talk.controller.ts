import {
  Body,
  Controller,
  Post,
  Param,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@adapters/api/guards/jwt-auth.guard';
import { ApproveOrRejectTalkMapper } from '@adapters/api/mapper/approve-or-reject-talk.mapper';
import { CreateTalkMapper } from '@adapters/api/mapper/create-talk.mapper';
import { ApproveOrRejectTalkRequest } from '@adapters/api/request/approve-or-reject-talk.request';
import { CreateTalkRequest } from '@adapters/api/request/create-talk.request';
import { GetAllTalksByStatusRequest } from '@adapters/api/request/get-all-talks-by-status.request';
import { CreateTalkResponse } from '@adapters/api/response/create-talk.response';
import { GetAllTalksResponse } from '@adapters/api/response/get-all-talks.response';
import { TalkStatus } from '@core/domain/type/TalkStatus';
import { ApproveOrRejectTalkUseCase } from '@core/usecases/approve-or-reject-talk-use.case';
import { CreateTalkCreationRequestUseCase } from '@core/usecases/create-talk-creation-request.use-case';
import { GetAllTalksByStatusUseCase } from '@core/usecases/get-all-talks-by-status.use-case';

@Controller('/talks')
export class TalkController {
  constructor(
    private readonly createTalkUseCase: CreateTalkCreationRequestUseCase,
    private readonly approveOrRejectTalkUseCase: ApproveOrRejectTalkUseCase,
    private readonly getAllTalksByStatusUseCase: GetAllTalksByStatusUseCase,
  ) {}

  @Get()
  @ApiQuery({
    name: 'status',
    enum: TalkStatus,
    required: false,
    description: 'Filter talks by status',
  })
  @ApiOperation({ summary: 'Get all talks by status' })
  @ApiOkResponse({
    description: 'List of all talks',
    type: GetAllTalksResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getAllTalks(
    @Query('status')
    status: TalkStatus,
  ): Promise<GetAllTalksResponse> {
    const request: GetAllTalksByStatusRequest = { status };
    const talks = await this.getAllTalksByStatusUseCase.execute(request);
    return new GetAllTalksResponse(
      talks.map((talk) => CreateTalkMapper.fromDomain(talk)),
    );
  }

  @UseGuards(JwtAuthGuard)
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access',
  })
  async createTalk(
    @Body() body: CreateTalkRequest,
  ): Promise<CreateTalkResponse> {
    const command = CreateTalkMapper.toDomain(body);
    const talk = await this.createTalkUseCase.execute(command);
    return CreateTalkMapper.fromDomain(talk);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:talkId/approve-or-reject')
  @ApiOperation({ summary: 'Accept or reject a talk' })
  @ApiNoContentResponse({
    description: 'Talk successfully accepted or rejected',
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access',
  })
  async approveOrRejectTalk(
    @Param('talkId') talkId: string,
    @Body() body: ApproveOrRejectTalkRequest,
  ): Promise<void> {
    const command = ApproveOrRejectTalkMapper.toDomain(talkId, body);
    await this.approveOrRejectTalkUseCase.execute(command);
  }
}
