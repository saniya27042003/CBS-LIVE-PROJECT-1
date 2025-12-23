/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

export interface DbConnectionResult {
  success: boolean;
  message?: string;
}

export interface DbTableResult {
  success: boolean;
  tables?: string[];
  message?: string;
}

@Injectable()
export class DatabaseService {
  private dataSource: DataSource | null = null;
  private currentDbName: string | null = null;
  private currentDbType: 'mysql' | 'mssql' | 'mariadb' | null = null;

  // ---------------- MYSQL ----------------
  async connectMySQL(cfg: {
  host: string;
  port: string | number;
  username: string;
  password: string;
  database: string;
}) {
  const forbidden = [
    'mysql',
    'sys',
    'performance_schema',
    'information_schema',
  ];

  if (forbidden.includes(cfg.database)) {
    return {
      success: false,
      message: 'System databases are not allowed',
    };
  }

  const options: DataSourceOptions = {
    type: 'mysql',
    host: cfg.host,
    port: Number(cfg.port) || 3306,
    username: cfg.username,
    password: cfg.password,
    synchronize: false,
    logging: false,
  };

  try {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();
    }

    this.dataSource = new DataSource(options);
    await this.dataSource.initialize();

    // 🔥 FORCE DATABASE
    await this.dataSource.query(`USE \`${cfg.database}\``);

    this.currentDbName = cfg.database;
    this.currentDbType = 'mysql';

    console.log('✅ MySQL connected to:', cfg.database);

    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
}


async connectMariaDB(cfg: {
    host: string;
    port: string | number;
    username: string;
    password: string;
    database: string;
  }) {
    const forbidden = [
      'mysql',
      'sys',
      'performance_schema',
      'information_schema',
    ];

    if (forbidden.includes(cfg.database)) {
      return {
        success: false,
        message: 'System databases are not allowed',
      };
    }

    const options: DataSourceOptions = {
      type: 'mariadb', // ✅ TypeORM supports 'mariadb'
      host: cfg.host,
      port: Number(cfg.port) || 3306, // MariaDB defaults to 3306
      username: cfg.username,
      password: cfg.password,
      synchronize: false,
      logging: false,
    };

    try {
      await this.resetConnection();

      this.dataSource = new DataSource(options);
      await this.dataSource.initialize();

      // 🔥 FORCE DATABASE
      await this.dataSource.query(`USE \`${cfg.database}\``);

      this.currentDbName = cfg.database;
      this.currentDbType = 'mariadb';

      console.log('✅ MariaDB connected to:', cfg.database);

      return { success: true };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }


  // ---------------- MSSQL ----------------
  async connectMSSQL(cfg: {
    host: string;
    port: string | number;
    username: string;
    password: string;
    database: string;
  }): Promise<DbConnectionResult> {
    const options: DataSourceOptions = {
      type: 'mssql',
      host: cfg.host,
      port: Number(cfg.port),
      username: cfg.username,
      password: cfg.password,
      database: cfg.database,
      synchronize: false,
      logging: false,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };

    try {
      await this.resetConnection();

      this.dataSource = new DataSource(options);
      await this.dataSource.initialize();

      this.currentDbName = cfg.database;
      this.currentDbType = 'mssql';

      console.log('✅ MSSQL connected:', cfg.database);
      return { success: true };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  // ---------------- GET TABLES ----------------
  async getTables(): Promise<DbTableResult> {
  if (!this.dataSource || !this.dataSource.isInitialized) {
    return {
      success: false,
      message: 'No database connection established',
    };
  }

  // 🔒 NEVER GUESS THE DATABASE
  if (!this.currentDbName || !this.currentDbType) {
    return {
      success: false,
      message: 'Database not selected',
    };
  }

  // ❌ ABSOLUTE SYSTEM BLOCK
  const forbidden = [
    // MySQL system dbs
    'mysql',
    'sys',
    'performance_schema',
    'information_schema',
    // MSSQL system dbs
    'master',
    'tempdb',
    'model',
    'msdb',
  ];

  if (forbidden.includes((this.currentDbName || '').toLowerCase())) {
    return {
      success: false,
      message: 'System database access blocked',
    };
  }

  try {
    // ✅ MYSQL
    if (this.currentDbType === 'mysql' || this.currentDbType === 'mariadb') {
      const rows = await this.dataSource.query(
        `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = ?
          AND table_type = 'BASE TABLE'
        `,
        [this.currentDbName]
      );

      return {
        success: true,
        tables: rows.map((r: any) => r.table_name),
      };
    }

    // ✅ MSSQL
    if (this.currentDbType === 'mssql') {
      const rows = await this.dataSource.query(
        `
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
          AND TABLE_CATALOG = @0
        `,
        [this.currentDbName]
      );

      return {
        success: true,
        tables: rows.map((r: any) => r.TABLE_NAME),
      };
    }

    return { success: false, message: 'Unsupported DB type' };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message,
    };
  }
}


  // ---------------- CLEANUP ----------------
  private async resetConnection() {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();
    }
    this.dataSource = null;
    this.currentDbName = null;
    this.currentDbType = null;
  }
}