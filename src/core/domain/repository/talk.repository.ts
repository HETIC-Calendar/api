import { Repository } from '../../base/repository';
import { Talk } from '../model/Talk';
import { TalkStatus } from '../type/TalkStatus';

export abstract class TalkRepository extends Repository<Talk> {
  abstract findByRoomIdAndStatuses(
    roomId: string,
    statuses: TalkStatus[],
  ): Promise<Talk[]> | Talk[];
  abstract findByStatus(status: TalkStatus): Promise<Talk[]> | Talk[];
}
