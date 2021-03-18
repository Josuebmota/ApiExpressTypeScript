import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import mailConfig from '@config/mail';
import aws from 'aws-sdk';
import IMailTempleteProvider from '../../MailTemplateProvider/models/IMailTempleteProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../model/IMailProvider';

@injectable()
export default class SASMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTempleteProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
