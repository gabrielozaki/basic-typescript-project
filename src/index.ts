import 'reflect-metadata';
import {createConnection} from "typeorm";

createConnection({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "root",
	database: "test",
	entities: [
		__dirname + "/entity/*.js"
	],
	synchronize: true,
}).then(connection => {
	// here you can start to work with your entities
}).catch(error => console.log(error));
