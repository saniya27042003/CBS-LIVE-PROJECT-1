/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DecodeService } from './decode.service';
import { DatabaseMappingModule } from '../database-mapping/database-mapping.module';
import { DecodeController } from './decode.controller';

@Module({
  imports: [DatabaseMappingModule],    // ✅ FIX
  controllers: [DecodeController],
  providers: [DecodeService],
})
export class DecodeModule {}
