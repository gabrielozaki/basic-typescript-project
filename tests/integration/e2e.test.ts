import { GenericContainer } from "testcontainers";
import { createConnection } from 'typeorm';
import mysql, { Connection } from "mysql";
import util from "util";


import path from "path"
import { StartedTestContainer } from "testcontainers/dist/test-container";
import DepartmentService from "../../src/service/DepartmentService";

async function createDatabaseContainer() {
  const databaseFiles = path.resolve('./docker-mysql-init/');
  return new GenericContainer("mysql", "5.7")
    .withExposedPorts(3306)
    .withBindMount(databaseFiles, "/docker-entrypoint-initdb.d")
    .withEnv("MYSQL_ROOT_PASSWORD", "root")
    .start();
}

jest.setTimeout(120000);

describe('End to End Test',() => {
  let container: StartedTestContainer;
  let con: Connection;
  let query;

  beforeAll(async () => {
    container = await createDatabaseContainer();
    con = mysql.createConnection({
      host: container.getContainerIpAddress(),
      port: Number(container.getMappedPort(3306)),
      user: "root",
      password: "root",
      database: "test",
    });

    query = util.promisify(con.query).bind(con);

  });

  it('should run without throwing any exceptions', async () => {
    const connection = await createConnection({
      type: "mysql",
      host: container.getContainerIpAddress(),
      port: Number(container.getMappedPort(3306)),
      username: "root",
      password: "root",
      database: "test",
      entities : [
        `${__dirname}/../../src/entity/*.js`, `${__dirname}/../../src/entity/*.ts`
      ],
      migrations: [`${__dirname}/../../src/database/migrations/**/*.ts`]
    });
    await connection.runMigrations()
    const departmentService = new DepartmentService(connection);
    await departmentService.generateDepartment();
    const departmentResult = await query("SELECT * FROM department WHERE name='TI'");
    const User1Result = await query(`SELECT * FROM user WHERE name='Gabriel' AND age=29 AND department_id = '${departmentResult[0].id}'` );
    const User2Result = await query(`SELECT * FROM user WHERE name='ozaki' AND age=50 AND department_id = '${departmentResult[0].id}'`);

    expect(departmentResult.length).toEqual(1);
    expect(User1Result.length).toEqual(1);
    expect(User2Result.length).toEqual(1);
  })

  afterAll(() => {
    container.stop();
  })
});
