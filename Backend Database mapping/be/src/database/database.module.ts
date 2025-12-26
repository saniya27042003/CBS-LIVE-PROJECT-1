// import { Module } from '@nestjs/common';
// import { DatabaseService } from './database.service';
// import { DatabaseController } from './database.controller';

// @Module({
//   providers: [DatabaseService],
//   controllers: [DatabaseController]
// })
// export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [DatabaseService], // 👈 ADD THIS: Allows other modules to use this service
})
export class DatabaseModule {}
