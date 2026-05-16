/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as oracledb from 'oracledb';
import * as mysql from 'mysql2/promise';
import * as mssql from 'mssql';
import { MongoClient } from 'mongodb';

export type ClientDBType = 'oracle' | 'mysql' | 'mssql' | 'mongodb';

export interface ClientDBConfig {
  type: ClientDBType;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  serviceName?: string;
  connectString?: string;
  url?: string;
}

export interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface TableDependency {
  child_table: string;
  level: number;
}
@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private serverDB: DataSource | null = null;
  private clientConn: any = null; // ✅ Persistent storage for client connection

  // ---------------- CONNECTION GETTERS ----------------

  getServerDataSourceInstance(): DataSource | null {
    return this.serverDB;
  }

  // ✅ Added this method to fix the 'property does not exist' error in your mapping service
  getClientConnectionInstance(): any {
    return this.clientConn;
  }

  // ---------------- TARGET POSTGRES DB ----------------
  // ---------------- TARGET POSTGRES DB ----------------
  async getServerDataSource(config: PostgresConfig): Promise<DataSource> {
    // Check if we have an existing connection object
    if (this.serverDB) {
      // ONLY destroy if it actually successfully connected before
      if (this.serverDB.isInitialized) {
        try {
          await this.serverDB.destroy();
          this.logger.log('Previous active connection closed.');
        } catch (err) {
          this.logger.error(`Error: ${err.message}`);
        }
      }
      // Always null it out so we start fresh with the new config/IP
      this.serverDB = null;
    }

    this.serverDB = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database || 'postgres',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    });

    try {
      await this.serverDB.initialize();
      this.logger.log(`Connected to PostgreSQL: ${config.database}`);
      return this.serverDB;
    } catch (error) {
      // If initialization fails (like a wrong IP), clear the reference 
      // so the next attempt doesn't try to destroy a dead connection.
      this.serverDB = null;
      throw error;
    }
  }

  // ---------------- METADATA DISCOVERY (THE HANDSHAKE) ----------------

  async getDatabasesList(config: any): Promise<string[]> {
    const tempDS = new DataSource({
      type: 'postgres',
      host: config.host,
      port: Number(config.port),
      username: config.username,
      password: config.password,
      database: 'postgres', // Default management DB
      synchronize: false,
    });

    try {
      await tempDS.initialize();
      const result = await tempDS.query(
        `SELECT datname as name FROM pg_database WHERE datistemplate = false AND datname != 'postgres'`
      );

      // Clean up safely
      await tempDS.destroy();
      return result.map((db: any) => db.name);
    } catch (error) {
      // Safety check here too to prevent the crash you were seeing earlier
      if (tempDS && tempDS.isInitialized) {
        await tempDS.destroy();
      }
     this.logger.error(`Handshake failed: ${error.message}`);
      throw error;
    }
  }

  async getTableNames(conn: any): Promise<string[]> {
    if (!conn) throw new Error('No connection provided');

    if (conn instanceof DataSource) {
      const res = await conn.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
      );
      return res.map((r: any) => r.table_name);
    }

    if (typeof conn.execute === 'function') {
      const res = await conn.execute(`SELECT table_name FROM user_tables ORDER BY table_name`);
      return res.rows.map((row: any) => (Array.isArray(row) ? row[0] : row.TABLE_NAME));
    }

    return [];
  }

  async getColumnNames(conn: any, tableName: string): Promise<string[]> {
    if (!conn) throw new Error('No connection provided');

    if (conn instanceof DataSource) {
      const res = await conn.query(
        `SELECT column_name 
         FROM information_schema.columns 
         WHERE LOWER(table_name) = LOWER($1) 
         AND table_schema = 'public'
         ORDER BY ordinal_position`,
        [tableName]
      );
      return res.map((c: any) => c.column_name);
    }

    if (typeof conn.execute === 'function') {
      const res = await conn.execute(
        `SELECT column_name FROM user_tab_columns WHERE table_name = :tbl ORDER BY column_id`,
        [tableName.toUpperCase()]
      );
      return res.rows.map((row: any) => (Array.isArray(row) ? row[0] : row.COLUMN_NAME));
    }

    return [];
  }

  // ---------------- SOURCE CLIENT DB ----------------
  async getClientConnection(config: ClientDBConfig): Promise<any> {
    let conn: any; // ✅ Capture the connection locally first

    switch (config.type) {
      case 'oracle':
        { this.logger.log(`Connecting to Oracle...`);
        const identifier = config.serviceName || config.database;
        if (!identifier) {
          throw new Error("Oracle connection failed: No Database Name or Service Name provided.");
        }
        conn = await oracledb.getConnection({
          user: config.username,
          password: config.password,
          connectString: `${config.host!}:${config.port!}/${identifier}`,
        });
        break; }

      case 'mysql':
        this.logger.log(`Connecting to MySQL...`);
        conn = await mysql.createConnection({
          host: config.host,
          port: config.port,
          user: config.username,
          password: config.password,
          database: config.database,
        });
        break;

      case 'mssql':
        this.logger.log(`Connecting to SQL Server...`);
        conn = await mssql.connect({
          server: config.host!,
          port: config.port!,
          user: config.username!,
          password: config.password!,
          database: config.database!,
          options: { encrypt: false, trustServerCertificate: true },
        });
        break;

      case 'mongodb':
        { this.logger.log(`Connecting to MongoDB...`);
        const client = new MongoClient(config.url!);
        await client.connect();
        conn = client.db(config.database);
        break; }

      default:
        throw new Error(`Unsupported DB type: ${config.type}`);
    }

    this.clientConn = conn; // ✅ Store the connection in the service instance
    return conn;
  }

  async closeServerConnection() {
    if (this.serverDB && this.serverDB.isInitialized) {
      await this.serverDB.destroy();
      this.serverDB = null;
      this.logger.log('PostgreSQL connection closed');
    }
  }




