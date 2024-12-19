// auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('login')
  login() {
    const user = { id: 'user123', role: 'principal' }; // Example user, you can modify this logic
    const token = this.jwtAuthService.generateToken(user);
    
    return { access_token: token };
  }
}
