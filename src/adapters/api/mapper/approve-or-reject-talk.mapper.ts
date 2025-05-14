import { ApproveOrRejectTalkCommand } from '../../../core/usecases/approve-or-reject-talk-use.case';
import { ApproveOrRejectTalkRequest } from '../request/approve-or-reject-talk.request';

export class ApproveOrRejectTalkMapper {
  static toDomain(
    talkId: string,
    request: ApproveOrRejectTalkRequest,
  ): ApproveOrRejectTalkCommand {
    return {
      talkId: talkId,
      isApproved: request.isApproved,
    };
  }
}
