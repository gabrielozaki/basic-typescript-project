import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions'
import {
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT
} from '../config';

/**
 * This implementation exists because of the use of dotenv
 * In a static use of the createConnection, the transpiler can create a implementation of ConnectionOptions
 * see: https://typeorm.io/#/undefined/creating-a-connection-to-the-database
 */
export default class MysqlConnectionParameters implements MysqlConnectionOptions {
  readonly type: "mysql" | "mariadb";

  readonly database: string;

  readonly host: string;

  readonly password: string;

  readonly port: number;

  readonly username: string;

  readonly entities: string[];


  constructor() {
    this.type = "mysql";
    this.database = TYPEORM_DATABASE;
    this.host = TYPEORM_HOST;
    this.username = TYPEORM_USERNAME;
    this.password = TYPEORM_PASSWORD;
    this.port = Number(TYPEORM_PORT);
    this.entities = [
      `${__dirname}/../entity/*.js`, `${__dirname}/../entity/*.ts`
    ]
  }
}
