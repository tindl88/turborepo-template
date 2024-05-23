import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import { resolve } from 'path';

import { IConfigs } from '@/common/interfaces/configs.interface';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService<IConfigs>) {}

  getTemplate(filePath: string) {
    return readFileSync(resolve(`./dist/templates/${filePath}`), 'utf8');
  }

  async sendGmail(to: string, subject: string, text: string, html?: string) {
    const { host, port, secure, username, password } = this.configService.get<IConfigs['email']>('email');

    const mailOptions: SendMailOptions = {
      from: 'Nest Template <ruthie.greenfelder@ethereal.email>',
      to,
      subject,
      text,
      html
    };

    try {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: username,
          pass: password
        }
      });

      const result = await this.transporter.sendMail(mailOptions);

      return result;
    } catch (error) {
      throw new UnprocessableEntityException('Send Email::' + error.message);
    }
  }
}
