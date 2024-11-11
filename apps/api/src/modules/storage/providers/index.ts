import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import S3Provider from './s3/s3.provider';
import storageConfig from '../storage.config';
import MinioProvider from './minio/minio.provider';

const providers = {
   minio: MinioProvider,
   s3: S3Provider,
};

const StorageProvider: Provider = {
   provide: 'StorageProvider',
   inject: [ConfigService],
   useFactory: async (configService: ConfigService) => {
      const config =
         configService.get<ReturnType<typeof storageConfig>>('storage');

      if (!config) {
         throw new Error('Storage configuration is undefined');
      }

      const Storage = providers[config.driver];
      if (!Storage) {
         throw new Error(
            `Storage provider for driver ${config.driver} not found`,
         );
      }

      return new Storage(config);
   },
};

export default StorageProvider;
