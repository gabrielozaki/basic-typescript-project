import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { TYPEORM_HOST, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE, TYPEORM_PORT } from '../config';

export default function getConnection(): Promise<Connection> {
  return createConnection({
    type: 'mysql',
    host: TYPEORM_HOST,
    port: Number(TYPEORM_PORT),
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    entities: [`${__dirname}/../../src/entity/*.js`, `${__dirname}/../../src/entity/*.ts`],
  });
}
