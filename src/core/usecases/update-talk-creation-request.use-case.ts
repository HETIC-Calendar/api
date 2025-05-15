import { UseCase } from '../base/use-case';
import { Talk } from '../domain/model/Talk';
import { TalkRepository } from '../domain/repository/talk.repository';
import { InvalidTalkTimeError } from '../domain/error/InvalidTalkTimeError';
import { TalkOverlapError } from '../domain/error/TalkOverlapError';
import { RoomRepository } from '../domain/repository/room.repository';
import { RoomNotFoundError } from '../domain/error/RoomNotFoundError';
import { TalkSubject } from '../domain/type/TalkSubject';
import { TalkStatus } from '../domain/type/TalkStatus';
import { TalkLevel } from '../domain/type/TalkLevel';
import { TalkAlreadyApprovedOrRejectedError } from '../domain/error/TalkAlreadyApprovedOrRejectedError';
import { TalkNotFoundError } from '../domain/error/TalkNotFoundError';

export type UpdateTalkCommand = {
  talkId: string;
  title: string;
  subject: TalkSubject;
  description: string;
  speaker: string;
  roomId: string;
  level: TalkLevel;
  startTime: Date;
  endTime: Date;
};

export class UpdateTalkCreationRequestUseCase
  implements UseCase<UpdateTalkCommand, Talk>
{
  // TODO: Move to config
  private readonly MINIMAL_HOUR = 9;
  private readonly MAXIMAL_HOUR = 19;

  constructor(
    private readonly talkRepository: TalkRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  async execute(command: UpdateTalkCommand): Promise<Talk> {
    const existingTalk = await this.talkRepository.findById(command.talkId);
    if (!existingTalk) {
      throw new TalkNotFoundError(command.talkId);
    }
    if (existingTalk.status !== TalkStatus.PENDING_APPROVAL) {
      throw new TalkAlreadyApprovedOrRejectedError(
        existingTalk.id,
        existingTalk.status,
      );
    }

    if (command.startTime >= command.endTime) {
      throw new InvalidTalkTimeError(
        'Talk start time must be before end time.',
      );
    }

    const startHour = command.startTime.getUTCHours();
    const endHour = command.endTime.getUTCHours();

    if (startHour < this.MINIMAL_HOUR || endHour > this.MAXIMAL_HOUR) {
      throw new InvalidTalkTimeError(
        `Talks must be between ${this.MINIMAL_HOUR} and ${this.MAXIMAL_HOUR} hours.`,
      );
    }

    const room = await this.roomRepository.findById(command.roomId);
    if (!room) {
      throw new RoomNotFoundError(command.roomId);
    }

    const existingTalks = await this.talkRepository.findByRoomIdAndStatuses(
      command.roomId,
      [TalkStatus.PENDING_APPROVAL, TalkStatus.APPROVED],
    );

    for (const talk of existingTalks.filter(
      (talk) => talk.id !== command.talkId,
    )) {
      if (
        command.startTime < talk.endTime &&
        command.endTime > talk.startTime
      ) {
        throw new TalkOverlapError(
          'Talk overlap another talk in the same room.',
        );
      }
    }

    const talk = new Talk(
      crypto.randomUUID(),
      TalkStatus.PENDING_APPROVAL,
      command.title,
      command.subject,
      command.description,
      command.speaker,
      command.roomId,
      command.level,
      command.startTime,
      command.endTime,
    );

    const updatedTalk = await this.talkRepository.update(command.talkId, talk);
    if (!updatedTalk) {
      throw new TalkNotFoundError(command.talkId);
    }
    return updatedTalk;
  }
}
