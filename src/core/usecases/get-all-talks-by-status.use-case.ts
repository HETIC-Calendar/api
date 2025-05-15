import { UseCase } from '../base/use-case';
import { TalkRepository } from '../domain/repository/talk.repository';
import { TalkStatus } from '../domain/type/TalkStatus';
import { TalkWithDetail } from '../domain/model/TalkWithDetail';

export type GetAllTalksByStatusCommand = {
  status?: TalkStatus;
};

export class GetAllTalksByStatusUseCase
  implements UseCase<GetAllTalksByStatusCommand, TalkWithDetail[]>
{
  constructor(private readonly talkRepository: TalkRepository) {}

  async execute(
    command: GetAllTalksByStatusCommand,
  ): Promise<TalkWithDetail[]> {
    const { status } = command;
    if (status && Object.values(TalkStatus).includes(status)) {
      return this.talkRepository.findByStatusWithDetails(status);
    }
    return this.talkRepository.findAllWithRoomDetail();
  }
}
