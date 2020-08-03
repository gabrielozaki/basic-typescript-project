import 'reflect-metadata';
import getConnection from './database/index'
import DepartamentService from './service/DepartamentService';
import logger from './logger';


(async () => {
	logger.info('Starting');

	logger.debug('Creating connection');
	const connection = await getConnection();

	logger.debug('Creating DepartamentService');
	const departamentService = new DepartamentService();
	try{
		logger.debug('generating Departament');
		await departamentService.generateDepartment();
	}catch (e) {
		logger.error(e);
	}
	await connection.close();
})();
