/* eslint-disable @typescript-eslint/no-unused-vars */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { DatabaseMappingModule } from './database-mapping/database-mapping.module';


@Module({
  imports: [
    DatabaseMappingModule,
    AuthModule,
  ],
})
export class AppModule {}