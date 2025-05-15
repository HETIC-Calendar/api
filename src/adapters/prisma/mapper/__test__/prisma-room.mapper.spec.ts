import { PrismaRoomMapper } from '../prisma-room.mapper';
import { Room } from '../../../../core/domain/model/Room';
import { Room as RoomEntity } from '@prisma/client';

describe('PrismaRoomMapper', () => {
  const mapper = new PrismaRoomMapper();

  it('should map Room to RoomEntity', () => {
    // Given
    const room: Room = {
      id: 'room-1',
      name: 'Room 1',
      capacity: 50,
      updatedAt: new Date('2023-10-01T10:00:00Z'),
      createdAt: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    const entity = mapper.fromDomain(room);

    // Then
    expect(entity).toEqual({
      id: 'room-1',
      name: 'Room 1',
      capacity: 50,
      updatedAt: new Date('2023-10-01T10:00:00Z'),
      createdAt: new Date('2023-10-01T11:00:00Z'),
    });
  });

  it('should map RoomEntity to Room', () => {
    // Given
    const entity: RoomEntity = {
      id: 'room-1',
      name: 'Room 1',
      capacity: 50,
      updatedAt: new Date('2023-10-01T10:00:00Z'),
      createdAt: new Date('2023-10-01T11:00:00Z'),
    };

    // When
    const room = mapper.toDomain(entity);

    // Then
    expect(room).toEqual({
      id: 'room-1',
      name: 'Room 1',
      capacity: 50,
      updatedAt: new Date('2023-10-01T10:00:00Z'),
      createdAt: new Date('2023-10-01T11:00:00Z'),
    });
  });
});
