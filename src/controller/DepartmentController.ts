import { Controller, Get } from '@nestjs/common';

import { DepartmentService } from '../service/DepartmentService';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  generateDepartment(): Promise<boolean> {
    return this.departmentService.generateDepartment();
  }
}
