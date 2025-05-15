import { UseCase } from '../base/use-case';
import { TalkRepository } from '../domain/repository/talk.repository';
import { TalkStatus } from '../domain/type/TalkStatus';
import { TalkWithRoomDetail } from '../domain/model/TalkWithRoomDetail';

export type GetAllTalksByStatusCommand = {
  status?: TalkStatus;
};

export class GetAllTalksByStatusUseCase
  implements UseCase<GetAllTalksByStatusCommand, TalkWithRoomDetail[]>
{
  constructor(private readonly talkRepository: TalkRepository) {}

  async execute(
    command: GetAllTalksByStatusCommand,
  ): Promise<TalkWithRoomDetail[]> {
    const { status } = command;
    if (status && Object.values(TalkStatus).includes(status)) {
      return this.talkRepository.findByStatusWithRoomDetails(status);
    }
    return this.talkRepository.findAllWithRoomDetail();
  }
}
