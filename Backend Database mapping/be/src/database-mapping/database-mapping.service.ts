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

  private getQuoteChar(driver: string) {
    if (driver === 'mssql') return ['[', ']'];
    if (driver === 'mysql' || driver === 'mariadb') return ['`', '`'];
    return ['"', '"'];
  }

  private getParamPlaceholder(driver: string, index: number) {
    if (driver === 'mssql') return `@${index}`;
    if (driver === 'mysql' || driver === 'mariadb') return '?';
    if (driver === 'oracle') return `:${index}`;
    return `$${index + 1}`;
  }

  private getQualifiedTableName(driver: string, table: string) {
    const [qL, qR] = this.getQuoteChar(driver);
    if (table.includes('.')) {
      return table
        .split('.')
        .map((part) => `${qL}${part}${qR}`)
        .join('.');
    }
    return `${qL}${table}${qR}`;
  }

  private getValueFromTable(row: any, tableName: string, colName: string) {
    if (!row) return undefined;
    const targetKey = `${tableName}:::${colName}`.toLowerCase();
    const foundKey = Object.keys(row).find(
      (k) => k.toLowerCase() === targetKey,
    );
    return foundKey ? row[foundKey] : undefined;
  }

  /* ===================== CONNECTIONS ===================== */

  async connect(config: any) {
    if (this.clientDB?.isInitialized) await this.clientDB.destroy();
    this.clientDB = await this.createDataSource(config);
    return { success: true };
  }

  async connectServer(config: any) {
    if (this.serverDB?.isInitialized) await this.serverDB.destroy();
    this.serverDB = await this.createDataSource(config);
    return { success: true };
  }

  private async createDataSource(config: any) {
    const type = config.type || 'postgres';
    const isMssql = type === 'mssql';
    const isOracle = type === 'oracle';
    const isMongo = type === 'mongodb';
    const isMysql = type === 'mysql' || type === 'mariadb';

    let port = 5432;
    if (config.port) port = Number(config.port);
    else if (isMssql) port = 1433;
    else if (isOracle) port = 1521;
    else if (isMongo) port = 27017;
    else if (isMysql) port = 3306;

    const ds = new DataSource({
      type: type,
      host: config.host,
      port: port,
      username: config.username,
      password: String(config.password || ''),
      database: config.database,
      sid: isOracle ? config.database : undefined,
      authSource: isMongo ? 'admin' : undefined,
      synchronize: false,
      options: isMssql
        ? { encrypt: false, trustServerCertificate: true }
        : undefined,
    } as any);

    await ds.initialize();
    return ds;
  }

  /* ===================== METADATA ===================== */

  async getServerDatabases(config: any) {
    const type = config.type || 'postgres';
    const isMssql = type === 'mssql';
    const isMysql = type === 'mysql' || type === 'mariadb';
    const isOracle = type === 'oracle';
    const isMongo = type === 'mongodb';

    let tempDbName = 'postgres';
    if (isMssql) tempDbName = 'master';
    if (isMysql) tempDbName = 'mysql';
    if (isOracle || isMongo) tempDbName = config.database;

    const ds = await this.createDataSource({ ...config, database: tempDbName });

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
        const admin = (ds.driver as any).queryRunner.databaseConnection
          .db('admin')
          .admin();
        const result = await admin.listDatabases();
        rows = result.databases.map((d: any) => d.name);
      } else {
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
    return this.getTableNames(this.ensureServer());
  }

  async getClientTableNames() {
    return this.getTableNames(this.ensureClient());
  }

  private async getTableNames(db: DataSource) {
    const driver = db.options.type;
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
      try {
        const collections = await (
          db.driver as any
        ).queryRunner.databaseConnection
          .db(dbName)
          .listCollections()
          .toArray();
        return collections.map((c: any) => c.name);
      } catch {
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
    return this.getColumns(this.ensureServer(), tableName);
  }

  async getClientColumns(tableName: string) {
    return this.getColumns(this.ensureClient(), tableName);
  }

  private async getColumns(db: DataSource, tableName: string) {
    const driver = db.options.type;
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
        `SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' ORDER BY COLUMN_ID`,
      );
      return rows.map((r: any) => r.COLUMN_NAME);
    } else if (driver === 'mongodb') {
      try {
        const doc = await (db.driver as any).queryRunner.databaseConnection
          .db()
          .collection(tableName)
          .findOne({});
        return doc ? Object.keys(doc) : [];
      } catch {
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

  async getTableStructure(tableName: string) {
    const db = this.ensureClient();
    const driver = this.getClientDriver();
    const qL = driver === 'mysql' ? '`' : driver === 'mssql' ? '[' : '"';
    const qR = driver === 'mysql' ? '`' : driver === 'mssql' ? ']' : '"';

    if (driver === 'mongodb') {
      const rows = await (db.driver as any).queryRunner.databaseConnection
        .db()
        .collection(tableName)
        .find({})
        .limit(50)
        .toArray();
      const fixedRows = rows.map((r: any) => {
        if (r._id) r._id = r._id.toString();
        return r;
      });
      return {
        columns: fixedRows[0] ? Object.keys(fixedRows[0]) : [],
        rows: fixedRows,
      };
    }

    let query = `SELECT * FROM ${qL}${tableName}${qR} LIMIT 50`;
    if (driver === 'mssql')
      query = `SELECT TOP 50 * FROM ${qL}${tableName}${qR}`;
    if (driver === 'oracle')
      query = `SELECT * FROM ${qL}${tableName}${qR} WHERE ROWNUM <= 50`;

    const rows = await db.query(query);
    const columns = rows[0] ? Object.keys(rows[0]) : [];
    return { columns, rows };
  }

  // ===================== TYPE CONVERSION =====================

  private async getServerColumnTypes(tableName: string) {
    const server = this.ensureServer();
    const driver = this.getServerDriver();
    const dbName = server.options.database as string;
    let cleanTable = tableName.includes('.')
      ? tableName.split('.')[1]
      : tableName;
    let rows: any[] = [];

    if (driver === 'postgres') {
      rows = await server.query(
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
        [cleanTable],
      );
    } else if (driver === 'mssql') {
      rows = await server.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @0 AND TABLE_CATALOG = @1`,
        [cleanTable, dbName],
      );
    } else if (driver === 'oracle') {
      rows = await server.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM USER_TAB_COLUMNS WHERE LOWER(TABLE_NAME) = LOWER('${cleanTable}')`,
      );
    } else if (driver === 'mysql' || driver === 'mariadb') {
      rows = await server.query(
        `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?`,
        [cleanTable, dbName],
      );
    }

    const map: Record<string, { type: string; actualName: string }> = {};
    rows.forEach((r: any) => {
      map[r.column_name.toLowerCase()] = {
        type: r.data_type,
        actualName: r.column_name,
      };
    });
    return map;
  }

  private translateSingleValue(value: any): string {
    if (value == null) return '';
    const strVal = String(value);
    if (!strVal.trim()) return '';
    try {
      const decoded = decodeYogesh(strVal);
      const translated = transliterateMarathiToEnglish(decoded);
      return translated && translated.trim().length > 0 ? translated : strVal;
    } catch {
      return strVal;
    }
  }

  private convertValue(value: any, targetType: string) {
    if (value == null) return null;
    const type = targetType ? targetType.toLowerCase() : 'text';

    if (['char', 'text', 'string', 'clob'].some((t) => type.includes(t))) {
      return this.translateSingleValue(value);
    }
    if (
      ['int', 'numeric', 'decimal', 'float', 'double', 'number'].some((t) =>
        type.includes(t),
      )
    ) {
      if (String(value).trim() === '') return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    }
    if (type.includes('bool') || type.includes('bit')) {
      return ['true', '1', 'yes', 'y', 't'].includes(
        String(value).toLowerCase(),
      );
    }
    if (type.includes('date') || type.includes('time')) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return value;
  }

  /* ===================== CORE MIGRATION LOGIC (FIXED) ===================== */

  async insertMappedData(body: any) {
    const client = this.ensureClient();
    const server = this.ensureServer();
    const clientDriver = client.options.type as string;
    const serverDriver = server.options.type as string;
    const [cqL, cqR] = this.getQuoteChar(clientDriver);

    // --- 1. SETUP ---
    const { mappings, joinKey } = body;
    if (!Array.isArray(mappings) || !mappings.length)
      throw new InternalServerErrorException('No mappings provided');

    const validMappings = mappings.filter(
      (m) => m.clientTable && m.serverColumn,
    );
    const columnsByTable: Record<string, Set<string>> = {};
    validMappings.forEach((m) => {
      if (!columnsByTable[m.clientTable])
        columnsByTable[m.clientTable] = new Set();
      if (joinKey) columnsByTable[m.clientTable].add(joinKey);
      m.clientColumns.forEach((c: string) =>
        columnsByTable[m.clientTable].add(c),
      );
    });

    // --- 2. FETCH AND PREFIX DATA ---
    const dataStore: Record<string, any[]> = {};
    const tables = Object.keys(columnsByTable);

    for (const table of tables) {
      try {
        let rows: any[] = [];

        // A. MongoDB Fetch
        if (clientDriver === 'mongodb') {
          const rawRows = await (client.driver as any).queryRunner.databaseConnection
            .db()
            .collection(table)
            .find({})
            .limit(10000)
            .toArray();

          rows = rawRows.map((r: any) => {
            const newR: any = {};
            // PREFIX KEYS to avoid collision
            Object.keys(r).forEach((k) => {
              const val = k === '_id' && r[k] ? r[k].toString() : r[k];
              newR[`${table}:::${k}`] = val;
            });
            return newR;
          });
        }
        // B. SQL Fetch
        else {
          const actualColumns = await this.getClientColumns(table);
          const lowerCaseSchema = actualColumns.map((c) => c.toLowerCase());
          const requestedCols = Array.from(columnsByTable[table]);
          const finalSelectCols: string[] = [];

          for (const reqCol of requestedCols) {
            const idx = lowerCaseSchema.indexOf(reqCol.toLowerCase());
            if (idx !== -1) {
              finalSelectCols.push(`${cqL}${actualColumns[idx]}${cqR}`);
            }
          }

          if (finalSelectCols.length > 0) {
            const selectStr = finalSelectCols.join(', ');
            const safeTable = this.getQualifiedTableName(clientDriver, table);
            const sortCol = joinKey
              ? actualColumns.find(
                  (c) => c.toLowerCase() === joinKey.toLowerCase(),
                ) || actualColumns[0]
              : actualColumns[0];

            let query = `SELECT ${selectStr} FROM ${safeTable} ORDER BY ${cqL}${sortCol}${cqR} LIMIT 10000`;
            if (clientDriver === 'mssql')
              query = `SELECT TOP 10000 ${selectStr} FROM ${safeTable} ORDER BY ${cqL}${sortCol}${cqR}`;
            if (clientDriver === 'oracle')
              query = `SELECT ${selectStr} FROM ${safeTable} WHERE ROWNUM <= 10000 ORDER BY ${cqL}${sortCol}${cqR}`;

            const rawRows = await client.query(query);

            // PREFIX KEYS to avoid collision
            rows = rawRows.map((r: any) => {
              const newR: any = {};
              Object.keys(r).forEach((k) => {
                newR[`${table}:::${k}`] = r[k];
              });
              return newR;
            });
          }
        }
        dataStore[table] = rows;
      } catch (e) {
        this.logger.error(
          `Error fetching from ${table}: ${(e as Error).message}`,
        );
        dataStore[table] = [];
      }
    }

    // --- 3. MERGE STRATEGY (FIXED) ---
    if (tables.length === 0)
      return { success: false, message: 'Source tables query failed.' };

    const preparedRows: any[] = [];
    
    // Find Max Rows to iterate
    let maxRows = 0;
    tables.forEach(t => {
       if (dataStore[t] && dataStore[t].length > maxRows) {
          maxRows = dataStore[t].length;
       }
    });

    const primaryTable = tables[0];

    for (let i = 0; i < maxRows; i++) {
      const baseRow = dataStore[primaryTable]?.[i] || {}; 
      const combinedRow = { ...baseRow };

      for (let j = 1; j < tables.length; j++) {
        const otherTable = tables[j];
        const otherRows = dataStore[otherTable] || [];
        let matchingRow = null;

        if (joinKey) {
          // Look for key with prefix
          const val = this.getValueFromTable(baseRow, primaryTable, joinKey);
          if (val !== undefined) {
            matchingRow = otherRows.find(
              (r) =>
                String(this.getValueFromTable(r, otherTable, joinKey)) ===
                String(val),
            );
          }
        }

        // ✅ FIX: Allow fallback even if joinKey was present but failed to match
        if (!matchingRow) {
           matchingRow = otherRows[i];
        }

        if (matchingRow) Object.assign(combinedRow, matchingRow);
      }
      preparedRows.push(combinedRow);
    }

    if (!preparedRows.length)
      return { success: false, message: 'No source data mapped.' };

    // --- 4. INSERTION ---
    const targetTables = new Set<string>();
    validMappings.forEach((m) => {
      targetTables.add(m.targetTable || body.serverTable);
    });

    const results: any[] = [];
    for (const targetTable of targetTables) {
      const tableMappings = validMappings.filter(
        (m) => (m.targetTable || body.serverTable) === targetTable,
      );

      if (tableMappings.length > 0) {
        const result = await this.performInsertion(
          preparedRows,
          tableMappings,
          targetTable,
          server,
          serverDriver,
        );
        results.push({ table: targetTable, ...result });
      }
    }

    return { success: true, results };
  }

  private async performInsertion(
    preparedRows: any[],
    mappings: any[],
    targetTable: string,
    server: DataSource,
    serverDriver: string,
  ) {
    const serverTypes = await this.getServerColumnTypes(targetTable);
    const [sqL, sqR] = this.getQuoteChar(serverDriver);

    const serverColsList = mappings
      .map((m) => {
        const meta = serverTypes[m.serverColumn.toLowerCase()];
        return `${sqL}${meta ? meta.actualName : m.serverColumn}${sqR}`;
      })
      .join(', ');

    const qr = server.createQueryRunner();
    await qr.connect();
    const safeTargetTable = this.getQualifiedTableName(
      serverDriver,
      targetTable,
    );

    if (serverDriver === 'mssql') {
      try {
        await qr.query(`SET IDENTITY_INSERT ${safeTargetTable} ON`);
      } catch {}
    }

    let inserted = 0;
    let skipped = 0;
    const errors: string[] = [];

    try {
      await qr.startTransaction();

      for (let i = 0; i < preparedRows.length; i++) {
        const sourceRow = preparedRows[i];

        const rowValues = mappings.map((m) => {
          const meta = serverTypes[m.serverColumn.toLowerCase()];
          const targetType = meta ? meta.type : 'text';
          const isString = ['char', 'text', 'varchar', 'string'].some((t) =>
            targetType?.toLowerCase().includes(t),
          );

          if (isString && m.clientColumns.length > 1) {
            const parts = m.clientColumns.map((c: string) => {
              const val = this.getValueFromTable(sourceRow, m.clientTable, c);
              return this.translateSingleValue(val);
            });
            return parts
              .filter((p: any) => p && String(p).trim() !== '')
              .join(' ');
          }

          const rawParts = m.clientColumns.map((c: string) => {
            const val = this.getValueFromTable(sourceRow, m.clientTable, c);
            return val == null ? '' : val;
          });
          return this.convertValue(rawParts.join(' ').trim(), targetType);
        });

        const placeholders = rowValues
          .map((_, idx) => this.getParamPlaceholder(serverDriver, idx))
          .join(', ');

        try {
          await qr.query(
            `INSERT INTO ${safeTargetTable} (${serverColsList}) VALUES (${placeholders})`,
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
            if (errors.length < 5)
              errors.push(`Row ${i + 1}: ${rowErr.message}`);
          }
        }
      }

      await qr.commitTransaction();
      if (serverDriver === 'mssql') {
        try {
          await qr.query(`SET IDENTITY_INSERT ${safeTargetTable} OFF`);
        } catch {}
      }

      return {
        inserted,
        skipped,
        processed: preparedRows.length,
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