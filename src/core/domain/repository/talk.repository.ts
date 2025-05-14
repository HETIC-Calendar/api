import { Repository } from '../../base/repository';
import { Talk } from '../model/Talk';

export abstract class TalkRepository extends Repository<Talk> {
  abstract findByRoomId(roomId: string): Promise<Talk[]> | Talk[];
}
