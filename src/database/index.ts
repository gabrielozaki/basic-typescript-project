import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

export const prismaClient = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (configService: ConfigService): PrismaClient => {
    return new PrismaClient({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
    });
  },
  inject: [ConfigService],
};
