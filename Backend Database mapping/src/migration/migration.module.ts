/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { MigrateController } from './migration.controller';
// import { MigrateService } from './migration.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JointAcLink } from 'src/entity/joint-account.entity';


// @Module({
//   imports: [TypeOrmModule.forFeature([JointAcLink])],
//   providers: [MigrateService],
//   controllers: [MigrateController]
// })
// export class MigrationModule { }

import { Module } from '@nestjs/common';
import { MigrateController } from './migration.controller';
import { MigrateService } from './migration.service';

@Module({
  imports: [],
  controllers: [MigrateController],
  providers: [MigrateService],
  exports: [MigrateService],
})
export class MigrationModule { }

