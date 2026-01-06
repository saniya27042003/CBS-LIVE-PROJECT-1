import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseMappingService } from '../database-mapping/database-mapping.service';
import { DatabaseController } from './database.controller';

@Module({
  controllers: [DatabaseController],
  providers: [
    DatabaseService, 
    DatabaseMappingService  // 2. Add this line here!
  ],
  exports: [DatabaseService]
})
export class DatabaseModule {}