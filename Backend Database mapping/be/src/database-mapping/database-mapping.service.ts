/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
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

  constructor(private readonly dbService: DatabaseService) {}

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
    if (this.clientDB?.isInitialized) await this.clientDB.destroy();
    try {
      this.clientDB = await this.dbService.createConnection(config);
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async connectServer(config: any) {
    if (this.serverDB?.isInitialized) await this.serverDB.destroy();
    try {
      this.serverDB = await this.dbService.createConnection(config);
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
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

  /* eslint-disable prettier/prettier */
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

        const rows = await client.query(query);
        dataStore[table] = rows;

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
            const result = await this.performInsertion(preparedRows, tableMappings, targetTable, server, serverDriver);
            results.push({ table: targetTable, ...result });
        }
    }

    return { success: true, results };
  }


  // --- CORE INSERTION LOGIC (Per Table) ---
  private async performInsertion(rows: any[], mappings: any[], serverTable: string, server: DataSource, serverDriver: string) {
    // 1. Get Schema
    const serverTypes = await this.dbService.getColumnTypes(server, serverTable);
    
    // 2. Double-check: Filter mappings that actually match columns in this table
    const validMappingsForTable = mappings.filter(m => 
      Object.prototype.hasOwnProperty.call(serverTypes, m.serverColumn.toLowerCase())
    );

    if (validMappingsForTable.length === 0) {
      return { success: false, message: `Skipped ${serverTable}: No matching columns found in DB schema.` };
    }

    const [sqL, sqR] = this.dbService.getQuoteChar(serverDriver);
    const safeServerTable = this.dbService.getQualifiedTableName(serverDriver, serverTable);
    const serverColsList = validMappingsForTable.map((m) => `${sqL}${m.serverColumn}${sqR}`).join(', ');

    const qr = server.createQueryRunner();
    await qr.connect();

    // 3. DISABLE CONSTRAINTS
    await this.toggleConstraints(qr, serverDriver, serverTable, false);

    if (serverDriver === 'mssql') {
      try { await qr.query(`SET IDENTITY_INSERT ${safeServerTable} ON`); } catch (e) {}
    }

    let inserted = 0;
    let skipped = 0;
    const errors: string[] = [];

    try {
      await qr.startTransaction();

      for (let i = 0; i < rows.length; i++) {
        const sourceRow = rows[i];
        
        const rowValues = validMappingsForTable.map((m) => {
          const targetType = serverTypes[m.serverColumn.toLowerCase()];
          const isStringTarget = ['character varying', 'text', 'varchar', 'char'].some((t) => (targetType || '').toLowerCase().includes(t));
          
          if (isStringTarget && m.clientColumns.length > 1) {
            const parts = m.clientColumns.map((c: string) => this.transformValue(this.getValueCaseInsensitive(sourceRow, c)));
            return parts.filter((p: any) => p && String(p).trim() !== '').join(' ');
          }
          const val = this.getValueCaseInsensitive(sourceRow, m.clientColumns[0]);
          return this.convertValue(val, targetType);
        });

        const placeholders = rowValues.map((_, idx) => this.dbService.getParamPlaceholder(serverDriver, idx)).join(', ');

        try {
          await qr.query(`INSERT INTO ${safeServerTable} (${serverColsList}) VALUES (${placeholders})`, rowValues);
          inserted++;
        } catch (rowErr: any) {
          const code = String(rowErr.code || rowErr.number || rowErr.errno);
          if (['23505', '2627', '2601', '1062'].includes(code)) {
             skipped++; // Skip duplicates silently
          } else {
             skipped++;
             if (errors.length < 3) errors.push(`Row ${i}: ${rowErr.message}`);
          }
        }
      }

      await qr.commitTransaction();
    } catch (err: any) {
      await qr.rollbackTransaction();
      // Don't throw here, return failure for this specific table so others might succeed
      return { success: false, message: err.message, errors: [err.message] };
    } finally {
      if (serverDriver === 'mssql') {
        try { await qr.query(`SET IDENTITY_INSERT ${safeServerTable} OFF`); } catch (e) {}
      }
      await this.toggleConstraints(qr, serverDriver, serverTable, true);
      await qr.release();
    }

    return { 
      success: true, 
      inserted, 
      skipped, 
      processed: rows.length, 
      errors: errors.length ? errors : undefined 
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