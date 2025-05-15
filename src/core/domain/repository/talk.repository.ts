import { Repository } from '../../base/repository';
import { Talk } from '../model/Talk';
import { TalkStatus } from '../type/TalkStatus';
import { TalkWithDetail } from '../model/TalkWithDetail';

export abstract class TalkRepository extends Repository<Talk> {
  abstract findByRoomIdAndStatuses(
    roomId: string,
    statuses: TalkStatus[],
  ): Promise<Talk[]> | Talk[];
  abstract findByStatusWithDetails(
    status?: TalkStatus,
  ): Promise<TalkWithDetail[]> | TalkWithDetail[];
  abstract findAllWithRoomDetail():
    | Promise<TalkWithDetail[]>
    | TalkWithDetail[];
}
