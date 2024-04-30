import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AccesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.headers.authorization !== null;
    console.log(request.headers.user);
    if (isAuthenticated) {
      if (
        request.headers.user === 'ADMIN' ||
        request.headers.user === 'SUPERADMIN'
      ) {
        return true;
      }
    }

    throw new Error('You do not have permission to access this resource');
  }
}
