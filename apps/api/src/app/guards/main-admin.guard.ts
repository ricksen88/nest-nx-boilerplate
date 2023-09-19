import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@webal-nest/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class MainAdminGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user.isActive !== true)
      throw new ForbiddenException('User was deleted');

    if (user.role !== UserRole.MainAdmin)
      throw new ForbiddenException('Access Denied');

    return user;
  }
}
