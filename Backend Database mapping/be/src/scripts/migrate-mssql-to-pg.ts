#!/usr/bin/env ts-node
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DataSource } from 'typeorm';
import * as pg from 'pg';
import * as mssql from 'mssql';
import { convertRowStrings } from '../utils/marathi-converter';

// read connection info from env
const MSSQL_CONFIG = {
  user: process.env.MSSQL_USER || 'sa',
  password: process.env.MSSQL_PASS || '',
  server: process.env.MSSQL_HOST || 'localhost',
  database: process.env.MSSQL_DB || 'old_db',
  options: { trustServerCertificate: true },
  port: Number(process.env.MSSQL_PORT || 1433),
};

const PG_CONFIG = {
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASS || '',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DB || 'new_db',
  port: Number(process.env.PG_PORT || 5432),
};

async function main() {
  console.log('Connecting MSSQL...');
  const pool = await mssql.connect(MSSQL_CONFIG);

  console.log('Connecting Postgres...');
  const pgClient = new pg.Client(PG_CONFIG);
  await pgClient.connect();

  // list tables (adjust schema if necessary)
  const tablesRes = await pool.request().query(`
    SELECT TABLE_SCHEMA, TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE='BASE TABLE' AND TABLE_CATALOG='${MSSQL_CONFIG.database}'
  `);

  const tables = tablesRes.recordset;

  for (const t of tables) {
    const schema = t.TABLE_SCHEMA;
    const table = t.TABLE_NAME;
    console.log(`Processing ${schema}.${table} ...`);

    // fetch rows in pages to avoid memory blowup
    const pageSize = 500;
    let offset = 0;
    while (true) {
      const q = `SELECT * FROM [${schema}].[${table}] ORDER BY (SELECT NULL) OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
      const res = await pool.request().query(q);
      const rows = res.recordset;
      if (!rows || rows.length === 0) break;

      // convert rows
      const converted = rows.map((r: any) => convertRowStrings({ ...r }));

      // Create a staging table in Postgres or insert as you like
      // For demo, insert into same-named table in Postgres (must exist with compatible schema)
      for (const row of converted) {
        // build insert dynamically (simple)
        const cols = Object.keys(row);
        const vals = cols.map((c, i) => `$${i + 1}`);
        const sql = `INSERT INTO "${table}" (${cols.map(c => '"' + c + '"').join(',')}) VALUES (${vals.join(',')})`;
        const params = cols.map(c => row[c]);
        try {
          await pgClient.query(sql, params);
        } catch (err) {
          // ignore or log schema mismatch. In production, you'd create staging tables or transform schema.
          console.warn('Pg insert failed (skipping):', err.message);
        }
      }

      offset += pageSize;
    }
  }

  await pool.close();
  await pgClient.end();
  console.log('Migration done (converted strings).');
}

main().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
