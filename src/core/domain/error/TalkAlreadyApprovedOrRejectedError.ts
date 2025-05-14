import { DomainError } from '@core/base/domain-error';
import { TalkStatus } from '@core/domain/type/TalkStatus';

export class TalkAlreadyApprovedOrRejectedError extends DomainError {
  constructor(talkId: string, talkStatus: TalkStatus) {
    super(`Talk with ID ${talkId} is already ${talkStatus}`);
  }
}
