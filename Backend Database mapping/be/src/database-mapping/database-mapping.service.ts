import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { decodeYogesh, transliterateMarathiToEnglish } from '../font-decoder';

@Injectable()
export class DatabaseMappingService {
  private readonly logger = new Logger(DatabaseMappingService.name);
  private clientDB: DataSource | null = null;
  private serverDB: DataSource | null = null;

  /* ===================== HELPERS ===================== */

  private ensureClient() {
    if (!this.clientDB?.isInitialized)
      throw new InternalServerErrorException('Client DB not connected');
    return this.clientDB;
  }

  private ensureServer() {
    if (!this.serverDB?.isInitialized)
      throw new InternalServerErrorException('Server DB not connected');
    return this.serverDB;
  }

  private getClientDriver() {
    return this.ensureClient().options.type;
  }

  private getServerDriver() {
    return this.ensureServer().options.type;
  }

  // Helper to get correct quote char for different DBs
  private getQuoteChar(driver: string) {
    if (driver === 'mssql') return ['[', ']'];
    if (driver === 'mysql' || driver === 'mariadb') return ['`', '`'];
    // Postgres, Oracle, MongoDB (conceptual) use double quotes
    return ['"', '"'];
  }

  // Helper to get correct parameter placeholder
  private getParamPlaceholder(driver: string, index: number) {
    if (driver === 'mssql') return `@${index}`;
    if (driver === 'mysql' || driver === 'mariadb') return '?';
    if (driver === 'oracle') return `:${index}`;
    return `$${index + 1}`; // Postgres
  }

  /* ===================== CONNECTIONS ===================== */

  async connect(config: any) {
    if (this.clientDB?.isInitialized) await this.clientDB.destroy();

    const isMssql = config.type === 'mssql';
    const isOracle = config.type === 'oracle';
    const isMongo = config.type === 'mongodb';

    // Ensure port is a number, set defaults
    let port = 3306;
    if (config.port) port = Number(config.port);
    else if (isMssql) port = 1433;
    else if (isOracle) port = 1521;
    else if (isMongo) port = 27017;
    else if (config.type === 'postgres') port = 5432;

    const ds = new DataSource({
      type: config.type,
      host: config.host,
      port: port,
      username: config.username,
      password: String(config.password || ''),
      database: config.database,
      // Oracle specific
      sid: isOracle ? config.database : undefined, 
      // ✅ MongoDB Specific: Auth against 'admin' DB while using 'newdb'
      authSource: isMongo ? 'admin' : undefined,
      synchronize: false,
      options: isMssql
        ? { encrypt: false, trustServerCertificate: true }
        : undefined,
    } as any);

    await ds.initialize();
    this.clientDB = ds;
    return { success: true };
  }

  async connectServer(config: any) {
    if (this.serverDB?.isInitialized) await this.serverDB.destroy();

    // Defaults to postgres if type not provided
    const type = config.type || 'postgres';
    const isMssql = type === 'mssql';
    const isOracle = type === 'oracle';
    const isMongo = type === 'mongodb';
    
    let port = 5432;
    if (config.port) port = Number(config.port);
    else if (isMssql) port = 1433;
    else if (isOracle) port = 1521;
    else if (isMongo) port = 27017;
    else if (type === 'mysql' || type === 'mariadb') port = 3306;

    const ds = new DataSource({
      type: type,
      host: config.host,
      port: port,
      username: config.username,
      password: String(config.password || ''),
      database: config.database,
      sid: isOracle ? config.database : undefined, 
      // ✅ MongoDB Specific
      authSource: isMongo ? 'admin' : undefined,
      synchronize: false,
      options: isMssql
        ? { encrypt: false, trustServerCertificate: true }
        : undefined,
    } as any);

    await ds.initialize();
    this.serverDB = ds;
    return { success: true };
  }

  /* ===================== METADATA ===================== */

