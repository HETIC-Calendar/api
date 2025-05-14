import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoomUseCase } from '../../../core/usecases/create-room.use-case';
import { CreateRoomRequest } from '../request/create-room.request';
import { RoomMapper } from '../mapper/create-room.mapper';
import { GetAllRoomsUseCase } from '../../../core/usecases/get-all-rooms.use-case';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateRoomResponse } from '../response/create-room.response';
import { GetAllRoomsResponse } from '../response/get-all-rooms.response';

@Controller('/rooms')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly getAllRoomsUseCase: GetAllRoomsUseCase,
  ) {}

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
  async createRoom(
    @Body() body: CreateRoomRequest,
  ): Promise<CreateRoomResponse> {
    const command = RoomMapper.toDomain(body);
    const room = await this.createRoomUseCase.execute(command);
    return RoomMapper.fromDomain(room);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiOkResponse({
    description: 'List of all rooms',
    type: GetAllRoomsResponse,
  })
  @ApiNotFoundResponse({
    description: 'No rooms found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getAllRooms(): Promise<GetAllRoomsResponse> {
    const rooms = await this.getAllRoomsUseCase.execute();
    return new GetAllRoomsResponse(
      rooms.map((room) => RoomMapper.fromDomain(room)),
    );
  }
}
