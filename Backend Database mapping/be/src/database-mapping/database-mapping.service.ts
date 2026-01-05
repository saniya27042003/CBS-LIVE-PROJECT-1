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
  Inject,
  forwardRef,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { decodeYogesh, transliterateMarathiToEnglish } from '../font-decoder';
import { ManualSymbolMapper } from '../legacy-font/manual-symbol-maps';
import Sanscript from '@indic-transliteration/sanscript';
import { DatabaseService } from '../database/database.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const unidev = require('unidev');

@Injectable()
export class DatabaseMappingService {
  private readonly logger = new Logger(DatabaseMappingService.name);
  private clientDB: DataSource | null = null;
  private serverDB: DataSource | null = null;

  constructor(
    @Inject(forwardRef(() => DatabaseService))
    private readonly dbService: DatabaseService,
  ) {}

  /* ===================== HELPERS ===================== */

  private ensureClient() {
    if (!this.clientDB?.isInitialized)
      throw new InternalServerErrorException('Client DB not connected');
    return this.clientDB;
  }

  private ensureServer() {
    if (!this.serverDB?.isInitialized)
      throw new InternalServerErrorException('Server DB not connected');
    return this.serverDB;
  }

  private getClientDriver() {
    return this.ensureClient().options.type;
  }

  private getServerDriver() {
    return this.ensureServer().options.type;
  }

  private getQuoteChar(driver: string) {
    if (driver === 'mssql') return ['[', ']'];
    if (driver === 'mysql' || driver === 'mariadb') return ['`', '`'];
    return ['"', '"'];
  }

  private getParamPlaceholder(driver: string, index: number) {
    if (driver === 'mssql') return `@${index}`;
    if (driver === 'mysql' || driver === 'mariadb') return '?';
    if (driver === 'oracle') return `:${index}`;
    return `$${index + 1}`;
  }

  private getQualifiedTableName(driver: string, table: string) {
    const [qL, qR] = this.getQuoteChar(driver);
    if (table.includes('.')) {
      return table
        .split('.')
        .map((part) => `${qL}${part}${qR}`)
        .join('.');
    }
    return `${qL}${table}${qR}`;
  }

  private getValueFromTable(row: any, tableName: string, colName: string) {
    if (!row) return undefined;
    const targetKey = `${tableName}:::${colName}`.toLowerCase();
    const foundKey = Object.keys(row).find(
      (k) => k.toLowerCase() === targetKey,
    );
    return foundKey ? row[foundKey] : undefined;
  }

  private getValueCaseInsensitive(row: any, key: string): any {
    if (!row) return undefined;
    if (row[key] !== undefined) return row[key];
    const lowerKey = key.toLowerCase();
    const foundKey = Object.keys(row).find(
      (k) => k.toLowerCase() === lowerKey,
    );
    return foundKey ? row[foundKey] : undefined;
  }

  /* ===================== CONNECTIONS ===================== */

  private async createDataSource(config: any) {
    const type = config.type || 'postgres';
    const isMssql = type === 'mssql';
    const isOracle = type === 'oracle';
    const isMongo = type === 'mongodb';
    const isMysql = type === 'mysql' || type === 'mariadb';

    let port = 5432;
    if (config.port) port = Number(config.port);
    else if (isMssql) port = 1433;
    else if (isOracle) port = 1521;
    else if (isMongo) port = 27017;
    else if (isMysql) port = 3306;

    const ds = new DataSource({
      type: type,
      host: config.host,
      port: port,
      username: config.username,
      password: String(config.password || ''),
      database: config.database,
      sid: isOracle ? config.database : undefined,
      authSource: isMongo ? 'admin' : undefined,
      synchronize: false,
      options: isMssql
        ? { encrypt: false, trustServerCertificate: true }
        : undefined,
    } as any);

    await ds.initialize();
    return ds;
  }

