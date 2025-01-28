import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import type { Connection } from 'mysql2';
import mysql from 'mysql2';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import type { StartedTestContainer } from 'testcontainers';
import { GenericContainer } from 'testcontainers';
import path from 'path';
import util from 'util';

import { AppModule } from '../../src/app.module';

async function createDatabaseContainer() {
  const databaseFiles = path.resolve('./docker-mysql-init/');

  return new GenericContainer('mariadb:11.6.2')
    .withExposedPorts(3306)
    .withBindMounts([
      {
        source: databaseFiles,
        target: '/docker-entrypoint-initdb.d',
      },
    ])
    .withEnvironment({ 'MYSQL_ROOT_PASSWORD': 'root' })
    .start();
}
jest.setTimeout(120000);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let container: StartedTestContainer;
  let con: Connection;
  let prisma: PrismaClient;
  let query;

  beforeAll(async () => {
    container = await createDatabaseContainer();
    con = mysql.createConnection({
      host: 'localhost',
      port: Number(container.getMappedPort(3306)),
      user: 'root',
      password: 'root',
      database: 'test',
    });

    query = util.promisify(con.query).bind(con);

    process.env.DATABASE_URL = `mysql://root:root@localhost:${container.getMappedPort(3306)}/test`;
    prisma = new PrismaClient();
    await prisma.$executeRawUnsafe('DROP DATABASE IF EXISTS test;');
    await prisma.$executeRawUnsafe('CREATE DATABASE test;');
    await prisma.$disconnect();
    execSync('npx prisma migrate deploy --schema=src/prisma/schema.prisma', {
      stdio: 'inherit',
      env: {
        ...process.env,
      },
    });
    prisma = new PrismaClient();
    await prisma.$executeRawUnsafe('USE test;');
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const response = await request.default(app.getHttpServer()).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  it('/department (GET)', async () => {
    await request.default(app.getHttpServer()).get('/department').expect(200).expect('true');
    const departmentResult = await query("SELECT * FROM Department WHERE name='TI'");
    const User1Result = await query(
      `SELECT * FROM User WHERE name='Gabriel' AND age=29 AND department_id = '${departmentResult[0].id}'`,
    );
    const User2Result = await query(
      `SELECT * FROM User WHERE name='ozaki' AND age=50 AND department_id = '${departmentResult[0].id}'`,
    );

    expect(departmentResult).toHaveLength(1);
    expect(User1Result).toHaveLength(1);
    expect(User2Result).toHaveLength(1);
  });

  afterAll(async () => {
    con.end();
    await container.stop();
  });
});
