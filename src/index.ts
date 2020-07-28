import 'reflect-metadata';
import getConnection from './database/index'
import DepartamentService from './service/DepartamentService';


(async () => {
	const connection = await getConnection();
	const departamentService = new DepartamentService(connection.manager);
	try{
		await departamentService.generateDepartment();
	}catch (e) {
		console.error(e);
	}
	await connection.close();
})();
