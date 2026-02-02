import { Module } from '@nestjs/common';
import { DatabaseMappingService } from './database-mapping.service';
import { DatabaseMappingController } from './database-mapping.controller';
import { DatabaseModule } from '../database/database.module'; 

@Module({
  imports: [DatabaseModule], // 👈 ADD THIS: Pulls in the exported DatabaseService
  controllers: [DatabaseMappingController],
  providers: [DatabaseMappingService],
})
export class DatabaseMappingModule {}