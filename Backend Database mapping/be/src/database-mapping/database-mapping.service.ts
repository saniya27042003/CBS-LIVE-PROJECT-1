import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseMappingService {
  private clientDB: DataSource | null = null;
  private serverDB: DataSource | null = null;

  constructor() {
    console.log("Database Mapping Service Loaded");
  }

  // =========================================================
  // CONFIG — SQL DICTIONARY FOR ALL SUPPORTED DATABASES
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
  // SERVER TABLE LIST (Postgres only)
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
  // INSERT / MIGRATION LOGIC (Supports Merge)
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
        const values = mappings.map(m =>
          m.merge ? m.client.map(col => row[col]).join(" ") : row[m.client]
        );

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
        message: "Data migrated successfully",
      };

    } catch (err: any) {
      await qr.rollbackTransaction();
      throw new InternalServerErrorException("Insert failed: " + err.message);

    } finally {
      await qr.release();
    }
  }
}
