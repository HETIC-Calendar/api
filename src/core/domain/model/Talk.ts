import { DomainModel } from '../../base/domain-model';
import { TalkStatus } from '../type/TalkStatus';
import { TalkSubject } from '../type/TalkSubject';

export class Talk extends DomainModel {
  status: TalkStatus;
  title: string;
  subject: TalkSubject;
  description: string;
  speaker: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  updatedAt: Date;
  createdAt: Date;

  constructor(
    id: string,
    status: TalkStatus,
    title: string,
    subject: TalkSubject,
    description: string,
    speaker: string,
    roomId: string,
    startTime: Date,
    endTime: Date,
    updatedAt?: Date,
    createdAt?: Date,
  ) {
    super(id);
    this.status = status;
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.speaker = speaker;
    this.roomId = roomId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.updatedAt = updatedAt || new Date();
    this.createdAt = createdAt || new Date();
  }
}