  async connect(config: any) {
    if (this.clientDB?.isInitialized) await this.clientDB.destroy();
    this.clientDB = await this.createDataSource(config);
    return { success: true };
  }

  async connectServer(config: any) {
    if (this.serverDB?.isInitialized) await this.serverDB.destroy();
    this.serverDB = await this.createDataSource(config);
    return { success: true };
  }

  /* ===================== METADATA ===================== */

  async getServerDatabases(config: any) { return this.dbService.getDatabasesList(config); }
  async getPrimaryTableNames() { return this.dbService.getTableNames(this.ensureServer()); }
  async getClientTableNames() { return this.dbService.getTableNames(this.ensureClient()); }
  async getAllColumnsNames(t: string) { return this.dbService.getColumnNames(this.ensureServer(), t); }
  async getClientColumns(t: string) { return this.dbService.getColumnNames(this.ensureClient(), t); }
  async getTableStructure(t: string) { return this.dbService.getTablePreview(this.ensureClient(), t); }

  /* ===================== TRANSLATION & CONVERSION ===================== */

  private resolveAnusvara(iast: string): string {
    return iast
      .replace(/ṃ(?=[pbm])/g, 'm').replace(/ṃ(?=[kg])/g, 'n').replace(/ṃ(?=[tdn])/g, 'n')
      .replace(/ṃ(?=[cj])/g, 'n').replace(/ṃ(?=[ṭḍṇ])/g, 'n').replace(/ṃ/g, 'm');
  }

  // private transformValue(raw: any): any {
  //   if (raw === null || raw === undefined || raw === '') return null;
  //   const strRaw = String(raw);
  //   if (/^[\x20-\x7E\s]*$/.test(strRaw)) return strRaw;
  //   const looksLegacy = /[^\u0900-\u097F]/.test(strRaw);
  //   if (!looksLegacy) return strRaw;

  //   try {
  //     let marathi = unidev(strRaw, 'hindi', 'DVBW-TTYogeshEn');
  //     marathi = ManualSymbolMapper.normalize(marathi);
  //     let english = Sanscript.t(marathi, 'devanagari', 'iast');
  //     english = this.resolveAnusvara(english);

  //     english = english.toLowerCase()
  //       .replace(/ā/g, 'a').replace(/ī/g, 'i').replace(/ū/g, 'u')
  //       .replace(/ṛ|ṝ/g, 'r').replace(/ḷ|ḹ/g, 'l').replace(/c/g, 'ch')
  //       .replace(/ṭ/g, 't').replace(/ḍ/g, 'd').replace(/ś|ṣ/g, 'sh')
  //       .replace(/ṅ|ñ|ṇ/g, 'n').replace(/ḥ/g, 'h')
  //       .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //       .replace(/aa+/g, 'a').replace(/ii+/g, 'i').replace(/uu+/g, 'u')
  //       .replace(/a$/i, '').replace(/\b([a-z]+)(dr|tr|kr|gr)\b/gi, '$1$2a')
  //       .replace(/\b\w/g, (c) => c.toUpperCase());

  //     return english.trim() === '' ? strRaw : english;
  //   } catch (err) {
  //     return strRaw;
  //   }
  // }

  private transformValue(raw: any): any {
  if (raw === null || raw === undefined) return null;

  let str = String(raw).trim();
  if (!str) return null;

  // 1️⃣ Convert legacy font → Marathi Unicode
  try {
    str = unidev(str, 'hindi', 'DVBW-TTYogeshEn');
    str = ManualSymbolMapper.normalize(str);
  } catch {
    return raw;
  }

  // 2️⃣ Transliterate Marathi → English (IAST)
  let english = Sanscript.t(str, 'devanagari', 'iast');

  // 3️⃣ Normalize sounds
  english = this.resolveAnusvara(english);

  // 4️⃣ FINAL CLEANUP (THIS FIXES YOUR ISSUE)
  english = english
    .toLowerCase()

    // remove diacritics
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

    // fix vowels
    .replace(/aa+/g, 'a')
    .replace(/ii+/g, 'i')
    .replace(/uu+/g, 'u')

    // 🔴 IMPORTANT: DO NOT BREAK WORDS
    .replace(/\s+/g, ' ')   // keep space between names
    .trim();

  // 5️⃣ Capitalize words (Full Name stays FULL NAME)
  english = english.replace(/\b\w/g, c => c.toUpperCase());

  return english;
}


