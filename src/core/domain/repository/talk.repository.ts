import { Repository } from '../../base/repository';
import { Talk } from '../model/Talk';
import { TalkStatus } from '../type/TalkStatus';
import { TalkWithRoomDetail } from '../model/TalkWithRoomDetail';

export abstract class TalkRepository extends Repository<Talk> {
  abstract findByRoomIdAndStatuses(
    roomId: string,
    statuses: TalkStatus[],
  ): Promise<Talk[]> | Talk[];
  abstract findByStatusWithRoomDetails(
    status?: TalkStatus,
  ): Promise<TalkWithRoomDetail[]> | TalkWithRoomDetail[];
  abstract findAllWithRoomDetail():
    | Promise<TalkWithRoomDetail[]>
    | TalkWithRoomDetail[];
}
