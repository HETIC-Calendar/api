import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    capacity: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
