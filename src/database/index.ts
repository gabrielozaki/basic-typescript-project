import { createConnection } from 'typeorm';

createConnection({
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
