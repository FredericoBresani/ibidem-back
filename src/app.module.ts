import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { IbidemConfigService } from './shared/services/config.service';
import { CoursesModule } from './courses/courses.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';

const ibidemConfigService = new IbidemConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ibidemConfigService.path(),
    }),
    DatabaseModule,
    ArticlesModule,
    UserModule,
    AuthModule,
    SharedModule,
    CoursesModule,
    MailSenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
