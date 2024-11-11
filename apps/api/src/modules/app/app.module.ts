import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import '../graphql/enums';
import appConfig, { appConfigValidation } from './app.config';
import { GraphQLModule } from '../graphql/graphql.module';
import { LoggerModule } from '../logger/logger.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { StorageModule } from '../storage/storage.module';
import { MercadoPagoModule } from '../mercado-pago/mercado-pago.module';

const imports = [
   ConfigModule.forRoot({
      cache: true,
      load: [appConfig],
      validationSchema: appConfigValidation,
   }),
   GraphQLModule,
   LoggerModule,
   PrismaModule,
   AuthModule,
   StorageModule,
   MercadoPagoModule,
];

const controllers = [];
const providers: Provider[] = [];

@Module({ imports, controllers, providers })
export class AppModule {}
