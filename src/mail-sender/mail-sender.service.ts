import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  public send(): void {
    this.mailerService
      .sendMail({
        to: 'fredcolde@gmail.com',
        from: 'atendimentoibidem@gmail.com',
        subject: 'Testing ibidem email sender',
        text: 'Welcome to ibidem',
        html: '<a href="" target="_blank">welcome</a>',
      })
      .then((w) => {
        /* w is a success message */
      })
      .catch((e) => {
        /* e is an error message */
      });
  }

  public async sendRegistryVerifyEmail(
    token: string,
    email: string,
    userId: string,
  ): Promise<void> {
    const accountConPath = process.env.ACC_CONFIRMATION_PATH;
    this.mailerService
      .sendMail({
        to: email,
        from: 'atendimentoibidem@gmail.com',
        subject: 'Confirme sua conta Ibidem!',
        text: 'Bem vindo ao Ibidem',
        html: `<a href="${accountConPath}/${token}/${userId}" target="_blank">${accountConPath}/${token}/${userId}</a>`,
      })
      .then((w) => {
        /* w is a success message */
      })
      .catch((e) => {
        /* e is an error message */
      });
  }

  public async sendUpdateVerifyEmail(
    token: string,
    email: string,
    userId: string,
  ): Promise<void> {
    const accountUpdatePath = process.env.ACC_UPDATE_PATH;
    const tokenWithoutBearer = token.substring(
      token.indexOf(' ') + 1,
      token.length,
    );
    this.mailerService
      .sendMail({
        to: email,
        from: 'atendimentoibidem@gmail.com',
        subject: 'Confirme a atualização da sua conta Ibidem!',
        text: 'Complete a atualização da sua conta Ibidem',
        html: `<a href="${accountUpdatePath}/${tokenWithoutBearer}/${userId}" target="_blank">${accountUpdatePath}/${tokenWithoutBearer}/${userId}</a>`,
      })
      .then((w) => {
        /* w is a success message */
      })
      .catch((e) => {
        /* e is an error message */
      });
  }
  public async sendPasswordVerifyEmail(
    token: string,
    email: string,
    userId: string,
  ): Promise<void> {
    const accountRecoverPath = process.env.ACC_RECOVER_PASSWORD_CONFIRM;
    const tokenWithoutBearer = token.substring(
      token.indexOf(' ') + 1,
      token.length,
    );
    this.mailerService
      .sendMail({
        to: email,
        from: 'atendimentoibidem@gmail.com',
        subject: 'Recuperar senha',
        text: 'Complete a atualização da sua conta Ibidem',
        html: `<a href="${accountRecoverPath}/${tokenWithoutBearer}/${userId}" target="_blank">${accountRecoverPath}/${tokenWithoutBearer}/${userId}</a>`,
      })
      .then((w) => {
        /* w is a success message */
      })
      .catch((e) => {
        /* e is an error message */
      });
  }
  public async sendRecoverPasswordLink(
    token: string,
    email: string,
    userId: string,
  ): Promise<void> {
    const accountRecoverPath = process.env.ACC_RECOVER_PASSWORD;
    this.mailerService
      .sendMail({
        to: email,
        from: 'atendimentoibidem@gmail.com',
        subject: 'Recuperar senha',
        text: 'Complete a atualização da sua conta Ibidem',
        html: `<a href="${accountRecoverPath}/${token}/${userId}" target="_blank">${accountRecoverPath}/${token}/${userId}</a>`,
      })
      .then((w) => {
        /* w is a success message */
      })
      .catch((e) => {
        /* e is an error message */
      });
  }
}
