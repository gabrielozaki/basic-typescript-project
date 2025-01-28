import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { logger } from '../logger';

@Injectable()
export class DepartmentService {
  private prismaClient: PrismaClient;

  constructor(@Inject('DATABASE_CONNECTION') prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async generateDepartment(): Promise<boolean> {
    await this.prismaClient.$transaction(async (tx) => {
      const department = await tx.department.create({
        data: { name: 'TI' },
      });

      const gabriel = await tx.user.create({
        data: { name: 'Gabriel', age: 29, Departmentid: department.id },
      });

      const ozaki = await tx.user.create({
        data: { name: 'Ozaki', age: 50, Departmentid: department.id },
      });

      // Throw a error to see this transaction failing
      // throw new Error('Impossible to create department');

      logger.debug(JSON.stringify(gabriel));
      logger.debug(JSON.stringify(ozaki));
    });

    return true;
  }
}
