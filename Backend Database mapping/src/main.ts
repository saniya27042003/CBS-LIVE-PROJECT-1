/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  //await app.listen(3000);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Backend running on http://localhost:${port}`);
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
