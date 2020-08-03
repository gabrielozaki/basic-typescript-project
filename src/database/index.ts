import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import MysqlConnectionParameters from "./MysqlConnectionParameters";

export default function getConnection() :Promise<Connection> {
	return createConnection(new MysqlConnectionParameters());
}
