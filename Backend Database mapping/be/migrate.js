const sql = require('mssql');
const mysql = require('mysql2/promise');

/* ========== MSSQL CONFIG ========== */
const mssqlConfig = {
  user: 'snehal',
  password: 'Strong@123',
  server: 'localhost',
  database: 'FinEx',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

/* ========== MYSQL CONFIG ========== */
const TARGET_DB = 'clientdb';
const mysqlConfig = {
  host: '192.168.137.82',
  user: 'snehal',
  password: 'Snehal0705@',
  database: TARGET_DB
};

/* ========== DATATYPE MAPPING ========== */
function mapType(type, length, columnName, pkCols) {
  const isPK = columnName && pkCols.includes(columnName);

  switch (type.toLowerCase()) {
    case 'int': return 'INT';
    case 'bigint': return 'BIGINT';
    case 'smallint': return 'SMALLINT';
    case 'tinyint': return 'TINYINT';
    case 'bit': return 'BOOLEAN';
    case 'float': return 'FLOAT';
    case 'decimal': return 'DECIMAL(18,2)';
    case 'date': return 'DATE';
    case 'datetime':
    case 'datetime2': return 'DATETIME';
    case 'varchar':
    case 'nvarchar':
      if (isPK) return 'VARCHAR(255)';       
      if (!length || length <= 0 || length > 65535) return 'VARCHAR(255)';
      return `VARCHAR(${length})`;
    case 'text':
    case 'ntext':
      return isPK ? 'VARCHAR(255)' : 'TEXT';
    default: 
      return isPK ? 'VARCHAR(255)' : 'TEXT';
  }
}

/* ========== GET PRIMARY KEYS ========== */
async function getPrimaryKeys(table, pool) {
  const res = await pool.request().query(`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_NAME='${table}'
      AND OBJECTPROPERTY(
        OBJECT_ID(CONSTRAINT_SCHEMA + '.' + CONSTRAINT_NAME),
        'IsPrimaryKey'
      ) = 1
  `);
  return res.recordset.map(r => r.COLUMN_NAME);
}

/* ========== GET IDENTITY COLUMN ========== */
async function getIdentityColumn(table, pool) {
  const res = await pool.request().query(`
    SELECT name
    FROM sys.columns
    WHERE object_id = OBJECT_ID('${table}')
      AND is_identity = 1
  `);
  return res.recordset[0]?.name || null;
}

/* ========== CREATE DATABASE ========== */
async function ensureDatabase() {
  const conn = await mysql.createConnection({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password
  });

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${TARGET_DB}\``);
  await conn.end();
  console.log(`🗄 Database ensured: ${TARGET_DB}`);
}

/* ========== CREATE TABLE ========== */
async function createTable(table, pool, mysqlConn) {
  const cols = await pool.request().query(`
    SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME='${table}'
  `);

  const pkCols = await getPrimaryKeys(table, pool);
  const identityCol = await getIdentityColumn(table, pool);

  const columnDefs = cols.recordset.map(c => {
    const isPK = pkCols.includes(c.COLUMN_NAME);
    const isNumeric = ['int','bigint','smallint','tinyint'].includes(c.DATA_TYPE.toLowerCase());
    let length = c.CHARACTER_MAXIMUM_LENGTH;

    // Fix invalid length for varchar/nvarchar
    if ((c.DATA_TYPE.toLowerCase() === 'varchar' || c.DATA_TYPE.toLowerCase() === 'nvarchar') && (!length || length <= 0 || length > 65535)) {
      length = 255;
    }

    let typeDef = mapType(c.DATA_TYPE, length, c.COLUMN_NAME, pkCols);
    let def = `\`${c.COLUMN_NAME}\` ${typeDef}`;

    if (isPK) def += ' NOT NULL';

    // AUTO_INCREMENT only for numeric identity columns
    if (c.COLUMN_NAME === identityCol && isNumeric) {
      def += ' AUTO_INCREMENT';
      // If table has no PK, make this column PK
      if (pkCols.length === 0) {
        def += ' PRIMARY KEY';
      }
    }

    return def;
  });

  // Add PRIMARY KEY if PK exists
  if (pkCols.length > 0) {
    columnDefs.push(`PRIMARY KEY (${pkCols.map(c => `\`${c}\``).join(',')})`);
  }

  const sqlCreate = `
    CREATE TABLE IF NOT EXISTS \`${table}\` (
      ${columnDefs.join(',\n')}
    )
  `;
  await mysqlConn.query(sqlCreate);
  console.log(`🧱 Table created: ${table}`);
}

/* ========== COPY DATA ========== */
async function migrateData(table, pool, mysqlConn) {
  const data = await pool.request().query(`SELECT * FROM [${table}]`);
  if (!data.recordset.length) return;

  const cols = Object.keys(data.recordset[0]);
  const placeholders = cols.map(() => '?').join(',');
  const insertSQL = `
    INSERT INTO \`${table}\`
    (${cols.map(c => `\`${c}\``).join(',')})
    VALUES (${placeholders})
  `;

  for (const row of data.recordset) {
    try {
      await mysqlConn.query(insertSQL, Object.values(row));
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log(`⚠️ Duplicate entry skipped in table ${table}`);
      } else {
        throw err;
      }
    }
  }

  console.log(`📦 Data migrated: ${table}`);
}

/* ========== MAIN MIGRATION ========== */
async function migrateAll() {
  await ensureDatabase();

  const pool = await sql.connect(mssqlConfig);
  const mysqlConn = await mysql.createConnection(mysqlConfig);

  const tables = await pool.request().query(`
    SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE='BASE TABLE'
  `);

  for (const t of tables.recordset) {
    const table = t.TABLE_NAME;
    await createTable(table, pool, mysqlConn);
    await migrateData(table, pool, mysqlConn);
  }

  await mysqlConn.end();
  await pool.close();
  console.log('✅ FULL MSSQL → MySQL MIGRATION COMPLETED');
}

migrateAll().catch(err => {
  console.error('❌ Migration failed:', err);
});
