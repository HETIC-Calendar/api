import { LoginResponse } from '@adapters/api/response/create-user.response';

export class LoginMapper {
  static fromDomain(token: string): LoginResponse {
    return {
      token,
    };
  }
}
