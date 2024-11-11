import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import storageConfig from '../storage.config';

@Injectable()
export class GetUrlService {
   constructor(
      @Inject(storageConfig.KEY)
      private readonly config: ConfigType<typeof storageConfig>,
   ) {}

   run(path: string): string {
      const { environment, storage } = this.config;
      switch (environment) {
         case 'aws':
            return `${storage.cloudFrontUrl}/${path}`;

         case 'minio':
         case 'local':
            return `${storage.endpoint}/${storage.bucket}/${path}`;

         default:
            return `storage/${path}`;
      }
   }
}
