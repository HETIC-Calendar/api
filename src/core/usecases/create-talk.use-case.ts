import { UseCase } from '../base/use-case';
import { Talk } from '../domain/model/Talk';
import { TalkRepository } from '../domain/repository/talk.repository';
import { InvalidTalkTimeError } from '../domain/error/InvalidTalkTimeError';
import { TalkOverlapError } from '../domain/error/TalkOverlapError';
import { RoomRepository } from '../domain/repository/room.repository';
import { RoomNotFoundError } from '../domain/error/RoomNotFoundError';

export type CreateTalkCommand = {
  title: string;
  description: string;
  speaker: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
};

export class CreateTalkUseCase implements UseCase<CreateTalkCommand, Talk> {
  // TODO: Move to config
  private MINIMAL_HOUR = 9;
  private MAXIMAL_HOUR = 19;

  constructor(
    private readonly talkRepository: TalkRepository,
    private readonly roomRepository: RoomRepository,
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

    const room = await this.roomRepository.findById(command.roomId);
    if (!room) {
      throw new RoomNotFoundError(command.roomId);
    }

    const existingTalks = await this.talkRepository.findByRoomId(
      command.roomId,
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
      command.title,
      command.description,
      command.speaker,
      command.roomId,
      command.startTime,
      command.endTime,
    );

    return await this.talkRepository.create(talk);
  }
}
