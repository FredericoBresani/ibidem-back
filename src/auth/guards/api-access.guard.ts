import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiAccessGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (
      request.headers.iuser &&
      request.headers.itoken &&
      request.headers.iuser === process.env.HEADER_USER &&
      request.headers.itoken === process.env.USER_TOKEN
    ) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
