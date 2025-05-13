import { DomainModel } from '../../base/domain-model';

export class Room extends DomainModel {
  name: string;
  capacity: number;
  updatedAt: Date;
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    capacity: number,
    updatedAt?: Date,
    createdAt?: Date,
  ) {
    super(id);
    this.name = name;
    this.capacity = capacity;
    this.updatedAt = updatedAt || new Date();
    this.createdAt = createdAt || new Date();
  }
}
