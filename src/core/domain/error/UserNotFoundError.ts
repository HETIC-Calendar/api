import { DomainError } from '@core/base/domain-error';

export class UserNotFoundError extends DomainError {
  constructor(email: string) {
    super(`User with email ${email} not found`);
  }
}
