import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return true;
  }
}
