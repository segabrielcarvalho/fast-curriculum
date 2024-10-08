import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import prismaConfig from './prisma.config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
   constructor(
      @Inject(prismaConfig.KEY)
      config: ConfigType<typeof prismaConfig>,
   ) {
      super(config);
   }
   async onModuleInit() {
      await this.$connect();
   }

   async enableShutdownHooks() {
      process.on('beforeExit', async () => {
         await this.$disconnect();
      });
   }
}
