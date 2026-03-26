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
  async getServerDataSource(config: PostgresConfig): Promise<DataSource> {
    if (this.serverDB) {
      await this.serverDB.destroy();
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

    await this.serverDB.initialize();
    this.logger.log(`Connected to PostgreSQL: ${config.database}`);
    return this.serverDB;
  }

  // ---------------- METADATA DISCOVERY (THE HANDSHAKE) ----------------

  async getDatabasesList(config: any): Promise<string[]> {
    const tempDS = new DataSource({
      type: 'postgres',
      host: config.host,
      port: Number(config.port),
      username: config.username,
      password: config.password,
      database: 'postgres',
      synchronize: false,
    });

    try {
      await tempDS.initialize();
      const result = await tempDS.query(
        `SELECT datname as name FROM pg_database WHERE datistemplate = false AND datname != 'postgres'`
      );
      await tempDS.destroy();
      return result.map((db: any) => db.name);
    } catch (error) {
      if (tempDS.isInitialized) await tempDS.destroy();
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
        this.logger.log(`Connecting to Oracle...`);
        const identifier = config.serviceName || config.database;
        if (!identifier) {
          throw new Error("Oracle connection failed: No Database Name or Service Name provided.");
        }
        conn = await oracledb.getConnection({
          user: config.username,
          password: config.password,
          connectString: `${config.host!}:${config.port!}/${identifier}`,
        });
        break;

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
        this.logger.log(`Connecting to MongoDB...`);
        const client = new MongoClient(config.url!);
        await client.connect();
        conn = client.db(config.database);
        break;

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
}