import { CreateRoomMapper } from '../create-room.mapper';
import { CreateRoomRequest } from '../../request/create-room.request';
import { Room } from '../../../../core/domain/model/Room';

describe('CreateRoomMapper', () => {
  it('should map CreateRoomRequest to CreateRoomCommand', () => {
    // Given
    const request: CreateRoomRequest = {
      name: 'Room 1',
      capacity: 50,
    };

    // When
    const command = CreateRoomMapper.toDomain(request);

    // Then
    expect(command).toEqual({
      name: 'Room 1',
      capacity: 50,
    });
  });

  it('should map Room to CreateRoomResponse', () => {
    // Given
    const room: Room = new Room(
      'room-1',
      'Room 1',
      50,
      new Date('2023-10-01T10:00:00Z'),
      new Date('2023-10-01T11:00:00Z'),
    );

    // When
    const response = CreateRoomMapper.fromDomain(room);

    // Then
    expect(response).toEqual({
      id: 'room-1',
      name: 'Room 1',
      capacity: 50,
      updatedAt: new Date('2023-10-01T10:00:00Z'),
      createdAt: new Date('2023-10-01T11:00:00Z'),
    });
  });
});
