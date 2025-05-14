import { DomainModel } from '../../base/domain-model';

export class Talk extends DomainModel {
  title: string;
  description: string;
  speaker: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  updatedAt: Date;
  createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    speaker: string,
    roomId: string,
    startTime: Date,
    endTime: Date,
    updatedAt?: Date,
    createdAt?: Date,
  ) {
    super(id);
    this.title = title;
    this.description = description;
    this.speaker = speaker;
    this.roomId = roomId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.updatedAt = updatedAt || new Date();
    this.createdAt = createdAt || new Date();
  }
}