  private convertValue(value: any, targetType: string) {
    if (value == null) return null;
    const type = targetType ? targetType.toLowerCase() : 'text';

    if (['char', 'text', 'string', 'varchar', 'nvarchar', 'clob'].some(t => type.includes(t))) {
      return this.transformValue(value);
    }
    if (['int', 'numeric', 'float', 'double', 'decimal'].some(t => type.includes(t))) {
      if (typeof value === 'string' && value.trim() === '') return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    }
    if (type.includes('date') || type.includes('time')) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return String(value);
  }

  /* ===================== RELATIONSHIP & SORTING ===================== */

  private async getForeignKeys(db: DataSource, tableName: string): Promise<string[]> {
    const driver = db.options.type;
    const dbName = db.options.database as string;
    let cleanTable = tableName.includes('.') ? tableName.split('.')[1] : tableName;
    
    try {
      if (driver === 'postgres') {
        const rows = await db.query(`
          SELECT ccu.table_name AS foreign_table_name
          FROM information_schema.table_constraints AS tc
          JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
          JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
          WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = $1
        `, [cleanTable]);
        return rows.map((r: any) => r.foreign_table_name);
      } 
      else if (driver === 'mysql' || driver === 'mariadb') {
        const rows = await db.query(`
          SELECT REFERENCED_TABLE_NAME as foreign_table_name
          FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
          WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL
        `, [dbName, cleanTable]);
        return rows.map((r: any) => r.foreign_table_name);
      }
      else if (driver === 'mssql') {
        const rows = await db.query(`
          SELECT OBJECT_NAME( referenced_object_id ) as foreign_table_name
          FROM sys.foreign_keys
          WHERE parent_object_id = OBJECT_ID(@0)
        `, [cleanTable]);
        return rows.map((r: any) => r.foreign_table_name);
      }
      else if (driver === 'oracle') {
        const rows = await db.query(`
          SELECT r.table_name as foreign_table_name
          FROM user_constraints t
          JOIN user_constraints r ON t.r_constraint_name = r.constraint_name
          WHERE t.constraint_type = 'R' AND t.table_name = UPPER('${cleanTable}')
        `);
        return rows.map((r: any) => r.FOREIGN_TABLE_NAME);
      }
    } catch (e) {
      this.logger.warn(`Failed to fetch foreign keys for ${tableName}`);
    }
    return [];
  }

  private async sortTablesByDependency(tables: string[], db: DataSource): Promise<string[]> {
    const adjList = new Map<string, Set<string>>();
    const visited = new Set<string>();
    const result: string[] = [];

    for (const table of tables) {
      if (!adjList.has(table)) adjList.set(table, new Set());
      const parents = await this.getForeignKeys(db, table);
      for (const parent of parents) {
        if (tables.includes(parent) && parent !== table) {
          adjList.get(table)!.add(parent);
        }
      }
    }

    const visit = (table: string, path: Set<string>) => {
      if (path.has(table)) return; 
      if (visited.has(table)) return;

      path.add(table);
      const parents = adjList.get(table) || new Set();
      for (const parent of parents) {
        visit(parent, path);
      }
      path.delete(table);
      visited.add(table);
      result.push(table);
    };

    for (const table of tables) {
      visit(table, new Set());
    }

    return result;
  }

  /* ===================== MIGRATION LOGIC ===================== */

