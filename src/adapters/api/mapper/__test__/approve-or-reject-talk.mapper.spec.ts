import { ApproveOrRejectTalkMapper } from '../approve-or-reject-talk.mapper';
import { ApproveOrRejectTalkRequest } from '../../request/approve-or-reject-talk.request';

describe('ApproveOrRejectTalkMapper', () => {
  it('should map ApproveOrRejectTalkRequest to ApproveOrRejectTalkCommand', () => {
    // Given
    const talkId = 'talk-1';
    const request: ApproveOrRejectTalkRequest = {
      isApproved: true,
    };

    // When
    const command = ApproveOrRejectTalkMapper.toDomain(talkId, request);

    // Then
    expect(command).toEqual({
      talkId: 'talk-1',
      isApproved: true,
    });
  });
});
