/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {

//   const app = await NestFactory.create(AppModule);
//   app.enableCors(); // ✅ Allow frontend calls

//   app.enableCors({
//     allowedHeaders: "*",
//     origin: "*"
//   });

//   await app.listen(8000);
// }
// bootstrap();
