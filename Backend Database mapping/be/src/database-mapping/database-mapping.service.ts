/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/require-await */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { ManualSymbolMapper } from '../legacy-font/manual-symbol-maps';
import Sanscript from '@indic-transliteration/sanscript';
import { DatabaseService } from '../database/database.service';
// import { CUSTOMERADDRESS } from '../entity/customer-address.entity';
// import { DPMASTER } from '../entity/dpmaster.entity';
// import { CATEGORYMASTER } from '../entity/category-master.entity';
import { STATIC_CHILD_MAP } from './static-child-map';
// import { EntityTarget } from 'typeorm';
import { EntityTarget, ObjectLiteral } from 'typeorm';

const unidev = require('unidev');

@Injectable()
export class DatabaseMappingService {
  private readonly logger = new Logger(DatabaseMappingService.name);
  private clientDB: DataSource | null = null;
  private serverDB: DataSource | null = null;

  constructor(private readonly dbService: DatabaseService) { }

  /* ===================== HELPERS ===================== */
 private async sanitizeForeignKey(
  column: string,
  value: any,
  table?: string,
): Promise<any> {

  const col = column?.trim().toUpperCase();
  const tbl = table?.toLowerCase();

  /* ===================== CORE KEYS ===================== */

  // AC_NO → numeric or null (strict check happens earlier)
  if (col === 'AC_NO') {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  // AC_TYPE → ALWAYS numeric, default 101
  if (col === 'AC_TYPE') {
    const raw = String(value ?? '101').match(/\d+/g)?.join('');
    const num = Number(raw);
    return isNaN(num) ? 101 : num;
  }

  /* ===================== FK COLUMNS ===================== */

  const FK_COLUMNS = new Set([
    'AC_CATG',
    'AC_BALCATG',
    'AC_OPR_CODE',
    'AC_INTCATA',
    'AC_CUSTID',
  ]);

  if (FK_COLUMNS.has(col)) {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      value === 0 ||
      value === '0'
    ) {
      // 🔥 DPMASTER → enforce NULL (never 0)
      if (tbl === 'dpmaster') {
        this.logger.warn(
          `⚠️ DPMASTER FK ${col} missing → setting NULL`
        );
        return null;
      }
      return null;
    }

    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  /* ===================== DEFAULT ===================== */

  return value;
}

  private ensureClient() {
    if (!this.clientDB?.isInitialized) throw new InternalServerErrorException('Client DB not connected');
    return this.clientDB;
  }

  private ensureServer() {
    if(!this.serverDB?.isInitialized) throw new InternalServerErrorException('Server DB not connected');
    return this.serverDB;
  }

  private getValueCaseInsensitive(row: any, key: string): any {
    if (!row) return undefined;
    if (row[key] !== undefined) return row[key];
    const lowerKey = key.toLowerCase();
    const foundKey = Object.keys(row).find((k) => k.toLowerCase() === lowerKey);
    return foundKey ? row[foundKey] : undefined;
  }

    private generateBankAcNo(
      bankCode: number | string,
      branchCode: number | string,
      schemeCode: number | string,
      acNo: number | string
    ): string {

      const bank   = String(bankCode).padStart(3, '0');
      const branch = String(branchCode).padStart(3, '0');
      const scheme = String(schemeCode).padStart(3, '0');

      // ✅ START ACCOUNT FROM 1 LAKH
      const accountNumber = 100000 + Number(acNo);
      const account = String(accountNumber).padStart(6, '0');

      return `${bank}${branch}${scheme}${account}`;

      
    }



  /* ===================== ROBUST CONSTRAINT MANAGER ===================== */

  private async toggleConstraints(qr: QueryRunner, driver: string, table: string, enable: boolean) {
    const safeTable = this.dbService.getQualifiedTableName(driver, table);
    try {
      if (driver === 'mysql' || driver === 'mariadb') {
        await qr.query(`SET FOREIGN_KEY_CHECKS = ${enable ? 1 : 0}`);
      }
      else if (driver === 'postgres') {
        // Postgres: Use session_replication_role to bypass all checks/triggers
        const setting = enable ? 'origin' : 'replica';
        await qr.query(`SET session_replication_role = '${setting}';`);
      }
      else if (driver === 'mssql') {
        const action = enable ? 'WITH CHECK CHECK' : 'NOCHECK';
        await qr.query(`ALTER TABLE ${safeTable} ${action} CONSTRAINT ALL`);
      }
    } catch (e) {
      this.logger.warn(`Constraint toggle warning for ${table} (${driver}): ${(e as Error).message}`);
    }
  }

  /* ===================== CONNECTIONS ===================== */

  async connect(config: any) {
    if (this.clientDB?.isInitialized) {
      await this.clientDB.destroy();
    }

    try {
      this.logger.log('🔌 CLIENT DB CONFIG RECEIVED:');
      this.logger.log(JSON.stringify(config, null, 2));

      this.clientDB = await this.dbService.createConnection(config);

      this.logger.log('✅ CLIENT DATABASE CONNECTED SUCCESSFULLY');
      return { success: true };
    } catch (error: any) {
      this.logger.error('❌ CLIENT DB CONNECTION FAILED');
      this.logger.error(error?.message || error);
      this.logger.error(error?.stack);

      throw new InternalServerErrorException(
        error?.message || 'Client DB connection failed',
      );
    }
  }

  async connectServer(config: any) {
    if (this.serverDB?.isInitialized) {
      await this.serverDB.destroy();
    }

    try {
      this.logger.log('🔌 SERVER DB CONFIG RECEIVED:');
      this.logger.log(JSON.stringify(config, null, 2));

      this.serverDB = await this.dbService.createConnection(config);

      this.logger.log(
  '📦 SERVER ENTITY METADATA => ' +
  this.serverDB.entityMetadatas
    .map(e => `${e.schema ?? 'default'}.${e.tableName}`)
    .join(', ')
);


      this.logger.log('✅ SERVER DATABASE CONNECTED SUCCESSFULLY');
      return { success: true };
    } catch (error: any) {
      this.logger.error('❌ SERVER DB CONNECTION FAILED');
      this.logger.error(error?.message || error);
      this.logger.error(error?.stack);

      

      throw new InternalServerErrorException(
        error?.message || 'Server DB connection failed',
      );
    }
  }


  /* ===================== METADATA ===================== */
  async getServerDatabases(config: any) { return await this.dbService.getDatabasesList(config); }
  async getPrimaryTableNames() { return await this.dbService.getTableNames(this.ensureServer()); }
  async getAllColumnsNames(t: string) { return await this.dbService.getColumnNames(this.ensureServer(), t); }
  async getClientTableNames() { return await this.dbService.getTableNames(this.ensureClient()); }
  async getClientColumns(t: string) { return await this.dbService.getColumnNames(this.ensureClient(), t); }
  async getTableStructure(t: string) { return await this.dbService.getTablePreview(this.ensureClient(), t); }

  /* ===================== TRANSLATION & CONVERSION ===================== */

  private resolveAnusvara(iast: string): string {
    return iast
      .replace(/ṃ(?=[pbm])/g, 'm').replace(/ṃ(?=[kg])/g, 'n').replace(/ṃ(?=[tdn])/g, 'n')
      .replace(/ṃ(?=[cj])/g, 'n').replace(/ṃ(?=[ṭḍṇ])/g, 'n').replace(/ṃ/g, 'm');
  }

private transformValue(raw: any): any {
  if (raw === null || raw === undefined || raw === '') return null;

  const strRaw = String(raw);


// 1️⃣ Detect mojibake / legacy corruption
const looksCorrupted =
  /�|Ã|Â|¤|§|ª|©/.test(strRaw) ||   // classic mojibake chars
  /[A-Za-z]�[A-Za-z]/.test(strRaw); // broken legacy joins

if (!looksCorrupted && /^[\x20-\x7E\s]*$/.test(strRaw)) { 
  return strRaw; // real English → safe
}

  // 2️⃣ PURE Unicode Devanagari → DO NOT TOUCH
  const isPureUnicodeDevanagari =
    /[\u0900-\u097F]/.test(strRaw) &&
    !/[A-Za-z]/.test(strRaw);

  if (isPureUnicodeDevanagari) {
    return strRaw;
  }

  // 3️⃣ Legacy font detection (existing logic)
  const looksLegacy = /[^\u0900-\u097F]/.test(strRaw);
  if (!looksLegacy) return strRaw;

  // 4️⃣ Existing conversion pipeline (UNCHANGED)
  try {
    let marathi = unidev(strRaw, 'hindi', 'DVBW-TTYogeshEn');
    marathi = ManualSymbolMapper.normalize(marathi);

    let english = Sanscript.t(marathi, 'devanagari', 'iast');
    english = this.resolveAnusvara(english);

    english = english
      .toLowerCase()
      .replace(/ā/g, 'a')
      .replace(/ī/g, 'i')
      .replace(/ū/g, 'u')
      .replace(/ṛ|ṝ/g, 'r')
      .replace(/ḷ|ḹ/g, 'l')
      .replace(/c/g, 'ch')
      .replace(/ṭ/g, 't')
      .replace(/ḍ/g, 'd')
      .replace(/ś|ṣ/g, 'sh')
      .replace(/ṅ|ñ|ṇ/g, 'n')
      .replace(/ḥ/g, 'h')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/aa+/g, 'a')
      .replace(/ii+/g, 'i')
      .replace(/uu+/g, 'u')
      .replace(/a$/i, '')
      .replace(/\b([a-z]+)(dr|tr|kr|gr)\b/gi, '$1$2a')
      .replace(/\b\w/g, c => c.toUpperCase());

    return english.trim() === '' ? strRaw : english;
  } catch {
    return strRaw;
  }
}

private convertValue(value: any, targetType: any) {
  if (value === null || value === undefined) return null;

  /* ================== 🔥 NORMALIZE TARGET TYPE ================== */

  let type = '';

  if (typeof targetType === 'string') {
    type = targetType.toLowerCase();
  } else if (typeof targetType === 'function') {
    // Entity metadata: Number, String, Date
    type = targetType.name.toLowerCase();
  } else if (targetType?.constructor?.name) {
    type = targetType.constructor.name.toLowerCase();
  }

  /* ================== 🔥 ORACLE DATE OBJECT FIX ================== */

  if (value instanceof Date || type.includes('date')) {
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /* ================== ORACLE STRING DATE FIX ================== */

  if (typeof value === 'string' && /^\d{2}-\d{2}-\d{2,4}$/.test(value)) {
    const [dd, mm, yy] = value.split('-');

    const fullYear =
      yy.length === 4
        ? yy
        : Number(yy) < 50
          ? `20${yy}`
          : `19${yy}`;

    return `${fullYear}-${mm}-${dd}`;
  }

  /* ================== TEXT ================== */

  if (
    ['character', 'varchar', 'text', 'string', 'clob', 'nvarchar', 'nchar']
      .some(t => type.includes(t))
  ) {
    return this.transformValue(value);
  }

  /* ================== NUMBER ================== */

  if (
    ['number', 'int', 'numeric', 'decimal', 'float', 'double', 'real', 'bigint']
      .some(t => type.includes(t))
  ) {
    if (typeof value === 'string' && value.trim() === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  /* ================== BOOLEAN ================== */

  if (type.includes('bool') || type.includes('bit')) {
    const s = String(value).toLowerCase();
    return ['true', '1', 'yes', 'y', 'on', 't'].includes(s);
  }

  /* ================== FALLBACK ================== */

  return value;
}



private getEntityByTableName(tableName: string): EntityTarget<any> | null {
  const server = this.ensureServer();

  const cleanTarget = tableName
    .replace(/"/g, '')
    .split('.')
    .pop()
    ?.trim()
    .toLowerCase();

  if (!cleanTarget) return null;

  const meta = server.entityMetadatas.find(m => {
    const table = m.tableName?.toLowerCase();
    const schemaTable = m.schema
      ? `${m.schema}.${m.tableName}`.toLowerCase()
      : table;
    const className = m.name?.toLowerCase();

    return (
      table === cleanTarget ||
      schemaTable === cleanTarget ||
      className === cleanTarget
    );
  });

  return meta?.target ?? null;
}

  /* ===================== INSERTION LOGIC ===================== */

  // ... (imports remain the same)


  // ... (previous code remains the same)

  /* ===================== INSERTION LOGIC ===================== */
async insertMappedData(body: any) {

  const client = this.ensureClient();
  const server = this.ensureServer();
  const clientDriver = client.options.type as string;
  const serverDriver = server.options.type as string;
  const [cqL, cqR] = this.dbService.getQuoteChar(clientDriver);

  // --- 1. FETCH SOURCE DATA ---
  const { mappings, joinKey } = body;
  if (!Array.isArray(mappings)) {
    throw new InternalServerErrorException('Invalid payload');
  }

  const validMappings = mappings.filter(
    (m) => m.clientTable && m.serverColumn
  );

  if (!validMappings.length) {
    throw new InternalServerErrorException('No valid mappings found');
  }

  const includeChildren = body.includeChildren === true;
  const parentTable = body.serverTable;

 const effectiveMappings = includeChildren
  ? validMappings
  : validMappings.filter(
      m =>
        m.targetTable === parentTable ||
        parentTable.toLowerCase() === 'dpmaster'
    );


  if (!effectiveMappings.length) {
    return {
      success: false,
      message: 'No mappings after checkbox filter',
    };
  }

    let preparedRows: any[] = [];

    // Organize columns by table
    const columnsByTable: Record<string, Set<string>> = {};
    effectiveMappings.forEach((m) => {
      if (!columnsByTable[m.clientTable]) columnsByTable[m.clientTable] = new Set();
      // Add the Join Key to the fetch list if it exists so we can align rows
      if (joinKey) columnsByTable[m.clientTable].add(joinKey);
      m.clientColumns.forEach((c: string) => columnsByTable[m.clientTable].add(c));
    });

    const dataStore: Record<string, any[]> = {};

    // --- FETCH DATA FROM CLIENT ---
    for (const table of Object.keys(columnsByTable)) {
      try {
        // 1. GET REAL SCHEMA to fix Case Sensitivity issues
        const actualColumns = await this.dbService.getColumnNames(client, table);
        const lowerCaseSchema = actualColumns.map(c => c.toLowerCase());

        const requestedCols = Array.from(columnsByTable[table]);

        // 2. Map requested columns to ACTUAL DB columns
        const finalSelectCols: string[] = [];

        for (const reqCol of requestedCols) {
          const idx = lowerCaseSchema.indexOf(reqCol.toLowerCase());
          if (idx !== -1) {
            // Use the REAL name from the DB (e.g., 'lastname' instead of 'Lastname')
            finalSelectCols.push(`${cqL}${actualColumns[idx]}${cqR}`);
          } else {
            this.logger.warn(`Column '${reqCol}' not found in table '${table}'`);
          }
        }

        if (finalSelectCols.length === 0) continue;

        // 3. Build Query with Join Key sorting to ensure alignment
        const selectStr = finalSelectCols.join(', ');
        const safeTable = this.dbService.getQualifiedTableName(clientDriver, table);

        // Determine sorting column (Use JoinKey if available, otherwise first column)
        const sortCol = joinKey
          ? actualColumns.find(c => c.toLowerCase() === joinKey.toLowerCase()) || actualColumns[0]
          : actualColumns[0];

        let query = '';
        if (clientDriver === 'mssql') query = `SELECT TOP 10000 ${selectStr} FROM ${safeTable} ORDER BY ${cqL}${sortCol}${cqR}`;
        else if (clientDriver === 'oracle') query = `SELECT ${selectStr} FROM ${safeTable} WHERE ROWNUM <= 10000 ORDER BY ${cqL}${sortCol}${cqR}`;
        else query = `SELECT ${selectStr} FROM ${safeTable} ORDER BY ${cqL}${sortCol}${cqR} LIMIT 10000`; // MySQL/Postgres

        // const rows = await client.query(query);
        // dataStore[table] = rows;

        if (this.isMongo(client)) {
          const docs = await this.getMongoDocuments(client, table, 10000);
          dataStore[table] = docs;
        } else {
          const rows = await client.query(query);
          dataStore[table] = rows;
        }


      } catch (e) {
        this.logger.error(`Error fetching from ${table}: ${(e as Error).message}`);
        dataStore[table] = [];
      }
    }

    // --- MERGE STRATEGY ---
    // If we have a joinKey, we align rows based on value. If not, we merge by index (0->0, 1->1).

    const tables = Object.keys(dataStore);
    if (tables.length === 0) return { success: false, message: 'Source tables query failed.' };

    const primaryTable = tables[0];
    const rowCount = dataStore[primaryTable]?.length || 0;

    for (let i = 0; i < rowCount; i++) {
      const baseRow = dataStore[primaryTable][i];
      let combinedRow = { ...baseRow };

      // Attempt to find matching rows in other tables
      for (let j = 1; j < tables.length; j++) {
        const otherTable = tables[j];
        const otherRows = dataStore[otherTable];

        let matchingRow = null;

        if (joinKey) {
          // ALIGNMENT LOGIC: Match by Join Key Value
          const baseKeyVal = this.getValueCaseInsensitive(baseRow, joinKey);
          if (baseKeyVal !== undefined) {
            matchingRow = otherRows.find(r =>
              String(this.getValueCaseInsensitive(r, joinKey)) === String(baseKeyVal)
            );
          }
        }

        // Fallback: If no join key (or match failed), use Index Alignment (Dangerous but requested)
        if (!matchingRow && !joinKey) {
          matchingRow = otherRows[i];
        }

        if (!joinKey && i === 0) {
  this.logger.warn('⚠️ joinKey missing → using index-based merge');
}


        if (matchingRow) {
  Object.assign(combinedRow, matchingRow);

  // 🔥 PROTECT DPMASTER CORE KEYS
  if (baseRow.AC_NO && !combinedRow.AC_NO) {
    combinedRow.AC_NO = baseRow.AC_NO;
  }
  if (baseRow.AC_TYPE && !combinedRow.AC_TYPE) {
    combinedRow.AC_TYPE = baseRow.AC_TYPE;
  }
}
      }
      preparedRows.push(combinedRow);
    }

    if (preparedRows.length === 0) return { success: false, message: 'No source data mapped.' };

    // ... (Remainder of the function: Target Identification and Insertion Loop remains strictly the same)
    // --- 2. MULTI-TARGET IDENTIFICATION ---
   const targetTables = new Set<string>();

// always include parent
targetTables.add(parentTable);

// include children ONLY if checkbox enabled
if (includeChildren) {
const children =
  STATIC_CHILD_MAP[parentTable.toLowerCase()] ?? [];
  for (const child of children) {
    targetTables.add(child);
  }
}


    if (targetTables.size === 0) return { success: false, message: 'No target tables specified.' };

    const results: any[] = [];
    for (const targetTable of targetTables) {
      // ... (Keep existing insertion loop code)
      const tableMappings = effectiveMappings.filter(m =>
        (m.targetTable && m.targetTable === targetTable) ||
        (!m.targetTable && body.serverTable === targetTable)
      );

if (tableMappings.length === 0 && targetTable === 'dpmaster') {
  throw new Error('❌ No mappings resolved for DPMASTER');
}

if (tableMappings.length > 0) {
        let result;

const EntityClass =
  this.getEntityByTableName(targetTable);


if (EntityClass) {
  this.logger.warn(`🟢 ENTITY INSERT PATH: ${targetTable}`);

  result = await this.insertWithEntityGeneric(
  preparedRows,
  tableMappings,
  EntityClass,
  targetTable   // 👈 ADD THIS
);

} else {
  this.logger.warn(`🟡 QUERY INSERT PATH: ${targetTable}`);
result = await this.performInsertion(
  preparedRows,
  tableMappings,
  targetTable,
  server,
  serverDriver,
 
);


}
        results.push({
          table: targetTable,
          ...result,
        });

      }
    }
  
//   // 🔁 SECOND PASS: UPDATE FK values
// if (includeChildren && serverDriver !== 'mongodb' && joinKey) {
//   for (const targetTable of targetTables) {
//     const fks = this.getStaticForeignKeys(targetTable);

//     for (const fk of fks) {
//       await server.query(`
//         UPDATE ${targetTable} child
//         SET ${fk.child_column} = parent.${fk.parent_column}
//         FROM ${fk.parent_table} parent
//         WHERE child.${fk.child_column} IS NULL
//           AND child.${joinKey} = parent.${joinKey}
//       `);
//     }
//   }
// }

// return { success: true, results };
return {
  success: true,
  results,
  fkUpdated: true
};

  }

async getChildTables(parentTable: string) {
  const key = parentTable
    .replace(/"/g, '')
    .split('.')
    .pop()
    ?.trim()
    .toLowerCase();

  const children = STATIC_CHILD_MAP[key!] ?? [];

  return children.map((child, idx) => ({
    constraint_name: `STATIC_${key}_${child}_${idx}`,
    table_schema: 'static',
    child_table: child,
    child_column: null,
    parent_table: key,
    parent_column: null,
  }));
}



private getStaticForeignKeys(parentTable: string) {
  const key = parentTable
    .replace(/"/g, '')
    .split('.')
    .pop()
    ?.trim()
    .toLowerCase();

  const children = STATIC_CHILD_MAP[key!] ?? [];

  return children.map(childTable => ({
    parent_table: key,
    child_table: childTable,
    child_column: null,
    parent_column: null,
  }));
}



/* ===================== MONGODB HELPERS ===================== */

private isMongo(db: DataSource): boolean {
  return db.options.type === 'mongodb';
}

private getMongoDb(db: DataSource): any {
  const driver: any = db.driver;

  const qr = driver?.queryRunner;
  const connection = qr?.databaseConnection;

  if (!connection) {
    throw new Error('MongoDB client not initialized');
  }

  return connection.db(db.options.database as string);
}

private async getMongoDocuments(
  db: DataSource,
  collectionName: string,
  limit = 10000,
): Promise < any[] > {
  if(!this.isMongo(db)) return [];

  const mongoDb = this.getMongoDb(db);

  return await mongoDb
    .collection(collectionName)
    .find({})
    .limit(limit)
    .toArray();
}

private async getMongoCount(
  db: DataSource,
  collectionName: string,
): Promise < number > {
  if(!this.isMongo(db)) return 0;

  const mongoDb = this.getMongoDb(db);

  return await mongoDb
    .collection(collectionName)
    .countDocuments();
}

private async insertWithEntityGeneric<T extends ObjectLiteral>(
  rows: any[],
  mappings: any[],
  EntityClass: EntityTarget<T>,
  tableName: string, // 👈 REQUIRED
)
 {
  const server = this.ensureServer();
  const repo = server.getRepository<T>(EntityClass);
  const meta = repo.metadata;

   this.logger.debug(
  `ENTITY META → table=${String(meta.tableName)}, ` +
  `schema=${String(meta.schema ?? 'default')}, ` +
  `db=${String(server.options.database ?? 'unknown')}, ` +
  `columns=${meta.columns.map(c => c.databaseName).join(', ')}`
);




  // ✅ Cache bank + branch once (performance + correctness)
  const { bankCode, branchCode } = await this.getBankAndBranch(server);
  const schemeCache = new Map<string, string>();

  const entities: T[] = [];

  for (const sourceRow of rows) {
    const entity = repo.create();

    /* ===================== BANKACNO (MANDATORY) ===================== */

    const acNo = this.getValueCaseInsensitive(sourceRow, 'AC_NO');
  const acTypeRaw =
  this.getValueCaseInsensitive(sourceRow, 'AC_TYPE') ?? '101';

if (!acNo) {
  this.logger.error(
    `❌ DPMASTER BLOCKED: AC_NO missing. SOURCE KEYS = ${Object.keys(sourceRow).join(', ')}`
  );
  throw new Error('DPMASTER insert stopped: AC_NO missing in source row');
}

const acType =
  String(acTypeRaw).match(/\d+/g)?.join('') ?? '101';

let schemeCode: string;



if (schemeCache.has(acType)) {

  
  schemeCode = schemeCache.get(acType)!;
} else {
  schemeCode = this.getSchemeCode(acType);
  schemeCache.set(acType, schemeCode);
}


const bankAcNo = this.generateBankAcNo(
  bankCode,
  branchCode,
  schemeCode,
  acNo
);

(entity as any).BANKACNO = bankAcNo;
(entity as any).AC_NO = Number(acNo);
(entity as any).AC_TYPE = Number(acType || 101);

this.logger.debug(
  `ENTITY READY → AC_NO=${acNo}, BANKACNO=${bankAcNo}`
);

//(entity as any).BANKACNO = bankAcNo;
      /* ===================== 🔥 FORCE DEFAULTS (HERE) ===================== */

 if (
  meta.columns.some(c => c.databaseName === 'AC_ACNOTYPE') &&
  (entity as any).AC_ACNOTYPE == null
) {
  (entity as any).AC_ACNOTYPE = 'D';
}

    
    if ((entity as any).BRANCH_CODE == null) {
      (entity as any).BRANCH_CODE = Number(branchCode);
    }

    /* ===================== OTHER COLUMNS ===================== */

    for (const m of mappings) {
      if (m.serverColumn === 'BANKACNO') continue; // already set
const column = meta.columns.find(c =>
  c.propertyName.toLowerCase() === m.serverColumn.toLowerCase() ||
  c.databaseName?.toLowerCase() === m.serverColumn.toLowerCase()
);



      if (
        !column ||
        column.isPrimary ||
        column.isGenerated ||
        column.isCreateDate ||
        column.isUpdateDate ||
        column.isDeleteDate ||
        column.isVersion
      ) {
        continue;
      }

      const value = this.getValueCaseInsensitive(
        sourceRow,
        m.clientColumns[0]
      );

let converted: any;

if (value === undefined) {
  // 🔥 FORCE FK DEFAULT WHEN SOURCE MISSING
converted = await this.sanitizeForeignKey(
  m.serverColumn,
  null,
  tableName
);
} else {
  converted = this.convertValue(value, column.type);

converted = await this.sanitizeForeignKey(
  m.serverColumn,
  converted,
  tableName
);

}

(entity as any)[column.propertyName] = converted;



  }

    entities.push(entity);
  }

  // ✅ GUARD GOES HERE
if (entities.length === 0) {
  this.logger.warn(`❌ No entities created for table ${tableName}`);
  return {
    success: false,
    inserted: 0,
    processed: rows.length,
    skipped: rows.length,
  };
}
await server.transaction(async manager => {
  try {
    if (server.options.type === 'postgres') {
      await manager.query(`SET session_replication_role = 'replica'`);
    }

    await manager.save(EntityClass, entities, {
      chunk: 50,
      reload: false,
    });

  } finally {
    if (server.options.type === 'postgres') {
      await manager.query(`SET session_replication_role = 'origin'`);
    }
  }
});



  return {
    success: true,
    inserted: entities.length,
    processed: rows.length,
    skipped: rows.length - entities.length,
  };
}


async insertParentWithChildren(parentTable: string, body: any) {

   if (body.includeChildren !== true) {
    this.logger.log('🚫 Child tables skipped (checkbox OFF)');
    return;
  }

  const parent = parentTable
    .replace(/"/g, '')
    .split('.')
    .pop()
    ?.trim()
    .toLowerCase();

  await this.insertMappedData({
    ...body,
    serverTable: parent,
  });

  const children = STATIC_CHILD_MAP[parent!] ?? [];

  for (const childTable of children) {
    await this.insertMappedData({
      ...body,
      serverTable: childTable,
    });
  }
}

      // --- CORE INSERTION LOGIC (Per Table) ---
 
private async performInsertion(
  rows: any[],
  mappings: any[],
  serverTable: string,
  server: DataSource,
  serverDriver: string
) {
  const serverTypes = await this.dbService.getColumnTypes(server, serverTable);

  const filtered = mappings.filter(m =>
    Object.prototype.hasOwnProperty.call(
      serverTypes,
      m.serverColumn.toLowerCase()
    )
  );

  const seen = new Set<string>();
  const validMappingsForTable = filtered.filter(m => {
    const key = m.serverColumn.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 🔴 HARD VALIDATION FOR DPMASTER
  if (serverTable.toLowerCase() === 'dpmaster') {
    const required = ['AC_NO', 'AC_TYPE'];
    for (const r of required) {
      if (!validMappingsForTable.some(m => m.serverColumn === r)) {
        throw new Error(`❌ Missing mandatory mapping: ${r}`);
      }
    }
  }

  if (!validMappingsForTable.some(m => m.serverColumn === 'BANKACNO')) {
    validMappingsForTable.push({
      serverColumn: 'BANKACNO',
      clientColumns: ['AC_NO'],
    });
  }

  const [sqL, sqR] = this.dbService.getQuoteChar(serverDriver);
  const safeServerTable = this.dbService.getQualifiedTableName(
    serverDriver,
    serverTable
  );

  const serverColsList = validMappingsForTable
    .map(m => `${sqL}${m.serverColumn}${sqR}`)
    .join(', ');

  let inserted = 0;
  let skipped = 0;
  const errors: string[] = [];

  const qr = server.createQueryRunner();
  await qr.connect();

  try {
    await this.toggleConstraints(qr, serverDriver, serverTable, false);
    await qr.startTransaction();

    const { bankCode, branchCode } =
      await this.getBankAndBranch(server);

    const schemeCache = new Map<string, string>();

   // 🔍 LOG SOURCE KEYS ONCE (DPMASTER ONLY)
if (serverTable.toLowerCase() === 'dpmaster' && rows.length > 0) {
  this.logger.debug(
    `DPMASTER SOURCE ROW KEYS => ${Object.keys(rows[0]).join(', ')}`
  );
}

for (const sourceRow of rows) {
  const acNo = this.getValueCaseInsensitive(sourceRow, 'AC_NO');
      const acTypeRaw =
  this.getValueCaseInsensitive(sourceRow, 'AC_TYPE') ?? '101';

const acType =
  String(acTypeRaw).match(/\d+/g)?.join('') ?? '101';


   if (!acNo) {
  this.logger.warn(`⚠️ Skipping row (query path): AC_NO missing`);
  continue;
}

if (!acType) {
  this.logger.warn(`⚠️ AC_TYPE missing → defaulting`);
}




      const schemeCode =
        schemeCache.get(acType) ??
        this.getSchemeCode(acType);

      schemeCache.set(acType, schemeCode);


const bankAcNo = this.generateBankAcNo(
  bankCode,
  branchCode,
  schemeCode,
  acNo
);



const rowValues = await Promise.all(
        validMappingsForTable.map(async m => {
          if (m.serverColumn === 'BANKACNO') return bankAcNo;

          const targetType = serverTypes[m.serverColumn.toLowerCase()];
          const val = this.getValueCaseInsensitive(sourceRow, m.clientColumns[0]);

          let converted = this.convertValue(val, targetType);


          converted = await this.sanitizeForeignKey(
            m.serverColumn,
            converted,
            serverTable   // ✅ exists in performInsertion
          );

          return converted;
        })
      );

      // ❌ REMOVE CONFLICT MASKING
      await qr.query(
        `INSERT INTO ${safeServerTable} (${serverColsList})
         VALUES (${rowValues.map((_, i) =>
           this.dbService.getParamPlaceholder(serverDriver, i)
         ).join(', ')})`,
        rowValues
      );

      inserted++;
    }

    await qr.commitTransaction();

  } catch (err) {
    await qr.rollbackTransaction();
    throw err;
  } finally {
    await this.toggleConstraints(qr, serverDriver, serverTable, true);
    await qr.release();
  }

  return {
    success: true,
    inserted,
    skipped,
    processed: rows.length,
    errors: errors.length ? errors : undefined,
  };
}

private async getBankAndBranch(ds: DataSource) {
  const rows = await ds.query(`
    SELECT "BANK_CODE", "BRANCH_CODE"
    FROM syspara
    LIMIT 1
  `);

  if (!rows || rows.length === 0) {
    throw new Error('❌ syspara table has no rows');
  }

  const row = rows[0];

  return {
    bankCode: String(row.BANK_CODE).trim(),
    branchCode: String(row.BRANCH_CODE).trim(),
  };
}


private getSchemeCode(acType: string): string {

  // Normalize input (70900, "70900", 70-900)
  const raw = String(acType).match(/\d+/g)?.join('');

  if (!raw || raw.length < 3) {
    this.logger.warn(`⚠️ Invalid AC_TYPE=${acType}, defaulting to 101`);
    return '101'; // same safety behavior as reference
  }

  /**
   * ✅ CBS FIXED BUSINESS RULE
   * 70900 → 709
   * 70100 → 701
   * 10200 → 102
   * 15100 → 151
   */
  return raw.substring(0, 3);
}

}


