import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDMASTER } from './entity/customer-id.entity';
import { DAILYTRAN } from './entity/voucher.entity';
import { DEPOTRAN } from './entity/depotran.entity';
import { LOANTRAN } from './entity/loantran.entity';
import { PIGMYTRAN } from './entity/pigmytran.entity';
import { SCHEMAST } from './entity/schemeParameters.entity';
import { SHARETRAN } from './entity/sharetran.entity';
import { SYSPARA } from './entity/system-master-parameters.entity';

export const primaryDBConfig: TypeOrmModuleOptions = {
  name: 'primaryDB',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '20102003',
  database: 'demo',
  synchronize: false,
  logging: false,
  entities: [],
  migrations: ['dist/migration/*{.ts,.js}'],
};
// clientDBConfig removed/commented

// export let clientDBConfig: TypeOrmModuleOptions = {
//   name: 'clientConnection',
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '20102003',
//   database: 'postgres',
//   synchronize: false,
//   logging: false,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migration/*{.ts,.js}'],
// };
