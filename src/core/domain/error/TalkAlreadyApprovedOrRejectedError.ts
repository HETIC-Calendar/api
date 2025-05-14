import { DomainError } from '../../base/domain-error';
import { TalkStatus } from '../type/TalkStatus';

export class TalkAlreadyApprovedOrRejectedError extends DomainError {
  constructor(talkId: string, talkStatus: TalkStatus) {
    super(`Talk with ID ${talkId} is already ${talkStatus}`);
  }
}
