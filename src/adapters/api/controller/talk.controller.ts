import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Query,
  HttpCode,
} from '@nestjs/common';
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
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateTalkResponse } from '../response/create-talk.response';
import { ApproveOrRejectTalkMapper } from '../mapper/approve-or-reject-talk.mapper';
import { ApproveOrRejectTalkRequest } from '../request/approve-or-reject-talk.request';
import { CreateTalkMapper } from '../mapper/create-talk.mapper';
import { GetAllTalksByStatusRequest } from '../request/get-all-talks-by-status.request';
import { GetAllTalksByStatusUseCase } from '../../../core/usecases/get-all-talks-by-status.use-case';
import { TalkStatus } from '../../../core/domain/type/TalkStatus';
import { GetAllTalksWithDetailResponse } from '../response/get-all-talks-with-detail.response';
import { GetAllTalksWithDetailMapper } from '../mapper/get-all-talks-with-detail.mapper';
import { UserType } from '../../../core/domain/type/UserType';
import { Roles } from '../decorator/roles.decorator';
import { Public } from '../decorator/public.decorator';
import { UpdateTalkRequest } from '../request/update-talk.request';
import { UpdateTalkMapper } from '../mapper/update-talk.mapper';
import { UpdateTalkCreationRequestUseCase } from '../../../core/usecases/update-talk-creation-request.use-case';
import { UpdateTalkResponse } from '../response/update-talk.response';
import { CurrentUser } from '../decorator/current-user.decorator';
import { ProfileRequest } from '../request/profile.request';

@Controller('/talks')
export class TalkController {
  constructor(
    private readonly createTalkUseCase: CreateTalkCreationRequestUseCase,
    private readonly updateTalkUseCase: UpdateTalkCreationRequestUseCase,
    private readonly approveOrRejectTalkUseCase: ApproveOrRejectTalkUseCase,
    private readonly getAllTalksByStatusUseCase: GetAllTalksByStatusUseCase,
  ) {}

  @Public()
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
    type: GetAllTalksWithDetailResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getAllTalks(
    @Query('status')
    status: TalkStatus,
  ): Promise<GetAllTalksWithDetailResponse> {
    const request: GetAllTalksByStatusRequest = { status };
    const talksWithDetail =
      await this.getAllTalksByStatusUseCase.execute(request);
    return GetAllTalksWithDetailMapper.fromDomain(talksWithDetail);
  }

  @Roles(UserType.PLANNER, UserType.SPEAKER)
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
    @CurrentUser() user: ProfileRequest,
    @Body() body: CreateTalkRequest,
  ): Promise<CreateTalkResponse> {
    const command = CreateTalkMapper.toDomain(user, body);
    const talk = await this.createTalkUseCase.execute(command);
    return CreateTalkMapper.fromDomain(talk);
  }

  @Post('/:talkId')
  @Roles(UserType.PLANNER, UserType.SPEAKER)
  @ApiOperation({ summary: 'Update a talk' })
  @ApiCreatedResponse({
    description: 'Talk successfully updated',
    type: UpdateTalkResponse,
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
  async updateTalk(
    @CurrentUser() user: ProfileRequest,
    @Param('talkId') talkId: string,
    @Body() body: UpdateTalkRequest,
  ): Promise<UpdateTalkResponse> {
    const command = UpdateTalkMapper.toDomain(user, talkId, body);
    const talk = await this.updateTalkUseCase.execute(command);
    return UpdateTalkMapper.fromDomain(talk);
  }

  @Roles(UserType.PLANNER)
  @Post('/:talkId/approve-or-reject')
  @ApiOperation({ summary: 'Accept or reject a talk' })
  @ApiNoContentResponse({
    description: 'Talk successfully accepted or rejected',
  })
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
  @HttpCode(204)
  async approveOrRejectTalk(
    @Param('talkId') talkId: string,
    @Body() body: ApproveOrRejectTalkRequest,
  ): Promise<void> {
    const command = ApproveOrRejectTalkMapper.toDomain(talkId, body);
    await this.approveOrRejectTalkUseCase.execute(command);
  }
}
