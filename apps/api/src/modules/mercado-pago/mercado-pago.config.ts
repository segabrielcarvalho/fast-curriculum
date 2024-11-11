import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const mercadoPagoConfig = registerAs('mercadoPago', () => {
   return {
      enableModule: process.env.MERCADO_PAGO_ENABLE_MODULE,
      baseUrl: process.env.MERCADO_PAGO_BASE_URL,
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      publicKey: process.env.MERCADO_PAGO_PUBLIC_KEY,
   };
});

export const mercadoPagoConfigValidation = Joi.object({
   MERCADO_PAGO_ENABLE_MODULE: Joi.string().valid('true', 'false').required(),
   MERCADO_PAGO_BASE_URL: Joi.string()
      .uri()
      .when('MERCADO_PAGO_ENABLE_MODULE', {
         is: 'true',
         then: Joi.required(),
         otherwise: Joi.optional(),
      }),
   MERCADO_PAGO_ACCESS_TOKEN: Joi.string().when('MERCADO_PAGO_ENABLE_MODULE', {
      is: 'true',
      then: Joi.required(),
      otherwise: Joi.optional(),
   }),
   MERCADO_PAGO_PUBLIC_KEY: Joi.string().when('MERCADO_PAGO_ENABLE_MODULE', {
      is: 'true',
      then: Joi.required(),
      otherwise: Joi.optional(),
   }),
});

export default mercadoPagoConfig;
