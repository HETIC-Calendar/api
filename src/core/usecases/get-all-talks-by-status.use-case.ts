import { UseCase } from '../base/use-case';
import { Talk } from '../domain/model/Talk';
import { TalkRepository } from '../domain/repository/talk.repository';
import { TalkStatus } from '../domain/type/TalkStatus';

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
