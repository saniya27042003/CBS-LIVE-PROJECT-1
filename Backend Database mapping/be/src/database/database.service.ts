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
  connectString?: string; // Oracle
  url?: string; // MongoDB
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

  // ---------------- TARGET POSTGRES DB ----------------
  async getServerDataSource(config: PostgresConfig): Promise<DataSource> {
    if (this.serverDB && this.serverDB.isInitialized) {
      return this.serverDB;
    }

    this.serverDB = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    });

    await this.serverDB.initialize();
    this.logger.log(`Connected to PostgreSQL: ${config.database}`);

    return this.serverDB;
  }

  // ---------------- SOURCE CLIENT DB ----------------
  async getClientConnection(config: ClientDBConfig) {
    switch (config.type) {

      // ---------- ORACLE ----------
      case 'oracle':
  this.logger.log(`Connecting to Oracle...`);
  return oracledb.getConnection({
    user: config.username,
    password: config.password,
    connectString: `${config.host}:${config.port}/${config.database}`,
  });

      // ---------- MYSQL ----------
      case 'mysql':
        this.logger.log(`Connecting to MySQL...`);
        return mysql.createConnection({
          host: config.host,
          port: config.port,
          user: config.username,
          password: config.password,
          database: config.database,
        });

      // ---------- SQL SERVER ----------
      case 'mssql':
        this.logger.log(`Connecting to SQL Server...`);
        return mssql.connect({
          server: config.host!,
          port: config.port!,
          user: config.username!,
          password: config.password!,
          database: config.database!,
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        });

      // ---------- MONGODB ----------
      case 'mongodb':
        this.logger.log(`Connecting to MongoDB...`);
        const client = new MongoClient(config.url!);
        await client.connect();
        return client.db(config.database);

      default:
        throw new Error(`Unsupported DB type: ${config.type}`);
    }
  }

  // ---------------- CLOSE SERVER DB ----------------
  async closeServerConnection() {
    if (this.serverDB && this.serverDB.isInitialized) {
      await this.serverDB.destroy();
      this.serverDB = null;
      this.logger.log('PostgreSQL connection closed');
    }
  }
}