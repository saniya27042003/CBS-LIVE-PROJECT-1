import { Module } from '@nestjs/common';
import { DatabaseMappingController } from './database-mapping.controller';
import { DatabaseMappingService } from './database-mapping.service';

@Module({
  controllers: [DatabaseMappingController],
  providers: [DatabaseMappingService],
  exports: [DatabaseMappingService],
})
export class DatabaseMappingModule {}
