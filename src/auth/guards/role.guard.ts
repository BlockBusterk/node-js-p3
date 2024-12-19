import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles required
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User from request:', user); // Debugging log
    if (!user || !user.role) {
      throw new UnauthorizedException('User role missing');
    }
    return roles.includes(user.role); // Check if role matches
  }
}
