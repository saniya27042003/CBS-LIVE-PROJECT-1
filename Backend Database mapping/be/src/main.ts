/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);

  // ✅ Fix: Proper CORS configuration
  // If using credentials: true, origin cannot be '*'
  app.enableCors({
    origin: ['http://localhost:4200'], // Add your frontend URLs here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Backend running on: http://localhost:${port}`);
}

bootstrap();