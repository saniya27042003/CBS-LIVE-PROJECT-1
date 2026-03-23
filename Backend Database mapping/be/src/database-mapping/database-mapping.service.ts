/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IDMASTER } from '../entity/customer-id.entity';
import { CUSTOMERADDRESS } from '../entity/customer-address.entity';
import { OCCUPATIONMASTER } from '../entity/occupation-master.entity';
import { CASTMASTER } from '../entity/cast-master.entity';
import { RISKCATEGORYMASTER } from '../entity/risk-category.entity';
import  moment from 'moment';
import {unidev} from 'unidev';
import { ManualSymbolMapper } from '../legacy-font/manual-symbol-maps';
import Sanscript from '@indic-transliteration/sanscript';
import { DataSource } from 'typeorm';
import { QueryRunner } from 'typeorm';
import { CATEGORYMASTER } from '../entity/category-master.entity';
// import * as oracledb from 'oracledb';
// import { LNMASTER } from '../entity/term-loan-master.entity';
// import { SECURITYDETAILS } from '../entity/security.entity';
// import { GUARANTERDETAILS } from '../entity/guarantor.entity';
// import { COBORROWER } from '../entity/coborrower.entity';
// import { LNACINTRATE } from '../entity/lnacintrate.entity';

@Injectable()
export class DatabaseMappingService {
  [x: string]: any;
  private readonly logger = new Logger(DatabaseMappingService.name);

    private clientConn!: {
      execute: (
        query: string,
        params?: any[]
      ) => Promise<{
        rows: any[];
        metaData: { name: string }[];
      }>;
    };

    private serverDB!: DataSource;

  constructor(private readonly dbService: DatabaseService) {}

  // store connections after controller call
    async connectServer(config: any) {
      this.serverDB = await this.dbService.getServerDataSource(config);
      return { success: true };
    }

    async connectClient(config: any) {
      this.clientConn = await this.dbService.getClientConnection(config);
      return { success: true };
    }

  
  private resolveAnusvara(iast: string): string {
    return iast
      .replace(/ṃ(?=[pbm])/g, 'm').replace(/ṃ(?=[kg])/g, 'n').replace(/ṃ(?=[tdn])/g, 'n')
      .replace(/ṃ(?=[cj])/g, 'n').replace(/ṃ(?=[ṭḍṇ])/g, 'n').replace(/ṃ/g, 'm');
  }

  private safe(value: any): any {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  return value;
}

