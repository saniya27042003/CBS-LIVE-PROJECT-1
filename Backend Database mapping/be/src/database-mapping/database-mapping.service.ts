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

  /* ===================== CONNECTIONS ===================== */

  async connect(config: any) {
    if (this.clientDB?.isInitialized) await this.clientDB.destroy();

    const isMssql = config.type === 'mssql';

    // ✅ FIX: Ensure password is a String. Numbers will crash Postgres SCRAM auth.
    const safePassword = config.password !== undefined ? String(config.password) : '';

    const ds = new DataSource({
      type: config.type,
      host: config.host,
      port: Number(config.port),
      username: config.username,
      password: safePassword, // <--- Fixed here
      database: config.database,
      synchronize: false,
      options: isMssql
        ? { encrypt: false, trustServerCertificate: true }
        : undefined,
    });

    await ds.initialize();
    this.clientDB = ds;
    return { success: true };
  }

  async connectServer(config: any) {
    if (this.serverDB?.isInitialized) await this.serverDB.destroy();

    // ✅ FIX: Ensure password is a String here as well
    const safePassword = config.password !== undefined ? String(config.password) : '';

    const ds = new DataSource({
      type: 'postgres',
      host: config.host,
      port: Number(config.port),
      username: config.username,
      password: safePassword, // <--- Fixed here
      database: config.database,
      synchronize: false,
    });

    await ds.initialize();
    this.serverDB = ds;
    return { success: true };
  }

  /* ===================== METADATA ===================== */

  async getServerDatabases(config: any) {
    const safePassword = config.password !== undefined ? String(config.password) : '';

    const ds = new DataSource({
      type: 'postgres',
      host: config.host,
      port: Number(config.port),
      username: config.username,
      password: safePassword,
      database: 'postgres',
      synchronize: false,
    });

    await ds.initialize();
    const rows = await ds.query(
      `SELECT datname FROM pg_database WHERE datistemplate = false`,
    );
    await ds.destroy();
    return rows.map((r: any) => r.datname);
  }

  async getPrimaryTableNames() {
    const db = this.ensureServer();
    const rows = await db.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    return rows.map((r: any) => r.table_name);
  }

  async getAllColumnsNames(tableName: string) {
    const db = this.ensureServer();
    const rows = await db.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
      [tableName],
    );
    return rows.map((r: any) => r.column_name);
  }

  async getClientTableNames() {
    const db = this.ensureClient();
    const driver = this.getClientDriver();
    if (driver === 'postgres') {
      const rows = await db.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`,
      );
      return rows.map((r: any) => r.table_name);
    }
    const rows = await db.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`,
    );
    return rows.map((r: any) => r.TABLE_NAME);
  }

  async getClientColumns(tableName: string) {
    const db = this.ensureClient();
    const driver = this.getClientDriver();
    if (driver === 'postgres') {
      const rows = await db.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position`,
        [tableName],
      );
      return rows.map((r: any) => r.column_name);
    }
    const rows = await db.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @0 ORDER BY ORDINAL_POSITION`,
      [tableName],
    );
    return rows.map((r: any) => r.COLUMN_NAME);
  }

  async getTableStructure(tableName: string) {
    const db = this.ensureClient();
    const driver = this.getClientDriver();
    const q =
      driver === 'postgres'
        ? `SELECT * FROM "${tableName}" LIMIT 50`
        : `SELECT TOP 50 * FROM [${tableName}]`;
    const rows = await db.query(q);
    const columns = rows[0] ? Object.keys(rows[0]) : [];
    return { columns, rows };
  }

  // ===================== TYPE CONVERSION =====================

  private async getServerColumnTypes(tableName: string) {
    const server = this.ensureServer();
    const rows = await server.query(
      `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = $1
    `,
      [tableName],
    );

    const map: Record<string, string> = {};
    rows.forEach((r: any) => {
      map[r.column_name.toLowerCase()] = r.data_type;
    });
    return map;
  }

  private convertValue(value: any, pgType: string) {
    // 1. Handle Nulls
    if (value === null || value === undefined) return null;

    // 2. Normalize Target Type
    const type = pgType ? pgType.toLowerCase() : 'text';

    // ==========================================================
    // CASE A: Target is STRING / TEXT
    // ==========================================================
    if (
      ['character varying', 'text', 'varchar', 'char', 'character'].some((t) =>
        type.includes(t),
      )
    ) {
      const originalStr = String(value);

      if (originalStr.trim() === '') return null;

      try {
        // Translation Logic
        const decoded = decodeYogesh(originalStr);
        const translated = transliterateMarathiToEnglish(decoded);

        if (translated && translated.trim().length > 0) {
          return translated;
        }
        return originalStr; // Fallback to original
      } catch (e) {
        return originalStr;
      }
    }

    // ==========================================================
    // CASE B: Target is NUMBER
    // ==========================================================
    if (
      [
        'integer',
        'smallint',
        'bigint',
        'numeric',
        'decimal',
        'real',
        'double precision',
        'serial',
      ].some((t) => type.includes(t))
    ) {
      if (typeof value === 'string' && value.trim() === '') return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    }

    // ==========================================================
    // CASE C: Target is BOOLEAN
    // ==========================================================
    if (type.includes('bool')) {
      const s = String(value).toLowerCase();
      return ['true', '1', 'yes', 'y', 'on', 't'].includes(s);
    }

    // ==========================================================
    // CASE D: Target is DATE
    // ==========================================================
    if (type.includes('date') || type.includes('time')) {
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
    const clientType = this.getClientDriver();

    // 1. Group by Table
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

    for (const table of Object.keys(columnsByTable)) {
      const cols = Array.from(columnsByTable[table]);
      const qL = clientType === 'postgres' ? '"' : '[';
      const qR = clientType === 'postgres' ? '"' : ']';
      const selectCols = cols.map((c) => `${qL}${c}${qR}`).join(', ');

      try {
        const rows = await client.query(
          `SELECT ${selectCols} FROM ${qL}${table}${qR}`,
        );
        dataStore[table] = rows;
        if (rows.length > maxRows) maxRows = rows.length;
      } catch (err: any) {
        console.error(`Error reading table ${table}:`, err.message);
        dataStore[table] = [];
      }
    }

    // 3. Get Target Types
    const serverTypes = await this.getServerColumnTypes(serverTable);

    const serverCols = validMappings
      .map((m) => `"${m.serverColumn}"`)
      .join(', ');
    const qr = server.createQueryRunner();
    await qr.connect();

    let inserted = 0;
    let skipped = 0;
    const errors: string[] = [];

    try {
      for (let i = 0; i < maxRows; i++) {
        const rowValues = validMappings.map((m) => {
          const sourceRow = dataStore[m.clientTable]?.[i] || {};

          const rawParts = m.clientColumns.map(
            (c: string) => sourceRow[c] ?? '',
          );
          const merged = rawParts.join(' ').trim();

          const targetType = serverTypes[m.serverColumn.toLowerCase()];

          return this.convertValue(merged, targetType);
        });

        const placeholders = rowValues
          .map((_, idx) => `$${idx + 1}`)
          .join(', ');

        try {
          await qr.query(
            `INSERT INTO "${serverTable}" (${serverCols}) VALUES (${placeholders})`,
            rowValues,
          );
          inserted++;
        } catch (rowErr: any) {
          skipped++;
          if (rowErr.code !== '23505') {
            const msg = `Row ${i + 1} Error: ${rowErr.message}`;
            if (errors.length < 5) errors.push(msg);
          }
        }
      }

      return {
        success: true,
        inserted,
        skipped,
        processed: maxRows,
        errors: errors.length ? errors : undefined,
      };
    } finally {
      await qr.release();
    }
  }
}