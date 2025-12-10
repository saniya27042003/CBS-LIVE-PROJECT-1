/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { transliterate } from "transliteration";


@Injectable()
export class DatabaseMappingService {
  private clientDB: DataSource | null = null;
  private serverDB: DataSource | null = null;

  constructor() {
    console.log("Database Mapping Service Loaded");
  }

  // =========================================================
  // SQL Dictionary for all Supported DB Drivers
  // =========================================================
  private getQueryConfig(driver: string) {
    const configs = {
      postgres: {
        tables: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema='public' AND table_type='BASE TABLE'
        `,
        columns: `
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_schema='public' AND table_name = $1
          ORDER BY ordinal_position
        `,
        sampleRows: (table: string) => `SELECT * FROM "${table}" LIMIT 100`,
      },

      mssql: {
        tables: `
          SELECT TABLE_NAME 
          FROM INFORMATION_SCHEMA.TABLES 
          WHERE TABLE_TYPE='BASE TABLE'
        `,
        columns: `
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = @0
          ORDER BY ORDINAL_POSITION
        `,
        sampleRows: (table: string) => `SELECT TOP 100 * FROM [${table}]`,
      },

      mysql: {
        tables: `SHOW TABLES`,
        columns: `SHOW COLUMNS FROM ??`,
        sampleRows: (table: string) => `SELECT * FROM \`${table}\` LIMIT 100`,
      }
    };

    return configs[driver] ?? configs.postgres;  // fallback prevents null errors
  }

  private getDriver(ds: DataSource) {
    return ds.options.type as string; // postgres | mssql | mysql...
  }

  // =========================================================
  // CLIENT DATABASE CONNECTION (Dynamic: PG / MSSQL / MySQL)
  // =========================================================
  async connect(config: any) {
    try {
      if (this.clientDB?.isInitialized) await this.clientDB.destroy();

      const isMssql = config.type === 'mssql';

      const ds = new DataSource({
        type: config.type,
        host: config.host,
        port: Number(config.port),
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [],
        synchronize: false,
        options: isMssql
          ? { encrypt: true, trustServerCertificate: true }
          : undefined,
      });

      await ds.initialize();
      this.clientDB = ds;

      return { success: true, message: "Client DB connected successfully!" };

    } catch (err: any) {
      return {
        success: false,
        message: "Client DB connection failed",
        error: err.message,
      };
    }
  }


  async getServerDatabases(config: any) {
    const ds = new DataSource({
      type: 'postgres',
      host: config.host,
      port: Number(config.port),
      username: config.username,
      password: config.password,
      database: 'postgres',
    });

    await ds.initialize();

    const result = await ds.query(`
    SELECT datname FROM pg_database WHERE datistemplate = false;
  `);

    await ds.destroy();

    return result.map((r: any) => r.datname);
  }


  // =========================================================
  // SERVER DATABASE (Always PostgreSQL)
  // =========================================================
  async connectServer(config: any) {
    try {
      if (this.serverDB?.isInitialized) await this.serverDB.destroy();

      const ds = new DataSource({
        type: "postgres",
        host: config.host,
        port: Number(config.port),
        username: config.username,
        password: config.password,
        database: config.database,
        synchronize: false,
      });

      await ds.initialize();
      this.serverDB = ds;

      return { success: true, message: "Server DB connected successfully!" };

    } catch (err: any) {
      return {
        success: false,
        message: "Server DB connection failed",
        error: err.message,
      };
    }
  }

  private ensureClient() {
    if (!this.clientDB?.isInitialized)
      throw new InternalServerErrorException("Client DB not connected");
    return this.clientDB;
  }

  private ensureServer() {
    if (!this.serverDB?.isInitialized)
      throw new InternalServerErrorException("Server DB not connected");
    return this.serverDB;
  }

  // =========================================================
  // CLIENT TABLE LIST
  // =========================================================
  async getClientTableNames() {
    const client = this.ensureClient();
    const driver = this.getDriver(client);
    const config = this.getQueryConfig(driver);

    const result = await client.query(config.tables);

    return result.map((t: any) =>
      t.table_name || t.TABLE_NAME || Object.values(t)[0]
    );
  }

  // =========================================================
  // SERVER TABLE LIST
  // =========================================================
  async getPrimaryTableNames() {
    const server = this.ensureServer();

    const result = await server.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public' AND table_type='BASE TABLE'
    `);

    return result.map((t: any) => t.table_name);
  }

  // =========================================================
  // SERVER COLUMNS (Postgres)
  // =========================================================
  async getAllColumnsNames(tableName: string) {
    const server = this.ensureServer();

    const result = await server.query(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_schema='public' AND table_name=$1`,
      [tableName]
    );

