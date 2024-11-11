import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

enum StorageDriverEnum {
   s3 = 's3',
   minio = 'minio',
}

interface StorageConfig {
   driver: keyof typeof StorageDriverEnum;
   environment: string;
   storage: {
      bucket: string;
      region: string;
      cloudFrontUrl: string;
      getEndpoint: string;
      credentials: {
         accessKeyId: string;
         secretAccessKey: string;
      };
      endpoint: string;
   };
}

const storageConfig = registerAs('storage', () => {
   const driver = process.env.UPLOAD_DRIVER as keyof typeof StorageDriverEnum;
   const environment = process.env.STORAGE_ENVIRONMENT;
   const cloudFrontUrl = process.env.STORAGE_URL;
   const endpoint = process.env.STORAGE_ENDPOINT;
   const getEndpoint = process.env.STORAGE_GET_ENDPOINT;
   const bucket = process.env.STORAGE_BUCKET;
   const region = process.env.STORAGE_REGION || process.env.STORAGE_REGION;
   const accessKeyId =
      process.env.STORAGE_ACCESS_KEY_ID || process.env.STORAGE_ACCESS_KEY_ID;
   const secretAccessKey =
      process.env.STORAGE_SECRET_ACCESS_KEY ||
      process.env.STORAGE_SECRET_ACCESS_KEY;

   return {
      driver,
      environment,
      storage: {
         bucket,
         region,
         cloudFrontUrl,
         getEndpoint,
         credentials: { accessKeyId, secretAccessKey },
         endpoint,
      },
   } as StorageConfig;
});

export const storageConfigValidation = Joi.object({
   UPLOAD_DRIVER: Joi.string()
      .valid(...Object.values(StorageDriverEnum))
      .default('s3'),
   STORAGE_ENVIRONMENT: Joi.string().default('local'),
   STORAGE_BUCKET: Joi.string().default('vote-me-dev'),
   STORAGE_ENDPOINT: Joi.string().default('http://localhost:10002'),
   STORAGE_ACCESS_KEY_ID: Joi.string(),
   STORAGE_SECRET_ACCESS_KEY: Joi.string(),
   STORAGE_REGION: Joi.string(),
}).when(
   Joi.object({
      UPLOAD_DRIVER: Joi.string().required().equal('s3'),
   }),
   {
      then: Joi.object({
         STORAGE_BUCKET: Joi.required(),
         STORAGE_ENDPOINT: Joi.required(),
         STORAGE_ACCESS_KEY_ID: Joi.required(),
         STORAGE_SECRET_ACCESS_KEY: Joi.required(),
         STORAGE_REGION: Joi.required(),
      })
         .xor('STORAGE_REGION', 'STORAGE_REGION')
         .xor('STORAGE_ACCESS_KEY_ID', 'STORAGE_ACCESS_KEY_ID')
         .xor('STORAGE_SECRET_ACCESS_KEY', 'STORAGE_SECRET_ACCESS_KEY'),
   },
);

export default storageConfig;
