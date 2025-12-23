// import { Controller } from '@nestjs/common';

// @Controller('database')
// export class DatabaseController {}

import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConnectionDto } from './connection.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  // -------- MYSQL --------
  @Post('connect-mysql')
  async connectMySQL(@Body() dto: ConnectionDto) {
    const result = await this.databaseService.connectMySQL(dto);

    if (!result.success) {
      throw new HttpException(
        result.message || 'MySQL connection failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'MySQL connected successfully' };
  }

  // -------- MSSQL --------
  @Post('connect-mssql')
  async connectMSSQL(@Body() dto: ConnectionDto) {
    const result = await this.databaseService.connectMSSQL(dto);

    if (!result.success) {
      throw new HttpException(
        result.message || 'MSSQL connection failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'MSSQL connected successfully' };
  }

  // -------- TABLES --------
  @Get('tables')
  async getTables() {
    const result = await this.databaseService.getTables();

    if (!result.success) {
      throw new HttpException(
        result.message || 'Failed to fetch tables',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.tables;
  }
}


  // @Post('connect')
  // async connectDatabase(@Body() body: any) {
  //     const { type, host, port, username, password, database } = body;
  //     try {
  //         const result = await this.databaseService.connect({
  //             type,
  //             host,
  //             port: Number(port),
  //             username,
  //             password,
  //             database,
  //         });
  //         return { success: true, message: result };
  //     } catch (error) {
  //         console.error('❌ Database connection failed:', error);
  //         return { success: false, message: error.message };
  //     }
  // }
//}