  async insertMappedData(body: any) {
    const client = this.ensureClient();
    const server = this.ensureServer();
    const clientDriver = client.options.type as string;
    const serverDriver = server.options.type as string;
    const [cqL, cqR] = this.getQuoteChar(clientDriver);

    const { mappings, joinKey } = body; 
    if (!Array.isArray(mappings)) throw new InternalServerErrorException('Invalid payload');

    const validMappings = mappings.filter((m) => m.clientTable && m.serverColumn);
    if (!validMappings.length) throw new InternalServerErrorException('No valid mappings found');

    const mappingsByTarget: Record<string, any[]> = {};
    const targetTablesSet = new Set<string>();

    mappings.forEach((m: any) => {
      if (!m.clientTable || !m.serverColumn) return;
      const target = m.targetTable || body.serverTable;
      if (!target) return;
      
      if (!mappingsByTarget[target]) mappingsByTarget[target] = [];
      mappingsByTarget[target].push(m);
      targetTablesSet.add(target);
    });

    const targetTables = Array.from(targetTablesSet);
    const sortedTargetTables = await this.sortTablesByDependency(targetTables, server);
    this.logger.log(`Migration Order: ${sortedTargetTables.join(' -> ')}`);

    const results: any[] = [];
    const qr = server.createQueryRunner();
    await qr.connect();
    
    await this.toggleConstraints(qr, serverDriver, sortedTargetTables, false);

    try {
      await qr.startTransaction();

      for (const targetTable of sortedTargetTables) {
        const tableMappings = mappingsByTarget[targetTable];
        if (!tableMappings || tableMappings.length === 0) continue;

        const sourceTablesSet = new Set<string>();
        const columnsBySource: Record<string, Set<string>> = {};

        tableMappings.forEach((m: any) => {
          sourceTablesSet.add(m.clientTable);
          if (!columnsBySource[m.clientTable]) columnsBySource[m.clientTable] = new Set();
          m.clientColumns.forEach((c: string) => columnsBySource[m.clientTable].add(c));
          if (joinKey) columnsBySource[m.clientTable].add(joinKey);
        });

        const sourceTables = Array.from(sourceTablesSet);
        const dataStore: Record<string, any[]> = {};

        for (const table of sourceTables) {
          try {
            let rows: any[] = [];
            if (clientDriver === 'mongodb') {
                const rawRows = await (client.driver as any).queryRunner.databaseConnection.db().collection(table).find({}).limit(10000).toArray();
                rows = rawRows.map((r: any) => {
                    const newR: any = {};
                    Object.keys(r).forEach((k) => {
                        const val = k === '_id' && r[k] ? r[k].toString() : r[k];
                        newR[`${table}:::${k}`] = val;
                    });
                    return newR;
                });
            } else {
                const actualColumns: string[] = await this.getClientColumns(table);
                const reqCols = Array.from(columnsBySource[table]);
                const selectCols = reqCols.map(c => {
                    const realCol = actualColumns.find(ac => ac.toLowerCase() === c.toLowerCase());
                    return realCol ? `${cqL}${realCol}${cqR}` : null;
                }).filter(Boolean);

                if (selectCols.length === 0) continue;

                const safeTable = this.getQualifiedTableName(clientDriver, table);
                
                let query = '';
                const colsStr = selectCols.join(', ');
                
                if (clientDriver === 'oracle') {
                    query = `SELECT ${colsStr} FROM ${safeTable} WHERE ROWNUM <= 10000`;
                } else if (clientDriver === 'mssql') {
                    query = `SELECT TOP 10000 ${colsStr} FROM ${safeTable}`;
                } else {
                    query = `SELECT ${colsStr} FROM ${safeTable} LIMIT 10000`;
                }

                const rawRows = await client.query(query);
                rows = rawRows.map((r: any) => {
                    const newR: any = {};
                    Object.keys(r).forEach((k) => { newR[`${table}:::${k}`] = r[k]; });
                    return newR;
                });
            }
            dataStore[table] = rows;
          } catch (e) {
             this.logger.error(`Failed to fetch source table ${table}: ${(e as Error).message}`);
          }
        }

        let preparedRows: any[] = [];
        if (sourceTables.length === 1) {
            preparedRows = dataStore[sourceTables[0]] || [];
        } else {
            const primary = sourceTables[0];
            const primaryRows = dataStore[primary] || [];
            
            for (const baseRow of primaryRows) {
                const combined = { ...baseRow };
                for (let i = 1; i < sourceTables.length; i++) {
                    const otherTable = sourceTables[i];
                    const otherRows = dataStore[otherTable] || [];
                    let match = null;
                    if (joinKey) {
                        const val = this.getValueFromTable(baseRow, primary, joinKey);
                        match = otherRows.find(r => String(this.getValueFromTable(r, otherTable, joinKey)) === String(val));
                    }
                    if (!match) match = otherRows[primaryRows.indexOf(baseRow)];
                    if (match) Object.assign(combined, match);
                }
                preparedRows.push(combined);
            }
        }

        const result = await this.performInsertion(preparedRows, tableMappings, targetTable, server, serverDriver, qr);
        results.push({ table: targetTable, ...result });
      }

      await qr.commitTransaction();
    } catch (err: any) {
      await qr.rollbackTransaction();
      throw new InternalServerErrorException(err.message);
    } finally {
      await this.toggleConstraints(qr, serverDriver, sortedTargetTables, true);
      await qr.release();
    }

    return { success: true, results };
  }

