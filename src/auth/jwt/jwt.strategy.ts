import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // Replace with your secret
    });
    console.log('JwtStrategy initialized');  // Log initialization to confirm
  }

  async validate(payload: any) {
    console.log('Decoded JWT Payload:', payload); // Log the decoded payload
    if (!payload || !payload.role) {
      throw new Error('Invalid token: Missing role');
    }
    return { userId: payload.sub, role: payload.role };  // Attach user to request
  }
}
