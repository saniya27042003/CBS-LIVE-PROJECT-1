import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { transliterate } from './marathi-to-english.util';
// import { transliterate } from '../utils/marathi-to-english.util';

@Injectable()
export class DatabaseMappingService {
  private clientDB: DataSource | null = null;
  private serverDB: DataSource | null = null;

  constructor() {
    console.log("Database Mapping Service Loaded");
  }

  // =========================================================
  // SQL Dictionary for all Supported DB Drivers
  // =========================================================
  private getQueryConfig(driver: string) {
    const configs = {
      postgres: {
        tables: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema='public' AND table_type='BASE TABLE'
        `,
        columns: `
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_schema='public' AND table_name = $1
          ORDER BY ordinal_position
        `,
        sampleRows: (table: string) => `SELECT * FROM "${table}" LIMIT 100`,
      },

      mssql: {
        tables: `
          SELECT TABLE_NAME 
          FROM INFORMATION_SCHEMA.TABLES 
          WHERE TABLE_TYPE='BASE TABLE'
        `,
        columns: `
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = @0
          ORDER BY ORDINAL_POSITION
        `,
        sampleRows: (table: string) => `SELECT TOP 100 * FROM [${table}]`,
      },

      mysql: {
        tables: `SHOW TABLES`,
        columns: `SHOW COLUMNS FROM ??`,
        sampleRows: (table: string) => `SELECT * FROM \`${table}\` LIMIT 100`,
      }
    };

    return configs[driver] ?? configs.postgres;  // fallback prevents null errors
  }

  private getDriver(ds: DataSource) {
    return ds.options.type as string; // postgres | mssql | mysql...
  }

  // =========================================================
  // CLIENT DATABASE CONNECTION (Dynamic: PG / MSSQL / MySQL)
  // =========================================================
  async connect(config: any) {
    try {
      if (this.clientDB?.isInitialized) await this.clientDB.destroy();

      const isMssql = config.type === 'mssql';

      const ds = new DataSource({
        type: config.type,
        host: config.host,
        port: Number(config.port),
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [],
        synchronize: false,
        options: isMssql
          ? { encrypt: true, trustServerCertificate: true }
          : undefined,
      });

      await ds.initialize();
      this.clientDB = ds;

      return { success: true, message: "Client DB connected successfully!" };

    } catch (err: any) {
      return {
        success: false,
        message: "Client DB connection failed",
        error: err.message,
      };
    }
  }


  async getServerDatabases(config: any) {
  const ds = new DataSource({
    type: 'postgres',
    host: config.host,
    port: Number(config.port),
    username: config.username,
    password: config.password,
    database: 'postgres',
  });

  await ds.initialize();

  const result = await ds.query(`
    SELECT datname FROM pg_database WHERE datistemplate = false;
  `);

  await ds.destroy();

  return result.map((r: any) => r.datname);
}


  // =========================================================
  // SERVER DATABASE (Always PostgreSQL)
  // =========================================================
  async connectServer(config: any) {
    try {
      if (this.serverDB?.isInitialized) await this.serverDB.destroy();

      const ds = new DataSource({
        type: "postgres",
        host: config.host,
        port: Number(config.port),
        username: config.username,
        password: config.password,
        database: config.database,
        synchronize: false,
      });

      await ds.initialize();
      this.serverDB = ds;

      return { success: true, message: "Server DB connected successfully!" };

    } catch (err: any) {
      return {
        success: false,
        message: "Server DB connection failed",
        error: err.message,
      };
    }
  }

  private ensureClient() {
    if (!this.clientDB?.isInitialized)
      throw new InternalServerErrorException("Client DB not connected");
    return this.clientDB;
  }

  private ensureServer() {
    if (!this.serverDB?.isInitialized)
      throw new InternalServerErrorException("Server DB not connected");
    return this.serverDB;
  }

  // =========================================================
  // CLIENT TABLE LIST
  // =========================================================
  async getClientTableNames() {
    const client = this.ensureClient();
    const driver = this.getDriver(client);
    const config = this.getQueryConfig(driver);

    const result = await client.query(config.tables);

    return result.map((t: any) =>
      t.table_name || t.TABLE_NAME || Object.values(t)[0]
    );
  }

