import 'reflect-metadata';
import getConnection from './database/index';
import DepartmentService from './service/DepartmentService';
import logger from './logger';

(async () => {
  logger.info('Starting');

  logger.debug('Creating connection');
  const connection = await getConnection();

  logger.debug('Creating DepartmentService');
  const departmentService = new DepartmentService(connection);
  try {
    logger.debug('generating Department');
    await departmentService.generateDepartment();
  } catch (e) {
    logger.error(e);
  }
  await connection.close();
})();
