import { ApproveOrRejectTalkRequest } from '@adapters/api/request/approve-or-reject-talk.request';
import { ApproveOrRejectTalkCommand } from '@core/usecases/approve-or-reject-talk-use.case';

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
