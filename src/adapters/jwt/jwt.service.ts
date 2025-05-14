import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@core/domain/service/token.service';

@Injectable()
export class JwtServiceAdapter implements TokenService {
  private readonly secret = process.env.JWT_SECRET || 'default_secret';
  private readonly expiresIn = '1h';

  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: this.secret,
    });
  }
}
