import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  // Function to generate JWT
  generateToken(user: any) {
    const payload = { sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}
