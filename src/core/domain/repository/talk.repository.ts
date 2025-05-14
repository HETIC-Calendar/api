import { Repository } from '@core/base/repository';
import { Talk } from '@core/domain/model/Talk';
import { TalkStatus } from '@core/domain/type/TalkStatus';

export abstract class TalkRepository extends Repository<Talk> {
  abstract findByRoomId(roomId: string): Promise<Talk[]> | Talk[];
  abstract findByStatus(status: TalkStatus): Promise<Talk[]> | Talk[];
}
