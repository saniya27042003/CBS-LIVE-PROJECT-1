/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

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

  // =================================================================
  // 1. GENERIC HELPERS
  // =================================================================

  getQuoteChar(driver: string) {
    if (driver === 'mssql') return ['[', ']'];
    if (driver === 'mysql' || driver === 'mariadb') return ['`', '`'];
    return ['"', '"'];
  }

  getParamPlaceholder(driver: string, index: number) {
    if (driver === 'mssql') return `@${index}`;
    if (driver === 'mysql' || driver === 'mariadb') return '?';
    if (driver === 'oracle') return `:${index}`;
    return `$${index + 1}`;
  }

  getQualifiedTableName(driver: string, tableName: string): string {
    const [qL, qR] = this.getQuoteChar(driver);
    if (tableName.includes('.')) {
      return tableName
        .split('.')
        .map(part => `${qL}${part.trim()}${qR}`)
        .join('.');
    }
    return `${qL}${tableName}${qR}`;
  }

  private extractTableName(row: any, dbName?: string) {
    if (!row) return '';
    if (typeof row === 'string') return row.trim();
    const keys = ['table_name', 'TABLE_NAME'];
    for (const k of keys) {
      if (k in row && row[k]) return String(row[k]).trim();
    }
    if (dbName) {
      const k1 = 'Tables_in_' + dbName;
      if (k1 in row && row[k1]) return String(row[k1]).trim();
    }
    for (const v of Object.values(row)) {
      if (v && String(v).trim() !== '') return String(v).trim();
    }
    return '';
  }

  // =================================================================
  // 2. DYNAMIC CONNECTION FACTORY
  // =================================================================

  async createConnection(config: any): Promise<DataSource> {
    const type = config.type || 'postgres';
    const isMssql = type === 'mssql';
    const isOracle = type === 'oracle';
    const isMongo = type === 'mongodb';
    const isMysql = type === 'mysql' || type === 'mariadb';
    const isPostgres = type === 'postgres';

    let port = 5432;
    if (config.port) port = Number(config.port);
    else if (isMssql) port = 1433;
    else if (isOracle) port = 1521;
    else if (isMongo) port = 27017;
    else if (isMysql) port = 3306;

    const options: any = {
      type: type,
      host: config.host,
      port: port,
      username: config.username,
      password: String(config.password || ''),
      database: config.database,
      sid: isOracle ? config.database : undefined,
      authSource: isMongo ? 'admin' : undefined,
      synchronize: false,
      logging: false,
    };

    if (config.ssl === true || config.ssl === 'true') {
      if (isPostgres || isMysql) {
        options.ssl = { rejectUnauthorized: false };
      } else if (isMongo) {
        options.ssl = true;
      }
    }

    if (isMssql) {
      options.options = {
        encrypt: config.encrypt === true || config.encrypt === 'true', 
        trustServerCertificate: true,
      };
    }

    const ds = new DataSource(options);
    await ds.initialize();
    return ds;
  }

  // =================================================================
  // 3. METADATA METHODS
  // =================================================================

  async getDatabasesList(config: any): Promise<string[]> {
    const type = config.type || 'postgres';
    const isMssql = type === 'mssql';
    const isMysql = type === 'mysql' || type === 'mariadb';
    const isOracle = type === 'oracle';
    const isMongo = type === 'mongodb';

    let tempDbName = 'postgres';
    if (isMssql) tempDbName = 'master';
    if (isMysql) tempDbName = 'mysql';
    if (isOracle || isMongo) tempDbName = config.database;

    const tempConfig = { ...config, database: tempDbName };
    const ds = await this.createConnection(tempConfig);

    let rows: any[] = [];
    try {
      if (isMssql) {
        rows = await ds.query(
          `SELECT name FROM sys.databases WHERE name NOT IN ('master','tempdb','model','msdb')`,
        );
        rows = rows.map((r) => r.name);
      } else if (isMysql) {
        rows = await ds.query(`SHOW DATABASES`);
        rows = rows.map((r) => r.Database);
      } else if (isOracle) {
        rows = await ds.query(
          `SELECT username FROM all_users WHERE oracle_maintained = 'N'`,
        );
        rows = rows.map((r) => r.USERNAME);
      } else if (isMongo) {
        const mongoDriver = ds.driver as any;
        const admin = mongoDriver.queryRunner.databaseConnection.db('admin').admin();
        const result = await admin.listDatabases();
        rows = result.databases.map((d: any) => d.name);
      } else {
        rows = await ds.query(
          `SELECT datname FROM pg_database WHERE datistemplate = false`,
        );
        rows = rows.map((r) => r.datname);
      }
    } finally {
      if (ds.isInitialized) await ds.destroy();
    }
    return rows;
  }

  async getTableNames(ds: DataSource): Promise<string[]> {
    const driver = ds.options.type;
    const dbName = ds.options.database as string;

    if (driver === 'postgres') {
      const rows = await ds.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog') AND table_type = 'BASE TABLE'`,
      );
      return rows.map((r: any) => r.table_name);
    }

    if (driver === 'oracle') {
      const rows = await ds.query(`SELECT TABLE_NAME FROM USER_TABLES`);
      return rows.map((r: any) => r.TABLE_NAME);
    }

    if (driver === 'mongodb') {
      const mongoDriver = ds.driver as any;
      try {
        const collections = await mongoDriver.queryRunner.databaseConnection
          .db(dbName)
          .listCollections()
          .toArray();
        return collections.map((c: any) => c.name);
      } catch (e) {
        return [];
      }
    }

    const rows = await ds.query(
      driver === 'mssql'
        ? `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`
        : `SHOW TABLES`,
    );

    return rows
      .map((r: any) => this.extractTableName(r, dbName || undefined))
      .filter(Boolean);
  }

  async getColumnNames(ds: DataSource, tableName: string): Promise<string[]> {
    const driver = ds.options.type;
    const dbName = ds.options.database as string;
    let actualTableName = tableName;
    if (tableName.includes('.')) actualTableName = tableName.split('.')[1];

    if (driver === 'postgres') {
      const rows = await ds.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = '${actualTableName}'`,
      );
      return rows.map((r: any) => r.column_name);
    }

    if (driver === 'oracle') {
      const rows = await ds.query(
        `SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${actualTableName}' ORDER BY COLUMN_ID`,
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    }

    if (driver === 'mongodb') {
      const mongoDriver = ds.driver as any;
      try {
        const collection = mongoDriver.queryRunner.databaseConnection
          .db()
          .collection(actualTableName);
        const doc = await collection.findOne({});
        return doc ? Object.keys(doc) : [];
      } catch (e) {
        return [];
      }
    }

    if (driver === 'mssql') {
      const rows = await ds.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @0 AND TABLE_CATALOG = @1`,
        [actualTableName, dbName],
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    } else {
      const rows = await ds.query(`SHOW COLUMNS FROM \`${actualTableName}\``);
      return rows.map((r: any) => r.COLUMN_NAME || r.Field || r.column_name);
    }
  }

  async getColumnTypes(ds: DataSource, tableName: string): Promise<Record<string, string>> {
    const driver = ds.options.type;
    const dbName = ds.options.database as string;
    let rows: any[] = [];
    
    let actualTableName = tableName;
    if (tableName.includes('.')) actualTableName = tableName.split('.')[1];

    // ✅ FIX: Use LOWER() to make metadata lookup case-insensitive
    if (driver === 'postgres') {
      rows = await ds.query(
        `SELECT column_name, data_type FROM information_schema.columns WHERE LOWER(table_name) = LOWER($1)`,
        [actualTableName],
      );
    } else if (driver === 'mssql') {
      rows = await ds.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE LOWER(TABLE_NAME) = LOWER(@0) AND TABLE_CATALOG = @1`,
        [actualTableName, dbName],
      );
    } else if (driver === 'oracle') {
      rows = await ds.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM USER_TAB_COLUMNS WHERE LOWER(TABLE_NAME) = LOWER('${actualTableName}')`,
      );
    } else if (driver === 'mongodb') {
      return {};
    } else {
      rows = await ds.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE LOWER(TABLE_NAME) = LOWER(?) AND TABLE_SCHEMA = ?`,
        [actualTableName, dbName],
      );
    }

    const map: Record<string, string> = {};
    rows.forEach((r: any) => {
      map[r.column_name.toLowerCase()] = r.data_type;
    });
    return map;
  }

  async getTablePreview(ds: DataSource, tableName: string) {
    const driver = ds.options.type;
    const safeTable = this.getQualifiedTableName(String(driver), tableName);

    if (driver === 'mongodb') {
        const mongoDriver = ds.driver as any;
        const collection = mongoDriver.queryRunner.databaseConnection.db().collection(tableName);
        const rows = await collection.find({}).limit(50).toArray();
        const fixedRows = rows.map((r: any) => {
          const newR = { ...r };
          if (newR._id && typeof newR._id === 'object') newR._id = newR._id.toString();
          return newR;
        });
        const columns = fixedRows[0] ? Object.keys(fixedRows[0]) : [];
        return { columns, rows: fixedRows };
    }

    let query = '';
    if (driver === 'mssql') {
      query = `SELECT TOP 50 * FROM ${safeTable}`;
    } else if (driver === 'oracle') {
      query = `SELECT * FROM ${safeTable} WHERE ROWNUM <= 50`;
    } else {
      query = `SELECT * FROM ${safeTable} LIMIT 50`;
    }

    const rows = await ds.query(query);
    const columns = rows[0] ? Object.keys(rows[0]) : [];
    return { columns, rows };
  }

  // =================================================================
  // 4. LEGACY METHODS
  // =================================================================

  async connectMySQL(cfg: any) {
    try {
      await this.resetConnection();
      this.dataSource = await this.createConnection({ type: 'mysql', ...cfg });
      await this.dataSource.query(`USE \`${cfg.database}\``);
      this.currentDbName = cfg.database;
      this.currentDbType = 'mysql';
      return { success: true };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  async connectMSSQL(cfg: any): Promise<DbConnectionResult> {
    try {
      await this.resetConnection();
      this.dataSource = await this.createConnection({ type: 'mssql', ...cfg });
      this.currentDbName = cfg.database;
      this.currentDbType = 'mssql';
      return { success: true };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  async getTables(): Promise<DbTableResult> {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      return { success: false, message: 'No database connection established' };
    }
    try {
      const tables = await this.getTableNames(this.dataSource);
      return { success: true, tables };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  private async resetConnection() {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();
    }
    this.dataSource = null;
    this.currentDbName = null;
    this.currentDbType = null;
  }
}