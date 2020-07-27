import 'reflect-metadata';
import getConnection from './database/index'
import DepartamentService from './service/DepartamentService';


(async () => {
	const connection = await getConnection();
	try{
		await DepartamentService.generateDepartment(connection.manager);
	}catch (e) {
		console.error(e);
	}
	await connection.close();
})();
