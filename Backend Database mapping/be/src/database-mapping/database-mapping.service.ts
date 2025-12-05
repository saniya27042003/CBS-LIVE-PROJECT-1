import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseMappingService {
    private clientDB: DataSource | null = null; // hold dynamic connection

    constructor(
        @InjectDataSource('primaryDB') private primaryDB: DataSource, // fixed Postgres
    ) { }

    // 🚀 SINGLE CONFIG MAP - handles ALL databases
    private getQueryConfig(driver: string) {
        const configs = {
            postgres: {
                tables: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`,
                columns: `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position`,
                sampleRows: `LIMIT 100`,
                paramStyle: '$1'
            },
            mssql: {
                tables: `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`,
                columns: `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @0 ORDER BY ORDINAL_POSITION`,
                sampleRows: `TOP 100`,
                paramStyle: '@0'
            }

        };
        return configs[driver as keyof typeof configs] || configs.postgres;
    }

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

    // CLIENT tables (ALL DBs) - 5 lines!
    async getClientTableNames() {
        const client = this.ensureClient();
        const driver = this.getDriver(client);
        const config = this.getQueryConfig(driver);

        const result = await client.query(config.tables);
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
                `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
                [tableName],
            );
            return result.map((c: any) => c.column_name);
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // CLIENT DB columns (ALL DBs) - 6 lines!
    async getClientColumns(tableName: string) {
        try {
            const client = this.ensureClient();
            const driver = this.getDriver(client);
            const config = this.getQueryConfig(driver);

            const result = await client.query(config.columns, [tableName]);
            return result.map((c: any) => c.column_name || c.COLUMN_NAME);
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // Table structure (ALL DBs) - 8 lines!
    async getTableStructure(tableName: string) {
        try {
            const client = this.ensureClient();
            const driver = this.getDriver(client);
            const config = this.getQueryConfig(driver);

            const columns = await this.getClientColumns(tableName);

            const rowsSql = driver === 'mssql'
                ? `SELECT ${config.sampleRows} * FROM [${tableName}]`
                : `SELECT * FROM "${tableName}" ${config.sampleRows}`;

            const rows = await client.query(rowsSql);
            return { columns, rows };
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
