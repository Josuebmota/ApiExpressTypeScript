import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './model/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SASMailProvider from './implementations/SASMailProvider';

const mailProviders = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SASMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProviders[mailConfig.driver],
);
