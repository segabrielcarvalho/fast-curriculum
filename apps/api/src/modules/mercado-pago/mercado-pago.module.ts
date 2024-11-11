import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import mercadoPagoConfig, {
   mercadoPagoConfigValidation,
} from './mercado-pago.config';
import MercadoPagoProvider from './provider/MercadoPago.provider';
import { PrismaModule } from '../prisma/prisma.module';
import appConfig from '../app/app.config';

@Module({
   imports: [
      LoggerModule,
      PrismaModule,
      ConfigModule.forRoot({
         cache: true,
         load: [mercadoPagoConfig, appConfig],
         validationSchema: mercadoPagoConfigValidation,
      }),
   ],
   providers: [MercadoPagoProvider],
   exports: [MercadoPagoProvider],
})
export class MercadoPagoModule {}
