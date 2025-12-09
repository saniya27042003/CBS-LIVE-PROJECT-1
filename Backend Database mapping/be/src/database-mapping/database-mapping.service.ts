/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {  DataSource } from 'typeorm';
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
  private cleanDate(value: any) {
    if (!value) return value;

    const str = String(value).trim();

    // Already in correct YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

    // Remove timezone parts
    const cleaned = str
      .replace(/\(.*?\)/g, "") // remove (India Standard Time)
      .replace(/GMT.*$/g, "")  // remove timezone
      .trim();

    // Try parsing
    const parsed = new Date(cleaned);

    if (!isNaN(parsed.getTime())) {
      // Format to YYYY-MM-DD
      return parsed.toISOString().split("T")[0];
    }

    return null; // invalid date becomes NULL
  }


  // =========================================================
  // INSERT / MIGRATION LOGIC (With Transliteration + Merge + Date Fix)
  // =========================================================
  async insertMappedData(body: any) {
    const { serverTable, clientTable, mappings } = body;

    const client = this.ensureClient();
    const server = this.ensureServer();

    // Build SELECT fields dynamically
    // const clientCols = mappings
    //   .map(m => (m.merge ? m.client.map(c => `"${c}"`).join(",") : `"${m.client}"`))
    //   .join(",");
    const clientCols = mappings
      .flatMap(m => {
        const clientDef = Array.isArray(m.client) ? m.client : [m.client];
        return clientDef.filter((c: string | null | undefined) => !!c);
      })
      .map(c => `"${c}"`)
      .join(",");

    const serverCols = mappings.map(m => `"${m.server}"`).join(",");

    const clientRows = await client.query(`SELECT ${clientCols} FROM "${clientTable}"`);

    if (!clientRows.length) {
      return { success: false, message: "Client table has no data" };
    }

    const qr = server.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      for (const row of clientRows) {

        // const values = mappings.map(m => {
        //   let rawValue = "";

        //   // MERGE logic
        //   if (m.merge) {
        //     rawValue = m.client
        //       .map(col => transliterate(String(row[col] ?? "")))
        //       .join(" ")
        //       .trim();
        //   } else {
        //     rawValue = transliterate(String(row[m.client] ?? ""));
        //   }

        //   // DATE FIX
        //   if (
        //     m.server.toLowerCase().includes("dob") ||
        //     m.server.toLowerCase().includes("date")
        //   ) {
        //     rawValue = this.cleanDate(rawValue);
        //   }

        //   return rawValue;
        // });

        const values = mappings.map(m => {
          const clientDef = Array.isArray(m.client) ? m.client : [m.client];

          // Collect all source pieces for this target column
          let rawValue = clientDef
            .filter(c => !!c)
            .map(col => transliterate(String(row[col] ?? "")))
            .join(" ")
            .trim();

          // DATE FIX (only for date-like server columns)
          const serverName = m.server.toLowerCase();
          if (serverName.includes("dob") || serverName.includes("date")) {
            rawValue = this.cleanDate(rawValue);
          }

          return rawValue;
        });


        const placeholders = values.map((_, i) => `$${i + 1}`).join(",");

        await qr.query(
          `INSERT INTO "${serverTable}" (${serverCols}) VALUES (${placeholders})`,
          values
        );
      }

      await qr.commitTransaction();

      return {
        success: true,
        inserted: clientRows.length,
        message: "Data migrated successfully"
      };

    } catch (err: any) {
      await qr.rollbackTransaction();
      throw new InternalServerErrorException("Insert failed: " + err.message);
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
  const numericTypes = ["int","bigint","smallint","tinyint"];

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



