import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    capacity: number,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
