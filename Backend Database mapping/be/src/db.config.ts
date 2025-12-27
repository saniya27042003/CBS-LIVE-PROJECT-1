export const dbConfig = {
  source: {
    type: process.env.SOURCE_DB || 'mssql',
    host: process.env.SOURCE_HOST || 'localhost',
    port: Number(process.env.SOURCE_PORT) || 1433,
    user: process.env.SOURCE_USER || 'sa',
    password: process.env.SOURCE_PASS || 'Akshata@1930',
    database: process.env.SOURCE_DBNAME || 'employee',
    options: {
      instanceName: process.env.SOURCE_INSTANCE || 'SQLEXPRESS',
      encrypt: false,
      trustServerCertificate: true,
    },
  },

  target: {
    type: 'postgres',
    host: process.env.TARGET_HOST, // remove || 'localhost'
    port: Number(process.env.TARGET_PORT),
    username: process.env.TARGET_USER,
    password: process.env.TARGET_PASS,
    database: process.env.TARGET_DBNAME,
  },
};


// orm.config.ts
export default {
  type: 'oracle',
  username: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_SERVICE}`,
  synchronize: false,
};
