import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controller/AppController';
import { prismaClient } from './database';
import { DepartmentService } from './service/DepartmentService';
import { DepartmentController } from './controller/DepartmentController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, DepartmentController],
  providers: [DepartmentService, prismaClient],
})
export class AppModule {}
