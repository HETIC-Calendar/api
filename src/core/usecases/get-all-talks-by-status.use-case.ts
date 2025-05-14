import { UseCase } from '@core/base/use-case';
import { Talk } from '@core/domain/model/Talk';
import { TalkRepository } from '@core/domain/repository/talk.repository';
import { TalkStatus } from '@core/domain/type/TalkStatus';

export type GetAllTalksByStatusCommand = {
  status?: TalkStatus;
};

export class GetAllTalksByStatusUseCase
  implements UseCase<GetAllTalksByStatusCommand, Talk[]>
{
  constructor(private readonly talkRepository: TalkRepository) {}

  async execute(command: GetAllTalksByStatusCommand): Promise<Talk[]> {
    const { status } = command;
    if (status && Object.values(TalkStatus).includes(status)) {
      return this.talkRepository.findByStatus(status);
    }
    return this.talkRepository.findAll();
  }
}
