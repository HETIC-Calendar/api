import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  capacity: number;

  constructor(name: string, capacity: number) {
    this.name = name;
    this.capacity = capacity;
  }
}
