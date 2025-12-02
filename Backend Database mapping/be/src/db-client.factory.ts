import knex from 'knex';
import { dbConfig } from './db.config';
import * as dotenv from 'dotenv';
dotenv.config();

export async function getSourceConnection() {
  const { host, port, user, password, database, options } = dbConfig.source;

  console.log("🚀 Connecting to MSSQL...");

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
    console.error(" MSSQL Connection Failed:", err.message);
    throw err;
  });

  console.log("✅ MSSQL Connected Successfully");
  return db;
}

