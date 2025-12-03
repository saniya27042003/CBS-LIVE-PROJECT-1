import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDMASTER } from './entity/customer-id.entity';
import { DAILYTRAN } from './entity/voucher.entity';
import { DEPOTRAN } from './entity/depotran.entity';
import { LOANTRAN } from './entity/loantran.entity';
import { PIGMYTRAN } from './entity/pigmytran.entity';
import { SCHEMAST } from './entity/schemeParameters.entity';
import { SHARETRAN } from './entity/sharetran.entity';
import { SYSPARA } from './entity/system-master-parameters.entity';
import 'dotenv/config'

export const primaryDBConfig: TypeOrmModuleOptions = {
  name: 'primaryDB',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  // entities: [],
  // migrations: ['dist/migration/*{.ts,.js}'],
};


export const mssqlDBConfig: TypeOrmModuleOptions = {
  name: 'MSSQL_CONN',
  type: 'mssql',
  host: process.env.MSSQL_HOST || 'localhost',
  port: Number(process.env.MSSQL_PORT) || 1433,
  username: process.env.MSSQL_USER || 'sa',
  password: process.env.MSSQL_PASS || 'QAZWSX@009',
  database: process.env.MSSQL_DB || 'DB_MAIN_SERVER',
  synchronize: false,
  logging: false,
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
};

console.log('ENV CHECK', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
});