    return result.map((c: any) => c.column_name);
  }

  // SERVER: get primary key column name for a table (Postgres)
  private async getServerPrimaryKey(tableName: string): Promise<string | null> {
    const server = this.ensureServer();

    const rows = await server.query(
      `
    SELECT a.attname AS column_name
    FROM   pg_index i
    JOIN   pg_attribute a
           ON a.attrelid = i.indrelid
          AND a.attnum = ANY(i.indkey)
    WHERE  i.indrelid = $1::regclass
    AND    i.indisprimary;
    `,
      [tableName],
    );

    return rows[0]?.column_name ?? null;
  }



  // =========================================================
  // CLIENT COLUMNS (PG / MSSQL / MySQL)
  // =========================================================
  async getClientColumns(tableName: string) {
    const client = this.ensureClient();
    const driver = this.getDriver(client);
    const config = this.getQueryConfig(driver);

    const result = await client.query(config.columns, [tableName]);

    return result.map((c: any) =>
      c.column_name || c.COLUMN_NAME || Object.values(c)[0]
    );
  }

  // =========================================================
  // TABLE STRUCTURE PREVIEW
  // =========================================================
  async getTableStructure(tableName: string) {
    const client = this.ensureClient();
    const driver = this.getDriver(client);
    const config = this.getQueryConfig(driver);

    const columns = await this.getClientColumns(tableName);
    const rows = await client.query(config.sampleRows(tableName));

    return { columns, rows };
  }

  // =========================================================
  // DATE CLEANER (Fixes gmt+0530 errors)
  // =========================================================
  // private cleanDate(value: any) {
  //   if (!value) return value;

  //   const str = String(value).trim();

  //   // Already in correct YYYY-MM-DD
  //   if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  //   // Remove timezone parts, case-insensitive
  //   const cleaned = str
  //     .replace(/\(.*?\)/gi, '')             // remove (India Standard Time), any case
  //     .replace(/gmt[^\d-+]*/gi, '')         // remove 'GMT', 'gmt', etc. plus trailing text
  //     .replace(/\+\d{4}/g, '')              // remove +0530, +0500, etc.
  //     .trim();

  //   const parsed = new Date(cleaned);

  //   if (!isNaN(parsed.getTime())) {
  //     return parsed.toISOString().split('T')[0];
  //   }

  //   return null; // invalid date becomes NULL
  // }

  private cleanDate(value: any) {
    if (!value) return null;

    const str = String(value).trim();
    if (!str) return null;

    // If it already looks like YYYY-MM-DD, just return it
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

    const cleaned = str
      .replace(/\(.*?\)/gi, '')
      .replace(/gmt[^\d-+]*/gi, '')
      .replace(/\+\d{4}/g, '')
      .trim();

    // If cleaned is still just a date, avoid Date() timezone shift
    if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return cleaned;

    const parsed = new Date(cleaned);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }

    return null;
  }

  ///new function
  private cleanDateTime(value: any) {
    if (!value) return null;

    // If it's already a Date object, keep its time
    if (value instanceof Date) {
      return value.toISOString().replace('Z', '');
    }

    const str = String(value).trim();
    if (!str) return null;

    // MSSQL usually gives "YYYY-MM-DD HH:MM:SS.mmm"
    const parsed = new Date(str);
    if (isNaN(parsed.getTime())) {
      return null;
    }

    return parsed.toISOString().replace('Z', '');
  }





  // =========================================================
  // CLIENT COLUMN TYPES (for auto type detection)
  // =========================================================
  private async getClientColumnTypes(tableName: string) {
    const client = this.ensureClient();
    const driver = this.getDriver(client);

    // Only implemented for MSSQL right now
    if (driver !== 'mssql') {
      return {};
    }

    const rows = await client.query(`
    SELECT COLUMN_NAME, DATA_TYPE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = @0
  `, [tableName]);

    const map: Record<string, string> = {};
    for (const r of rows) {
      map[r.COLUMN_NAME.toLowerCase()] = r.DATA_TYPE.toLowerCase();
    }
    return map;
  }


  // =========================================================
  // INSERT / MIGRATION LOGIC (With Transliteration + Merge + Date Fix)
  // =========================================================
  async insertMappedData(body: any) {
    const { serverTable, clientTable, mappings } = body;

    // Dynamically detect PK for the chosen server table
    const pkColumn = await this.getServerPrimaryKey(serverTable);
    if (!pkColumn) {
      throw new InternalServerErrorException(
        `No primary key found for server table ${serverTable}`,
      );
    }
    const clientTypes = await this.getClientColumnTypes(clientTable);
    const client = this.ensureClient();
    const server = this.ensureServer();

    // 1) Build SELECT list from all client columns used in mappings
    const clientCols = mappings
      .flatMap((m: any) => {
        const clientDef = Array.isArray(m.client) ? m.client : [m.client];
        return clientDef.filter((c: string | null | undefined) => !!c);
      })
      .map((c: string) => `"${c}"`)
      .join(',');

    const serverCols = mappings.map((m: any) => `"${m.server}"`).join(',');

    const clientRows = await client.query(
      `SELECT ${clientCols} FROM "${clientTable}"`
    );

    if (!clientRows.length) {
      return { success: false, message: 'Client table has no data' };
    }

    const qr = server.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      for (const rowOrig of clientRows) {
        // Normalize keys to lower‑case for safe lookup
        const row: any = {};
        Object.keys(rowOrig).forEach(k => {
          row[k.toLowerCase()] = rowOrig[k];
        });

        const values = mappings.map((m: any) => {
          const clientDef = Array.isArray(m.client) ? m.client : [m.client];
          const serverName = String(m.server || '').toLowerCase();
          // const kind = m.type || 'text'; // 'text' | 'number' | 'date' | 'fk'
          // Decide kind automatically from MSSQL DATA_TYPE of first client column
          const firstClientCol = String((Array.isArray(m.client) ? m.client[0] : m.client) || '').toLowerCase();
          const clientType = clientTypes[firstClientCol] || '';

          let kind: 'text' | 'number' | 'date' | 'datetime' | 'fk' = 'text';

          if (clientType.includes('date') || clientType.includes('time')) {
            // datetime, smalldatetime, datetime2 -> datetime
            // pure date -> date
            kind = clientType === 'date' ? 'date' : 'datetime';
          } else if (clientType.includes('int') || clientType.includes('numeric') || clientType.includes('decimal')) {
            kind = 'number';
          }

          // Treat *_id as FK if numeric
          if (firstClientCol.endsWith('_id') && kind === 'number') {
            kind = 'fk';
          }



          // Collect raw pieces from client row (case‑insensitive)
          const pieces = clientDef
            .filter((c: string | null | undefined) => !!c)
            .map(c => {
              const v = row[String(c).toLowerCase()];
              return v === undefined || v === null ? '' : String(v);
            });

          let rawValue: any = null;

          // 1) Date columns
          // if (kind === 'date' || serverName.includes('dob') || serverName.includes('date')) {
          //   const joined = pieces.join(' ').trim();
          //   rawValue = this.cleanDate(joined); // returns 'YYYY-MM-DD' or null
          //   return rawValue;
          // }
          // 2) Date / datetime columns
          if (kind === 'date' || kind === 'datetime' ||
            serverName.includes('dob') || serverName.includes('date')) {

            const joined = pieces.join(' ').trim();
            if (!joined) return null;

            if (kind === 'datetime') {
              const cleaned = this.cleanDateTime(joined);
              //console.log('DATETIME DEBUG', m.server, 'raw=', joined, 'cleaned=', cleaned);
              return cleaned;
            }

            return this.cleanDate(joined);
          }



          // 2) Numeric / FK columns (IDs, codes)
          if (kind === 'number' || kind === 'fk' || serverName.endsWith('_id')) {
            const firstNum = pieces
              .map(p => p.trim())
              .filter(p => p !== '')
              .map(p => Number(p))
              .find(n => !Number.isNaN(n));

            // If no numeric value found, return null (DB column should allow NULL)
            return firstNum ?? null;
          }

          // 3) Text / merged columns (fullname, address, etc.)
          rawValue = pieces
            .map(p => transliterate(p))
            .map(p => p.trim())
            .filter(p => p !== '')
            .join(' ');

          return rawValue;
        });

        const placeholders = values.map((_, i) => `$${i + 1}`).join(',');

        // Build UPSERT: INSERT ... ON CONFLICT (pkColumn) DO UPDATE
        const colsArray = mappings.map((m: any) => String(m.server)); // e.g. ['customer_id','gender',...]
        const pk = pkColumn; // dynamic PK from Postgres

        // const updateAssignments = colsArray
        //   .filter(col => col !== pk)
        //   .map(col => `"${col}" = EXCLUDED."${col}"`)
        //   .join(', ');

        // const sql = `
        //   INSERT INTO "${serverTable}" (${serverCols})
        //   VALUES (${placeholders})
        //   ON CONFLICT ("${pk}")
        //   DO UPDATE SET ${updateAssignments};
        // `;

        // await qr.query(sql, values);
        const updateAssignments = colsArray
          .filter(col => col !== pk)
          .map(col => `"${col}" = EXCLUDED."${col}"`)
          .join(', ');

        let sql: string;

        if (!updateAssignments) {
          // Only PK is mapped → just insert; ignore duplicates
          sql = `
    INSERT INTO "${serverTable}" (${serverCols})
    VALUES (${placeholders})
    ON CONFLICT ("${pk}") DO NOTHING;
  `;
        } else {
          // PK + other columns → full upsert
          sql = `
    INSERT INTO "${serverTable}" (${serverCols})
    VALUES (${placeholders})
    ON CONFLICT ("${pk}")
    DO UPDATE SET ${updateAssignments};
  `;
        }

        await qr.query(sql, values);

      }

      await qr.commitTransaction();

      return {
        success: true,
        inserted: clientRows.length,
        message: 'Data migrated successfully',
      };

    } catch (err: any) {
      await qr.rollbackTransaction();
      throw new InternalServerErrorException('Insert failed: ' + err.message);
    } finally {
      await qr.release();
    }
  }



  // =============================================================
  // PRIMARY COLUMNS   chages by poonam
  // =============================================================

  async getPrimaryKeys() {
    const db = this.ensureClient();
    return db.query(`
    SELECT t.name AS tableName, c.name AS primaryKey
    FROM sys.key_constraints kc
    JOIN sys.tables t ON kc.parent_object_id = t.object_id
    JOIN sys.index_columns ic 
      ON kc.parent_object_id = ic.object_id 
     AND kc.unique_index_id = ic.index_id
    JOIN sys.columns c 
      ON ic.object_id = c.object_id 
     AND ic.column_id = c.column_id
    WHERE kc.type = 'PK';
  `);
  }

  //DETECT FK CANDIDATES

  async getForeignKeyCandidates() {
    const db = this.ensureClient();

    // only numeric types we consider for FK detection
    const numericTypes = ["int", "bigint", "smallint", "tinyint"];

    const rows: any[] = await db.query(`
    SELECT 
      TABLE_SCHEMA, 
      TABLE_NAME, 
      COLUMN_NAME, 
      DATA_TYPE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE 
      (COLUMN_NAME LIKE '%[_]id' OR COLUMN_NAME LIKE '%Id' OR COLUMN_NAME LIKE 'id%')
      AND DATA_TYPE IN (${numericTypes.map(t => `'${t}'`).join(',')})
      AND TABLE_NAME NOT LIKE 'sys%' -- guard
  `);

    // Normalize to { tableName, columnName, schema }
    return rows.map(r => ({
      schema: r.TABLE_SCHEMA,
      tableName: r.TABLE_NAME,
      columnName: r.COLUMN_NAME,
      dataType: r.DATA_TYPE
    }));
  }

  //real forgin keys 


  async getRealForeignKeys() {
    const db = this.ensureClient();   // <-- THIS LINE IS REQUIRED

    return db.query(`
    SELECT  
        FK.name AS foreignKey,
        TP.name AS parentTable,
        CP.name AS parentColumn,
        TC.name AS childTable,
        CC.name AS childColumn
    FROM sys.foreign_keys FK
    JOIN sys.tables TP ON FK.referenced_object_id = TP.object_id
    JOIN sys.tables TC ON FK.parent_object_id = TC.object_id
    JOIN sys.foreign_key_columns FKC 
         ON FK.object_id = FKC.constraint_object_id
    JOIN sys.columns CP 
         ON FKC.referenced_object_id = CP.object_id 
        AND FKC.referenced_column_id = CP.column_id
    JOIN sys.columns CC 
         ON FKC.parent_object_id = CC.object_id 
        AND FKC.parent_column_id = CC.column_id
  `);
  }



  //COMPUTE RELATIONSHIPS CONFIDANCE SCORE

  async checkRelationship(childTable, childCol, parentTable, parentCol) {
    const db = this.ensureClient();

    const childType = await this.getColumnType(childTable, childCol);
    const parentType = await this.getColumnType(parentTable, parentCol);

    if (!childType || !parentType) return 0;

    const allowed = ["int", "bigint", "smallint", "tinyint"];
    if (!allowed.includes(childType) || childType !== parentType) return 0;

    const sql = `
    SELECT
      (SELECT COUNT(DISTINCT [${childCol}]) FROM [${childTable}]) AS childDistinct,
      (SELECT COUNT(DISTINCT c.[${childCol}])
       FROM [${childTable}] c
       JOIN [${parentTable}] p
         ON c.[${childCol}] = p.[${parentCol}]
      ) AS matches;
  `;

    const rows = await db.query(sql);
    const r = rows[0];

    if (!r.childDistinct) return 0;

    return (r.matches / r.childDistinct) * 100;
  }


  // =========================================================
  // BUILD FULL RELATIONSHIP MAP (MAIN FUNCTION)
  // =========================================================
  async generateRelationshipMap() {
    const pkList = await this.getPrimaryKeys();
    const fkCandidates = await this.getForeignKeyCandidates();

    const relationships: any[] = [];

    for (const fk of fkCandidates) {
      for (const pk of pkList) {
        try {
          if (fk.tableName === pk.tableName) continue;

          const confidence = await this.checkRelationship(
            fk.tableName,
            fk.columnName,
            pk.tableName,
            pk.primaryKey
          );

          if (confidence >= 70) {
            relationships.push({
              childTable: fk.tableName,
              childColumn: fk.columnName,
              parentTable: pk.tableName,
              parentColumn: pk.primaryKey,
              confidence: Number(confidence.toFixed(2)),
            });
          }

        } catch (err) {
          console.error(
            `ERROR checking relationship: ${fk.tableName}.${fk.columnName} -> ${pk.tableName}.${pk.primaryKey}`,
            err.message
          );
        }
      }
    }

    return relationships;
  }



  async getColumnType(table: string, column: string, schema = 'dbo') {
    const db = this.ensureClient();
    const sql = `
    SELECT LOWER(DATA_TYPE) AS DATA_TYPE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = @0 AND TABLE_NAME = @1 AND COLUMN_NAME = @2
  `;
    const res = await db.query(sql, [schema, table, column]);
    return res && res[0] ? res[0].DATA_TYPE : undefined;
  }





  async predictFastRelationships() {
    const db = this.ensureClient();

    // Get all PK names
    const pkList = await db.query(`
    SELECT 
        t.name AS tableName,
        c.name AS primaryKey
    FROM sys.key_constraints kc
    JOIN sys.tables t ON kc.parent_object_id = t.object_id
    JOIN sys.index_columns ic 
        ON kc.parent_object_id = ic.object_id 
       AND kc.unique_index_id = ic.index_id
    JOIN sys.columns c 
        ON ic.object_id = c.object_id 
       AND ic.column_id = c.column_id
    WHERE kc.type = 'PK';
  `);

    // Get all columns
    const allCols = await db.query(`
    SELECT 
        t.name AS tableName,
        c.name AS columnName
    FROM sys.columns c
    JOIN sys.tables t ON c.object_id = t.object_id;
  `);

    const relations: any[] = [];

    for (const pk of pkList) {
      for (const col of allCols) {
        if (col.tableName === pk.tableName) continue;

        // simple name-based match: e.g., Cust_id matches primary key Cust_id
        if (col.columnName.toLowerCase() === pk.primaryKey.toLowerCase()) {
          relations.push({
            parentTable: pk.tableName,
            parentColumn: pk.primaryKey,
            childTable: col.tableName,
            childColumn: col.columnName,
            matchType: "name-match"
          });
        }
      }
    }

    return relations;
  }



  async getRealForeignKeysFast() {
    const db = this.ensureClient();

    return db.query(`
    SELECT  
        FK.name AS foreignKey,
        PKT.name AS parentTable,
        PKC.name AS parentColumn,
        FKT.name AS childTable,
        FKC.name AS childColumn
    FROM sys.foreign_keys FK
    JOIN sys.tables FKT ON FK.parent_object_id = FKT.object_id
    JOIN sys.tables PKT ON FK.referenced_object_id = PKT.object_id
    JOIN sys.foreign_key_columns C 
         ON FK.object_id = C.constraint_object_id
    JOIN sys.columns FKC 
         ON C.parent_object_id = FKC.object_id 
        AND C.parent_column_id = FKC.column_id
    JOIN sys.columns PKC 
         ON C.referenced_object_id = PKC.object_id 
        AND C.referenced_column_id = PKC.column_id;
  `);
  }


  //=========================================================
  // BUILD FULL RELATIONSHIP MAP (MAIN FUNCTION) FAST
  // =========================================================


  async getVisualizationMap() {
    const db = this.ensureClient();

    // 1. Fetch PK list
    const primaryKeys = await this.getPrimaryKeys();

    // 2. Fetch real Foreign Keys
    const realFK = await this.getRealForeignKeysFast();

    // 3. Fetch all table + column metadata
    const allColumns = await db.query(`
    SELECT 
      t.name AS tableName,
      c.name AS columnName,
      ty.name AS dataType
    FROM sys.columns c
    JOIN sys.tables t ON c.object_id = t.object_id
    JOIN sys.types ty ON c.system_type_id = ty.system_type_id
    ORDER BY t.name, c.column_id;
  `);

    // 4. Convert into table → columns format
    const tableMap: any = {};

    for (const row of allColumns) {
      if (!tableMap[row.tableName]) {
        tableMap[row.tableName] = { name: row.tableName, columns: [] };
      }

      const isPK = primaryKeys.some(pk =>
        pk.tableName === row.tableName && pk.primaryKey === row.columnName
      );

      const isFK = realFK.some(fk =>
        fk.childTable === row.tableName && fk.childColumn === row.columnName
      );

      tableMap[row.tableName].columns.push({
        name: row.columnName,
        type: row.dataType,
        pk: isPK,
        fk: isFK
      });
    }

    // 5. Build relationship list
    const relationships = realFK.map(fk => ({
      parentTable: fk.parentTable,
      parentColumn: fk.parentColumn,
      childTable: fk.childTable,
      childColumn: fk.childColumn,
      type: "REAL_FK"
    }));

    // 6. Return final structure
    return {
      tables: Object.values(tableMap),
      relationships
    };
  }


  // =========================================================
  // Fetch TAble
  // =========================================================


  async getTableStructureWithKeys() {
    const db = this.ensureClient();

    // 1️⃣ Fetch all tables
    const tables = await db.query(`
    SELECT name AS tableName 
    FROM sys.tables 
    ORDER BY name;
  `);

    // 2️⃣ Fetch all columns + PK/FK flags
    const columns = await db.query(`
    SELECT 
        t.name AS tableName,
        c.name AS columnName,
        ty.name AS dataType,
        CASE WHEN kc.type = 'PK' THEN 1 ELSE 0 END AS isPK,
        CASE WHEN fk.parent_object_id IS NOT NULL THEN 1 ELSE 0 END AS isFK
    FROM sys.columns c
    JOIN sys.tables t ON c.object_id = t.object_id
    JOIN sys.types ty ON c.user_type_id = ty.user_type_id
    LEFT JOIN sys.index_columns ic 
        ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    LEFT JOIN sys.key_constraints kc 
        ON ic.index_id = kc.unique_index_id AND kc.parent_object_id = c.object_id
    LEFT JOIN sys.foreign_key_columns fk 
        ON fk.parent_object_id = c.object_id AND fk.parent_column_id = c.column_id
    ORDER BY t.name, c.column_id;
  `);

    // 3️⃣ Fetch FK relationships
    const relationships = await db.query(`
    SELECT  
      fk.name AS fkName,
      childTable.name AS fromTable,
      childColumn.name AS fromColumn,
      parentTable.name AS toTable,
      parentColumn.name AS toColumn
    FROM sys.foreign_keys fk
    JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
    JOIN sys.tables childTable ON fk.parent_object_id = childTable.object_id
    JOIN sys.columns childColumn ON fkc.parent_object_id = childColumn.object_id AND fkc.parent_column_id = childColumn.column_id
    JOIN sys.tables parentTable ON fk.referenced_object_id = parentTable.object_id
    JOIN sys.columns parentColumn ON fkc.referenced_object_id = parentColumn.object_id AND fkc.referenced_column_id = parentColumn.column_id;
  `);

    // 4️⃣ Combine into UI-friendly structure
    return {
      tables: tables.map((t: any) => ({
        name: t.tableName,
        columns: columns
          .filter((c: any) => c.tableName === t.tableName)
          .map((c: any) => ({
            name: c.columnName,
            type: c.dataType,
            pk: c.isPK === 1,
            fk: c.isFK === 1
          }))
      })),
      relationships: relationships.map((r: any) => ({
        fromTable: r.fromTable,
        fromColumn: r.fromColumn,
        toTable: r.toTable,
        toColumn: r.toColumn,
        type: "FK"
      }))
    };
  }




}



