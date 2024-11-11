import { PrismaClient, RoleEnum } from '@prisma/client';
import { hash } from 'bcrypt';
import { MyLogger } from '../../src/modules/logger/my-logger.service';
import { ConfigService } from '@nestjs/config';
import logConfig from '../../src/modules/logger/logger.config';

interface Dependencies {
   prisma: PrismaClient;
}

async function main(db: Dependencies, configService: ConfigService) {
   try {
      const loggerConfig =
         configService.get<ReturnType<typeof logConfig>>('logger');

      const logger = new MyLogger(loggerConfig);
      logger.setContext('Main Seeder');
      const mainUser = createMainUser({ db });

      await Promise.all([mainUser]);
      logger.log('Seed finished');
   } catch (e) {
      console.error(e);
   }
}

async function createMainUser(args: { db: Dependencies }) {
   try {
      const { db } = args;
      const email = 'fastcurriculum@gmail.com';
      const name = 'Fast Curriculum';
      await db.prisma.user.upsert({
         where: { email },
         update: {
            name,
            role: RoleEnum.ADMIN,
            password: await hash('12345678', 10),
         },
         create: {
            email,
            name,
            role: RoleEnum.ADMIN,
            password: await hash('12345678', 10),
         },
      });
   } catch (e) {
      console.warn(e.message);
   }
}

const prisma = new PrismaClient();
main({ prisma }, new ConfigService())
   .catch((e) => {
      throw e;
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
