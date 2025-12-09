<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/no-unused-vars */
// app.module.ts

>>>>>>> 44f767d39b6e86f27f0546f039f0938dfd202287
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseMappingModule } from './database-mapping/database-mapping.module';
import { User } from './users/user.entity'; // your entity

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [User], // add all other entities you need here
        synchronize: false,
        logging: false,
      }),
    }),

    // Feature modules
    DatabaseMappingModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
