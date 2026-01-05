/* eslint-disable @typescript-eslint/no-unsafe-call */
import knex from 'knex';
import { Client } from 'pg';
import { dbConfig } from './db.config';
import * as dotenv from 'dotenv';
dotenv.config();






// db-client.factory.ts
import * as oracledb from 'oracledb';

export async function getOracleConnection() {
  return await oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_SERVICE}`,
  });
}



export async function getPostgresConnection() {
  const client = new Client({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT || 5432),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });

  await client.connect();

  // ✅ THIS IS THE LINE YOU WERE ASKING ABOUT
  await client.query("SET client_encoding TO 'UTF8'");

  console.log('✅ PostgreSQL Connected with UTF8 encoding');

  return client;
}





export async function getSourceConnection() {
  const { host, port, user, password, database, options } = dbConfig.source;

  console.log('🚀 Connecting to MSSQL...');

  const db = knex({
    client: 'mssql',
    connection: {
      host,
      port,
      user,
      password,
      database,
      options: {
        instanceName: options?.instanceName || 'SQLEXPRESS',
        encrypt: false,
        trustServerCertificate: true,
      },
    },
  });

  // Test connection
  await db.raw('SELECT 1').catch((err) => {
    console.error(' MSSQL Connection Failed:', err.message);
    throw err;
  });

  console.log('✅ MSSQL Connected Successfully');
  return db;
}
