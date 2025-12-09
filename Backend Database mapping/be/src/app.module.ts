/* eslint-disable @typescript-eslint/no-unused-vars */
// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { primaryDBConfig } from './orm.config';
import { DatabaseMappingModule } from './database-mapping/database-mapping.module';

@Module({
  imports: [
    // Load ONLY primary DB here
    // TypeOrmModule.forRoot({
    //   ...primaryDBConfig,
    //   name: 'primaryDB',    // IMPORTANT
    // }),

    // Feature module
    DatabaseMappingModule,
  ],
})
export class AppModule {}