/**
 * Recursively deletes data starting from child tables up to the base table
 * and resets sequences for all affected tables.
 */

/**
   * RECURSIVE DELETE LOGIC
   */
 async deleteTableRecursively(tableName: string): Promise<void> {

  const ds = this.getServerDataSourceInstance();

  if (!ds) {
    throw new Error('PostgreSQL connection not established');
  }

  const queryRunner = ds.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.startTransaction();

  try {

    // ✅ CHECK TABLE EXISTS
    const exists = await queryRunner.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = $1
      )
      `,
      [tableName]
    );

    if (!exists[0].exists) {
      throw new Error(`Table "${tableName}" does not exist`);
    }

    this.logger.log(`Finding dependencies for: ${tableName}`);

    // ✅ FIND DEPENDENCIES
    const dependencyTree = await queryRunner.query(`

WITH RECURSIVE fk_tree AS (

    SELECT
        ccu.table_name AS parent_table,
        tc.table_name AS child_table,
        1 AS level,
        ARRAY[tc.table_name] AS visited

    FROM information_schema.table_constraints tc

    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name

    JOIN information_schema.constraint_column_usage ccu
      ON ccu.constraint_name = tc.constraint_name

    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND ccu.table_name = $1

    UNION ALL

    SELECT
        ccu.table_name,
        tc.table_name,
        ft.level + 1,
        visited || tc.table_name

    FROM information_schema.table_constraints tc

    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name

    JOIN information_schema.constraint_column_usage ccu
      ON ccu.constraint_name = tc.constraint_name

    JOIN fk_tree ft
      ON ccu.table_name = ft.child_table

    WHERE tc.constraint_type = 'FOREIGN KEY'

      AND NOT tc.table_name = ANY(ft.visited)
)

SELECT DISTINCT child_table, level
FROM fk_tree
ORDER BY level DESC;

`, [tableName]) as TableDependency[];

this.logger.log(
  `Dependencies found: ${dependencyTree.length}`
);

    // ✅ DELETE CHILD TABLES FIRST
   const processed = new Set<string>();

for (const row of dependencyTree) {

  if (processed.has(row.child_table)) {
    continue;
  }

  processed.add(row.child_table);

  await this.clearTableAndResetSeq(
    queryRunner,
    row.child_table
  );
}

    // ✅ DELETE MAIN TABLE
    await this.clearTableAndResetSeq(
      queryRunner,
      tableName
    );

    // ✅ COMMIT
    await queryRunner.commitTransaction();

    this.logger.log(
  `Transaction committed for ${tableName}`
);

  } catch (error) {

    // ❌ ROLLBACK IF FAILURE
    await queryRunner.rollbackTransaction();

    this.logger.error(
      `Recursive delete failed for ${tableName}: ${error.message}`
    );

    throw error;

  } finally {

    await queryRunner.release();
  }
}

  private async clearTableAndResetSeq(
  queryRunner: any,
  table: string
): Promise<void> {

  this.logger.log(`Cleaning table: ${table}`);

  await queryRunner.query(
    `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`
  );
}
}