// import { Controller } from '@nestjs/common';

// @Controller('database')
// export class DatabaseController {}

import { Body, Controller, } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

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
}
