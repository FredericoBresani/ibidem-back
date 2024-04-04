import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, MailSenderService],
})
export class ArticlesModule {}
