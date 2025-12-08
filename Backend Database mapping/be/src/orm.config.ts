// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
// dotenv.config();

// import { IDMASTER } from './entity/customer-id.entity';
// import { DAILYTRAN } from './entity/voucher.entity';
// import { DEPOTRAN } from './entity/depotran.entity';
// import { LOANTRAN } from './entity/loantran.entity';
// import { PIGMYTRAN } from './entity/pigmytran.entity';
// import { SCHEMAST } from './entity/schemeParameters.entity';
// import { SHARETRAN } from './entity/sharetran.entity';
// import { SYSPARA } from './entity/system-master-parameters.entity';

// export const primaryDBConfig: TypeOrmModuleOptions = {
//   name: 'primaryDB',
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   synchronize: false,
//   logging: false,
//   // entities: [],
//   // migrations: ['dist/migration/*{.ts,.js}'],
// };
// // clientDBConfig removed/commented

// // export let clientDBConfig: TypeOrmModuleOptions = {
// //   name: 'clientConnection',
// //   type: 'postgres',
// //   host: 'localhost',
// //   port: 5432,
// //   username: 'postgres',
// //   password: '20102003',
// //   database: 'postgres',
// //   synchronize: false,
// //   logging: false,
// //   entities: ['dist/**/*.entity{.ts,.js}'],
// //   migrations: ['dist/migration/*{.ts,.js}'],
// // };


// console.log('ENV CHECK', {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   pass: process.env.DB_PASS,
//   name: process.env.DB_NAME,
// });




import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDMASTER } from './entity/customer-id.entity';
import { DAILYTRAN } from './entity/voucher.entity';
import { DEPOTRAN } from './entity/depotran.entity';
import { LOANTRAN } from './entity/loantran.entity';
import { PIGMYTRAN } from './entity/pigmytran.entity';
import { SCHEMAST } from './entity/schemeParameters.entity';
import { SHARETRAN } from './entity/sharetran.entity';
import { SYSPARA } from './entity/system-master-parameters.entity';

// export const primaryDBConfig: TypeOrmModuleOptions = {
//   name: 'primaryDB',
//   type: 'postgres',
//   host: '192.168.1.131',
//   port: 5432,
//   username: 'postgres',
//   password: '123456',
//   database: 'TESTCOMPSERV',
//   synchronize: false,
//   logging: false,
//   entities: [
//   ],
//   migrations: ['dist/migration/*{.ts,.js}'],
// };

// export let clientDBConfig: TypeOrmModuleOptions = {
//   name: 'clientConnection',
//   type: 'postgres',
//   host: '192.168.1.131',
//   port: 5432,
//   username: 'postgres',
//   password: '123456',
//   database: '0111COMPSERV',
//   synchronize: false,
//   logging: false,
//   entities: ['dist//*.entity{.ts,.js}'],
//   migrations: ['dist/migration/*{.ts,.js}'],
// };


//Localhost Databases:

// export const primaryDBConfig: TypeOrmModuleOptions = {
//   name: 'primaryDB',
//   type: 'postgres',
//   host: '127.0.0.1',
//   port: 5432,
//   username: 'postgres',
//   password: 'swikar1637',
//   database: 'SERVER_DEMO',
//   synchronize: false,
//   logging: false,
//   entities: [
//   ],
//   migrations: ['dist/migration/*{.ts,.js}'],
// };

// export let clientDBConfig: TypeOrmModuleOptions = {
//   name: 'clientConnection',
//   type: 'postgres',
//   host: '127.0.0.1',
//   port: 5432,
//   username: 'postgres',
//   password: 'swikar1637',
//   database: 'SERVER_DEMO',
//   synchronize: false,
//   logging: false,
//   entities: ['dist//*.entity{.ts,.js}'],
//   migrations: ['dist/migration/*{.ts,.js}'],
// };