  // --- CONSTRAINT TOGGLING ---
  private async toggleConstraints(qr: QueryRunner, driver: string, tables: string[], enable: boolean) {
    try {
      if (driver === 'mysql' || driver === 'mariadb') {
        await qr.query(`SET FOREIGN_KEY_CHECKS = ${enable ? 1 : 0}`);
      } else if (driver === 'postgres') {
        const action = enable ? 'origin' : 'replica';
        await qr.query(`SET session_replication_role = '${action}';`);
      } else if (driver === 'mssql') {
        const action = enable ? 'WITH CHECK CHECK' : 'NOCHECK';
        for (const t of tables) {
           const safe = this.getQualifiedTableName(driver, t);
           await qr.query(`ALTER TABLE ${safe} ${action} CONSTRAINT ALL`);
        }
      } else if (driver === 'oracle') {
         const state = enable ? 'ENABLE' : 'DISABLE';
         for (const t of tables) {
             const cleanName = t.toUpperCase().replace(/"/g, '');
             try {
                await qr.query(`
                  BEGIN
                    FOR c IN (SELECT constraint_name FROM user_constraints WHERE table_name = '${cleanName}' AND constraint_type = 'R') LOOP
                      EXECUTE IMMEDIATE 'ALTER TABLE "${cleanName}" ${state} CONSTRAINT "' || c.constraint_name || '"';
                    END LOOP;
                  END;
                `);
             } catch {}
         }
      }
    } catch (e) {
        this.logger.warn('Constraint toggle warning');
    }
  }

  private splitFullName(fullName: string) {
  if (!fullName) return { f: null, m: null, l: null };

  const cleaned = fullName
    .replace(/\s+/g, ' ')
    .trim();

  const parts = cleaned.split(' ');

  if (parts.length === 1) {
    return { f: parts[0], m: null, l: null };
  }

  if (parts.length === 2) {
    return { f: parts[0], m: null, l: parts[1] };
  }

  return {
    f: parts[0],
    m: parts.slice(1, -1).join(' '),
    l: parts[parts.length - 1],
  };
}

  // --- INSERTION (FIXED) ---
 // --- INSERTION (Updated for Merge & Split) ---
private async performInsertion(rows: any[], mappings: any[], targetTable: string, server: DataSource, driver: string, qr: QueryRunner) {
  if (!rows.length) return { inserted: 0, skipped: 0 };
  
  const serverTypes = await this.getServerColumnTypes(targetTable);
  const [sqL, sqR] = this.getQuoteChar(driver);
  const safeTarget = this.getQualifiedTableName(driver, targetTable);

  let inserted = 0;
  let skipped = 0;
  const errors: string[] = [];

  if (driver === 'mssql') { try { await qr.query(`SET IDENTITY_INSERT ${safeTarget} ON`); } catch (e) {} }

  for (const sourceRow of rows) {
    const potentialData = mappings.map((m: any) => {
      const targetType = serverTypes[m.serverColumn.toLowerCase()];
      const serverCol = m.serverColumn.toUpperCase();

      let finalCombinedValueParts: string[] = [];

      // Loop through all mapped client columns (handles merging)
      for (const colEntry of m.clientColumns) {
        // colEntry might be "COLUMN_ID" or "COLUMN_ID:PART_INDEX"
        const [colId, partIdxStr] = colEntry.split(':');
        
        let rawVal = this.getValueFromTable(sourceRow, m.clientTable, colId);
        
        // Handle Splitting Logic if part index exists (e.g., 2-1)
        if (partIdxStr && rawVal !== undefined && rawVal !== null) {
          const partIdx = parseInt(partIdxStr, 10);
          const words = String(rawVal).trim().split(/\s+/); // Split by whitespace
          rawVal = words[partIdx - 1] || ''; // Extract part (1-based index)
        }

        if (rawVal !== undefined && rawVal !== null) {
          finalCombinedValueParts.push(String(rawVal));
        }
      }

      // Merge values with a space (e.g., "First" + "Last" -> "First Last")
      let val: any = finalCombinedValueParts.length > 0 ? finalCombinedValueParts.join(' ').trim() : null;

      // Maintain your existing Name Split logic for F_NAME, etc., as fallback
      if (!val && ['F_NAME', 'M_NAME', 'L_NAME'].includes(serverCol)) {
          // ... (keep your existing splitFullName logic here if needed)
      }

      const convertedVal = this.convertValue(val, targetType);

      return {
        col: `${sqL}${m.serverColumn}${sqR}`,
        val: convertedVal,
      };
    });

    const validData = potentialData.filter((d: any) => d.val !== null);
    if (validData.length === 0) continue;

    const cols = validData.map((d: any) => d.col).join(', ');
    const values = validData.map((d: any) => d.val);
    const params = values.map((_: any, x: number) => this.getParamPlaceholder(driver, x)).join(', ');

    try {
      await qr.query(`INSERT INTO ${safeTarget} (${cols}) VALUES (${params})`, values);
      inserted++;
    } catch (e: any) {
      skipped++;
      if (errors.length < 5) errors.push(`${targetTable}: ${e.message}`);
    }
  }

  if (driver === 'mssql') { try { await qr.query(`SET IDENTITY_INSERT ${safeTarget} OFF`); } catch {} }
  return { inserted, skipped, errors };
}
  // --- UTILS ---
  private async getServerColumnTypes(tableName: string) {
    const server = this.ensureServer();
    return this.dbService.getColumnTypes(server, tableName);
  }

  async convertToUnicode2(inputText: string) {
    try {
      const marathiText = unidev(inputText, 'hindi', 'DVBW-TTYogeshEn');
      return { marathiText: ManualSymbolMapper.normalize(marathiText) };
    } catch { return { marathiText: inputText }; }
  }

  // MongoDB Helpers
  private isMongo(db: DataSource): boolean {
    return db.options.type === 'mongodb';
  }

  private getMongoDb(db: DataSource): any {
    const driver: any = db.driver;
    const qr = driver?.queryRunner;
    const connection = qr?.databaseConnection;
    if (!connection) throw new Error('MongoDB client not initialized');
    return connection.db(db.options.database as string);
  }

  private async getMongoDocuments(db: DataSource, collectionName: string, limit = 10000): Promise<any[]> {
    if (!this.isMongo(db)) return [];
    const mongoDb = this.getMongoDb(db);
    return await mongoDb.collection(collectionName).find({}).limit(limit).toArray();
  }
}