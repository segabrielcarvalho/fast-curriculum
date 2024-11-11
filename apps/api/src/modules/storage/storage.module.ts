import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import storageConfig from './storage.config';
import { GetUrlService } from './services/get-url.service';
import StorageProvider from './providers';

@Module({
   imports: [
      ConfigModule.forRoot({
         cache: true,
         load: [storageConfig],
      }),
   ],
   providers: [GetUrlService, StorageProvider],
   exports: [GetUrlService, StorageProvider],
})
export class StorageModule {}
