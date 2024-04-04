import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `smtps://${process.env.MAILER_ADDRESS}:${process.env.MAILER_PASS}@smtp.gmail.com`,
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter({
            inlineCssEnabled: true,
            inlineCssOptions: { baseUrl: '' },
          }),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderModule {}
