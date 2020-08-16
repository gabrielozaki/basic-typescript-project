import { Module } from '@nestjs/common';
import { AppController } from './controller/AppController';
import { AppService } from './service/AppService';
import { typeormProvider } from './database';
import { DepartmentService } from './service/DepartmentService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DepartmentService, typeormProvider],
})
export class AppModule {}
