import { DomainError } from '../../base/domain-error';

export class RoomNotFoundError extends DomainError {
  constructor(roomId: string) {
    super(`Room with ID ${roomId} not found!`);
  }
}