  // =========================================================
  // SERVER TABLE LIST
  // =========================================================
  async getPrimaryTableNames() {
    const server = this.ensureServer();

    const result = await server.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public' AND table_type='BASE TABLE'
    `);

    return result.map((t: any) => t.table_name);
  }

  // =========================================================
  // SERVER COLUMNS (Postgres)
  // =========================================================
  async getAllColumnsNames(tableName: string) {
    const server = this.ensureServer();

    const result = await server.query(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_schema='public' AND table_name=$1`,
      [tableName]
    );

    return result.map((c: any) => c.column_name);
  }

  // =========================================================
  // CLIENT COLUMNS (PG / MSSQL / MySQL)
  // =========================================================
  async getClientColumns(tableName: string) {
    const client = this.ensureClient();
    const driver = this.getDriver(client);
    const config = this.getQueryConfig(driver);

    const result = await client.query(config.columns, [tableName]);

    return result.map((c: any) =>
      c.column_name || c.COLUMN_NAME || Object.values(c)[0]
    );
  }

  // =========================================================
  // TABLE STRUCTURE PREVIEW
  // =========================================================
  async getTableStructure(tableName: string) {
    const client = this.ensureClient();
    const driver = this.getDriver(client);
    const config = this.getQueryConfig(driver);

    const columns = await this.getClientColumns(tableName);
    const rows = await client.query(config.sampleRows(tableName));

    return { columns, rows };
  }

  // =========================================================
  // DATE CLEANER (Fixes gmt+0530 errors)
  // =========================================================
  private cleanDate(value: any) {
  if (!value) return value;

  const str = String(value).trim();

  // Already in correct YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  // Remove timezone parts
  const cleaned = str
    .replace(/\(.*?\)/g, "") // remove (India Standard Time)
    .replace(/GMT.*$/g, "")  // remove timezone
    .trim();

  // Try parsing
  const parsed = new Date(cleaned);

  if (!isNaN(parsed.getTime())) {
    // Format to YYYY-MM-DD
    return parsed.toISOString().split("T")[0];
  }

  return null; // invalid date becomes NULL
}


  // =========================================================
  // INSERT / MIGRATION LOGIC (With Transliteration + Merge + Date Fix)
  // =========================================================
  async insertMappedData(body: any) {
    const { serverTable, clientTable, mappings } = body;

    const client = this.ensureClient();
    const server = this.ensureServer();

    // Build SELECT fields dynamically
    const clientCols = mappings
      .map(m => (m.merge ? m.client.map(c => `"${c}"`).join(",") : `"${m.client}"`))
      .join(",");

    const serverCols = mappings.map(m => `"${m.server}"`).join(",");

    const clientRows = await client.query(`SELECT ${clientCols} FROM "${clientTable}"`);

    if (!clientRows.length) {
      return { success: false, message: "Client table has no data" };
    }

    const qr = server.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      for (const row of clientRows) {

        const values = mappings.map(m => {
          let rawValue = "";

          // MERGE logic
          if (m.merge) {
            rawValue = m.client
              .map(col => transliterate(String(row[col] ?? "")))
              .join(" ")
              .trim();
          } else {
            rawValue = transliterate(String(row[m.client] ?? ""));
          }

          // DATE FIX
          if (
            m.server.toLowerCase().includes("dob") ||
            m.server.toLowerCase().includes("date")
          ) {
            rawValue = this.cleanDate(rawValue);
          }

          return rawValue;
        });

        const placeholders = values.map((_, i) => `$${i + 1}`).join(",");

        await qr.query(
          `INSERT INTO "${serverTable}" (${serverCols}) VALUES (${placeholders})`,
          values
        );
      }

      await qr.commitTransaction();

      return {
        success: true,
        inserted: clientRows.length,
        message: "Data migrated successfully"
      };

    } catch (err: any) {
      await qr.rollbackTransaction();
      throw new InternalServerErrorException("Insert failed: " + err.message);
    } finally {
      await qr.release();
    }
  }
}
