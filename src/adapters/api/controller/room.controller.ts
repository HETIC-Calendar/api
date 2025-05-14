import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRoomUseCase } from '../../../core/usecases/create-room.use-case';
import { CreateRoomRequest } from '../request/create-room.request';
import { CreateRoomMapper } from '../mapper/create-room.mapper';
import { GetAllRoomsUseCase } from '../../../core/usecases/get-all-rooms.use-case';
import { CreateRoomResponse } from '../response/create-room.response';
import { GetAllRoomsResponse } from '../response/get-all-rooms.response';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/rooms')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly getAllRoomsUseCase: GetAllRoomsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiOkResponse({
    description: 'List of all rooms',
    type: GetAllRoomsResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access',
  })
  async getAllRooms(): Promise<GetAllRoomsResponse> {
    const rooms = await this.getAllRoomsUseCase.execute();
    return new GetAllRoomsResponse(
      rooms.map((room) => CreateRoomMapper.fromDomain(room)),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiCreatedResponse({
    description: 'Room successfully created',
    type: CreateRoomRequest,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or validation error',
  })
  @ApiNotFoundResponse({
    description:
      'Referenced resource not found (e.g. linked talk or building if applicable)',
  })
  @ApiConflictResponse({
    description:
      'Room creation failed due to conflict (e.g. duplicate room or scheduling overlap)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access',
  })
  async createRoom(
    @Body() body: CreateRoomRequest,
  ): Promise<CreateRoomResponse> {
    const command = CreateRoomMapper.toDomain(body);
    const room = await this.createRoomUseCase.execute(command);
    return CreateRoomMapper.fromDomain(room);
  }
}
