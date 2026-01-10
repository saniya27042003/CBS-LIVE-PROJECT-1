import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { join } from 'path';

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
  private currentDbType: 'mysql' | 'mssql' | 'mariadb' | 'mongodb' | 'postgres' | 'oracle' | null = null;

  private mongoDataSource: DataSource | null = null;

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
        .map(p => `${qL}${p.trim()}${qR}`)
        .join('.');
    }
    return `${qL}${tableName}${qR}`;
  }

  private extractTableName(row: any, dbName?: string) {
    if (!row) return '';
    if (typeof row === 'string') return row.trim();

    const keys = ['table_name', 'TABLE_NAME'];
    for (const k of keys) {
      if (row[k]) return String(row[k]).trim();
    }

    if (dbName && row[`Tables_in_${dbName}`]) {
      return String(row[`Tables_in_${dbName}`]).trim();
    }

    for (const v of Object.values(row)) {
      if (v && String(v).trim()) return String(v).trim();
    }
    return '';
  }

  // =================================================================
  // 2. DYNAMIC CONNECTION FACTORY (FIXED RETURN PATHS)
  // =================================================================

  async createConnection(config: any): Promise<DataSource> {
    const type = config.type || 'postgres';

    const isPostgres = type === 'postgres';
    const isOracle = type === 'oracle';
    const isMssql = type === 'mssql';
    const isMongo = type === 'mongodb';
    const isMysql = type === 'mysql' || type === 'mariadb';

    let port = 5432;
    if (config.port) port = Number(config.port);
    else if (isMssql) port = 1433;
    else if (isOracle) port = 1521;
    else if (isMongo) port = 27017;
    else if (isMysql) port = 3306;

    // ---------------- BASE OPTIONS ----------------
    const options: any = {
      type,
      host: config.host,
      port,
      username: config.username,
      password: String(config.password || ''),
      database: config.database,
      synchronize: false,
      logging: true,
    };

    // ---------------- SSL ----------------
    if (config.ssl === true || config.ssl === 'true') {
      if (isPostgres || isMysql) {
        options.ssl = { rejectUnauthorized: false };
      } else if (isMongo) {
        options.ssl = true;
      }
    }

    // ---------------- ORACLE ----------------
    if (isOracle) {
      const ds = new DataSource({
        type: 'oracle',
        username: config.username,
        password: config.password,
        connectString: `${config.host}:${port}/${config.serviceName}`,
        logging: ['query', 'error'],
      });
      await ds.initialize();
      return ds;
    }

    // ---------------- MSSQL ----------------
    if (isMssql) {
      options.options = {
        encrypt: config.encrypt === true || config.encrypt === 'true',
        trustServerCertificate: true,
      };
    }

    // ---------------- POSTGRES (ENTITY AWARE) ----------------
    if (isPostgres) {
      if (this.dataSource?.isInitialized) {
        return this.dataSource;
      }

      const ds = new DataSource({
        ...options,
        entities: [join(__dirname, '../entity/*.entity.{ts,js}')],
      });

      await ds.initialize();
      this.dataSource = ds;
      return ds;
    }

    // ---------------- MYSQL / MARIADB / MONGODB ----------------
    const ds = new DataSource(options);
    await ds.initialize();
    return ds;
  }

  // =================================================================
  // 3. METADATA METHODS
  // =================================================================

  /**
   * 🔴 CRITICAL FOR YOUR ETL RULE
   * Returns NOT NULL columns for server-side tables
   */
  async getNotNullColumns(ds: DataSource, tableName: string): Promise<Set<string>> {
    const driver = ds.options.type;

    if (driver === 'postgres') {
      const rows = await ds.query(
        `SELECT column_name
         FROM information_schema.columns
         WHERE table_name = $1 AND is_nullable = 'NO'`,
        [tableName],
      );
      return new Set(rows.map((r: any) => r.column_name.toLowerCase()));
    }

    if (driver === 'oracle') {
      const rows = await ds.query(
        `SELECT column_name
         FROM user_tab_columns
         WHERE table_name = UPPER('${tableName}')
           AND nullable = 'N'`,
      );
      return new Set(rows.map((r: any) => r.COLUMN_NAME.toLowerCase()));
    }

    return new Set();
  }

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

    const ds = await this.createConnection({ ...config, database: tempDbName });

    try {
      if (isMssql) {
        const rows = await ds.query(
          `SELECT name FROM sys.databases WHERE name NOT IN ('master','tempdb','model','msdb')`,
        );
        return rows.map((r: any) => r.name);
      }

      if (isMysql) {
        const rows = await ds.query(`SHOW DATABASES`);
        return rows.map((r: any) => r.Database);
      }

      if (isOracle) {
        const rows = await ds.query(
          `SELECT username FROM all_users WHERE oracle_maintained = 'N'`,
        );
        return rows.map((r: any) => r.USERNAME);
      }

      if (isMongo) {
        const mongoDriver = ds.driver as any;
        const admin = mongoDriver.queryRunner.databaseConnection.db('admin').admin();
        const result = await admin.listDatabases();
        return result.databases.map((d: any) => d.name);
      }

      const rows = await ds.query(
        `SELECT datname FROM pg_database WHERE datistemplate = false`,
      );
      return rows.map((r: any) => r.datname);
    } finally {
      if (ds.isInitialized) await ds.destroy();
    }
  }

  async getTableNames(ds: DataSource): Promise<string[]> {
    const driver = ds.options.type;
    const dbName = ds.options.database as string;

    if (driver === 'postgres') {
      const rows = await ds.query(
        `SELECT table_name FROM information_schema.tables
         WHERE table_schema NOT IN ('information_schema','pg_catalog')
           AND table_type = 'BASE TABLE'`,
      );
      return rows.map((r: any) => r.table_name);
    }

    if (driver === 'oracle') {
      const rows = await ds.query(`SELECT table_name FROM user_tables`);
      return rows.map((r: any) => r.TABLE_NAME);
    }

    if (driver === 'mongodb') {
      const mongoDriver = ds.driver as any;
      const collections = await mongoDriver.queryRunner.databaseConnection
        .db(dbName)
        .listCollections()
        .toArray();
      return collections.map((c: any) => c.name);
    }

    const rows = await ds.query(
      driver === 'mssql'
        ? `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`
        : `SHOW TABLES`,
    );

    return rows.map((r: any) => this.extractTableName(r, dbName)).filter(Boolean);
  }

  async getColumnNames(ds: DataSource, tableName: string): Promise<string[]> {
    const driver = ds.options.type;
    const actualTable = tableName.includes('.') ? tableName.split('.')[1] : tableName;

    if (driver === 'postgres') {
      const rows = await ds.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
        [actualTable],
      );
      return rows.map((r: any) => r.column_name);
    }

    if (driver === 'oracle') {
      const rows = await ds.query(
        `SELECT column_name FROM user_tab_columns WHERE table_name = UPPER('${actualTable}')`,
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    }

    if (driver === 'mongodb') {
      const mongoDriver = ds.driver as any;
      const doc = await mongoDriver.queryRunner.databaseConnection
        .db()
        .collection(actualTable)
        .findOne({});
      return doc ? Object.keys(doc) : [];
    }

    const rows = await ds.query(
      driver === 'mssql'
        ? `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='${actualTable}'`
        : `SHOW COLUMNS FROM ${actualTable}`,
    );

    return rows.map((r: any) => r.COLUMN_NAME || r.Field);
  }

  async getColumnTypes(ds: DataSource, tableName: string): Promise<Record<string, string>> {
    const driver = ds.options.type;
    const actualTable = tableName.includes('.') ? tableName.split('.')[1] : tableName;

    let rows: any[] = [];

    if (driver === 'postgres') {
      rows = await ds.query(
        `SELECT column_name, data_type FROM information_schema.columns WHERE LOWER(table_name)=LOWER($1)`,
        [actualTable],
      );
    } else if (driver === 'oracle') {
      rows = await ds.query(
        `SELECT column_name, data_type FROM user_tab_columns WHERE LOWER(table_name)=LOWER('${actualTable}')`,
      );
    } else {
      return {};
    }

    const map: Record<string, string> = {};
    rows.forEach(r => (map[r.column_name.toLowerCase()] = r.data_type));
    return map;
  }

  async getTablePreview(ds: DataSource, tableName: string) {
  const driver = ds.options.type;
  const safeTable = this.getQualifiedTableName(String(driver), tableName);

  // ---------------- MONGODB ----------------
  if (driver === 'mongodb') {
    const mongoDriver = ds.driver as any;

    if (!mongoDriver?.queryRunner?.databaseConnection) {
      throw new Error('MongoDB client not initialized');
    }

    const collection = mongoDriver.queryRunner.databaseConnection
      .db(ds.options.database)
      .collection(tableName);

    const rows = await collection.find({}).limit(50).toArray();

    const fixedRows = rows.map((r: any) => {
      const copy = { ...r };
      if (copy._id && typeof copy._id === 'object') {
        copy._id = copy._id.toString();
      }
      return copy;
    });

    const columns = fixedRows[0] ? Object.keys(fixedRows[0]) : [];
    return { columns, rows: fixedRows };
  }

  // ---------------- SQL ----------------
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
  // 4. CONNECTION HELPERS
  // =================================================================

  async connectMySQL(cfg: any): Promise<DbConnectionResult> {
    try {
      await this.resetConnection();
      this.dataSource = await this.createConnection({ type: 'mysql', ...cfg });
      this.currentDbType = 'mysql';
      this.currentDbName = cfg.database;
      return { success: true };
    } catch (e) {
      return { success: false, message: (e as Error).message };
    }
  }

  async connectMongoDB(cfg: any): Promise<DbConnectionResult> {
    try {
      this.mongoDataSource = await this.createConnection({ type: 'mongodb', ...cfg });
      this.currentDbType = 'mongodb';
      this.currentDbName = cfg.database;
      return { success: true };
    } catch (e) {
      return { success: false, message: (e as Error).message };
    }
  }

  getMongoDataSource(): DataSource {
    if (!this.mongoDataSource?.isInitialized) {
      throw new Error('MongoDB not initialized');
    }
    return this.mongoDataSource;
  }

  async connectMSSQL(cfg: any): Promise<DbConnectionResult> {
    try {
      await this.resetConnection();
      this.dataSource = await this.createConnection({ type: 'mssql', ...cfg });
      this.currentDbType = 'mssql';
      this.currentDbName = cfg.database;
      return { success: true };
    } catch (e) {
      return { success: false, message: (e as Error).message };
    }
  }

  async getTables(): Promise<DbTableResult> {
    const ds =
      this.currentDbType === 'mongodb'
        ? this.getMongoDataSource()
        : this.dataSource;

    if (!ds?.isInitialized) {
      return { success: false, message: 'No active connection' };
    }

    const tables = await this.getTableNames(ds);
    return { success: true, tables };
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
