import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByName(username);
    if (user?._id) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new UnauthorizedException('WRONG_PASSWORD');
      }
    } else {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
  }

  public async generateConfirmToken(userName: any, userId: string) {
    const payload = { username: userName, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async login(userName: string, userId: string) {
    const payload = { username: userName, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
