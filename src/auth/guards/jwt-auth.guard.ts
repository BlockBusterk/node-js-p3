import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './role.guard';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context) {
        console.log('User in JwtAuthGuard:', user); // Log the user object
        console.log('Error in JwtAuthGuard:', err); // Log any errors
        return super.handleRequest(err, user, info, context);
      }
}

