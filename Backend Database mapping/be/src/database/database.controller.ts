/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { 
  Body, 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
  BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DatabaseService } from '../database/database.service';
import type { PostgresConfig, ClientDBConfig } from '../database/database.service';
// Import ExcelJS and Express types correctly
import * as ExcelJS from 'exceljs';
//import { Express } from 'express';

@Controller('db')
export class DatabaseController {
  private serverConnected = false;
  private clientConnected = false;

  constructor(private readonly dbService: DatabaseService) { }

  // ---------------- CONNECT SERVER (POSTGRES) ----------------
  @Post('connect-server')
  async connectServer(@Body() config: PostgresConfig) {
    await this.dbService.getServerDataSource(config);
    this.serverConnected = true;

    return {
      success: true,
      message: 'Server database connected successfully',
    };
  }

  // ---------------- CONNECT CLIENT (ANY DB) ----------------
  @Post('connect-client')
  async connectClient(@Body() config: ClientDBConfig) {
    await this.dbService.getClientConnection(config);
    this.clientConnected = true;

    return {
      success: true,
      message: `Client database (${config.type}) connected successfully`,
    };
  }

  // ---------------- DELETE TABLE (EXCEL UPLOAD) ----------------
 
/* eslint-disable @typescript-eslint/no-unsafe-call */
@Post('DeleteTable')
@UseInterceptors(FileInterceptor('file'))
async deleteTable(@UploadedFile() file: any) {
  if (!file || !file.buffer) {
    throw new BadRequestException('No file uploaded or file buffer is empty');
  }

  // ✅ FIX: Query the real TypeORM DataSource instance initialization state instead of the local boolean
  const ds = this.dbService.getServerDataSourceInstance();
  if (!ds || !ds.isInitialized) {
    throw new BadRequestException('Server database not connected. Please connect first.');
  }

  const tablesToDelete: string[] = [];
  const fileName = String(file.originalname).toLowerCase();

  try {
    if (fileName.endsWith('.csv')) {
      // --- HANDLE CSV ---
      const content = file.buffer.toString('utf-8');
      const lines = content.split(/\r?\n/);
      lines.forEach((line: string, index: number) => {
        if (index > 0 && line.trim()) { // Skip header row
          const tableName = line.split(',')[0].trim();
          if (tableName) tablesToDelete.push(tableName);
        }
      });
    } else {
      // --- HANDLE EXCEL (.xlsx) ---
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(new Uint8Array(file.buffer) as any);
      const worksheet = workbook.getWorksheet(1);
      
      if (!worksheet) throw new BadRequestException('Worksheet not found');

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const cellValue = row.getCell(1).value;
          const tableName = cellValue ? String(cellValue).trim() : null;
          if (tableName) tablesToDelete.push(tableName);
        }
      });
    }

    // --- EXECUTE DELETION ---
    for (const tableName of tablesToDelete) {
      try {
        await this.dbService.deleteTableRecursively(tableName);
      } catch (error: any) {
        console.error(`Error deleting table ${tableName}:`, error.message);
      }
    }

    return {
      success: true,
      message: 'Cleanup process completed',
      processedCount: tablesToDelete.length,
      tables: tablesToDelete
    };

  } catch (err: any) {
    throw new BadRequestException(`Failed to process file: ${err.message}`);
  }
}


@Post('server/databases')
  async getServerDatabases(@Body() config: any) {
    const list = await this.dbService.getDatabasesList(config);
    return list;
  }

  // ---------------- STATUS CHECK ----------------
  @Post('status')
getStatus() {
  const ds = this.dbService.getServerDataSourceInstance();
  const clientConn = this.dbService.getClientConnectionInstance();

  // ✅ FIX: Return dynamic live statuses directly derived from the connection instances
  return {
    serverConnected: ds ? ds.isInitialized : false,
    clientConnected: !!clientConn, // returns true if client connection object exists
  };
}
}