  private transformValue(raw: any): any {
  if (raw === null || raw === undefined || raw === '') return null;

  const strRaw = String(raw);

  // 1. Detect mojibake / legacy corruption
  const looksCorrupted =
    /�|Ã|Â|¤|§|ª|©/.test(strRaw) ||
    /[A-Za-z]�[A-Za-z]/.test(strRaw);

  if (!looksCorrupted && /^[\x20-\x7E\s]*$/.test(strRaw)) {
    return strRaw; // safe English
  }

  // 2. PURE Unicode Devanagari → leave untouched
  const isPureUnicodeDevanagari =
    /[\u0900-\u097F]/.test(strRaw) &&
    !/[A-Za-z]/.test(strRaw);

  if (isPureUnicodeDevanagari) return strRaw;

  // 3. Legacy font detection
  const looksLegacy = /[^\u0900-\u097F]/.test(strRaw);
  if (!looksLegacy) return strRaw;

  try {
    const unidevFn = unidev as unknown as (a: string, b: string, c: string) => string;
    let marathi = unidevFn(strRaw, 'hindi', 'DVBW-TTYogeshEn');
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

  // ---------------- IDMASTER MIGRATION ----------------
  async migrateIDMASTER() {

  if (!this.clientConn) throw new Error('Client DB not connected');
  if (!this.serverDB) throw new Error('Server DB not connected');

  const queryRunner = this.serverDB.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
   
    const occupationData = await queryRunner.manager.find(OCCUPATIONMASTER);
    const castData = await queryRunner.manager.find(CASTMASTER);
    const riskData = await queryRunner.manager.find(RISKCATEGORYMASTER);

    const result = await this.clientConn.execute(`
  SELECT IDMASTER.*, 
         OCCUPATIONMASTER.CODE AS OCCUPATION,
         CASTMASTER.CODE AS CASTMASTER,
         RISKCATEGORYMASTER.CODE AS RISKCATEGORYMASTER
  FROM IDMASTER
  LEFT JOIN OCCUPATIONMASTER 
    ON IDMASTER.AC_OCODE = OCCUPATIONMASTER.CODE
  LEFT JOIN CASTMASTER 
    ON IDMASTER.AC_CAST = CASTMASTER.CODE
  LEFT JOIN RISKCATEGORYMASTER 
    ON IDMASTER.AC_RISKCATG = RISKCATEGORYMASTER.CODE
  ORDER BY IDMASTER.AC_NO
`);

    const rows = this.convertOracleRows(result as {
      rows: any[];
      metaData: { name: string }[]; 
    });

    const branch = await queryRunner.manager.query(

      `SELECT id FROM ownbranchmaster WHERE "CODE" = 101`
    );

    const branchId = branch[0]?.id;

    if (!branchId) {
      throw new Error('Branch not found in ownbranchmaster');
    }

    for (const ele of rows) {

      const newObj = new IDMASTER();

      const namearr = String(ele.AC_NAME || '').trim().split(/\s+/);

      newObj.AC_NO = ele.AC_NO;
      newObj.AC_TITLE = this.transformValue(ele.AC_TITLE);
      newObj.AC_NAME = this.transformValue(ele.AC_NAME);
      newObj['L_NAME'] = this.transformValue(namearr[0] || null);
      newObj['F_NAME'] = this.transformValue(namearr[1] || null);
      newObj['M_NAME'] = this.transformValue(namearr[2] || null);
      newObj['AC_ADHARNO'] = ele.AC_ADHARNO;
      newObj['AC_BIRTH_DT'] = ele.AC_BIRTH_DT
        ? moment(ele.AC_BIRTH_DT as unknown as Date).format('DD/MM/YYYY')
        : null;

      newObj['AC_PANNO'] = ele.AC_PANNO;
      newObj['AC_MOBILENO'] = ele.AC_MOBILENO;
      newObj['AC_PHONE_RES'] = ele.AC_PHONE_RES;
      newObj['AC_PHONE_OFFICE'] = ele.AC_PHONE_OFFICE;
      newObj['AC_EMAILID'] = ele.AC_EMAIL;
      newObj['TDSDOCUMNET'] = '0';
      newObj['TDS_REQUIRED'] = ele.TDS_REQUIRED ? '1' : '0';
      newObj['SMS_REQUIRED'] = ele.SMS_REQUIRED ? '1' : '0';
      newObj['IS_KYC_RECEIVED'] = ele.IS_KYC_RECEIVED ? '1' : '0';
      
      const occ = occupationData.find(x => x.CODE == ele.OCCUPATION);
      newObj['AC_OCODE'] = occ ? occ.id : null;

      const cast = castData.find(x => x.CODE == ele.CASTMASTER);
      newObj['AC_CAST'] = cast ? cast.id : null;

      const risk = riskData.find(x => x.CODE == ele.RISKCATEGORYMASTER);
      newObj['AC_RISKCATG'] = risk ? risk.id : null;
      newObj['ORA_AC_NO'] = ele.AC_NO;
      newObj['ORA_BRANCH'] = ele.AC_BRANCH;   // change if dynamic
      newObj['BRANCH_CODE'] = branchId;

      const saved = await queryRunner.manager.save(IDMASTER, newObj);

   const address = new CUSTOMERADDRESS();

      address['idmasterID'] = saved.id;

      address['AC_GALLI'] = this.safe(ele.AC_ADDR1);  
      address['AC_AREA']  = this.safe(ele.AC_ADDR2);  
      address['AC_ADDR']  = this.safe(ele.AC_ADDR3);  

      address['AC_PIN'] = ele.AC_PIN || null;
      address['AC_ADDFLAG'] = true;
      address['AC_ADDTYPE'] = 'P';
      address['AC_PIN'] = ele.AC_PIN || null;
      address['AC_ADDFLAG'] = true;
      address['AC_ADDTYPE'] = 'P';

      await queryRunner.manager.save(CUSTOMERADDRESS, address);
    }

    await queryRunner.commitTransaction();
    this.logger.log('IDMASTER migration completed');

    return { success: true };

  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
  // helper
  private convertOracleRows(result: {
  rows: any[];
  metaData: { name: string }[];
}) {
  return result.rows.map((row: any[]) => {
    const obj: Record<string, any> = {};
    result.metaData.forEach((m, i) => {
      obj[m.name] = row[i];
    });
    return obj;
  });
}


private generateBankAcNo(
  bankCode: number,
  branchCode: number,
  schemeCode: number,
  acNo: number
): string {

  const bank = String(bankCode).padStart(3, '0');
  const branch = String(branchCode).padStart(3, '0');
  const scheme = String(schemeCode).padStart(3, '0');
  const account = String(acNo).padStart(6, '0');

  return `${bank}${branch}${scheme}${account}`;
}

//---------------------DPMASTER MIGRATION---------------------


// async migrateDPMASTER() {

//   if (!this.clientConn) throw new Error('Client DB not connected');
//   if (!this.serverDB) throw new Error('Server DB not connected');

//   const queryRunner = this.serverDB.createQueryRunner();
//   await queryRunner.connect();
//   await queryRunner.startTransaction();

//   try {

//     /* ---------------- LOAD IDMASTER ---------------- */

//     const idmasterData = await queryRunner.manager.find(IDMASTER);

//     const idMasterMap = new Map(
//       idmasterData.map(x => [x.ORA_AC_NO, x])
//     );

//     /* ---------------- LOAD SCHEMAS ---------------- */

//     type SchemaType = {
//       id: number;
//       S_APPL: number;
//     };

//     const schemaData: SchemaType[] = await queryRunner.manager.query(
//       `SELECT id,"S_APPL" FROM schemast`
//     );

//     const schemaMap = new Map<number, SchemaType>(
//       schemaData.map(x => [Number(x.S_APPL), x])
//     );

//     /* ---------------- SYS PARAMETERS ---------------- */

//     const syspara = await queryRunner.manager.query(
//       `SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`
//     );

//     const bankCode = syspara[0].BANK_CODE;
//     const branchCode = syspara[0].BRANCH_CODE;

//     const branch = await queryRunner.manager.query(
//       `SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode}`
//     );

//     const branchId = branch[0].id;

//     /* ---------------- LOAD DPMASTER ---------------- */

//     const result = await this.clientConn.execute(`
//       SELECT *
//       FROM DPMASTER
//       ORDER BY AC_NO
//     `);

//     const rows = this.convertOracleRows(result as {
//       rows: any[];
//       metaData: { name: string }[];
//     });

//     for (const ele of rows) {

//       /* ---------------- SCHEMA ---------------- */
//       if (!ele.AC_TYPE) {
//         this.logger.warn(`Schema not found for AC_TYPE: ${ele.AC_TYPE}`);
//         continue;
//       }

//       /* convert 20100 -> 201 */
//       let schemaCode = Number(ele.AC_TYPE);

//       if (schemaCode > 999) {
//         schemaCode = Math.floor(schemaCode / 100);
//       }

//       const schema = schemaMap.get(schemaCode);

//       if (!schema) {
//         this.logger.warn(`Schema not found for AC_TYPE: ${schemaCode}`);
//         continue;
//       }
                  
//       /* ---------------- BANKACNO ---------------- */

//       const schemeCode = schema.S_APPL;

//       const BANKACNO = this.generateBankAcNo(
//         bankCode,
//         branchCode,
//         schemeCode,
//         ele.AC_NO
//       );

//       const acno = 100000 + Number(ele.AC_NO);

//       /* ---------------- CUSTOMER ---------------- */

//       const idmaster = idMasterMap.get(ele.AC_CUSTID);

//       if (!idmaster) {
//         this.logger.warn(`Customer not found in IDMASTER: ${ele.AC_CUSTID}`);
//         continue;
//       }

//       const newObj: any = {};

//       newObj.AC_NO = acno;
//       newObj.BANKACNO = BANKACNO;
//       newObj.AC_TYPE = schema.id;
//       newObj.AC_ACNOTYPE = schema.S_APPL;

//       newObj.AC_CUSTID = idmaster.id;
//       newObj.idmasterID = idmaster.id;

//       newObj.AC_NAME = idmaster?.AC_NAME ?? ele.AC_NAME;
//       newObj.ORA_AC_NAME = ele.AC_NAME;

//       newObj.AC_OPDATE = ele.AC_OPDATE
//         ? moment(ele.AC_OPDATE).format('DD/MM/YYYY')
//         : null;

//       newObj.AC_INTRATE = ele.AC_INTRATE ?? 0;
//       newObj.AC_SCHMAMT = ele.AC_SCHMAMT ?? 0;
//       newObj.AC_MATUAMT = ele.AC_MATUAMT ?? 0;

//       newObj.ORA_CUSTID = ele.AC_CUSTID;
//       newObj.BRANCH_CODE = branchId;
//       newObj.OID = ele.AC_NO;

//       const saved = await queryRunner.manager.insert('dpmaster', newObj);

//       const dpmasterId = saved.identifiers[0].id;

//       /* ---------------- CHILD TABLES ---------------- */
      

//       await this.migrateNominee(ele, dpmasterId, BANKACNO, branchId, queryRunner);
//       await this.migrateAttorney(ele, dpmasterId, branchId, queryRunner);
//       await this.migrateJoint(ele, dpmasterId, BANKACNO, branchId, queryRunner);

//     }
  
//     await queryRunner.commitTransaction();

//     this.logger.log('DPMASTER migration completed');

//     return { success: true };

//   } catch (err) {

//     await queryRunner.rollbackTransaction();
//     throw err;

//   } finally {

//     await queryRunner.release();

//   }

// }


//=================================DPMASTER TABLE INSERTION =============================================

async migrateDPMASTER() {
  if (!this.clientConn) throw new Error('Client DB not connected');
  if (!this.serverDB) throw new Error('Server DB not connected');

  this.logger.log('Pre-fetching child data from Oracle...');

  // 1. Fetch lookup data upfront to avoid N+1 queries
  const [nomRows, attRows, jntRows] = await Promise.all([
    this.clientConn.execute(`SELECT * FROM NOMINEELINK`),
    this.clientConn.execute(`SELECT * FROM ATTERONEYLINK`),
    this.clientConn.execute(`SELECT * FROM JOINTACLINK`)
  ]);

  const nomineeMap = this.groupByRelation(this.convertOracleRows(nomRows as any));
  const attorneyMap = this.groupByRelation(this.convertOracleRows(attRows as any));
  const jointMap = this.groupByRelation(this.convertOracleRows(jntRows as any));

  // 2. Prepare Server Data Maps
  const idmasterData = await this.serverDB.manager.find(IDMASTER);
  const idMasterMap = new Map(idmasterData.map(x => [x.ORA_AC_NO, x]));

  const schemaData: any[] = await this.serverDB.manager.query(`SELECT id, "S_APPL" FROM schemast`);
  const schemaMap = new Map(schemaData.map(x => [Number(x.S_APPL), x]));
 // const validSchemaSet = new Set(schemaData.map(s => Number(s.S_APPL)));

  const syspara = await this.serverDB.manager.query(`SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`);
  const { BANK_CODE: bankCode, BRANCH_CODE: branchCode } = syspara[0];

  const branch = await this.serverDB.manager.query(`SELECT id FROM ownbranchmaster WHERE "CODE"=$1`, [branchCode]);
  const branchId = branch[0]?.id;

  // 3. Fetch Main Data
  const result = await this.clientConn.execute(`SELECT * FROM DPMASTER ORDER BY AC_NO`);
  const rows = this.convertOracleRows(result);
  this.logger.log(`Total Oracle Rows: ${rows.length}`);

  let inserted = 0;
  let failed = 0;

  for (const ele of rows) {
    // Start a fresh transaction per record so one failure doesn't stop the whole migration
    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (!ele.AC_TYPE) throw new Error('Missing AC_TYPE');

      /* ================= STRICT SCHEMA LOGIC ================= */

      const rawType = String(ele.AC_TYPE).match(/\d+/g)?.join('') || '';
      let schemaCode = Number(rawType);

      if (schemaCode > 999) {
        schemaCode = Math.floor(schemaCode / 100);
      }

      // 1. Try to find the real schema
      let schema = schemaMap.get(schemaCode);

      // 2. IF MISSING (207, 213, etc.), assign the ID of a valid record (e.g., 201)
      if (!schema) {
        this.logger.warn(`AC_NO ${ele.AC_NO}: Schema ${schemaCode} missing. Mapping to existing ID for migration.`);
        
        // Use code 201 as the structural fallback so the "NOT NULL" constraint is satisfied
        const fallbackSchema = schemaMap.get(201); 
        
        schema = {
          id: fallbackSchema ? fallbackSchema.id : 1, 
          S_APPL: schemaCode 
        };
      }
      /* ================= DATA MAPPING ================= */
      const BANKACNO = this.generateBankAcNo(bankCode, branchCode, schema.S_APPL, ele.AC_NO);
      const idmaster = idMasterMap.get(ele.AC_CUSTID);

      const newObj: any = {
        AC_NO: 100000 + Number(ele.AC_NO),
        BANKACNO: BANKACNO,
        AC_TYPE: schema.id,
        AC_ACNOTYPE: schema.S_APPL,
        AC_CUSTID: idmaster?.id || null,
        idmasterID: idmaster?.id || null,
        AC_NAME: idmaster?.AC_NAME ?? ele.AC_NAME,
        ORA_AC_NAME: ele.AC_NAME,
        AC_OPDATE: ele.AC_OPDATE ? moment(ele.AC_OPDATE).format('DD/MM/YYYY') : null,
        AC_INTRATE: ele.AC_INTRATE ?? 0,
        AC_SCHMAMT: ele.AC_SCHMAMT ?? 0,
        AC_MATUAMT: ele.AC_MATUAMT ?? 0,
        ORA_CUSTID: ele.AC_CUSTID,
        BRANCH_CODE: branchId,
        OID: ele.AC_NO
      };

      const saved = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('dpmaster')
        .values(newObj)
        .orIgnore() // Skips if OID/Primary Key already exists
        .execute();

      let dpmasterId: number;

      if (!saved.identifiers || saved.identifiers.length === 0) {
        const existing = await queryRunner.manager.query(
          `SELECT id FROM dpmaster WHERE "OID" = $1`, [ele.AC_NO]
        );
        dpmasterId = existing[0]?.id;
      } else {
        dpmasterId = saved.identifiers[0]?.id;
      }

      if (!dpmasterId) throw new Error('Could not resolve DPMASTER ID');

      /* ================= CHILD TABLES ================= */

      await this.migrateNominee(ele, dpmasterId, BANKACNO, branchId, queryRunner, nomineeMap);
      await this.migrateAttorney(ele, dpmasterId, branchId, queryRunner, attorneyMap);
      await this.migrateJoint(ele, dpmasterId, BANKACNO, branchId, queryRunner, jointMap);

      // COMMIT the individual record
      await queryRunner.commitTransaction();
      inserted++;

    } catch (rowErr: any) {
      // Rollback only this specific record's changes
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      failed++;
      this.logger.error(`FAILED ROW AC_NO ${ele.AC_NO}: ${rowErr.message}`);
    } finally {
      // Always release the runner to avoid connection leaks
      await queryRunner.release();
    }
  }

  this.logger.log(`Migration Finished. Inserted: ${inserted}, Failed: ${failed}`);
  return { success: true, inserted, failed };
}


// FIX 3: Robust key generation (Trimming and Uppercasing)
private groupByRelation(rows: any[]): Map<string, any[]> {
  const map = new Map<string, any[]>();
  for (const row of rows) {
    // Aggressively clean AC_NO and AC_TYPE
    const acNo = String(row.AC_NO || '').replace(/\0/g, '').trim();
    const acType = String(row.AC_TYPE || '').replace(/\0/g, '').trim();
    
    if (!acNo || !acType) continue;

    const key = `${acNo}_${acType}`;

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(row);
  }
  return map;
}

// private async migrateNominee(
//   ele: any,
//   dpmasterId: number,
//   BANKACNO: string,
//   branchId: number,
//   queryRunner: QueryRunner
// ) {

//  const result = await this.clientConn.execute(`
// SELECT 
//   nomineelink.AC_NNAME,
//   nomineelink.AC_NRELA,
//   nomineelink.AC_NDATE,
//   nomineelink.AGE,
//   nomineelink.addr1 AS AC_NADDR,
//   nomineelink.addr2 AS AC_NGALLI,
//   nomineelink.addr3 AS AC_NAREA,
//   nomineelink.pin AS AC_NPIN,
//   nomineelink.ctcode AS AC_CTCODE
// FROM nomineelink
// WHERE nomineelink.ac_acnotype = '${ele.AC_ACNOTYPE}'
//   AND ac_type = ${ele.AC_TYPE}
//   AND ac_no = ${ele.AC_NO}
// `);

//   const rows = this.convertOracleRows(result as {
//     rows: any[];
//     metaData: { name: string }[];
//   });

//   for (const element of rows) {

//     const nominee: any = {};

//     nominee.ORA_AC_NAME = element.AC_NNAME ?? null;
//     nominee.AC_NNAME = element.AC_NNAME ? element.AC_NNAME.replace("\x00", "") : null;
//     nominee.AC_NRELA = element.AC_NRELA ? element.AC_NRELA.replace("\x00", "") : null;

//     nominee.AC_NDATE = element.AC_NDATE
//       ? moment(element.AC_NDATE).format('DD/MM/YYYY')
//       : null;

//     nominee.AGE = element.AGE ?? null;

//     nominee.AC_NADDR = element.AC_NADDR ? element.AC_NADDR.replace("\x00", "") : null;
//     nominee.AC_NGALLI = element.AC_NGALLI ? element.AC_NGALLI.replace("\x00", "") : null;
//     nominee.AC_NAREA = element.AC_NAREA ? element.AC_NAREA.replace("\x00", "") : null;
//     nominee.AC_NPIN = element.AC_NPIN ?? null;

//     // relation fields
//     nominee.AC_TYPE = ele.AC_TYPE;
//     nominee.AC_NO = ele.AC_NO;

//     // safer branch code
//     nominee.BRANCH_CODE = branchId;

//     nominee.BANKACNO = BANKACNO;
//    // nominee.OID = element.ID;
//     nominee.DPMasterID = dpmasterId;

//     await queryRunner.manager.insert('nomineelink', nominee);
//   }
// }


// Example for migrateNominee (Apply the same logic to Attorney and Joint)
private async migrateNominee(
  ele: any, // The original row from DPMASTER
  dpmasterId: number,
  BANKACNO: string,
  branchId: number,
  queryRunner: QueryRunner,
  nomineeMap: Map<string, any[]>
) {
  // MUST match the key format in groupByRelation exactly
  const key = `${String(ele.AC_NO || '').trim()}_${String(ele.AC_TYPE || '').trim()}`;
  
  const rows = nomineeMap.get(key) || [];

  for (const element of rows) {
    const nominee: any = {
      ORA_AC_NAME: element.AC_NNAME ?? null,
      AC_NNAME: this.transformValue(element.AC_NNAME),
      AC_NRELA: this.transformValue(element.AC_NRELA),
      AC_NDATE: element.AC_NDATE ? moment(element.AC_NDATE).format('DD/MM/YYYY') : null,
      AGE: element.AGE ?? null,
      AC_NADDR: this.transformValue(element.AC_NADDR),
      AC_NGALLI: this.transformValue(element.AC_NGALLI),
      AC_NAREA: this.transformValue(element.AC_NAREA),
      AC_NPIN: element.AC_NPIN ?? null,
      AC_TYPE: ele.AC_TYPE,
      AC_NO: ele.AC_NO,
      BRANCH_CODE: branchId,
      BANKACNO: BANKACNO,
      DPMasterID: dpmasterId,
    };
    
    // Use insert to be faster
      await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('nomineelink')
      .values(nominee)
      .execute();
  }  
}

// private async migrateAttorney(
//   ele: any,
//   dpmasterId: number,
//   branchId: number,
//   queryRunner: QueryRunner
// ) {

//   const result = await this.clientConn.execute(`
//     SELECT
//       ATTERONEY_NAME,
//       DATE_APPOINTED,
//       DATE_EXPIRY,
//       ID
//     FROM ATTERONEYLINK
//     WHERE ac_acnotype = '${ele.AC_ACNOTYPE}'
//       AND ac_type = ${ele.AC_TYPE}
//       AND ac_no = ${ele.AC_NO}
//   `);

//   const rows = this.convertOracleRows(result as {
//     rows: any[];
//     metaData: { name: string }[];
//   });

//   for (const element of rows) {

//     const attorney: any = {};

//     attorney.ORA_AC_NAME = element.ATTERONEY_NAME ?? null;
//     attorney.ATTERONEY_NAME = element.ATTERONEY_NAME ?? null;

//     attorney.DATE_APPOINTED = element.DATE_APPOINTED
//       ? moment(element.DATE_APPOINTED).format('DD/MM/YYYY')
//       : null;

//     attorney.DATE_EXPIRY = element.DATE_EXPIRY
//       ? moment(element.DATE_EXPIRY).format('DD/MM/YYYY')
//       : null;

//     // relation fields
//     attorney.AC_TYPE = ele.AC_TYPE;
//     attorney.AC_NO = ele.AC_NO;
//     attorney.BRANCH_CODE = branchId;

//     attorney.OID = element.ID;
//     attorney.DPMasterID = dpmasterId;

//     await queryRunner.manager.insert('atteroneylink', attorney);
//   }
// }

private async migrateAttorney(
  ele: any,
  dpmasterId: number,
  branchId: number,
  queryRunner: QueryRunner,
  attorneyMap: Map<string, any[]> // Added Map parameter
) {
  const key = `${String(ele.AC_NO).trim()}_${String(ele.AC_TYPE).trim()}`;

  const rows = attorneyMap.get(key) || []; 

  for (const element of rows) {
    const attorney: any = {
      ORA_AC_NAME: element.ATTERONEY_NAME ?? null,
      ATTERONEY_NAME: this.transformValue(element.ATTERONEY_NAME),
      DATE_APPOINTED: element.DATE_APPOINTED ? moment(element.DATE_APPOINTED).format('DD/MM/YYYY') : null,
      DATE_EXPIRY: element.DATE_EXPIRY ? moment(element.DATE_EXPIRY).format('DD/MM/YYYY') : null,
      AC_TYPE: ele.AC_TYPE,
      AC_NO: ele.AC_NO,
      BRANCH_CODE: String(branchId),
      DPMasterID: dpmasterId,
    };
    await queryRunner.manager.insert('atteroneylink', attorney);
  }
}

private async migrateJoint(
  ele: any,
  dpmasterId: number,
  BANKACNO: string,
  branchId: number,
  queryRunner: QueryRunner,
  jointMap: Map<string, any[]>
) {
  // Normalize lookup key to match the Map keys
  const key = `${String(ele.AC_NO).trim()}_${String(ele.AC_TYPE).trim()}`;
  const rows = jointMap.get(key) || [];

  for (const element of rows) {
    const joint: any = {
      ORA_AC_NAME: element.JOINT_ACNAME ?? null,
      JOINT_ACNAME: this.transformValue(element.JOINT_ACNAME),
      // Use JOINT_AC_CUSTID as identified in your Oracle schema
      JOINT_AC_CUSTID: element.JOINT_AC_CUSTID ?? element.AC_CUSTID ?? 0, 
      OPERATOR: element.OPERATOR === 0 ? 'No' : 'Yes',
      BANKACNO: BANKACNO,
      AC_TYPE: ele.AC_TYPE,
      AC_NO: ele.AC_NO,
      BRANCH_CODE: String(branchId),
      DPMasterID: dpmasterId,
    };
    await queryRunner.manager.insert('joint_ac_link', joint);
  }
}

//--------------------------------LNMASTER LOGIC---------------------------------------------------

// async migrateLNMASTER() {

//   if (!this.clientConn) throw new Error('Client DB not connected');
//   if (!this.serverDB) throw new Error('Server DB not connected');

//   const queryRunner = this.serverDB.createQueryRunner();
//   await queryRunner.connect();

//   try {

//     /* ---------------- LOAD IDMASTER ---------------- */

//     const idmasterData = await queryRunner.manager.find(IDMASTER);

//     const idMasterMap = new Map(
//       idmasterData.map(x => [x.ORA_AC_NO, x])
//     );


//     /* ---------------- LOAD SCHEMA ---------------- */

//         type SchemaType = {
//       id: number;
//       S_APPL: number;
//     };

//     const schemaData: SchemaType[] = await queryRunner.manager.query(
//       `SELECT id,"S_APPL" FROM schemast`
//     );

//     const schemaMap = new Map<number, SchemaType>(
//       schemaData.map(x => [Number(x.S_APPL), x])
//     );

//     /* ---------------- SYS PARAMETERS ---------------- */

//     const syspara = await queryRunner.manager.query(
//       `SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`
//     );

//     const bankCode = syspara[0].BANK_CODE;
//     const branchCode = syspara[0].BRANCH_CODE;

//     const branch = await queryRunner.manager.query(
//       `SELECT id FROM ownbranchmaster WHERE "CODE"=${branchCode}`
//     );

//     const branchId = branch[0].id;


//     /* ---------------- LOAD LNMASTER FROM ORACLE ---------------- */

//     const result = await this.clientConn.execute(`
//       SELECT *
//       FROM LNMASTER
//       ORDER BY AC_NO
//     `);

//     const rows = this.convertOracleRows(result as {
//       rows: any[];
//       metaData: { name: string }[];
//     });


//     const batchSize = 500;

//     for (let i = 0; i < rows.length; i += batchSize) {

//       const batch = rows.slice(i, i + batchSize);

//       await queryRunner.startTransaction();

//       try {

//         for (const ele of batch) {

//           /* ---------------- SCHEMA ---------------- */

//           if (!ele.AC_TYPE) continue;

//           let schemaCode = Number(ele.AC_TYPE);

//           if (schemaCode > 999) {
//             schemaCode = Math.floor(schemaCode / 100);
//           }

//           const schema = schemaMap.get(schemaCode);

//           if (!schema) {
//             this.logger.warn(`Schema not found for ${ele.AC_TYPE}`);
//             continue;
//           }


//           /* ---------------- ACCOUNT NUMBER ---------------- */

//           const schemeCode = schema.S_APPL;

//           const BANKACNO = this.generateBankAcNo(
//             bankCode,
//             branchCode,
//             schemeCode,
//             ele.AC_NO
//           );

//           const acno = 100000 + Number(ele.AC_NO);


//           /* ---------------- CUSTOMER ---------------- */

//           const idmaster = idMasterMap.get(ele.AC_CUSTID);

//           if (!idmaster) {
//             this.logger.warn(`Customer not found: ${ele.AC_CUSTID}`);
//             continue;
//           }


//           /* ---------------- LNMASTER OBJECT ---------------- */

//           const newObj: any = {};

//           newObj.AC_NO = acno;
//           newObj.AC_ACNOTYPE = ele.AC_ACNOTYPE;
//           newObj.AC_TYPE = schema.id;

//           newObj.BANKACNO = BANKACNO;

//           newObj.AC_CUSTID = idmaster.id;
//           newObj.idmasterID = idmaster.id;

//           newObj.AC_NAME = idmaster?.AC_NAME ?? ele.AC_NAME;
//           newObj.ORA_AC_NAME = ele.AC_NAME;

//           newObj.ORA_CUSTID = ele.AC_CUSTID;

//           newObj.AC_OPDATE = ele.AC_OPDATE
//             ? moment(ele.AC_OPDATE).format('DD/MM/YYYY')
//             : null;

//           newObj.AC_OPEN_OLD_DATE = ele.AC_OPEN_OLD_DATE
//             ? moment(ele.AC_OPEN_OLD_DATE).format('DD/MM/YYYY')
//             : null;

//           newObj.AC_SANCTION_DATE = ele.AC_SANCTION_DATE
//             ? moment(ele.AC_SANCTION_DATE).format('DD/MM/YYYY')
//             : null;

//           newObj.AC_EXPIRE_DATE = ele.AC_EXPIRE_DATE
//             ? moment(ele.AC_EXPIRE_DATE).format('DD/MM/YYYY')
//             : null;

//           newObj.AC_INTRATE = ele.AC_INTRATE ?? 0;

//           newObj.AC_SANCTION_AMOUNT = ele.AC_SANCTION_AMOUNT ?? 0;

//           newObj.AC_DRAWPOWER_AMT = ele.AC_DRAWPOWER_AMT ?? 0;

//           newObj.AC_INSTALLMENT = ele.AC_INSTALLMENT ?? 0;

//           newObj.AC_ODAMT = ele.AC_ODAMT ?? 0;

//           newObj.AC_SODAMT = ele.AC_SODAMT ?? 0;

//           newObj.AC_OP_BAL = ele.AC_OP_BAL ?? 0;

//           newObj.AC_MONTHS = ele.AC_MONTHS ?? 0;

//           newObj.AC_ODDAYS = ele.AC_ODDAYS ?? 0;

//           newObj.AC_REPAYMODE = ele.AC_REPAYMODE;

//           newObj.INSTALLMENT_METHOD = ele.INSTALLMENT_METHOD;

//           newObj.AC_MORATORIUM_PERIOD = ele.AC_MORATORIUM_PERIOD;

//           newObj.AC_GRACE_PERIOD = ele.AC_GRACE_PERIOD;

//           newObj.AC_REMARK = ele.AC_REMARK;

//           newObj.AC_CLOSED = ele.AC_CLOSED === 0 ? 0 : 1;

//           newObj.IS_AGGRI_LOAN = ele.IS_AGGRI_LOAN === 0 ? 0 : 1;

//           newObj.IS_DORMANT = ele.IS_DORMANT === 0 ? false : true;

//           newObj.IS_WEAKER = ele.IS_WEAKER === 0 ? 0 : 1;

//           newObj.AC_IS_RECOVERY = ele.AC_IS_RECOVERY === 0 ? 0 : 1;

//           newObj.BRANCH_CODE = branchId;

//           newObj.OID = ele.ID;

//           newObj.SYSCHNG_LOGIN = ele.OFFICER_CODE;


//           /* ---------------- INSERT LNMASTER ---------------- */

//           const saved = await queryRunner.manager.insert('lnmaster', newObj);

//           const lnmasterId = saved.identifiers[0].id;


//           /* ---------------- CHILD TABLES ---------------- */

//           await this.migrateSecurity(ele, lnmasterId, BANKACNO, branchId, queryRunner);

//           await this.migrateGuarantor(ele, lnmasterId, BANKACNO, branchId, queryRunner);

//           await this.migrateCoborrower(ele, lnmasterId, BANKACNO, branchId, queryRunner);

//           await this.migrateInterest(ele, lnmasterId, BANKACNO, branchId, queryRunner);

//         }

//         await queryRunner.commitTransaction();

//         this.logger.log(`LNMASTER batch migrated up to ${i + batchSize}`);

//       } catch (err) {

//         await queryRunner.rollbackTransaction();

//         throw err;

//       }

//     }

//     this.logger.log('LNMASTER migration completed');

//     return { success: true };

//   } catch (err) {

//     throw err;

//   } finally {

//     await queryRunner.release();

//   }

// }



//-------------------------------------LNMASTER LOGIC ---------------------------------
async migrateLNMASTER() {
  if (!this.clientConn) throw new Error('Client DB not connected');
  if (!this.serverDB) throw new Error('Server DB not connected');

  const queryRunner = this.serverDB.createQueryRunner();
  await queryRunner.connect();

  try {
    /* 1. LOAD MAPPINGS */
    const idmasterData = await queryRunner.manager.find(IDMASTER);
    const idMasterMap = new Map(idmasterData.map(x => [x.ORA_AC_NO, x]));
    const fallbackId = idmasterData.length > 0 ? idmasterData[0].id : null;

    if (!fallbackId) {
      throw new Error('Cannot migrate LNMASTER: IDMASTER table is empty in Postgres!');
    }

    const schemaData: any[] = await queryRunner.manager.query(`SELECT id, "S_APPL" FROM schemast`);
    const schemaMap = new Map(schemaData.map(x => [Number(x.S_APPL), x]));

    const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
    const branch = await queryRunner.manager.query(
      `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0].BRANCH_CODE}`
    );
    const branchId = branch[0].id;

    /* 2. PRE-FETCH ORACLE DATA */
    const result = await this.clientConn.execute(`SELECT * FROM LNMASTER ORDER BY AC_NO`);
    const rows = this.convertOracleRows(result as any);

    this.logger.log('Pre-fetching LN child tables into memory...');
    const [secRes, guaRes, cobRes, intRes] = await Promise.all([
      this.clientConn.execute(`SELECT * FROM SECURITYDETAILS`),
      this.clientConn.execute(`SELECT * FROM GUARANTERDETAILS`),
      this.clientConn.execute(`SELECT * FROM COBORROWER`),
      this.clientConn.execute(`SELECT * FROM LNACINTRATE`)
    ]);

    const securityMap = this.groupByRelation(this.convertOracleRows(secRes as any));
    const guarantorMap = this.groupByRelation(this.convertOracleRows(guaRes as any));
    const coborrowerMap = this.groupByRelation(this.convertOracleRows(cobRes as any));
    const interestMap = this.groupByRelation(this.convertOracleRows(intRes as any));

    /* 3. BATCH PROCESSING */
    const batchSize = 500;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      await queryRunner.startTransaction();

      try {
        for (const ele of batch) {
  if (!ele.AC_TYPE) continue;

  let schemaCode = Number(ele.AC_TYPE);
  if (schemaCode > 999) schemaCode = Math.floor(schemaCode / 100);

  const schema = schemaMap.get(schemaCode);
  if (!schema) continue;

  const newAcNo = 100000 + Number(ele.AC_NO);
  const BANKACNO = this.generateBankAcNo(
    syspara[0].BANK_CODE,
    syspara[0].BRANCH_CODE,
    schema.S_APPL,
    newAcNo
  );

  const idmaster = idMasterMap.get(ele.AC_CUSTID);
  const finalCustId = idmaster ? idmaster.id : fallbackId;

  const newObj: any = {
    AC_NO: newAcNo,
    BANKACNO: BANKACNO,
    AC_TYPE: schema.id,
    AC_ACNOTYPE: schema.S_APPL,
    AC_CUSTID: finalCustId,
    idmasterID: finalCustId,
    AC_NAME: idmaster?.AC_NAME ?? this.transformValue(ele.AC_NAME),
    ORA_AC_NAME: ele.AC_NAME,
    AC_OPDATE: ele.AC_OPDATE ? moment(ele.AC_OPDATE).format('DD/MM/YYYY') : null,
    AC_SANCTION_AMOUNT: Number(ele.AC_SANCTION_AMOUNT) || 0,
    AC_INTRATE: Number(ele.AC_INTRATE) || 0,
    BRANCH_CODE: branchId,
    OID: ele.AC_NO,
    SYSCHNG_LOGIN: ele.OFFICER_CODE
  };

  const saved = await queryRunner.manager
    .createQueryBuilder()
    .insert()
    .into('lnmaster')
    .values(newObj)
    .orIgnore()
    .execute();

  const lnmasterId = saved.identifiers[0]?.id;

  if (lnmasterId) {
    // Correctly passing specific maps and IDs
    await this.migrateLNSecurity(ele, lnmasterId, BANKACNO, queryRunner, securityMap);
    await this.migrateLNGuarantors(ele, lnmasterId, BANKACNO, queryRunner, guarantorMap, idMasterMap);
    await this.migrateLNCoborrowers(ele, lnmasterId, BANKACNO, queryRunner, coborrowerMap, idMasterMap);
    await this.migrateLNInterestRates(ele, lnmasterId, BANKACNO, queryRunner, interestMap, branchId);
  } else {
    this.logger.warn(`Skipped children for ${BANKACNO}: Parent already exists.`);
  }
        }
        await queryRunner.commitTransaction();
        this.logger.log(`Processed batch up to ${i + batchSize}`);
      } catch (err) {

  if (queryRunner.isTransactionActive) {
    await queryRunner.rollbackTransaction();
  }

  this.logger.error(`Batch failed at index ${i}`, err);

  throw err;
}
    }
    this.logger.log('LNMASTER Migration completed successfully.');
  } 
 finally {
  if (!queryRunner.isReleased) {
    await queryRunner.release();
  }
}
}

// ----------------------------------- CHILD HELPERS -----------------------------------
// 1. SECURITY DETAILS (Key: lnmasterID)
private async migrateLNSecurity(ele: any, lnId: number, bankAcNo: string, queryRunner: QueryRunner, map: Map<string, any[]>) {
  const key = `${String(ele.AC_NO).trim()}_${String(ele.AC_TYPE).trim()}_${String(ele.AC_ACNOTYPE).trim().toUpperCase()}`;
  const rows = map.get(key) || [];

  for (const row of rows) {

    const migratedShortAcNo = Number(row.AC_NO);
    await queryRunner.manager.insert('securitydetails', {
      AC_ACNOTYPE: row.AC_ACNOTYPE,
      AC_TYPE: String(ele.AC_TYPE),
      AC_NO: migratedShortAcNo,
      SECURITY_CODE: row.SECURITY_CODE,
      SECURITY_VALUE: Number(row.SECURITY_VALUE) || 0,
      lnmasterID: lnId // Corrected to match Entity
    });
  }
}

// 2. GUARANTOR DETAILS (Key: lnmasterID)
private async migrateLNGuarantors(ele: any, lnId: number, bankAcNo: string, queryRunner: QueryRunner, map: Map<string, any[]>, idMap: Map<number, any>) {
  const key = `${String(ele.AC_NO).trim()}_${String(ele.AC_TYPE).trim()}_${String(ele.AC_ACNOTYPE).trim().toUpperCase()}`;
  const rows = map.get(key) || [];

  for (const row of rows) {
    const guarantor = idMap.get(row.AC_CUSTID);
    const AC_MEMBNO = row.MEMBER_NO ? Number(row.MEMBER_NO) + 100000 : null;
    const migratedShortAcNo = Number(row.AC_NO);

    await queryRunner.manager.insert('guaranterdetails', {
      AC_ACNOTYPE: row.AC_ACNOTYPE,
      AC_TYPE: String(ele.AC_TYPE),
      AC_NO: migratedShortAcNo,
      AC_NAME: guarantor?.AC_NAME ?? this.transformValue(row.NAME || row.AC_NAME),
      MEMBER_TYPE: row.MEMBER_TYPE,
      MEMBER_NO: AC_MEMBNO ? String(AC_MEMBNO) : null,
      EXP_DATE: row.EXP_DATE ? moment(row.EXP_DATE).format('DD/MM/YYYY') : null,
      GAC_CUSTID: guarantor ? String(guarantor.id) : "0",
      lnmasterID: lnId // Corrected to match Entity
    });
  }
}

// 3. CO-BORROWERS (Key: LNMASTER_ID - as per your previous snippet)
private async migrateLNCoborrowers(ele: any, lnId: number, bankAcNo: string, queryRunner: QueryRunner, map: Map<string, any[]>, idMap: Map<number, any>) {
  const key = `${String(ele.AC_NO).trim()}_${String(ele.AC_TYPE).trim()}_${String(ele.AC_ACNOTYPE).trim().toUpperCase()}`;
  const rows = map.get(key) || [];

  for (const row of rows) {
    const coborrower = idMap.get(row.AC_CUSTID);
    const migratedShortAcNo = Number(row.AC_NO);

    await queryRunner.manager.insert('coborrower', {
      AC_ACNOTYPE: row.AC_ACNOTYPE,
      AC_NO: migratedShortAcNo,
      AC_TYPE: String(ele.AC_TYPE),
      AC_NAME: coborrower?.AC_NAME ?? this.transformValue(row.NAME || row.AC_NAME),
      CAC_CUSTID: coborrower ? String(coborrower.id) : "0",
      lnmasterID: lnId // Corrected to match your previous entity snippet
    });
  }
}

// 4. INTEREST RATES (Key: LNMASTERID)
private async migrateLNInterestRates(ele: any, lnId: number, bankAcNo: string, queryRunner: QueryRunner, map: Map<string, any[]>, branchId: number) {
  const key = `${String(ele.AC_NO).trim()}_${String(ele.AC_TYPE).trim()}_${String(ele.AC_ACNOTYPE).trim().toUpperCase()}`;
  const rows = map.get(key) || [];

  for (const row of rows) {
    const migratedShortAcNo = Number(row.AC_NO);

    await queryRunner.manager.insert('lnacintrate', {
      AC_ACNOTYPE: row.AC_ACNOTYPE,
      EFFECT_DATE: row.EFFECT_DATE ? moment(row.EFFECT_DATE).format('DD/MM/YYYY') : null,
      AC_NO: migratedShortAcNo,
      BANKACNO: bankAcNo,
      SERIAL_NO: row.SERIAL_NO,
      INT_RATE: Number(row.INT_RATE) || 0,
      PENAL_INT_RATE: Number(row.PENAL_INT_RATE) || 0,
      BRANCH_CODE: branchId,
      UPDATEFLAG: 1,
      lnmasterID: lnId // Corrected to match Entity (Uppercase)
    });
  }
}



//------------------------------------PGMASTER--------------------------------------
async migratePGMASTER() {

  if (!this.clientConn) throw new Error('Client DB not connected');
  if (!this.serverDB) throw new Error('Server DB not connected');

  const queryRunner = this.serverDB.createQueryRunner();
  await queryRunner.connect();

  let inserted = 0;
  let failed = 0;

  try {

    /* ---------- LOAD IDMASTER ---------- */

    const idmasterData = await queryRunner.manager.find(IDMASTER);

    const idMasterMap = new Map(
      idmasterData.map(x => [x.ORA_AC_NO, x])
    );

    const fallbackId = idmasterData.length > 0 ? idmasterData[0].id : 1;

    /* ---------- LOAD SCHEMA ---------- */

    const schemaData: any[] = await queryRunner.manager.query(
      `SELECT id,"S_APPL" FROM schemast`
    );

    const schemaMap = new Map(
      schemaData.map(x => [Number(x.S_APPL), x])
    );

    /* ---------- SYS PARAMETERS ---------- */

    const syspara = await queryRunner.manager.query(
      `SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`
    );

    const bankCode = syspara[0].BANK_CODE;
    const branchCode = syspara[0].BRANCH_CODE;

    const branch = await queryRunner.manager.query(
      `SELECT id FROM ownbranchmaster WHERE "CODE"=${branchCode}`
    );

    const branchId = branch[0].id;

    /* ---------- LOAD ORACLE DATA ---------- */

    const result = await this.clientConn.execute(`
      SELECT *
      FROM PGMASTER
      ORDER BY AC_NO
    `);

    const rows = this.convertOracleRows(result as {
      rows: any[];
      metaData: { name: string }[];
    });

    /* ---------- PROCESS ROWS ---------- */

    for (const ele of rows) {

      try {

        if (!ele.AC_TYPE) continue;

        let schemaCode = Number(ele.AC_TYPE);

        if (schemaCode > 999) {
          schemaCode = Math.floor(schemaCode / 100);
        }

        let schema = schemaMap.get(schemaCode);

        if (!schema) {
          this.logger.warn(`Schema missing for AC_TYPE ${ele.AC_TYPE}`);
          schema = schemaData[0];
        }

        const acno = 100000 + Number(ele.AC_NO);

        const BANKACNO = this.generateBankAcNo(
          bankCode,
          branchCode,
          schema.S_APPL,
          acno
        );

        const idmaster = idMasterMap.get(ele.AC_CUSTID);

        const finalCustId = idmaster ? idmaster.id : fallbackId;

        const newObj: any = {

          AC_NO: acno,
          BANKACNO: BANKACNO,

          AC_TYPE: schema.id,
          AC_ACNOTYPE: schema.S_APPL,

          AC_CUSTID: finalCustId,
          idmasterID: finalCustId,

          AC_NAME: idmaster?.AC_NAME ?? this.transformValue(ele.AC_NAME),

          AC_SHORT_NAME: this.transformValue(ele.AC_SHORT_NAME),

          AC_OPDATE: ele.AC_OPDATE
            ? moment(ele.AC_OPDATE).format('DD/MM/YYYY')
            : null,

          AC_RENEW_DATE: ele.AC_RENEW_DATE
            ? moment(ele.AC_RENEW_DATE).format('DD/MM/YYYY')
            : null,

          AC_EXPDT: ele.AC_EXPDT
            ? moment(ele.AC_EXPDT).format('DD/MM/YYYY')
            : null,

          AC_AGE: ele.AC_AGE ?? null,
          AC_OCODE: ele.AC_OCODE ?? null,
          AC_MONTHS: ele.AC_MONTHS ?? null,

          AC_SCHMAMT: ele.AC_SCHMAMT ?? 0,
          AC_MATUAMT: ele.AC_MATUAMT ?? 0,
          AC_ODAMT: ele.AC_ODAMT ?? 0,
          AC_SODAMT: ele.AC_SODAMT ?? 0,

          AC_ODDAYS: ele.AC_ODDAYS ?? null,
          AC_MINOR: ele.AC_MINOR ?? 0,

          AC_GRDNAME: this.transformValue(ele.AC_GRDNAME),
          AC_GRDRELE: this.transformValue(ele.AC_GRDRELE),

          IS_DORMANT: ele.IS_DORMANT === 1,

          AC_CLOSED: ele.AC_CLOSED ?? 0,

          BRANCH_CODE: branchId,

          SYSCHNG_LOGIN: ele.OFFICER_CODE,

          OID: ele.AC_NO
        };

        await queryRunner.manager.insert('pgmaster', newObj);

        inserted++;

      } catch (err) {

        failed++;

        console.log("FAILED ROW:", ele);
        console.log("ERROR:", err);

      }

    }

    /* ---------- FINAL RESULT ---------- */

    this.logger.log(`Oracle Rows : ${rows.length}`);
    this.logger.log(`Inserted Rows : ${inserted}`);
    this.logger.log(`Failed Rows : ${failed}`);

    this.logger.log('PGMASTER migration completed');

    return { success: true };

  } finally {

    if (!queryRunner.isReleased) {
      await queryRunner.release();
    }

  }
}

// -------------------------------- SHMASTER MIGRATION --------------------------------
async migrateSHMASTER() {

  if (!this.clientConn) throw new Error('Client DB not connected');
  if (!this.serverDB) throw new Error('Server DB not connected');

  const queryRunner = this.serverDB.createQueryRunner();
  await queryRunner.connect();

  try {

    /* ---------- LOAD IDMASTER ---------- */

    const idmasterData = await queryRunner.manager.find(IDMASTER);

    const idMasterMap = new Map<number, IDMASTER>(
      idmasterData.map(x => [x.ORA_AC_NO, x])
    );

    const fallbackId = idmasterData.length > 0 ? idmasterData[0].id : 1;

    /* ---------- LOAD SCHEMA ---------- */

    const schemaData: any[] = await queryRunner.manager.query(
      `SELECT id,"S_APPL" FROM schemast`
    );

    const schemaMap = new Map<number, any>(
      schemaData.map(x => [Number(x.S_APPL), x])
    );

    /* ---------- LOAD CATEGORY ---------- */

    const categoryData = await queryRunner.manager.find(CATEGORYMASTER);

    const categoryMap = new Map(
      categoryData.map(x => [x.CODE, x])
    );

    /* ---------- SYS PARAMETERS ---------- */

    const syspara = await queryRunner.manager.query(
      `SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`
    );

    const bankCode = syspara[0].BANK_CODE;
    const branchCode = syspara[0].BRANCH_CODE;

    const branch = await queryRunner.manager.query(
      `SELECT id FROM ownbranchmaster WHERE "CODE"=${branchCode}`
    );

    const branchId = branch[0].id;

    /* ---------- LOAD ORACLE DATA ---------- */

    const result = await this.clientConn.execute(`
      SELECT *
      FROM SHMASTER
      ORDER BY AC_NO
    `);

    const rows = this.convertOracleRows(result as {
      rows: any[];
      metaData: { name: string }[];
    });

    let inserted = 0;
    let failed = 0;
    let counter = 0; // safe AC_NO generator

    for (const ele of rows) {

      try {

        /* ---------- SCHEMA ---------- */

        const schemaCode = Math.floor(Number(ele.AC_TYPE || 0) / 100);

        let schema = schemaMap.get(schemaCode);

        if (!schema) {
          this.logger.warn(`Schema missing for AC_TYPE ${ele.AC_TYPE}`);
          schema = schemaData[0];
        }

        /* ---------- ACCOUNT NUMBER ---------- */

        const acno = 100000 + Number(ele.AC_NO) + counter;
        counter++;

        const BANKACNO = this.generateBankAcNo(
          bankCode,
          branchCode,
          schema.S_APPL,
          acno
        );

        /* ---------- CUSTOMER ---------- */

        const idmaster = idMasterMap.get(ele.AC_CUSTID);

        const finalCustId = idmaster ? idmaster.id : fallbackId;

        /* ---------- CATEGORY ---------- */

        const category = categoryMap.get(ele.AC_CATG);

        /* ---------- OBJECT ---------- */

        const newObj: any = {

          AC_NO: acno,
          BANKACNO: BANKACNO,

          AC_TYPE: schema.id,
          AC_ACNOTYPE: schema.S_APPL,

          AC_CUSTID: finalCustId,
          idmasterID: finalCustId,

          AC_NAME: idmaster?.AC_NAME ?? this.transformValue(ele.AC_NAME),

          EMP_NO: ele.EMP_NO ?? null,

          AC_IS_RECOVERY: ele.AC_IS_RECOVERY ?? '0',

          AC_INSTALLMENT: Number(ele.AC_INSTALLMENT) || 0,

          AC_JOIN_DATE: ele.AC_JOIN_DATE
            ? moment(ele.AC_JOIN_DATE).format('YYYY-MM-DD')
            : null,

          AC_RETIRE_DATE: ele.AC_RETIRE_DATE
            ? moment(ele.AC_RETIRE_DATE).format('YYYY-MM-DD')
            : null,

          AC_OPDATE: ele.AC_OPDATE
            ? moment(ele.AC_OPDATE).format('YYYY-MM-DD')
            : null,

          AC_SHBALDATE: ele.AC_SHBALDATE
            ? moment(ele.AC_SHBALDATE).format('YYYY-MM-DD')
            : null,

          AC_CATG: category ? category.id : null,

          AC_EXPDT: ele.AC_EXPDT
            ? moment(ele.AC_EXPDT).format('YYYY-MM-DD')
            : null,

          AC_FACE_VALUE: ele.AC_FACE_VALUE ?? null,

          AC_OP_BAL: ele.AC_OP_BAL ?? 0,

          AC_OP_SHNO: ele.AC_OP_SHNO ?? null,

          AC_DEV_NAME: this.transformValue(ele.AC_DEV_NAME),
          AC_DEV_ADD: this.transformValue(ele.AC_DEV_ADD),
          AC_DEV_GALLI: this.transformValue(ele.AC_DEV_GALLI),
          AC_DEV_AREA: this.transformValue(ele.AC_DEV_AREA),

          IS_DORMANT: ele.IS_DORMANT === 1,

          AC_CLOSED: ele.AC_CLOSED ?? '0',

          BRANCH_CODE: branchId,

          SYSCHNG_LOGIN: ele.OFFICER_CODE
        };

        /* ---------- INSERT ---------- */

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('shmaster')
          .values(newObj)
          .execute();

        inserted++;

      } catch (err) {

        failed++;

        console.log("FAILED ROW:", ele);
        console.log("ERROR:", err);

      }

    }

    /* ---------- LOG RESULT ---------- */

    this.logger.log(`Oracle Rows : ${rows.length}`);
    this.logger.log(`Inserted Rows : ${inserted}`);
    this.logger.log(`Failed Rows : ${failed}`);

    this.logger.log('SHMASTER migration completed');

    return { success: true };

  } finally {

    if (!queryRunner.isReleased) {
      await queryRunner.release();
    }

  }

}
}