import { Repository } from '../../base/repository';
import { Talk } from '../model/Talk';
import { TalkStatus } from '../type/TalkStatus';

export abstract class TalkRepository extends Repository<Talk> {
  abstract findByRoomId(roomId: string): Promise<Talk[]> | Talk[];
  abstract findByStatus(status: TalkStatus): Promise<Talk[]> | Talk[];
}
