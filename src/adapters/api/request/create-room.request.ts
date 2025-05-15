import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, MinLength } from 'class-validator';

export class CreateRoomRequest {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @Min(1)
  capacity: number;

  constructor(name: string, capacity: number) {
    this.name = name;
    this.capacity = capacity;
  }
}