  async getServerDatabases(config: any) {
    const type = config.type || 'postgres';
    const isMssql = type === 'mssql';
    const isMysql = type === 'mysql' || type === 'mariadb';
    const isOracle = type === 'oracle';
    const isMongo = type === 'mongodb';

    // Temp DB for initial connection to list databases
    let tempDbName = 'postgres';
    if (isMssql) tempDbName = 'master';
    if (isMysql) tempDbName = 'mysql';
    if (isOracle) tempDbName = config.database; 
    if (isMongo) tempDbName = config.database; 

    const ds = new DataSource({
      type: type,
      host: config.host,
      port: Number(config.port),
      username: config.username,
      password: String(config.password || ''),
      database: tempDbName,
      sid: isOracle ? config.database : undefined,
      // ✅ MongoDB Specific
      authSource: isMongo ? 'admin' : undefined,
      synchronize: false,
      options: isMssql
        ? { encrypt: false, trustServerCertificate: true }
        : undefined,
    } as any);

    await ds.initialize();

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
        rows = await ds.query(`SELECT username FROM all_users WHERE oracle_maintained = 'N'`);
        rows = rows.map((r) => r.USERNAME);
      } else if (isMongo) {
         // Mongo: Use Admin command to list databases
         const mongoDriver = ds.driver as any;
         const admin = mongoDriver.queryRunner.databaseConnection.db('admin').admin();
         const result = await admin.listDatabases();
         rows = result.databases.map((d: any) => d.name);
      } else {
        // Postgres
        rows = await ds.query(
          `SELECT datname FROM pg_database WHERE datistemplate = false`,
        );
        rows = rows.map((r) => r.datname);
      }
    } finally {
      await ds.destroy();
    }
    return rows;
  }

  async getPrimaryTableNames() {
    const db = this.ensureServer();
    const driver = this.getServerDriver();
    const dbName = db.options.database as string;

    if (driver === 'mssql') {
      const rows = await db.query(
        `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG = '${dbName}'`,
      );
      return rows.map((r: any) => r.TABLE_NAME);
    } else if (driver === 'mysql' || driver === 'mariadb') {
      const rows = await db.query(
        `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${dbName}'`,
      );
      return rows.map((r: any) => r.TABLE_NAME);
    } else if (driver === 'oracle') {
      const rows = await db.query(`SELECT TABLE_NAME FROM USER_TABLES`);
      return rows.map((r: any) => r.TABLE_NAME);
    } else if (driver === 'mongodb') {
        const mongoDriver = db.driver as any;
        try {
            const collections = await mongoDriver.queryRunner.databaseConnection.db(dbName).listCollections().toArray();
            return collections.map((c: any) => c.name);
        } catch (e) {
            return [];
        }
    } else {
      const rows = await db.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
      );
      return rows.map((r: any) => r.table_name);
    }
  }

  async getAllColumnsNames(tableName: string) {
    const db = this.ensureServer();
    const driver = this.getServerDriver();
    const dbName = db.options.database as string;

    if (driver === 'mssql') {
      const rows = await db.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @0 AND TABLE_CATALOG = @1`,
        [tableName, dbName],
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    } else if (driver === 'mysql' || driver === 'mariadb') {
      const rows = await db.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?`,
        [tableName, dbName],
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    } else if (driver === 'oracle') {
      const rows = await db.query(
        `SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}'`,
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    } else if (driver === 'mongodb') {
        // Mongo: Sample first doc
        const mongoDriver = db.driver as any;
        try {
            const collection = mongoDriver.queryRunner.databaseConnection.db().collection(tableName);
            const doc = await collection.findOne({});
            return doc ? Object.keys(doc) : [];
        } catch (e) {
            return [];
        }
    } else {
      const rows = await db.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
        [tableName],
      );
      return rows.map((r: any) => r.column_name);
    }
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

  async getClientTableNames() {
    const db = this.ensureClient();
    const driver = this.getClientDriver();
    let dbName = (db.options && (db.options.database as string)) || null;

    if (driver === 'postgres') {
      const rows = await db.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`,
      );
      return rows.map((r: any) => r.table_name);
    }

    if (driver === 'oracle') {
      const rows = await db.query(`SELECT TABLE_NAME FROM USER_TABLES`);
      return rows.map((r: any) => r.TABLE_NAME);
    }

    // ✅ MongoDB: List Collections
    if (driver === 'mongodb') {
        const mongoDriver = db.driver as any; 
        try {
            const collections = await mongoDriver.queryRunner.databaseConnection.db(dbName).listCollections().toArray();
            return collections.map((c: any) => c.name);
        } catch (e) {
            this.logger.error('Failed to list Mongo collections', e);
            return [];
        }
    }

    const rows = await db.query(
      driver === 'mssql'
        ? `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`
        : `SHOW TABLES`,
    );
    return rows
      .map((r: any) => this.extractTableName(r, dbName || undefined))
      .filter(Boolean);
  }

  async getClientColumns(tableName: string) {
    const db = this.ensureClient();
    const driver = this.getClientDriver();

    if (driver === 'postgres') {
      const rows = await db.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`,
      );
      return rows.map((r: any) => r.column_name);
    }

    if (driver === 'oracle') {
      const rows = await db.query(
        `SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' ORDER BY COLUMN_ID`,
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    }

    // ✅ MongoDB: Sample first document
    if (driver === 'mongodb') {
        const mongoDriver = db.driver as any;
        try {
            const collection = mongoDriver.queryRunner.databaseConnection.db().collection(tableName);
            const doc = await collection.findOne({});
            return doc ? Object.keys(doc) : [];
        } catch (e) {
            this.logger.error(`Failed to get Mongo columns for ${tableName}`, e);
            return [];
        }
    }

    const rows = await db.query(
      driver === 'mssql'
        ? `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`
        : `SHOW COLUMNS FROM \`${tableName}\``,
    );

    return rows.map((r: any) => r.COLUMN_NAME || r.Field || r.column_name);
  }

  async getTableStructure(tableName: string) {
    const db = this.ensureClient();
    const driver = this.getClientDriver();
    const qL = driver === 'mysql' ? '`' : driver === 'mssql' ? '[' : '"';
    const qR = driver === 'mysql' ? '`' : driver === 'mssql' ? ']' : '"';

    // ✅ MongoDB Structure
    if (driver === 'mongodb') {
        const mongoDriver = db.driver as any;
        const collection = mongoDriver.queryRunner.databaseConnection.db().collection(tableName);
        const rows = await collection.find({}).limit(50).toArray();
        // Flatten _id
        const fixedRows = rows.map((r: any) => {
            const newR = { ...r };
            if (newR._id) newR._id = newR._id.toString();
            return newR;
        });
        const columns = fixedRows[0] ? Object.keys(fixedRows[0]) : [];
        return { columns, rows: fixedRows };
    }

    let query = '';
    if (driver === 'mssql') {
      query = `SELECT TOP 50 * FROM ${qL}${tableName}${qR}`;
    } else if (driver === 'oracle') {
      query = `SELECT * FROM ${qL}${tableName}${qR} WHERE ROWNUM <= 50`;
    } else {
      query = `SELECT * FROM ${qL}${tableName}${qR} LIMIT 50`;
    }

    const rows = await db.query(query);
    const columns = rows[0] ? Object.keys(rows[0]) : [];
    return { columns, rows };
  }

  // ===================== TYPE CONVERSION =====================

  private async getServerColumnTypes(tableName: string) {
    const server = this.ensureServer();
    const driver = this.getServerDriver();
    const dbName = server.options.database as string;

    let rows: any[] = [];

    if (driver === 'postgres') {
      rows = await server.query(
        `SELECT column_name, data_type 
         FROM information_schema.columns 
         WHERE table_schema = 'public' AND table_name = $1`,
        [tableName],
      );
    } else if (driver === 'mssql') {
      rows = await server.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type 
         FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_NAME = @0 AND TABLE_CATALOG = @1`,
        [tableName, dbName],
      );
    } else if (driver === 'oracle') {
      rows = await server.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type
         FROM USER_TAB_COLUMNS
         WHERE TABLE_NAME = '${tableName}'`,
      );
    } else if (driver === 'mongodb') {
       // Target is Mongo? Usually not the case in your flow, but handling robustness
       return {}; 
    } else {
      rows = await server.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type 
         FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?`,
        [tableName, dbName],
      );
    }

    const map: Record<string, string> = {};
    rows.forEach((r: any) => {
      map[r.column_name.toLowerCase()] = r.data_type;
    });
    return map;
  }

  private translateSingleValue(value: any): string {
    if (value === null || value === undefined) return '';
    const strVal = String(value);
    if (strVal.trim() === '') return '';

    try {
      const decoded = decodeYogesh(strVal);
      const translated = transliterateMarathiToEnglish(decoded);
      return translated && translated.trim().length > 0 ? translated : strVal;
    } catch (e) {
      return strVal;
    }
  }

  private convertValue(value: any, targetType: string) {
    if (value === null || value === undefined) return null;
    const type = targetType ? targetType.toLowerCase() : 'text';

    // A. STRING / TEXT
    if (
      ['character varying', 'text', 'varchar', 'char', 'nvarchar', 'nchar', 'string', 'clob', 'varchar2'].some(
        (t) => type.includes(t),
      )
    ) {
      return this.translateSingleValue(value);
    }

    // B. NUMBER
    if (
      ['integer', 'int', 'smallint', 'bigint', 'numeric', 'decimal', 'real', 'double', 'float', 'serial', 'identity', 'number'].some(
        (t) => type.includes(t),
      )
    ) {
      if (typeof value === 'string' && value.trim() === '') return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    }

    // C. BOOLEAN
    if (type.includes('bool') || type.includes('bit')) {
      const s = String(value).toLowerCase();
      return ['true', '1', 'yes', 'y', 'on', 't'].includes(s);
    }

    // D. DATE
    if (
      type.includes('date') ||
      type.includes('time') ||
      type.includes('timestamp')
    ) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }

    return value;
  }

  /* ===================== MIGRATION ===================== */

  async insertMappedData(body: any) {
    const { serverTable, mappings } = body;

    if (!serverTable || !Array.isArray(mappings))
      throw new InternalServerErrorException('Invalid payload');

    const validMappings = mappings.filter(
      (m) => m.clientTable && m.serverColumn,
    );
    if (!validMappings.length)
      throw new InternalServerErrorException('No valid mappings found');

    const client = this.ensureClient();
    const server = this.ensureServer();

    const clientDriver = this.getClientDriver();
    const serverDriver = this.getServerDriver();

    // 1. Group by Client Table
    const columnsByTable: Record<string, Set<string>> = {};
    validMappings.forEach((m) => {
      if (!columnsByTable[m.clientTable])
        columnsByTable[m.clientTable] = new Set();
      m.clientColumns.forEach((c: string) =>
        columnsByTable[m.clientTable].add(c),
      );
    });

    // 2. Fetch Source Data
    const dataStore: Record<string, any[]> = {};
    let maxRows = 0;

    // Client Quote chars
    const [cqL, cqR] = this.getQuoteChar(clientDriver);

    for (const table of Object.keys(columnsByTable)) {
      try {
        let rows: any[] = [];

        // ✅ MongoDB Data Fetching
        if (clientDriver === 'mongodb') {
            const mongoDriver = client.driver as any;
            const collection = mongoDriver.queryRunner.databaseConnection.db().collection(table);
            
            // Fetch raw documents
            const rawRows = await collection.find({}).limit(5000).toArray();
            
            // Process _id and other objects
            rows = rawRows.map((r: any) => {
                const newR = { ...r };
                if (newR._id && typeof newR._id === 'object') newR._id = newR._id.toString();
                return newR;
            });

        } else {
            // SQL Data Fetching
            const cols = Array.from(columnsByTable[table]);
            const selectCols = cols.map((c) => `${cqL}${c}${cqR}`).join(', ');
            let query = '';
            
            if (clientDriver === 'mssql') {
                query = `SELECT TOP 5000 ${selectCols} FROM ${cqL}${table}${cqR}`;
            } else if (clientDriver === 'oracle') {
                query = `SELECT ${selectCols} FROM ${cqL}${table}${cqR} WHERE ROWNUM <= 5000`;
            } else {
                query = `SELECT ${selectCols} FROM ${cqL}${table}${cqR} LIMIT 5000`;
            }
            rows = await client.query(query);
        }

        dataStore[table] = rows;
        if (rows.length > maxRows) maxRows = rows.length;

      } catch (err: any) {
        this.logger.error(`Error reading client table ${table}:`, err.message);
        dataStore[table] = [];
      }
    }

    // 3. Prepare Destination
    const serverTypes = await this.getServerColumnTypes(serverTable);
    const [sqL, sqR] = this.getQuoteChar(serverDriver);

    const serverColsList = validMappings
      .map((m) => `${sqL}${m.serverColumn}${sqR}`)
      .join(', ');
    const qr = server.createQueryRunner();
    await qr.connect();

    if (serverDriver === 'mssql') {
      try {
        await qr.query(`SET IDENTITY_INSERT ${sqL}${serverTable}${sqR} ON`);
      } catch (e) {}
    }

    let inserted = 0;
    let skipped = 0;
    const errors: string[] = [];

    try {
      await qr.startTransaction();

      for (let i = 0; i < maxRows; i++) {
        // 4. Map & Convert
        const rowValues = validMappings.map((m) => {
          const sourceRow = dataStore[m.clientTable]?.[i] || {};

          const targetType = serverTypes[m.serverColumn.toLowerCase()];
          const isStringTarget = [
            'character varying', 'text', 'varchar', 'char', 'nvarchar'
          ].some((t) => targetType?.toLowerCase().includes(t));

          // Merge & Translate Logic
          if (isStringTarget && m.clientColumns.length > 1) {
            const parts = m.clientColumns.map((c: string) => {
              const val = sourceRow[c];
              return this.translateSingleValue(val);
            });
            return parts.filter((p: any) => p && p.trim() !== '').join(' ');
          }

          const rawParts = m.clientColumns.map((c: string) => {
            const val = sourceRow[c];
            return val === null || val === undefined ? '' : val;
          });
          const merged = rawParts.join(' ').trim();
          return this.convertValue(merged, targetType);
        });

        // 5. Build Dynamic Insert Query
        const placeholders = rowValues
          .map((_, idx) => this.getParamPlaceholder(serverDriver, idx))
          .join(', ');

        try {
          await qr.query(
            `INSERT INTO ${sqL}${serverTable}${sqR} (${serverColsList}) VALUES (${placeholders})`,
            rowValues,
          );
          inserted++;
        } catch (rowErr: any) {
          skipped++;
          if (
            !['23505', '2627', '1062'].includes(
              String(rowErr.code || rowErr.number),
            )
          ) {
            const msg = `Row ${i + 1} Error: ${rowErr.message}`;
            if (errors.length < 5) errors.push(msg);
          }
        }
      }

      await qr.commitTransaction();

      if (serverDriver === 'mssql') {
        try {
          await qr.query(`SET IDENTITY_INSERT ${sqL}${serverTable}${sqR} OFF`);
        } catch (e) {}
      }

      return {
        success: true,
        inserted,
        skipped,
        processed: maxRows,
        errors: errors.length ? errors : undefined,
      };
    } catch (err: any) {
      await qr.rollbackTransaction();
      throw new InternalServerErrorException(err.message);
    } finally {
      await qr.release();
    }
  }
}