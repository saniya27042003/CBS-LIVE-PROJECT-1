/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { CATEGORYMASTER } from '../entity/category-master.entity';
import { STATIC_CHILD_MAP } from './static-child-map';


const unidev = require('unidev');

@Injectable()
export class DatabaseMappingService {
  private readonly logger = new Logger(DatabaseMappingService.name);
  private clientDB: DataSource | null = null;
  private serverDB: DataSource | null = null;

  constructor(private readonly dbService: DatabaseService) { }

  /* ===================== HELPERS ===================== */

  private ensureClient() {
    if (!this.clientDB?.isInitialized) throw new InternalServerErrorException('Client DB not connected');
    return this.clientDB;
  }

  private ensureServer() {
    if (!this.serverDB?.isInitialized) throw new InternalServerErrorException('Server DB not connected');
    return this.serverDB;
  }

  private getValueCaseInsensitive(row: any, key: string): any {
    if (!row) return undefined;
    if (row[key] !== undefined) return row[key];
    const lowerKey = key.toLowerCase();
    const foundKey = Object.keys(row).find((k) => k.toLowerCase() === lowerKey);
    return foundKey ? row[foundKey] : undefined;
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
    if (/^[\x20-\x7E\s]*$/.test(strRaw)) return strRaw;
    const looksLegacy = /[^\u0900-\u097F]/.test(strRaw);
    if (!looksLegacy) return strRaw;

    try {
      let marathi = unidev(strRaw, 'hindi', 'DVBW-TTYogeshEn');
      marathi = ManualSymbolMapper.normalize(marathi);
      let english = Sanscript.t(marathi, 'devanagari', 'iast');
      english = this.resolveAnusvara(english);

      english = english.toLowerCase()
        .replace(/ā/g, 'a').replace(/ī/g, 'i').replace(/ū/g, 'u')
        .replace(/ṛ|ṝ/g, 'r').replace(/ḷ|ḹ/g, 'l').replace(/c/g, 'ch')
        .replace(/ṭ/g, 't').replace(/ḍ/g, 'd').replace(/ś|ṣ/g, 'sh')
        .replace(/ṅ|ñ|ṇ/g, 'n').replace(/ḥ/g, 'h')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/aa+/g, 'a').replace(/ii+/g, 'i').replace(/uu+/g, 'u')
        .replace(/a$/i, '').replace(/\b([a-z]+)(dr|tr|kr|gr)\b/gi, '$1$2a')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return english.trim() === '' ? strRaw : english;
    } catch (err) {
      return strRaw;
    }
  }

  private convertValue(value: any, targetType: string) {
    if (value === null || value === undefined) return null;
    const type = targetType ? targetType.toLowerCase() : 'text';

    if (['character varying', 'text', 'varchar', 'char', 'nvarchar', 'nchar', 'string', 'clob', 'varchar2'].some((t) => type.includes(t))) {
      return this.transformValue(value);
    }
    if (['integer', 'int', 'smallint', 'bigint', 'numeric', 'decimal', 'real', 'double', 'float', 'serial', 'identity', 'number'].some((t) => type.includes(t))) {
      if (typeof value === 'string' && value.trim() === '') return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    }
    if (type.includes('bool') || type.includes('bit')) {
      const s = String(value).toLowerCase();
      return ['true', '1', 'yes', 'y', 'on', 't'].includes(s);
    }
    if (type.includes('date') || type.includes('time') || type.includes('timestamp')) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return String(value);
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
    const { mappings, joinKey } = body; // <--- Ensure joinKey is destructured
    if (!Array.isArray(mappings)) throw new InternalServerErrorException('Invalid payload');

    const validMappings = mappings.filter((m) => m.clientTable && m.serverColumn);
    if (!validMappings.length) throw new InternalServerErrorException('No valid mappings found');

    let preparedRows: any[] = [];

    // Organize columns by table
    const columnsByTable: Record<string, Set<string>> = {};
    validMappings.forEach((m) => {
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

        if (matchingRow) {
          Object.assign(combinedRow, matchingRow);
        }
      }
      preparedRows.push(combinedRow);
    }

    if (preparedRows.length === 0) return { success: false, message: 'No source data mapped.' };

    // ... (Remainder of the function: Target Identification and Insertion Loop remains strictly the same)
    // --- 2. MULTI-TARGET IDENTIFICATION ---
    const targetTables = new Set<string>();
    validMappings.forEach(m => {
      if (m.targetTable) targetTables.add(m.targetTable);
      else if (body.serverTable) targetTables.add(body.serverTable);
    });

    if (targetTables.size === 0) return { success: false, message: 'No target tables specified.' };

    const results: any[] = [];
    for (const targetTable of targetTables) {
      // ... (Keep existing insertion loop code)
      const tableMappings = validMappings.filter(m =>
        (m.targetTable && m.targetTable === targetTable) ||
        (!m.targetTable && body.serverTable === targetTable)
      );

      if (tableMappings.length > 0) {
        let result;

        if (targetTable.toUpperCase() === 'DPMASTER') {
          result = await this.insertDpmasterWithEntity(
            preparedRows,
            tableMappings
          );
        } else {
          result = await this.performInsertion(
            preparedRows,
            tableMappings,
            targetTable,
            server,
            serverDriver
          );
        }

        results.push({
          table: targetTable,
          ...result,
        });

      }
    }
  
  // 🔁 SECOND PASS: UPDATE FK values
  if(serverDriver !== 'mongodb' && joinKey) {
  for (const targetTable of targetTables) {
    const fks = this.getStaticForeignKeys(targetTable);

    for (const fk of fks) {
      await server.query(`
        UPDATE ${targetTable} child
        SET ${fk.child_column} = parent.${fk.parent_column}
        FROM ${fk.parent_table} parent
        WHERE child.${fk.child_column} IS NULL
          AND child.${joinKey} = parent.${joinKey}
      `);
    }
  }
}

// return { success: true, results };
return {
  success: true,
  results,
  fkUpdated: true
};

  }




  async getChildTables(parentTable: string) {
  const key = parentTable.trim().toLowerCase();
  const children = STATIC_CHILD_MAP[key] ?? [];

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
  const key = parentTable.trim().toLowerCase();

  const children = STATIC_CHILD_MAP[key] ?? [];

  return children.map((childTable) => ({
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


// ================= ENTITY-BASED INSERT =================

  private async insertDpmasterWithEntity(
    
  rows: any[],
  mappings: any[],
) {
  this.logger.warn('🟢 ENTITY INSERT PATH: CATEGORYMASTER');
  const server = this.ensureServer();
  const entities: CATEGORYMASTER[] = [];

  for (const sourceRow of rows) {
    const entity = new CATEGORYMASTER();

    for (const m of mappings) {
      if (!(m.serverColumn in entity)) continue;

      const value = this.getValueCaseInsensitive(
        sourceRow,
        m.clientColumns[0]
      );

      if (value === undefined) continue;

      entity[m.serverColumn] = this.transformValue(value);
    }

    entities.push(entity);
  }

  await server.transaction(async (manager) => {
    await manager.getRepository(CATEGORYMASTER).save(entities, {
      chunk: 500
    });
  });

  return {
    success: true,
    inserted: entities.length,
    processed: rows.length,
    skipped: rows.length - entities.length,
  };
}


async insertParentWithChildren(parentTable: string, body: any) {
  const parent = parentTable.trim().toLowerCase();

  // 1️⃣ Insert parent FIRST
  await this.insertMappedData({
    ...body,
    serverTable: parent,
  });

  // 2️⃣ Insert only statically allowed child tables
  const children = STATIC_CHILD_MAP[parent] ?? [];

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
  // 1. Get Schema
  const serverTypes = await this.dbService.getColumnTypes(server, serverTable);

  // 2. Filter valid mappings
  // ✅ STEP 1: filter only existing server columns
  const filtered = mappings.filter(m =>
    Object.prototype.hasOwnProperty.call(
      serverTypes,
      m.serverColumn.toLowerCase()
    )
  );

  // ✅ STEP 2: deduplicate by serverColumn (CRITICAL)
  const seen = new Set<string>();

  const validMappingsForTable = filtered.filter(m => {
    const key = m.serverColumn.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });


  if (validMappingsForTable.length === 0) {
    return {
      success: false,
      message: `Skipped ${serverTable}: No matching columns found in DB schema.`,
    };
  }

  const [sqL, sqR] = this.dbService.getQuoteChar(serverDriver);
  const safeServerTable = this.dbService.getQualifiedTableName(
    serverDriver,
    serverTable
  );


  const uniqueMappingsMap = new Map<string, any>();

  for (const m of validMappingsForTable) {
    const key = m.serverColumn.toLowerCase();

    // Keep the FIRST mapping only
    if (!uniqueMappingsMap.has(key)) {
      uniqueMappingsMap.set(key, m);
    }
  }

  const uniqueMappingsForTable = Array.from(uniqueMappingsMap.values());


  const serverColsList = uniqueMappingsForTable
    .map(m => `${sqL}${m.serverColumn}${sqR}`)
    .join(', ');


  let inserted = 0;
  let skipped = 0;
  const errors: string[] = [];

  // 🔑 Mongo PK counter (once)
  let mongoPkCounter = 1;
  if (this.isMongo(this.clientDB!)) {
    try {
      const res = await server.query(
        `SELECT MAX(id) AS max FROM ${safeServerTable}`
      );
      mongoPkCounter = (res?.[0]?.max || 0) + 1;
    } catch {
      mongoPkCounter = 1;
    }
  }

  // 🔁 ROW-LEVEL TRANSACTION (KEY FIX)
  for (let i = 0; i < rows.length; i++) {
    const sourceRow = rows[i];

    // Split full name once
    const fullNameRaw = this.getValueCaseInsensitive(sourceRow, 'AC_NAME');
    const fullName = this.transformValue(fullNameRaw);
    const split = this.splitFullNameBackend(fullName);

    const rowValues = validMappingsForTable.map(m => {
      const targetType = serverTypes[m.serverColumn.toLowerCase()];

      // ORACLE → auto ID
      if (
        serverDriver === 'oracle' &&
        m.serverColumn.toLowerCase() === 'id'
      ) {
        return null;
      }

      // Mongo → numeric PK
      if (
        this.isMongo(this.clientDB!) &&
        m.serverColumn.toLowerCase() === 'id'
      ) {
        return mongoPkCounter++;
      }

      // Split name
      if (m.transform === 'SPLIT_FULL_NAME') {
        switch (m.serverColumn.toUpperCase()) {
          case 'F_NAME': return split.f;
          case 'M_NAME': return split.m;
          case 'L_NAME': return split.l;
          default: return null;
        }
      }

      // Merge strings
      const isStringTarget =
        ['character varying', 'text', 'varchar', 'char']
          .some(t => (targetType || '').toLowerCase().includes(t));

      if (isStringTarget && m.clientColumns.length > 1) {
        const parts = m.clientColumns.map((c: string) =>
          this.transformValue(this.getValueCaseInsensitive(sourceRow, c))
        );
        return parts.filter(p => p && String(p).trim() !== '').join(' ');
      }

      // 🔐 FK SAFE (NOT PK)
      if (
        targetType &&
        targetType.toLowerCase().includes('int') &&
        m.serverColumn.toLowerCase() !== 'id'
      ) {
        const fkVal = this.getValueCaseInsensitive(
          sourceRow,
          m.clientColumns[0]
        );
        if (fkVal === undefined) return null;
      }

      // Default
      const val = this.getValueCaseInsensitive(sourceRow, m.clientColumns[0]);
      return this.convertValue(val, targetType);
    });

    const placeholders = rowValues
      .map((_, idx) => this.dbService.getParamPlaceholder(serverDriver, idx))
      .join(', ');

    const qr = server.createQueryRunner();
    await qr.connect();

    try {
      if (serverDriver === 'postgres') {
        await qr.query(`SET client_encoding TO 'UTF8'`);
      }

      await this.toggleConstraints(qr, serverDriver, serverTable, false);
      await qr.startTransaction();

      await qr.query(
        `INSERT INTO ${safeServerTable} (${serverColsList})
         VALUES (${placeholders})`,
        rowValues
      );

      await qr.commitTransaction();
      inserted++;

    } catch (err: any) {
      await qr.rollbackTransaction();
      skipped++;

      if (errors.length < 5) {
        errors.push(err.message);
      }

      console.error('INSERT FAILED:', {
        table: serverTable,
        row: rowValues,
        error: err.message,
        code: err.code,
      });

    } finally {
      await this.toggleConstraints(qr, serverDriver, serverTable, true);
      await qr.release();
    }
  }

  return {
    success: true,
    inserted,
    skipped,
    processed: rows.length,
    errors: errors.length ? errors : undefined,
  };
}



  



  private splitFullNameBackend(fullName: string) {
  if (!fullName) return { f: null, m: null, l: null };

  const parts = fullName.replace(/\s+/g, ' ').trim().split(' ');

  if (parts.length === 1) return { f: parts[0], m: null, l: null };
  if (parts.length === 2) return { f: parts[0], m: null, l: parts[1] };

  return {
    f: parts[0],
    m: parts[1],
    l: parts.slice(2).join(' ')
  };
}

  async convertToUnicode2(inputText: string) {
  try {
    const marathiText = unidev(inputText, 'hindi', 'DVBW-TTYogeshEn');
    return { marathiText: ManualSymbolMapper.normalize(marathiText) };
  } catch {
    return { marathiText: inputText };
  }
}
}