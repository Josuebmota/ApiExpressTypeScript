import fs from 'fs';
import path from 'path';
import mime from 'mime';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: '',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.lookup(originalPath);

    if (!ContentType) {
      throw new AppError('Arquivo inexistente', 404);
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.s3.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `ìnline; filename=${file}`,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.s3.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
