import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseMappingService {
    private clientDB: DataSource | null = null; // hold dynamic connection

    constructor(
        @InjectDataSource('primaryDB') private primaryDB: DataSource, // fixed Postgres
    ) { }

    // helper
    private getDriver(ds: DataSource) {
        return ds.options.type as string; // 'postgres' | 'mssql' | ...
    }

    // connect to any client DB from config
    async connect(config: any) {
        try {
            if (this.clientDB && this.clientDB.isInitialized) {
                await this.clientDB.destroy();
            }

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
                    ? {
                        encrypt: true,
                        trustServerCertificate: true,
                    }
                    : undefined,
            });

            await ds.initialize();
            this.clientDB = ds;

            return { success: true, message: 'Client DB Connected Successfully!' };
        } catch (err: any) {
            console.error('Client DB connection error:', err);
            return {
                success: false,
                message: 'Client DB Connection Failed',
                error: err.message,
            };
        }
    }

    private ensureClient() {
        if (!this.clientDB || !this.clientDB.isInitialized) {
            throw new InternalServerErrorException('Client DB not connected');
        }
        return this.clientDB;
    }

    getConnection() {
        return this.ensureClient();
    }

    // PRIMARY (Postgres) tables
    async getPrimaryTableNames() {
        const result = await this.primaryDB.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `);
        return result.map((t: any) => t.table_name);
    }

    // CLIENT tables (Postgres + MSSQL)
    async getClientTableNames() {
        const client = this.ensureClient();
        const driver = this.getDriver(client);

        let sql: string;

        if (driver === 'postgres') {
            sql = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE';
      `;
        } else if (driver === 'mssql') {
            sql = `
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
          AND TABLE_SCHEMA = 'dbo';
      `;
        } else {
            sql = `
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE';
      `;
        }

        const result = await client.query(sql);
        return result.map((t: any) => t.table_name || t.TABLE_NAME);
    }

    async getAllTableNames() {
        try {
            return this.getClientTableNames();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // PRIMARY DB columns (Postgres)
    async getAllColumnsNames(tableName: string) {
        try {
            const result = await this.primaryDB.query(
                `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = $1;
        `,
                [tableName],
            );
            return result.map((c: any) => c.column_name);
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // CLIENT DB columns (Postgres + MSSQL)
    async getClientColumns(tableName: string) {
        try {
            const client = this.ensureClient();
            const driver = this.getDriver(client);

            let sql: string;
            let params: any[];

            if (driver === 'postgres') {
                sql = `
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = $1
          ORDER BY ordinal_position;
        `;
                params = [tableName];
            } else if (driver === 'mssql') {
                sql = `
          SELECT COLUMN_NAME
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_SCHEMA = 'dbo'
            AND TABLE_NAME = @0
          ORDER BY ORDINAL_POSITION;
        `;
                params = [tableName];
            } else {
                sql = `
          SELECT COLUMN_NAME
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = ?
          ORDER BY ORDINAL_POSITION;
        `;
                params = [tableName];
            }

            const result = await client.query(sql, params);
            return result.map((c: any) => c.column_name || c.COLUMN_NAME);
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getTableStructure(tableName: string) {
        try {
            const client = this.ensureClient();
            const driver = this.getDriver(client);

            // columns
            const columns = await this.getClientColumns(tableName);

            // sample rows
            let rowsSql: string;
            if (driver === 'mssql') {
                rowsSql = `SELECT TOP 100 * FROM [${tableName}]`;
            } else {
                rowsSql = `SELECT * FROM "${tableName}" LIMIT 100;`;
            }

            const rows = await client.query(rowsSql);

            return { columns, rows };
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
