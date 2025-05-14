import { Repository } from '@core/base/repository';
import { User } from '@core/domain/model/User';

export abstract class UserRepository extends Repository<User> {
  abstract findByEmail(email: string): Promise<User | null> | User | null;
}
