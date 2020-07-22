import 'reflect-metadata';
import {createConnection} from "typeorm";
import DepartamentService from './service/DepartamentService';


(async () => {
	try{
		console.log("wololo");
		await createConnection({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "root",
			database: "test",
			entities: [
				`${__dirname}/entity/*.js`
			],
		});
		const department = new DepartamentService();
		await department.generateDepartment();
	}catch (e) {
		console.error(e);
	}
})();
