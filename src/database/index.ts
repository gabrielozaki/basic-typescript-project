import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';

export default function getConnection() :Promise<Connection> {
	return createConnection({
														type: "mysql",
														host: "localhost",
														port: 3306,
														username: "root",
														password: "root",
														database: "test",
														entities: [
															`${__dirname}/../entity/*.js`, `${__dirname}/../entity/*.ts`
														],
													});
}
