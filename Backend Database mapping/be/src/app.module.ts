import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { DatabaseMappingModule } from './database-mapping/database-mapping.module';
import { primaryDBConfig } from './orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(primaryDBConfig),
    DatabaseModule,
    DatabaseMappingModule,
  ],
})
export class AppModule {}
