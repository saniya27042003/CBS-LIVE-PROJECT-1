/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseMappingService {
    private clientDB: DataSource | null = null; // hold dynamic connection

    constructor(
        @InjectDataSource('primaryDB') private primaryDB: DataSource, // demo
    ) { }

    // connect to any client DB from config
    async connect(config: any) {
        try {
            if (this.clientDB && this.clientDB.isInitialized) {
                await this.clientDB.destroy();
            }

            const ds = new DataSource({
                type: config.type,
                host: config.host,
                port: Number(config.port),
                username: config.username,
                password: config.password,
                database: config.database,
                entities: [],
                synchronize: false,
            });

            await ds.initialize();
            this.clientDB = ds;

            return { success: true, message: 'Client DB Connected Successfully!' };
        } catch (err) {
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

    async getPrimaryTableNames() {
        const result = await this.primaryDB.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `);
        return result.map((t: any) => t.table_name);
    }

    async getClientTableNames() {
        const client = this.ensureClient();
        const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `);
        return result.map((t: any) => t.table_name);
    }

    async getAllTableNames() {
        try {
            const client = this.ensureClient();
            const result = await client.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE';
      `);
            return result.map((t: any) => t.table_name);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // PRIMARY DB columns
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
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // CLIENT DB columns
    async getClientColumns(tableName: string) {
        try {
            const client = this.ensureClient();
            const result = await client.query(
                `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = $1;
        `,
                [tableName],
            );
            return result.map((c: any) => c.column_name);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getTableStructure(tableName: string) {
        try {
            const client = this.ensureClient();

            const colsResult = await client.query(
                `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = $1
        ORDER BY ordinal_position;
        `,
                [tableName],
            );
            const columns = colsResult.map((c: any) => c.column_name);

            const rows = await client.query(
                `SELECT * FROM "${tableName}" LIMIT 100;`,
            );

            return { columns, rows };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
