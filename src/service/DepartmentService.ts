import { Connection, Transaction, TransactionRepository } from 'typeorm';
import DepartmentRepository from '../repository/DepartmentRepository';
import UserRepository from '../repository/UserRepository';
import logger from '../logger';

export default class DepartmentService {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async generateDepartment(): Promise<boolean> {
    const userRepository = this.connection.getCustomRepository(UserRepository);
    const departmentRepository = this.connection.getCustomRepository(DepartmentRepository);

    await this.process(userRepository, departmentRepository);

    return true;
  }

  @Transaction()
  // eslint-disable-next-line class-methods-use-this
  private async process(
    @TransactionRepository() userRepository: UserRepository,
    @TransactionRepository() departmentRepository: DepartmentRepository,
  ): Promise<boolean> {
    const department = await departmentRepository.createDepartmentByName('TI');

    const gabriel = await userRepository.createUser('Gabriel', 29, department);
    const ozaki = await userRepository.createUser('Ozaki', 50, department);

    // Throw a error to see this transaction failing
    // throw new Error('Impossible to create department');
    logger.debug(JSON.stringify(gabriel));
    logger.debug(JSON.stringify(ozaki));

    return true;
  }
}
