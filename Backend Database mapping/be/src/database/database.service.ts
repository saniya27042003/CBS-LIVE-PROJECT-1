import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
    private clientDB: DataSource | null = null;

    async connectClient(cfg: {
        type: 'mssql';
        host: string;
        port: string | number;
        username: string;
        password: string;
        database: string;
    }) {
        const options: DataSourceOptions = {
            type: 'mssql',
            host: cfg.host,
            port: Number(cfg.port),
            username: cfg.username,
            password: cfg.password,
            database: cfg.database,
            synchronize: false,
            logging: false,
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        };

        try {
            this.clientDB = new DataSource(options);
            await this.clientDB.initialize();
            console.log('Client DB connected');
            return { success: true };
        } catch (err) {
            console.error('Client DB connection error:', err);
            return { success: false, message: (err as Error).message };
        }

    }
}