/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseMappingService } from '../database-mapping/database-mapping.service';

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
  constructor(private readonly mappingService: DatabaseMappingService) {}

  // =================================================================
  // DELEGATED CONNECTION METHODS
  // =================================================================

  // Reuses the heavy connection logic from Mapping Service
  async connect(config: any): Promise<DbConnectionResult> {
    return this.mappingService.connect(config);
  }

  async connectMySQL(cfg: any) {
    return this.mappingService.connect({ ...cfg, type: 'mysql' });
  }

  async connectMSSQL(cfg: any): Promise<DbConnectionResult> {
    return this.mappingService.connect({ ...cfg, type: 'mssql' });
  }

  // =================================================================
  // DELEGATED METADATA METHODS
  // =================================================================

  // Reuses the logic to spin up a temp connection and list databases
  async getDatabasesList(config: any): Promise<string[]> {
    return this.mappingService.getServerDatabases(config);
  }

  async getTables(): Promise<DbTableResult> {
    try {
      const tables = await this.mappingService.getClientTableNames();
      return { success: true, tables };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  async getColumnNames(tableName: string): Promise<string[]> {
    return this.mappingService.getClientColumns(tableName);
  }

  async getTablePreview(tableName: string) {
    return this.mappingService.getTableStructure(tableName);
  }

  // =================================================================
  // UNIQUE LOGIC (Preserved but simplified)
  // =================================================================

  /**
   * This logic was unique to this service (fetching raw types for UI).
   * It reuses the active connection from the mapping service.
   */
  async getColumnTypes(tableName: string): Promise<Record<string, string>> {
    // Access the connection established by mappingService
    // (Casting to 'any' allows reuse without modifying the other file to make clientDB public)
    const ds = (this.mappingService as any).clientDB;

    if (!ds || !ds.isInitialized) return {};

    const driver = ds.options.type;
    const dbName = ds.options.database as string;
    let actualTableName = tableName;
    if (tableName.includes('.')) actualTableName = tableName.split('.')[1];

    let query = '';
    let params: any[] = [];

    if (driver === 'postgres') {
      query = `SELECT column_name, data_type FROM information_schema.columns WHERE LOWER(table_name) = LOWER($1)`;
      params = [actualTableName];
    } else if (driver === 'mssql') {
      query = `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE LOWER(TABLE_NAME) = LOWER(@0) AND TABLE_CATALOG = @1`;
      params = [actualTableName, dbName];
    } else if (driver === 'oracle') {
      query = `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM USER_TAB_COLUMNS WHERE LOWER(TABLE_NAME) = LOWER('${actualTableName}')`;
    } else if (driver === 'mysql' || driver === 'mariadb') {
      query = `SELECT COLUMN_NAME as column_name, DATA_TYPE as data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE LOWER(TABLE_NAME) = LOWER(?) AND TABLE_SCHEMA = ?`;
      params = [actualTableName, dbName];
    } else {
      return {};
    }

    const rows = await ds.query(query, params);
    const map: Record<string, string> = {};
    rows.forEach((r: any) => {
      map[r.column_name.toLowerCase()] = r.data_type;
    });
    return map;
  }
}