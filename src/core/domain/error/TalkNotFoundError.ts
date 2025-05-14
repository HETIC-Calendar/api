import { DomainError } from '../../base/domain-error';

export class TalkNotFoundError extends DomainError {
  constructor(talkId: string) {
    super(`Talk with ID ${talkId} not found!`);
  }
}
