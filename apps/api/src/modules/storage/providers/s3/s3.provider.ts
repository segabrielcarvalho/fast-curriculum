import {
   S3Client,
   PutObjectCommand,
   DeleteObjectCommand,
   HeadBucketCommand,
   CreateBucketCommand,
} from '@aws-sdk/client-s3';
import * as mime from 'mime';
import * as crypto from 'crypto';
import * as fileType from 'file-type';
import storageConfig from '../../storage.config';
import { ConfigType } from '@nestjs/config';
import IS3Provider from './s3.interface';
import getMimeTypeByBase64 from '../../../../lib/getMimeTypeByBase64';
import { BadRequestException } from '@nestjs/common';

export default class S3Provider implements IS3Provider {
   private client: S3Client;
   private initializedBucket = false;

   constructor(private readonly config: ConfigType<typeof storageConfig>) {
      const { region, endpoint, credentials } = this.config.storage;
      this.client = new S3Client({
         region,
         credentials,
         endpoint,
         forcePathStyle: true,
      });
   }

   public async saveFileFromBase64(fileInBase64: string): Promise<string> {
      await this.beforeEach();
      const buf = Buffer.from(
         fileInBase64.replace(/^data:image\/\w+;base64,/, ''),
         'base64',
      );
      const ContentType = getMimeTypeByBase64(fileInBase64);
      const fileName = `${crypto
         .randomBytes(8)
         .toString('hex')}.${mime.getExtension(ContentType)}`;
      await this.client.send(
         new PutObjectCommand({
            Bucket: this.config.storage.bucket,
            Key: fileName,
            ACL: 'public-read',
            Body: buf,
            ContentType,
            ContentEncoding: 'base64',
         }),
      );

      return fileName;
   }

   public async saveFileFromBuffer(buffer: Buffer): Promise<string> {
      await this.beforeEach();
      const fileTypeResult = await fileType.fromBuffer(buffer);
      if (!fileTypeResult) {
         throw new BadRequestException(
            'Não foi possível determinar o tipo de arquivo do buffer.',
         );
      }
      const { ext, mime } = fileTypeResult;
      const fileName = `${crypto.randomBytes(8).toString('hex')}.${ext}`;

      await this.client.send(
         new PutObjectCommand({
            Bucket: this.config.storage.bucket,
            Key: fileName,
            ACL: 'public-read',
            Body: buffer,
            ContentType: mime,
         }),
      );

      return fileName;
   }

   public async deleteFile(file: string): Promise<void> {
      await this.beforeEach();
      await this.client.send(
         new DeleteObjectCommand({
            Bucket: this.config.storage.bucket,
            Key: file,
         }),
      );
   }

   async initBucket() {
      if (!this.initializedBucket) {
         try {
            await this.client.send(
               new HeadBucketCommand({ Bucket: this.config.storage.bucket }),
            );
         } catch (err) {
            await this.client.send(
               new CreateBucketCommand({ Bucket: this.config.storage.bucket }),
            );
         }
      }
   }

   private async beforeEach() {
      await this.initBucket();
   }
}
