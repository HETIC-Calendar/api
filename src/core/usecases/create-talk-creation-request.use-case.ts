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
import { UserRepository } from '../domain/repository/user.repository';
import { UserNotFoundError } from '../domain/error/UserNotFoundError';
import { User } from '../domain/model/User';

export type CreateTalkCommand = {
  currentUser: Pick<User, 'id' | 'type'>;
  title: string;
  subject: TalkSubject;
  description: string;
  roomId: string;
  level: TalkLevel;
  startTime: Date;
  endTime: Date;
};

export class CreateTalkCreationRequestUseCase
  implements UseCase<CreateTalkCommand, Talk>
{
  // TODO: Move to config
  // Limit in UTC timezone (equivalent to 9am to 7pm in UTC+2)
  private readonly MINIMAL_HOUR = 7;
  private readonly MAXIMAL_HOUR = 17;

  constructor(
    private readonly talkRepository: TalkRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateTalkCommand): Promise<Talk> {
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

    const speaker = await this.userRepository.findById(command.currentUser.id);
    if (!speaker) {
      throw new UserNotFoundError(command.currentUser.id);
    }

    const room = await this.roomRepository.findById(command.roomId);
    if (!room) {
      throw new RoomNotFoundError(command.roomId);
    }

    const existingTalks = await this.talkRepository.findByRoomIdAndStatuses(
      command.roomId,
      [TalkStatus.PENDING_APPROVAL, TalkStatus.APPROVED],
    );

    for (const talk of existingTalks) {
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
      command.currentUser.id,
      command.roomId,
      command.level,
      command.startTime,
      command.endTime,
    );

    return this.talkRepository.create(talk);
  }
}
