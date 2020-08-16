import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/AppService';
import { DepartmentService } from '../service/DepartmentService';

@Controller()
export class AppController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getHello(): Promise<boolean> {
    return this.departmentService.generateDepartment();
  }
}
