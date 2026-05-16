
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseMappingModule } from './database-mapping/database-mapping.module';

import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [

    // ✅ FILE UPLOAD SUPPORT
    MulterModule.register({
      storage: memoryStorage(),

      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),

    DatabaseMappingModule,
    AuthModule,

  ],
})
export class AppModule {}