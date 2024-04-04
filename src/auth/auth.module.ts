import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ApiAccessGuard } from './guards/api-access.guard';
import { ConfigModule } from '@nestjs/config';
import { IbidemConfigService } from 'src/shared/services/config.service';
import { UserIsAuthorGuard } from './guards/user-is-author.guard';

const ibidemConfigService = new IbidemConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ibidemConfigService.path(),
    }),
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ApiAccessGuard,
    UserIsAuthorGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
