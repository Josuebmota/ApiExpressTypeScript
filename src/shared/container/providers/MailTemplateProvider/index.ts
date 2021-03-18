import { container } from 'tsyringe';

import IMailTempleteProvider from './models/IMailTempleteProvider';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IMailTempleteProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
