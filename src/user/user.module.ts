import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { MailSenderModule } from '../mail-sender/mail-sender.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), MailSenderModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
