import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DistStorageProvider';

// import IMailProvider from './MailProvider/model/IMailProvider';
// import MailProvider from './StorageProvider/implementations/DistStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// container.registerSingleton<IMailProvider>(
//   'MailProvider',
//   DiskStorageProvider,
// );
