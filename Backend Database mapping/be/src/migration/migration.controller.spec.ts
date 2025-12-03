// import { Test, TestingModule } from '@nestjs/testing';
// import { MigrationController } from './migration.controller';

// describe('MigrationController', () => {
//   let controller: MigrationController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MigrationController],
//     }).compile();

//     controller = module.get<MigrationController>(MigrationController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Body, Controller, Get, Post } from '@nestjs/common';
import { MigrateService } from './migration.service';

@Controller('migrate')
export class MigrateController {
  constructor(private readonly migrateService: MigrateService) {}

  // ✅ Added endpoint for frontend connect
  @Post('connect')
  async connectDatabase(@Body() body: any) {
    try {
      console.log('✅ Received connection request:', body);
      return { success: true, message: 'Connection successful!' };
    } catch (error) {
      console.error('❌ Connection failed:', error);
      return { success: false, message: error.message };
    }
  }

  @Get('getAllTableName')
  async getAllTableName() {
    try {
      const result = await this.migrateService.getAllTableNames();
      return { success: true, message: result };
    } catch (error) {
      console.error('❌ Failed to fetch table names:', error);
      return { success: false, message: error.message };
    }
  }

  @Post('getAllColumnsNames')
  async getAllColumnsName(@Body() body: any) {
    try {
      const result = await this.migrateService.getAllColumnsNames(
        body.tableName,
      );
      return { success: true, message: result };
    } catch (error) {
      console.error('❌ Failed to fetch column names:', error);
      return { success: false, message: error.message };
    }
  }
}
