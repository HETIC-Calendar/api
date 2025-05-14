import { UseCase } from '@core/base/use-case';
import { TalkAlreadyApprovedOrRejectedError } from '@core/domain/error/TalkAlreadyApprovedOrRejectedError';
import { TalkNotFoundError } from '@core/domain/error/TalkNotFoundError';
import { TalkRepository } from '@core/domain/repository/talk.repository';
import { TalkStatus } from '@core/domain/type/TalkStatus';

export type ApproveOrRejectTalkCommand = {
  talkId: string;
  isApproved: boolean;
};

export class ApproveOrRejectTalkUseCase
  implements UseCase<ApproveOrRejectTalkCommand, void>
{
  constructor(private readonly talkRepository: TalkRepository) {}

  async execute(command: ApproveOrRejectTalkCommand): Promise<void> {
    const { talkId, isApproved } = command;

    const talk = await this.talkRepository.findById(talkId);
    if (!talk) {
      throw new TalkNotFoundError(talkId);
    }

    if (
      talk.status === TalkStatus.APPROVED ||
      talk.status === TalkStatus.REJECTED
    ) {
      throw new TalkAlreadyApprovedOrRejectedError(talkId, talk.status);
    }

    talk.status = isApproved ? TalkStatus.APPROVED : TalkStatus.REJECTED;
    await this.talkRepository.update(talkId, talk);
  }
}
