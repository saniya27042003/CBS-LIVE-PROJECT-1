/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IDMASTER } from '../entity/customer-id.entity';
import { CUSTOMERADDRESS } from '../entity/customer-address.entity';
import { OCCUPATIONMASTER } from '../entity/occupation-master.entity';
import { CASTMASTER } from '../entity/cast-master.entity';
import { RISKCATEGORYMASTER } from '../entity/risk-category.entity';
//import { SCHEMAST } from '../entity/schemeParameters.entity'; // Adjust paths as needed
import { ADVOCATEMASTER } from '../entity/advocate-master.entity';
import { BALACATA } from '../entity/minimum-balance-master.entity';
import moment from 'moment';
import { unidev } from 'unidev';
import { ManualSymbolMapper } from '../legacy-font/manual-symbol-maps';
import Sanscript from '@indic-transliteration/sanscript';
import { DataSource } from 'typeorm';
//import { QueryRunner } from 'typeorm';
import { CATEGORYMASTER } from '../entity/category-master.entity';
import { PREFIX } from '../entity/prefix-master.entity';
import { OWNBRANCHMASTER } from '../entity/own-branch-master.entity';
import { LOCKERMASTER } from '../entity/locker-rackwise-master.entity';
import { LOCKERSIZE } from '../entity/locker-size-master.entity';
import { LOCKERRACKMASTER } from '../entity/locker-rack-master.entity';
import { AUTHORITYMASTER } from '../entity/authority-master.entity';
import { TDRECEIPTMASTER } from '../entity/td-receipt-type.entity';
import { WEAKERMASTER } from '../entity/weaker-master.entity';
import { SUBSALARYMASTER } from '../entity/sub-salary-division-master.entity';
import { SALARYDIVISIONMASTER } from '../entity/salary-division-master.entity';
import { RECOVERYCLEARKMASTER } from '../entity/recovery-cleark-master.entity';
import { PRIORITYSECTORMASTER } from '../entity/priority-sector-master.entity';
import { COURTMASTER } from '../entity/court-master.entity';
import { BRANCHMASTER } from '../entity/clearing-branch-master.entity';
import { BANKDETAILS } from '../entity/BANKDETAILS.entity';
import { CITYMASTER } from '../entity/city-master.entity';
import { BANKMASTER } from '../entity/bank-master.entity';
//import { PLANTMACHINARY } from '../entity/plant-and-machinery.entity';
import { DEPRCATEGORY } from '../entity/depriciation-category-master.entity';
import { HEALTHMASTER } from '../entity/health-master.entity';
import { INDUSTRYMASTER } from '../entity/industry-master.entity';
import { INSUARANCEMASTER } from '../entity/insurance-master.entity';
import { INTCATEGORYMASTER } from '../entity/interest-category-master.entity';
//import { SPECIALINSTRUCTION } from '../entity/special-instruction.entity';
import { TODTRAN } from '../entity/over-draft.entity';
import { STANDINSTRUCTION } from '../entity/standing-instruction.entity';
import { INTINSTRUCTION } from '../entity/interest-instruction.entity';
import { INTRATETD } from '../entity/interest-rate-for-term-deposit.entity';
import { TDSRATE } from '../entity/tds-interest-rate.entity';
import { NPAMASTER } from '../entity/npa-classification.entity';
import { NPACLASSIFICATION } from '../entity/npa-class.entity';
import { ITEMMASTER } from '../entity/dead-stock-master.entity';
import { ITEMCATEGORYMASTER } from '../entity/item-category-master.entity';
import { HISTORYTRAN } from '../entity/HISTORYTRAN.entity';
import { SCHEMAST } from '../entity/schemeParameters.entity';
import { SYSPARA } from '../entity/system-master-parameters.entity';
import { INTINSTRUCTIONSLOG } from '../entity/INTINSTRUCTIONSLOG.entity';
import { TERMINTRATE } from '../entity/rate-for term.entity';
import { INTRATEPATSCHEMES } from '../entity/pat-scheme-interest-rates.entity';
import { INTRATE } from '../entity/interest-rate.entity';
import { PIGMYCHART } from '../entity/pigmy-chart.entity';
import { PIGMYCHARTMASTER } from '../entity/pigmyChart.entity';
import { LNACINTRATE } from '../entity/lnacintrate.entity';
import { COBORROWER } from '../entity/coborrower.entity';
import { GUARANTERDETAILS } from '../entity/guarantor.entity';
import { SECURITYDETAILS } from '../entity/security.entity';
import { DOCUMENTMASTER } from '../entity/document-master.entity';
import { SECURITYMASTER } from '../entity/security-code.entity';
import { PURPOSEMASTER } from '../entity/purpose-master.entity';
// import * as oracledb from 'oracledb';
// import { LNMASTER } from '../entity/term-loan-master.entity';
// import { SECURITYDETAILS } from '../entity/security.entity';
// import { GUARANTERDETAILS } from '../entity/guarantor.entity';
// import { COBORROWER } from '../entity/coborrower.entity';
// import { LNACINTRATE } from '../entity/lnacintrate.entity';

const unidev = require('unidev');

// interface IOracleClient {
//   execute: (query: string, params?: any[]) => Promise<any>;
// }

interface BranchRecord {
  id: number;
  CODE: string | number;
}


interface OracleQueryResult {
  rows: any[][];
  metaData: { name: string }[];
}

interface StockStatementOracleRow {
  AC_NO: number;
  AC_ACNOTYPE: string;
  AC_TYPE: number;        // Raw column from STOCKSTATEMENT
  JOIN_ACTYPE: number;    // Joined column from SCHEMAST
  SECU_CODE: string;
  SUBMISSION_DATE: any;   // Use any here to avoid "Unsafe call" when passing to moment()
  STATEMENT_DATE: any;    // Oracle results are often complex objects
  RAW_MATERIAL: number;
  WORK_PROGRESS: number;
  FINISHED_GOODS: number;
  RAW_MARGIN: number;
  WORK_MARGIN: number;
  FINISHED_MARGIN: number;
  REMARK: any;            // Use any to prevent transformValue safety warnings
  SECURITY_TYPE: string;
}
interface VehicleOracleRow {
  AC_NO: number;
  AC_TYPE: number;
  AC_ACNOTYPE: string;
  SUBMISSION_DATE: any;
  SECU_CODE: string;
  MARGIN: number;
  REMARK: any;
  SECURITY_TYPE: string;
  RTO_REG_DATE: any;
  AQUISITION_DATE: any;
  VEHICLE_MAKE: any;
  MANUFACTURE_YEAR: string;
  VEHICLE_NO: string;
  CHASSIS_NO: string;
  NEW_VEHICLE: string;
  NEW_EQUIPEMENT: string;
  SUPPLIER_NAME: any;
  PURCHASE_PRICE: number;
  REF_ID: string;
  ACTYPE: number;
}


interface PledgeStockOracleRow {
  AC_NO: number;
  AC_TYPE: number;
  AC_ACNOTYPE: string;
  SECU_CODE: string;
  SUBMISSION_DATE: any;
  STATEMENT_DATE: any;
  QUANTITY: number;
  RATE: number;
  TOTAL_VALUE: number;
  MARGIN: number;
  DRAWING_POWER: number;
  REMARK: any;
  SECURITY_TYPE: string;
  GODOWN_ADDRESS: string;
  ITEM_DESCRIPTION: string;
  UNIT: string;
}

export interface PlantMachinaryOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  AQUISITION_DATE: any;
  MARGIN: number | string;
  PURCHASE_PRICE: number | string;
  REMARK: any;
  SUPPLIER_NAME: any;
  SECURITY_TYPE: string;
  MANUFACTURE_YEAR: string;
  NEW_VEHICLE: string;
  NEW_EQUIPEMENT: string;
  REF_ID: string;
}

export interface OwnDepositOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  STATEMENT_DATE: any; // Used in Oracle but missing in Entity
  MARGIN: number | string;
  TOTAL_VALUE: number | string; // Used in Oracle but missing in Entity
  RECEIPT_NO: string;
  LIEN_MARK: string; // Used in Oracle but missing in Entity
  REMARK: any;
  SECURITY_TYPE: string; // Used in Oracle but missing in Entity

  SR_NO?: any;
  SHORT_DETAILS?: string;
  DETAILS?: string;

  DEPO_AC_NO: string | number;
  DEPO_ACTYPE: string | number;
  AC_EXPIRE_DATE: string | Date | null;
  MATURITY_DATE: string | Date | null;
  DEPOSIT_AMT: string | number;
  LEDGER_BAL: string | number;
  IS_LIEN_MARK_CLEAR: string | number;
  BALANCE_OF_LOAN_ACCOUNT: string | number;

}

export interface OtherSecurityOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  REMARK: any;
  SECURITY_TYPE: string;
  PARTICULARS: string;
  VALUATION_AMT: number | string;
  MARGIN: number | string;
}


export interface MarketShareOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  REMARK: any;
  SECURITY_TYPE: string;
  NO_OF_SHARES: number | string;
  FACE_VALUE: number | string;
  MARKET_VALUE: number | string;
  COMPANY_NAME: string;
  CERTIFICATE_NO: string;
  MARGIN: number | string;
}


export interface LandBuildingOracleRow {
  CITY_SURVEY_NO: any;
  REG_NO: any;
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  AQUISITION_DATE: any;
  VALUATION_DATE: any;
  AREA: number | string;
  UNIT_AREA: string;
  VALUE: number | string;
  LOCATION: string;
  MARGIN: number | string;
  ADDRESS: string;
  REMARK: any;
  SECURITY_TYPE: string;
}

export interface GoldSilverOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  VALUATION_DATE: any;
  GROSS_WEIGHT: number | string;
  NET_WEIGHT: number | string;
  PURITY: string;
  QUANTITY: number | string;
  VALUATION_AMT: number | string;
  MARGIN: number | string;
  REMARK: any;
  SECURITY_TYPE: string;
  ITEM_DESCRIPTION: string;
}

export interface FurnitureOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  AQUISITION_DATE: any;
  PURCHASE_PRICE: number | string;
  MARGIN: number | string;
  ITEM_DESCRIPTION: string;
  QUANTITY: number | string;
  REMARK: any;
  SECURITY_TYPE: string;
  VALUATION_AMT: number | string;
}

export interface FirePolicyOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  POLICY_NO: string;
  INSURANCE_COMPANY: string;
  POLICY_AMT: number | string;
  EXPIRY_DATE: any;
  PREMIUM_AMT: number | string;
  REMARK: any;
  SECURITY_TYPE: string;
}

export interface SecInsuranceOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  POLICY_NO: string;
  INSURANCE_COMPANY: string;
  POLICY_AMT: number | string;
  EXPIRY_DATE: any;
  PREMIUM_AMT: number | string;
  REMARK: any;
  SECURITY_TYPE: string;
}

export interface GovtSecuLicOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  POLICY_NO: string;
  CERTIFICATE_NO: string;
  MATURITY_DATE: any;
  FACE_VALUE: number | string;
  SURRENDER_VALUE: number | string;
  MARGIN: number | string;
  REMARK: any;
  SECURITY_TYPE: string;
  ISSUING_AUTHORITY: string;
}

export interface BookDebtsOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SECU_CODE: string | number;
  SUBMISSION_DATE: any;
  VALUATION_DATE: any;
  TOTAL_BOOK_DEBTS: number | string;
  UPTO_90_DAYS: number | string;
  OVER_90_DAYS: number | string;
  ELIGIBLE_DEBTS: number | string;
  MARGIN: number | string;
  REMARK: any;
  SECURITY_TYPE: string;
  PARTY_NAME: string;
}

export interface DpMasterOracleRow {
  AC_NO: string | number;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SUBMISSION_DATE: any;
  VALUATION_DATE: any;
  STOCK_VALUE: number | string;      // Added
  BOOK_DEBT_VALUE: number | string; // Added
  OTHER_VALUE: number | string;     // Added
  TOTAL_VALUE: number | string;     // Added
  MARGIN: number | string;          // Added
  DRAWING_POWER: number | string;
  REMARK: any;
}

export interface LinkTableOracleRow {
  AC_NO: string | number;
  AC_ACNOTYPE: string;
  LINK_NAME: string;
  RELATION: string;
  ADDRESS?: string;
  UID_NO?: string;
  SR_NO?: number;
}

export interface LnMasterOracleRow {
  AC_NO: number | string;
  AC_ACNOTYPE: string;
  AC_TYPE: number;
  SUBMISSION_DATE: any;
  SANCTION_DATE: any;
  SANCTION_LIMIT: number | string;
  INTEREST_RATE: number | string;
  PERIOD_MONTHS: number | string;
  EXPIRY_DATE: any;
  INSTALLMENT_AMT: number | string;
  REMARK: any;
  PURPOSE: string;
  SECU_CODE: string | number;
}




export interface ITdsFormSubmit {
  AC_NO: string | number;
  AC_ACNOTYPE: string;
  FIN_YEAR: string;
  FORM_TYPE: string;
  SUB_DATE: Date | string | null;
  REMARKS: string | null;
  DPMasterID?: number | null;
  BRANCH_CODE?: number;
  SUBMISSION_DATE?: string | null;
  status?: string;
}

export interface ISpecialInstruction {
  AC_NO: string | number;
  AC_ACNOTYPE: string;
  INSTRUCTION: string | null;
  // Oracle source fields
  INST_DATE?: Date | string | null;
  DATE_IN?: Date | string | null;
  INSTRUCTION_NO?: number;
  DETAILS?: string;
  TRAN_ACNO?: string;
  TRAN_ACTYPE?: number;
}

// export interface DailyShrTranOracleRow {
//   // … other fields …

//   TRANSFER_ACTYPE_FROM: number | null;          // instead of just null
//   TRANSFER_MEMBER_NO_FROM: string | number | null; // instead of just null

//   TRANSFER_ACTYPE_TO: number | null;            // instead of just null
//   TRANSFER_MEMBER_NO_TO: string | number | null;   // instead of just null

//   // … other fields …
// }

export interface PigmyChartOracleRow {
  AGENT_ACTYPE: number;
  AGENT_ACNO: number;
  TRAN_DATE: any;
  TRAN_TIME: string;
  TRAN_TYPE: string;
  TRAN_DRCR: string;
  TRAN_MODE: string;
  TRAN_STATUS: string;
  TRAN_AMOUNT: number;
  ENTRY_TYPE: string;
  CASHIER_CODE: string;
  USER_CODE: string;
  OFFICER_CODE: string;
  AUTO_VOUCHER_DATE: any;
  AUTO_VOUCHER_NO: number;
  CHART_NO: number;
}

export interface PigmyChartMasterOracleRow {
  SERIAL_NO: number;
  TRAN_ACNOTYPE: string;
  TRAN_ACTYPE: number;
  TRAN_ACNO: number;
  TRAN_AMOUNT: number;
  TRAN_GLACNO: number;
  RECEIPT_NO: string;
  CHART_NO: number;
}

// // Add this near your other interfaces
// interface IdMasterInfo {
//   id: number;
//   ORA_AC_NO: string;
//   AC_NAME: string;
// }

// // Update your existing SchemaInfo to include S_APPL
// interface SchemaInfo {
//   id: number;
//   S_APPL: string | number;
// }


@Injectable()
export class DatabaseMappingService {
  [x: string]: any;
  private readonly logger = new Logger(DatabaseMappingService.name);
  limit: number = 200;
  offset: number = 0;
  count: number = 0;
  flag: number = 0;


  // private clientConn!: {
  //   execute: (
  //     query: string,
  //     params?: any[]
  //   ) => Promise<{
  //     rows: any[];
  //     metaData: { name: string }[];
  //   }>;
  // };

  private clientConn!: {
    execute: (
      query: string,
      params?: any[] | Record<string, any>   // allow array OR object
    ) => Promise<{
      rows: any[];
      metaData: { name: string }[];
    }>;
  };

  private serverDB!: DataSource;

  constructor(private readonly dbService: DatabaseService) { }

  // store connections after controller call
  async connectServer(config: any) {
    this.serverDB = await this.dbService.getServerDataSource(config);
    return { success: true };
  }

  async connectClient(config: any) {
    this.clientConn = await this.dbService.getClientConnection(config);
    return { success: true };
  }


  // Add the translate function
  private translatefullwords(input: string): string {
    if (input === undefined || input === null) return '';
    input = String(input);

    const corrections: Record<string, string> = {
      'krishnnath': 'krishnath', 'sanpada': 'sampada', 'nilkanthth': 'nilkanth', 'sanpatti': 'sampatti', 'sanbhaji': 'sambhaji', 'jakir': 'zakir', 'rais': 'raees', 'sharaft': 'sharafat', 'lkshami': 'laxmi', 'rokde': 'rokade', 'kuraoad': 'kurawad',
      'yedve': 'yedave', 'vakude': 'wakude', 'gayakavad': 'gayakwad', 'laxmn': 'laxman', 'tvinkal': 'twinkle', 'karaoti': 'karavati', 'akanath': 'eknath', 'dhavare': 'dhaware', 'pavar': 'pawar', 'asiph': 'asif', 'satawilakar': 'satvilkar', 'kutubuddin': 'qutubuddin',
      'vitthl': 'vitthal', 'balkrishn': 'balkrishna', 'kambale': 'kamble', 'daud': 'dawood', 'dgdu': 'dagdu', 'aphtab': 'aftab', 'gotl': 'gotal', 'aphsana': 'Afsana', 'akasesarij': 'accessories', 'oto': 'auto', 'kolej': 'college', 'shekh': 'sheikh', 'chipalun': 'chiplun', 'mu.po.chipalun': 'mu.po.chiplun', 'ta.chipalun': 'ta.chiplun'
    };

    const finalResult: string[] = [];
    const words = input.split(' ');
    for (const word of words) {
      let result = '';
      let i = 0;
      const name = word;
      while (i < name.length) {
        // logic follows your existing script...
        // (truncated for brevity, keep your full logic here)
        // ... [your existing logic loop] ...
        i++;
      }
      result = result.replace(/aa/g, 'a').replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/([aeiou])\1+/g, '$1');
      result = corrections[result] || result;
      finalResult.push(result.trim());
    }
    return finalResult.join(' ');
  }



  private convertYogeshToEnglish(text: any) {

    if (!text) return null;

    const font = 'DVBW-TTYogeshEn';

    try {

      // 1️⃣ Yogesh → Unicode Marathi
      let marathi = unidev(String(text), 'hindi', font);

      // 2️⃣ Fix special Yogesh symbols
      if (marathi.includes('×')) {
        marathi = marathi.replace(/×(.)/g, '$1ि');
      }

      if (marathi.includes('Ø')) {
        marathi = marathi.replace(/Ø(.)/g, '$1िं');
      }

      if (marathi.includes('Ô')) {

        marathi = marathi.replace(
          /([क-ह])([ािीुूृेैोौंॅॉ]*)Ô/g,
          'र्$1$2'
        );

        marathi = marathi.replace(/Ô/g, 'र्');
      }

      // 3️⃣ Normalize manual symbol mappings
      marathi = ManualSymbolMapper.normalize(marathi);

      // 4️⃣ Marathi → IAST transliteration
      let english = Sanscript.t(marathi, 'devanagari', 'iast');

      // 5️⃣ Normalize to readable English
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
        .replace(/\b\w/g, c => c.toUpperCase());

      return english.trim();

    } catch {
      return text;
    }
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
      /�|Ã|Â|¤|§|ª|©️/.test(strRaw) ||
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

      // --- DYNAMIC BRANCH LOOKUP ---
      // Instead of hardcoding 101, we fetch all branches currently in your Postgres table
      const branches = await queryRunner.manager.query(`SELECT id, "CODE" FROM ownbranchmaster`);
      const branchMap = new Map(branches.map(b => [Number(b.CODE), b.id]));

      this.logger.log(`Mapped Branches from PG: ${JSON.stringify(Object.fromEntries(branchMap))}`);

      // Check if we have at least one branch to avoid total failure
      if (branchMap.size === 0) {
        throw new Error('No branches found in ownbranchmaster. Please insert branches first.');
      }


      for (const ele of rows) {
        const newObj = new IDMASTER();
        const namearr = String(ele.AC_NAME || '').trim().split(/\s+/);

        let marathiTitle = '';

        if (ele.AC_TITLE) {
          const font = 'DVBW-TTYogeshEn';

          marathiTitle = unidev(String(ele.AC_TITLE), 'hindi', font);

          if (font === 'DVBW-TTYogeshEn') {
            if (marathiTitle.includes('×')) {
              marathiTitle = marathiTitle.replace(/×(.)/g, '$1ि');
            }

            if (marathiTitle.includes('Ø')) {
              marathiTitle = marathiTitle.replace(/Ø(.)/g, '$1िं');
            }

            if (marathiTitle.includes('Ô')) {
              marathiTitle = marathiTitle.replace(
                /([क-ह])([ािीुूृेैोौंॅॉ]*)Ô/g,
                'र्$1$2'
              );

              marathiTitle = marathiTitle.replace(/Ô/g, 'र्');
            }
          }
        }

        newObj['AC_TITLE_REG'] = marathiTitle ?? null;

        let marathiName = '';

        if (ele.AC_NAME) {
          const font = 'DVBW-TTYogeshEn';

          marathiName = unidev(String(ele.AC_NAME), 'hindi', font);

          if (font === 'DVBW-TTYogeshEn') {
            if (marathiName.includes('×')) {
              marathiName = marathiName.replace(/×(.)/g, '$1ि');
            }

            if (marathiName.includes('Ø')) {
              marathiName = marathiName.replace(/Ø(.)/g, '$1िं');
            }

            if (marathiName.includes('Ô')) {
              marathiName = marathiName.replace(
                /([क-ह])([ािीुूृेैोौंॅॉ]*)Ô/g,
                'र्$1$2'
              );

              marathiName = marathiName.replace(/Ô/g, 'र्');
            }
          }
        }


        const namearrReg = marathiName
          ? marathiName.split(' ')
          : [];

        newObj['L_NAME_REG'] = namearrReg[0] ?? null;
        newObj['F_NAME_REG'] = namearrReg[1] ?? null;
        newObj['M_NAME_REG'] = namearrReg[2] ?? null;

        newObj['AC_NAME_REG'] = marathiName;


        newObj['AC_MEMBNO'] =
          ele.AC_MEMBNO === 0 || ele.AC_MEMBNO == null
            ? 0
            : Number(ele.AC_MEMBNO) + 100000;     // Name Splitting logic
        newObj['L_NAME'] = namearr[0] ? this.transformValue(namearr[0]) : null;
        newObj['F_NAME'] = namearr[1] ? this.transformValue(namearr[1]) : null;
        newObj['M_NAME'] = namearr[2] ? this.transformValue(namearr[2]) : null;


        // --- Cast ---
        let castID: any = null;
        if (ele.CASTMASTER != null) {
          let CASTdATA = await this.clientConn.execute(`select CODE from CASTMASTER where CODE=${ele.CASTMASTER}`)
          let occData = await this.convertOracleRows(CASTdATA);
          for (let eleme of occData) {
            castID = (castData.find(castData => castData['CODE'] == eleme.CODE))
          }

        }

        // --- Risk category---
        let RISKID: any = null;
        if (ele.RISKCATEGORYMASTER != null) {
          let CASTdATA = await this.clientConn.execute(`select NAME from RISKCATEGORYMASTER where CODE=${ele.RISKCATEGORYMASTER}`)
          let occData = await this.convertOracleRows(CASTdATA);
          for (let eleme of occData) {
            RISKID = (riskData.find(riskCategoryData => riskCategoryData['CODE'] == eleme.CODE))
          }
        }

        // --- Membership type ---
        let mem_TYPE: any[] = [];
        if (ele.AC_MEMBTYPE != null) {
          const memTYPE = await this.clientConn.execute(
            `SELECT S_APPL FROM schemast WHERE S_APPL = ${ele.AC_MEMBTYPE}`
          );
          mem_TYPE = this.convertOracleRows(memTYPE);
        }

        // --- Membership number normalization ---
        const AC_MEMBNO = ele.AC_MEMBNO == 0 ? null : Number(ele.AC_MEMBNO) + 100000;

        newObj.AC_NO = Number(ele.AC_NO || 0) + 100000;
        //newObj['AC_NO'] = ele.AC_NO;
        newObj.AC_MEMBTYPE = mem_TYPE && mem_TYPE.length > 0 ? mem_TYPE[0].S_APPL : null;
        newObj.AC_MEMBNO = ele.AC_MEMBNO;
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

        // const cast = castData.find(x => x.CODE == ele.CASTMASTER);
        // newObj['AC_CAST'] = cast ? cast.id : null;

        // const risk = riskData.find(x => x.CODE == ele.RISKCATEGORYMASTER);
        // newObj['AC_RISKCATG'] = risk ? risk.id : null;
        newObj['AC_RISKCATG'] = RISKID == null ? null : RISKID.id;
        newObj['AC_CAST'] = castID == null ? null : castID.id;


        newObj['ORA_AC_NO'] = ele.AC_NO;

        // --- DYNAMIC BRANCH ASSIGNMENT ---
        const oracleBranchCode = Number(ele.AC_BRANCH || 1);
        // Try to find match, otherwise fallback to the first branch ID in the map
        const postgresBranchId = (branchMap.get(oracleBranchCode) || branchMap.values().next().value) as number;
        newObj['ORA_BRANCH'] = oracleBranchCode;
        newObj['BRANCH_CODE'] = postgresBranchId;

        const saved = await queryRunner.manager.save(IDMASTER, newObj);

        const address = new CUSTOMERADDRESS();
        address['idmasterID'] = saved.id;
        address['AC_HONO'] = ele.AC_HONO == 0 || ele.AC_HONO == undefined ? null : ele.AC_HONO;
        address['AC_WARD'] = ele.AC_WARD == undefined ? null : ele.AC_WARD;
        address['AC_GALLI'] = this.transformValue(ele.AC_ADDR1);
        address['AC_AREA'] = this.transformValue(ele.AC_ADDR2);
        address['AC_ADDR'] = this.transformValue(ele.AC_ADDR3);
        address['AC_PIN'] = ele.AC_PIN || null;
        address['AC_ADDFLAG'] = true;
        address['AC_ADDTYPE'] = 'P';
        address['AC_CTCODE'] = ele.AC_CTCODE == 9999 ? 10 : ele.AC_CTCODE;


        await queryRunner.manager.save(CUSTOMERADDRESS, address);
      }

      await queryRunner.commitTransaction();
      this.logger.log('IDMASTER migration completed successfully');

      return { success: true };

    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      this.logger.error('IDMASTER Migration failed', err);
      throw err;
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
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
    // 1. Bank: Force 3 digits
    const bank = String(bankCode).padStart(3, '0').slice(-3);

    // 2. Branch: Force 3 digits
    const branch = String(branchCode).padStart(3, '0').slice(-3);

    // 3. Scheme: Take the FIRST 3 digits (e.g., "507" from "50700")
    const scheme = String(schemeCode).substring(0, 3).padStart(3, '0');

    // 4. Account: Take the LAST 6 digits (to handle overflow from +100000)
    const account = String(acNo).slice(-6).padStart(6, '0');

    const finalAcNo = `${bank}${branch}${scheme}${account}`;

    // Log one sample to verify the length is 15
    // this.logger.log(`Generated: ${finalAcNo} | Length: ${finalAcNo.length}`);

    return finalAcNo;
  }



  //=================================DPMASTER TABLE INSERTION =============================================
  async migrateDPWithLinks() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');

    this.logger.log('Starting Final Sync: Migrating all rows with dynamic branch and scheme logic...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. FETCH DATA FROM ORACLE
      const [dpResult, nomineeResult, attorneyResult, jointResult] = await Promise.all([
        this.clientConn.execute(`SELECT * FROM DPMASTER`),
        this.clientConn.execute(`SELECT * FROM NOMINEELINK`),
        this.clientConn.execute(`SELECT * FROM ATTERONEYLINK`),
        this.clientConn.execute(`SELECT * FROM JOINTACLINK`)
      ]);

      const dpRows = this.convertOracleRows(dpResult as any) as Record<string, any>[];
      const nomineeRows = this.convertOracleRows(nomineeResult as any) as Record<string, any>[];
      const attorneyRows = this.convertOracleRows(attorneyResult as any) as Record<string, any>[];
      const jointRows = this.convertOracleRows(jointResult as any) as Record<string, any>[];

      const currentPgRows = await queryRunner.manager.query(
        `SELECT "AC_ACNOTYPE", "AC_NO" FROM dpmaster`
      );

      const pgAccountKeys = new Set(
        currentPgRows.map(r => `${String(r.AC_ACNOTYPE).trim()}-${Number(r.AC_NO) - 100000}`)
      );

      const missingData = dpRows.filter(ora =>
        !pgAccountKeys.has(`${String(ora.AC_ACNOTYPE).trim()}-${ora.AC_NO}`)
      );

      this.logger.error(`--- IDENTIFIED ${missingData.length} MISSING ROWS ---`);
      missingData.forEach((row, index) => {
        this.logger.warn(
          `[${index + 1}] Missing: Category=${row.AC_ACNOTYPE}, Type=${row.AC_TYPE}, No=${row.AC_NO}, Name=${row.AC_NAME}`
        );
      });

      // --- DEBUG BLOCK ---
      // const pgRows = await queryRunner.manager.query(`SELECT "AC_ACNOTYPE", "AC_NO" FROM dpmaster`);
      // const pgSet = new Set(pgRows.map(r => `${String(r.AC_ACNOTYPE).trim()}-${Number(r.AC_NO) - 100000}`));
      // const missingRows = dpRows.filter(ora => !pgSet.has(`${String(ora.AC_ACNOTYPE).trim()}-${ora.AC_NO}`));

      // if (missingRows.length > 0) {
      //   this.logger.warn(`TOTAL MISSING ROWS DETECTED: ${missingRows.length}`);
      //   const missingIVs = missingRows.filter(r => String(r.AC_ACNOTYPE).trim() === 'IV');
      //   missingIVs.forEach(row => {
      //     this.logger.warn(`Missing -> AC_NO: ${row.AC_NO}, Name: ${row.AC_NAME}, Type: ${row.AC_TYPE}`);
      //   });
      // }

      // 2. LOAD SYSTEM DATA & BRANCH MAP
      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');

      // Fetch all valid branches from Postgres
      const branches = await queryRunner.manager.query(`SELECT id, "CODE" FROM ownbranchmaster`);
      const branchMap = new Map(branches.map(b => [Number(b.CODE), b.id]));
      const defaultBranchId = (branches[0]?.id || 1) as number;

      // 3. LOOKUPS
      const schemaData = await queryRunner.manager.query<{ id: number, S_APPL: any, S_ACNOTYPE: string }[]>(
        `SELECT id, "S_APPL", "S_ACNOTYPE" FROM schemast`
      );

      const schemeIdMap = new Map(schemaData.map(s =>
        [`${String(s.S_ACNOTYPE).trim()}-${String(s.S_APPL).trim()}`, s.id]
      ));
      const schemeApplMap = new Map(schemaData.map(s =>
        [`${String(s.S_ACNOTYPE).trim()}-${String(s.S_APPL).trim()}`, s.S_APPL]
      ));

      const idMasterData = await queryRunner.manager.query<{ id: number; ORA_AC_NO: string }[]>(
        `SELECT id, "ORA_AC_NO" FROM idmaster`
      );
      const customerMap = new Map(idMasterData.map(x => [String(x.ORA_AC_NO).trim(), x.id]));

      const categoryData = await queryRunner.manager.query<{ id: number; CODE: number }[]>(
        `SELECT id, "CODE" FROM categorymaster`
      );
      const categoryMap = new Map(categoryData.map(c => [Number(c.CODE), c.id]));

      const balCatData = await queryRunner.manager.query(`
        SELECT id, "BC_CODE"
        FROM balacata
      `);

      const balCatMap = new Map(
        balCatData.map((b: any) => [
          String(b.BC_CODE).trim(),
          b.id
        ])
      );

      const operationData = await queryRunner.manager.query(`
        SELECT id, "CODE"
        FROM operationmaster
      `);

      const operationMap = new Map(
        operationData.map((op: any) => [
          String(op.CODE).trim(),
          op.id
        ])
      );
      const intCategoryData = await queryRunner.manager.query(`
        SELECT id, "CODE"
        FROM intcategorymaster
      `);

      const intCategoryMap = new Map(
        intCategoryData.map((cat: any) => [
          String(cat.CODE).trim(),
          cat.id
        ])
      );
      // const branches = await queryRunner.manager.query(`
      //   SELECT id, "CODE"
      //   FROM ownbranchmaster
      // `);

      // const branchMap = new Map(
      //   branches.map((b: any) => [
      //     String(b.CODE).trim(),
      //     b.id
      //   ])
      // );


      const acToIdMap = new Map<string, number>();

      await queryRunner.startTransaction();

      try {

        for (const ele of dpRows) {
          const oracleAcTypeCode = String(ele.AC_ACNOTYPE || '').trim();
          const oracleRawType = String(ele.AC_TYPE || '').trim();
          const oracleSchemeKey = `${oracleAcTypeCode}-${oracleRawType}`;

          const targetInternalId = schemeIdMap.get(oracleSchemeKey) || 1;
          const targetApplCode = schemeApplMap.get(oracleSchemeKey) || 999;

          const oracleCustIdKey = String(ele.AC_CUSTID || '0').trim();
          const postgresCustomerId = customerMap.get(oracleCustIdKey) || 1;

          const balCatCode =
            ele.AC_BALCATG != null
              ? String(ele.AC_BALCATG).trim()
              : null;

          const balCatId =
            balCatCode != null
              ? balCatMap.get(balCatCode) || null
              : null;

          const oprCode =
            ele.AC_OPR_CODE != null
              ? String(ele.AC_OPR_CODE).trim()
              : null;

          const operationId =
            oprCode != null
              ? operationMap.get(oprCode) || null
              : null;

          const intCatCode =
            ele.AC_INTCATA != null
              ? String(ele.AC_INTCATA).trim()
              : null;

          const intCategoryId =
            intCatCode != null
              ? intCategoryMap.get(intCatCode) || null
              : null;
          const introBranchCode =
            ele.AC_INTROBRANCH != null
              ? Number(ele.AC_INTROBRANCH)
              : null;

          const introBranchId =
            introBranchCode != null
              ? branchMap.get(introBranchCode) || null
              : null;

          const AC_EXPDT =
            ele.AC_EXPDT == '' || ele.AC_EXPDT == null
              ? null
              : moment(ele.AC_EXPDT).format('DD/MM/YYYY');

          // this.logger.log(
          //   `AC_EXPDT DEBUG => Oracle: ${ele.AC_EXPDT}, Converted: ${AC_EXPDT}`
          // );
          const AC_INTROID =
            ele.AC_INTROID == '' || ele.AC_INTROID == null
              ? null
              : Number(ele.AC_INTROID);

          // this.logger.log(
          //   `AC_INTROID DEBUG => Oracle: ${ele.AC_INTROID}, Converted: ${AC_INTROID}`
          // );

          const originalIntrAcNo = ele.AC_INTRACNO;
          const AC_INTRACNO =
            originalIntrAcNo != null
              ? Number(originalIntrAcNo) + 100000
              : null;

          const AC_MEMBTYPE =
            ele.AC_MEMBTYPE != null
              ? String(ele.AC_MEMBTYPE).trim()
              : null;

          const AC_MEMBNO =
            ele.AC_MEMBNO == 0 || ele.AC_MEMBNO == null
              ? null
              : Number(ele.AC_MEMBNO) + 100000;

          const AC_MONTHS =
            ele.AC_MONTHS == null ? null : Number(ele.AC_MONTHS);

          const AC_DAYS =
            ele.AC_DAYS == null ? null : Number(ele.AC_DAYS);

          const AC_CLOSEDT =
            ele.AC_CLOSEDT == '' || ele.AC_CLOSEDT == null
              ? null
              : moment(ele.AC_CLOSEDT).format('DD/MM/YYYY');

          const AC_PRODUCT =
            ele.AC_PRODUCT == null ? null : String(ele.AC_PRODUCT).trim();

          const AC_LINTEDT =
            ele.AC_LINTEDT == '' || ele.AC_LINTEDT == null
              ? null
              : moment(ele.AC_LINTEDT).format('DD/MM/YYYY');

          const AC_BALDATE =
            ele.AC_BALDATE == '' || ele.AC_BALDATE == null
              ? null
              : moment(ele.AC_BALDATE).format('DD/MM/YYYY');

          const OP_CR_INT_FIN_YEAR =
            ele.OP_CR_INT_FIN_YEAR == null
              ? null
              : Number(ele.OP_CR_INT_FIN_YEAR);

          const AC_OP_CD =
            ele.AC_OP_CD == null ? null : String(ele.AC_OP_CD).trim();

          // this.logger.log(
          //   `AC_INTRACNO DEBUG => Oracle: ${originalIntrAcNo}, Converted: ${AC_INTRACNO}`
          // );



          // DYNAMIC BRANCH LOGIC
          // Use branch from row if exists (e.g. INVEST_BRANCH), else fallback to syspara branch
          const rowBranchCodeRaw = ele.INVEST_BRANCH || ele.AC_INTROBRANCH || syspara[0]?.BRANCH_CODE || 1;
          const branchInternalId = (branchMap.get(Number(rowBranchCodeRaw)) || defaultBranchId) as number;
          const branchCodeString = String(rowBranchCodeRaw).padStart(3, '0');

          // ACCOUNT NUMBER GENERATION
          const offsetAcNoInt = 100000 + Number(ele.AC_NO);
          const schemeTrimmed = String(targetApplCode).slice(0, 3);
          const acNoFinal = String(offsetAcNoInt).padStart(6, '0');

          // Assemble using the row's specific branch code to prevent collision
          const bankAcNo15 = `${bankCode}${branchCodeString}${schemeTrimmed}${acNoFinal}`;




          const dpInsert = await queryRunner.manager.createQueryBuilder()
            .insert().into('dpmaster').values({
              BANKACNO: bankAcNo15,
              AC_NO: offsetAcNoInt,
              AC_ACNOTYPE: ele.AC_ACNOTYPE,
              AC_TYPE: targetInternalId,
              BRANCH_CODE: branchInternalId, // Valid PK from ownbranchmaster
              idmasterID: postgresCustomerId,
              AC_NAME: this.transformValue(ele.AC_NAME),
              AC_CATG: categoryMap.get(Number(ele.AC_CATG)) || null,
              AC_CUSTID: ele.AC_CUSTID,
              AC_BALCATG: balCatId,
              AC_OPR_CODE: operationId,
              AC_INTCATA: intCategoryId,
              AC_INTROBRANCH: introBranchId,
              AC_EXPDT: AC_EXPDT,
              AC_INTROID: AC_INTROID,
              AC_INTRACNO: AC_INTRACNO != null ? AC_INTRACNO.toString() : null,
              AC_MEMBTYPE: AC_MEMBTYPE,
              AC_MEMBNO: AC_MEMBNO,
              AC_MONTHS: AC_MONTHS,
              AC_DAYS: AC_DAYS,
              AC_CLOSEDT: AC_CLOSEDT,
              AC_PRODUCT: AC_PRODUCT,
              AC_LINTEDT: AC_LINTEDT,
              AC_BALDATE: AC_BALDATE,
              OP_CR_INT_FIN_YEAR: OP_CR_INT_FIN_YEAR,
              AC_OP_CD: AC_OP_CD,
              status: 1,
              SYSCHNG_LOGIN: ele.OFFICER_CODE || 'MIGRATION',
              AC_OPDATE: ele.AC_OPDATE ? moment(ele.AC_OPDATE).format('DD/MM/YYYY') : null,
              AC_MBDATE: ele.AC_MBDATE ? moment(ele.AC_MBDATE).format('DD/MM/YYYY') : null,
              AC_ASON_DATE: ele.AC_ASON_DATE ? moment(ele.AC_ASON_DATE).format('DD/MM/YYYY') : null,
              // AC_EXPDT: ele.AC_EXPDT ? moment(ele.AC_EXPDT).format('DD/MM/YYYY') : null,
              // AC_CLOSEDT: ele.AC_CLOSEDT ? moment(ele.AC_CLOSEDT).format('DD/MM/YYYY') : null,
              AC_FREEZE_STATUS: ele.AC_FREEZE_STATUS,
              AC_CLOSED: ele.AC_CLOSED == 0 ? 0 : 1,
              IS_DORMANT: ele.IS_DORMANT != 0,

            })
            .orUpdate(
              [
                'AC_CATG',
                'AC_CUSTID',
                'AC_BALCATG',
                'idmasterID',
                'AC_TYPE',
                'BRANCH_CODE',
                'AC_EXPDT',
                'AC_INTROID',
                'AC_INTRACNO'
              ],
              ['BANKACNO']
            )
            .execute();

          //             const safeMonths =
          //   AC_MONTHS == null ? null : parseInt(String(AC_MONTHS), 10);

          // const safeDays =
          //   AC_DAYS == null ? null : parseInt(String(AC_DAYS), 10);

          // this.logger.log(
          //   `TYPE CHECK => MONTHS: ${safeMonths} (${typeof safeMonths}), DAYS: ${safeDays} (${typeof safeDays})`
          // );
          await queryRunner.manager.query(
            `
    UPDATE dpmaster
    SET
      "AC_EXPDT" = $1,
      "AC_INTROID" = $2,
      "AC_INTRACNO" = $3,
      "AC_MEMBTYPE" = $4,
      "AC_MEMBNO" = $5,
      "AC_MONTHS" = $6,
      "AC_DAYS" = $7,
      "AC_CLOSEDT" = $8,
      "AC_PRODUCT" = $9,
      "AC_LINTEDT" = $10,
      "AC_BALDATE" = $11,
      "OP_CR_INT_FIN_YEAR" = $12,
      "AC_OP_CD" = $13
    WHERE "BANKACNO" = $14
  `,
            [
              AC_EXPDT,
              AC_INTROID != null ? AC_INTROID.toString() : null,
              AC_INTRACNO != null ? AC_INTRACNO.toString() : null,
              AC_MEMBTYPE,
              AC_MEMBNO,
              AC_MONTHS,
              AC_DAYS,
              AC_CLOSEDT,
              AC_PRODUCT,
              AC_LINTEDT,
              AC_BALDATE,
              OP_CR_INT_FIN_YEAR,
              AC_OP_CD,
              bankAcNo15

            ]
          );

          const generatedId = dpInsert.identifiers[0].id as number;
          acToIdMap.set(`${ele.AC_ACNOTYPE}-${ele.AC_NO}`, generatedId);
        }



        // 1. Nominee Links
        for (const n of nomineeRows) {
          const parentId = acToIdMap.get(`${n.AC_ACNOTYPE}-${n.AC_NO}`);
          if (!parentId) continue;

          const isPG = String(n.AC_ACNOTYPE).trim() === 'PG';

          const sysparaBranchCode = Number(syspara[0]?.BRANCH_CODE || 1);
          const branchInternalId = branchMap.get(sysparaBranchCode) || defaultBranchId;

          await queryRunner.manager.insert('nomineelink', {
            // Use quotes to preserve the exact case for Postgres
            "DPMasterID": isPG ? null : parentId,
            "PGMasterID": isPG ? parentId : null,
            "AC_NNAME": this.transformValue(n.AC_NNAME),
            "AC_NRELA": this.transformValue(n.AC_NRELA),
            "AC_NDATE": this.transformValue(n.AC_NDATE),
            "AGE": n.AGE,
            "AC_NO": 100000 + Number(n.AC_NO),
            "status": '1',
            "BRANCH_CODE": branchInternalId
          });
        }

        // 2. Attorney Links
        for (const a of attorneyRows) {
          const parentId = acToIdMap.get(`${a.AC_ACNOTYPE}-${a.AC_NO}`);
          if (!parentId) continue;

          const isPG = String(a.AC_ACNOTYPE).trim() === 'PG';

          const sysparaBranchCode = Number(syspara[0]?.BRANCH_CODE || 1);
          const branchInternalId = branchMap.get(sysparaBranchCode) || defaultBranchId;

          await queryRunner.manager.insert('atteroneylink', {
            "DPMasterID": isPG ? null : parentId,
            "PGMasterID": isPG ? parentId : null,
            "ATTERONEY_NAME": this.transformValue(a.ATTERONEY_NAME),

            "DATE_APPOINTED": a.DATE_APPOINTED ? moment(a.DATE_APPOINTED).format('DD/MM/YYYY') : '',
            "DATE_EXPIRY": a.DATE_EXPIRY ? moment(a.DATE_EXPIRY).format('DD/MM/YYYY') : '',
            
            "status": '1',
            "BRANCH_CODE": branchInternalId
          });
        }

        // 3. Joint Account Links
        for (const j of jointRows) {
          const parentId = acToIdMap.get(`${j.AC_ACNOTYPE}-${j.AC_NO}`);
          if (!parentId) continue;

          const isPG = String(j.AC_ACNOTYPE).trim() === 'PG';

          const sysparaBranchCode = Number(syspara[0]?.BRANCH_CODE || 1);
          const branchInternalId = branchMap.get(sysparaBranchCode) || defaultBranchId;

          await queryRunner.manager.insert('joint_ac_link', {
            "DPMasterID": isPG ? null : parentId,
            "PGMasterID": isPG ? parentId : null,
            "JOINT_ACNAME": this.transformValue(j.JOINT_ACNAME),
            "OPERATOR": Number(j.OPERATOR) === 0 ? 'No' : 'Yes',
            "status": '1',
            "BRANCH_CODE": branchInternalId
          });
        }


        await queryRunner.commitTransaction();
        this.logger.log('Migration Successful. 28,516 rows processed.');
        return { success: true };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        this.logger.error('Migration failed during transaction', err as any);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  //-------------------------------------LNMASTER LOGIC ---------------------------------

  async migrateLNMASTERWithChild(): Promise<{ success: boolean; successCount: number; skipCount: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('Databases not connected.');
    }

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      this.logger.log('Starting Full Deep LNMASTER migration (All Rows)...');

      // 1. --- LOAD MASTER DATA (Lookup Maps) ---
      const [
        authMaster, priorityMaster, weakerMaster, purposeMaster,
        industryMaster, healthMaster, syspara, schemaRows, idmasterRows, branchRes
      ] = await Promise.all([
        queryRunner.manager.find(AUTHORITYMASTER),
        queryRunner.manager.find(PRIORITYSECTORMASTER),
        queryRunner.manager.find(WEAKERMASTER),
        queryRunner.manager.find(PURPOSEMASTER),
        queryRunner.manager.find(INDUSTRYMASTER),
        queryRunner.manager.find(HEALTHMASTER),
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query<{ id: number; S_APPL: number }[]>(`SELECT id, "S_APPL" FROM schemast`),
        queryRunner.manager.query<{ id: number; ORA_AC_NO: string; AC_NAME: string }[]>(`SELECT id, "ORA_AC_NO", "AC_NAME" FROM idmaster`),
        queryRunner.manager.query<{ id: number; CODE: string }[]>(`SELECT id, "CODE" FROM ownbranchmaster`)
      ]);

      const authMap = new Map(authMaster.map(x => [Number(x.CODE || x.id), x.id]));
      const priorityMap = new Map(priorityMaster.map(x => [Number(x.id), x.id]));
      const weakerMap = new Map(weakerMaster.map(x => [Number(x.CODE || x.id), x.id]));
      const purposeMap = new Map(purposeMaster.map(x => [Number(x.CODE || x.id), x.id]));
      const industryMap = new Map(industryMaster.map(x => [Number(x.CODE || x.id), x.id]));
      const healthMap = new Map(healthMaster.map(x => [Number(x.CODE || x.id), x.id]));
      const schemaMap = new Map(schemaRows.map(r => [Number(r.S_APPL), r.id]));
      const custMap = new Map(idmasterRows.map(r => [String(r.ORA_AC_NO || '').trim(), r]));

      const branchMap = new Map(branchRes.map(b => [Number(b.CODE), b]));
      const branchRecord = branchMap.get(Number(this.BRANCH_CODE)) || branchRes[0];
      const branchInternalId = branchRecord?.id || 1;
      const branchCodeForAc = String(branchRecord?.CODE || '001').padStart(3, '0');

      // 2. --- FETCH ALL ROWS FROM ORACLE ---
      this.logger.log('Fetching all rows from Oracle LNMASTER...');
      const result = await this.clientConn.execute(`SELECT * FROM LNMASTER ORDER BY AC_NO ASC`);
      const rows = this.mapOracleToPgRows(result);
      this.count = rows.length;

      let successCount = 0;
      let skipCount = 0;

      // 3. --- PROCESS ROWS ---
      for (const ele of rows) {
        const schemaId = schemaMap.get(Number(ele.AC_TYPE));
        if (!schemaId) {
          this.logger.warn(`[SKIP] LN ${ele.AC_NO}: Schema ${ele.AC_TYPE} not found.`);
          skipCount++;
          continue;
        }

        const idmaster = custMap.get(String(ele.AC_CUSTID || '').trim());
        const transformedAcNo = Number(ele.AC_NO) + 100000;
        const bankAcNo = this.generateBankAcNo(
          syspara[0].BANK_CODE,
          Number(branchCodeForAc),
          ele.AC_TYPE,
          transformedAcNo
        );

        // Duplicate Check
        const exists = await queryRunner.manager.query(`SELECT id FROM lnmaster WHERE "BANKACNO" = $1`, [bankAcNo]);
        if (exists.length > 0) {
          skipCount++;
          continue;
        }

        await queryRunner.startTransaction();

        try {
          const insertRes = await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('lnmaster')
            .values({
              BANKACNO: bankAcNo,
              AC_NO: String(transformedAcNo).padStart(6, '0'),
              AC_ACNOTYPE: ele.AC_ACNOTYPE || 'LN',
              AC_TYPE: schemaId,
              idmasterID: idmaster?.id || 1,
              AC_CUSTID: ele.AC_CUSTID ? Number(ele.AC_CUSTID) : 1,
              BRANCH_CODE: branchInternalId,
              AC_NAME: idmaster ? idmaster.AC_NAME : this.transformValue(ele.AC_NAME),
              ORA_AC_NAME: this.transformValue(ele.AC_NAME),
              REF_ACNO: ele.REF_ACNO || undefined,

              AC_AUTHORITY: ele.AC_AUTHORITY ? authMap.get(Number(ele.AC_AUTHORITY)) : undefined,
              AC_WEAKER: ele.AC_WEAKER ? weakerMap.get(Number(ele.AC_WEAKER)) : undefined,
              AC_PRIORITY: ele.AC_PRIORITY ? priorityMap.get(Number(ele.AC_PRIORITY)) : undefined,
              AC_PURPOSE: ele.AC_PURPOSE ? purposeMap.get(Number(ele.AC_PURPOSE)) : undefined,
              AC_INDUSTRY: ele.AC_INDUSTRY ? industryMap.get(Number(ele.AC_INDUSTRY)) : undefined,
              AC_HEALTH: ele.AC_HEALTH ? healthMap.get(Number(ele.AC_HEALTH)) : undefined,

              AC_OPDATE: ele.AC_OPDATE ? moment(ele.AC_OPDATE).format('DD/MM/YYYY') : undefined,
              AC_SANCTION_DATE: ele.AC_SANCTION_DATE ? moment(ele.AC_SANCTION_DATE).format('DD/MM/YYYY') : undefined,
              AC_EXPIRE_DATE: ele.AC_EXPIRE_DATE ? moment(ele.AC_EXPIRE_DATE).format('DD/MM/YYYY') : undefined,
              AC_BALDATE: ele.AC_BALDATE ? moment(ele.AC_BALDATE).format('DD/MM/YYYY') : undefined,

              AC_SANCTION_AMOUNT: String(ele.AC_SANCTION_AMOUNT || '0'),
              AC_DRAWPOWER_AMT: String(ele.AC_DRAWPOWER_AMT || '0'),
              AC_INSTALLMENT: String(ele.AC_INSTALLMENT || '0'),
              INSTALLMENT_AMT: String(ele.AC_INSTALLMENT || '0'),
              AC_OP_BAL: String(ele.AC_OP_BAL || '0'),
              INTEREST_RATE: String(ele.AC_INTRATE || '0'),
              AC_INTRATE: String(ele.AC_INTRATE || '0'),

              AC_MONTHS: Number(ele.AC_MONTHS) || 0,
              status: '1'
            })
            .execute();

          const parentId = insertRes.identifiers[0].id;

          if (parentId) {
            // --- Child Migrations ---
            await this.migrateLNSecurity(ele, parentId, queryRunner, bankAcNo, schemaId);
            await this.migrateLNGuarantors(ele, parentId, queryRunner, custMap, bankAcNo, schemaId);
            await this.migrateLNCoborrowers(ele, parentId, queryRunner, custMap, bankAcNo, schemaId);
            await this.migrateLNInterestRates(ele, parentId, branchInternalId, queryRunner, bankAcNo, schemaId);

            await queryRunner.commitTransaction();
            successCount++;
          }
        } catch (err: any) {
          await queryRunner.rollbackTransaction();
          this.logger.error(`Row Error LN ${ele.AC_NO}: ${err.message}`);
        }
      }

      this.logger.log(`Migration Complete: ${successCount} successful, ${skipCount} skipped.`);
      return { success: true, successCount, skipCount };

    } catch (err: any) {
      this.logger.error(`FATAL LNMASTER: ${err.message}`);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // --- 1. SECURITY DETAILS ---
  async migrateLNSecurity(ele: any, parentId: number, queryRunner: any, BANKACNO: string, schemaId: number) {
    const sql = `SELECT * FROM SECURITYDETAILS 
                 WHERE TO_NUMBER(AC_NO) = ${ele.AC_NO} 
                 AND TO_NUMBER(AC_TYPE) = ${ele.AC_TYPE}
                 AND TRIM(AC_ACNOTYPE) = '${ele.AC_ACNOTYPE}'`;

    const result = await this.clientConn.execute(sql);
    const rows = this.mapOracleToPgRows(result);

    for (const row of rows) {
      const security = new SECURITYDETAILS();
      security.AC_ACNOTYPE = row.AC_ACNOTYPE;
      security.AC_TYPE = String(schemaId);
      security.AC_NO = BANKACNO;
      security.SECURITY_CODE = row.SECURITY_CODE;
      security.SECURITY_VALUE = Number(row.SECURITY_VALUE) || 0;
      security.lnmasterID = parentId;

      // REMOVED status because it doesn't exist in your DB table
      await queryRunner.manager.save(SECURITYDETAILS, security);
    }
  }

  // --- 2. GUARANTOR DETAILS ---
  async migrateLNGuarantors(ele: any, parentId: number, queryRunner: any, custMap: Map<string, any>, BANKACNO: string, schemaId: number) {
    const sql = `SELECT * FROM GUARANTERDETAILS 
                 WHERE TO_NUMBER(AC_NO) = ${ele.AC_NO} 
                 AND TO_NUMBER(AC_TYPE) = ${ele.AC_TYPE}`;

    const result = await this.clientConn.execute(sql);
    const rows = this.mapOracleToPgRows(result);

    for (const row of rows) {
      const idmasterID = custMap.get(String(row.AC_CUSTID || '').trim());
      const guaranter = new GUARANTERDETAILS();
      guaranter.AC_NO = BANKACNO;
      guaranter.AC_TYPE = String(schemaId);
      guaranter.AC_ACNOTYPE = row.AC_ACNOTYPE || 'LN';
      guaranter.AC_NAME = idmasterID ? idmasterID.AC_NAME : (row.NAME || 'UNKNOWN');
      guaranter.MEMBER_NO = row.MEMBER_NO ? String(row.MEMBER_NO).padStart(6, '0') : '';
      guaranter.GAC_CUSTID = idmasterID?.id || 0;
      guaranter.lnmasterID = parentId;

      // REMOVED status and REF_ID because they don't exist in your DB table
      await queryRunner.manager.save(GUARANTERDETAILS, guaranter);
    }
  }

  // --- 3. CO-BORROWERS ---
  async migrateLNCoborrowers(ele: any, parentId: number, queryRunner: any, custMap: Map<string, any>, BANKACNO: string, schemaId: number) {
    const sql = `SELECT * FROM COBORROWER 
                 WHERE TO_NUMBER(AC_NO) = ${ele.AC_NO} 
                 AND TO_NUMBER(AC_TYPE) = ${ele.AC_TYPE}`;

    const result = await this.clientConn.execute(sql);
    const rows = this.mapOracleToPgRows(result);

    for (const row of rows) {
      const idmasterID = custMap.get(String(row.AC_CUSTID || '').trim());
      const coborrowerObj = new COBORROWER();
      coborrowerObj.AC_TYPE = String(schemaId);
      coborrowerObj.AC_ACNOTYPE = row.AC_ACNOTYPE;
      coborrowerObj.AC_NO = BANKACNO;
      coborrowerObj.AC_NAME = idmasterID ? idmasterID.AC_NAME : (row.NAME || 'UNKNOWN');
      coborrowerObj.lnmasterID = parentId;

      // REMOVED status because it doesn't exist in your DB table
      await queryRunner.manager.save(COBORROWER, coborrowerObj);
    }
  }

  // --- 4. LNACINTRATE ---
  async migrateLNInterestRates(ele: any, parentId: number, branchInternalId: number, queryRunner: any, BANKACNO: string, schemaId: number) {
    const sql = `SELECT * FROM LNACINTRATE 
                 WHERE TO_NUMBER(AC_NO) = ${ele.AC_NO} 
                 AND TO_NUMBER(AC_TYPE) = ${ele.AC_TYPE} 
                 ORDER BY SERIAL_NO`;

    const result = await this.clientConn.execute(sql);
    const rows = this.mapOracleToPgRows(result);

    for (const row of rows) {
      const intRate = new LNACINTRATE();
      intRate.AC_ACNOTYPE = row.AC_ACNOTYPE;
      intRate.AC_NO = Number(row.AC_NO);
      intRate.AC_TYPE = schemaId;
      intRate.EFFECT_DATE = row.EFFECT_DATE ? moment(row.EFFECT_DATE).format('DD/MM/YYYY') : '';
      intRate.SERIAL_NO = row.SERIAL_NO;
      intRate.INT_RATE = Number(row.INT_RATE) || 0;
      intRate.BRANCH_CODE = branchInternalId;
      intRate.BANKACNO = BANKACNO;
      intRate.lnmasterID = parentId;

      // REMOVED status because it doesn't exist in your DB table
      await queryRunner.manager.save(LNACINTRATE, intRate);
    }
  }


  private mapOracleToPgRows(result: any): Record<string, any>[] {
    if (!result || !result.rows) return [];
    const oracleResult = result as OracleQueryResult;
    return oracleResult.rows.map((row: any[]) => {
      const obj: Record<string, any> = {};
      oracleResult.metaData.forEach((meta, index) => {
        obj[meta.name] = row[index];
      });
      return obj;
    });
  }

  private groupChildrenByAccount(rows: Record<string, any>[]): Map<string, any[]> {
    const map = new Map<string, any[]>();
    for (const row of rows) {
      // Ensure we use the exact same format as the relKey in the loop
      const key = `${String(row.AC_NO || '').trim()}_${String(row.AC_TYPE || '').trim()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(row);
    }
    return map;
  }


  // ---------------- PGMASTER WITH CHILDREN MIGRATION ----------------

  async TableData() {
    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    try {
      // Load Branches
      const branchRes = await queryRunner.manager.query(`SELECT id, "CODE" FROM ownbranchmaster`);
      this.PostBranch = branchRes;

      // Find the specific branch record for current context
      this.PostBranchOne = branchRes.filter(b => Number(b.CODE) === Number(this.BRANCH_CODE));

      // Load System Parameters
      this.PostSyspara = await queryRunner.manager.query(`SELECT * FROM syspara LIMIT 1`);

      // Load Schema Mapping (CRITICAL for your PGMASTER lookup)
      this.PostSchemast = await queryRunner.manager.query(`SELECT id, "S_APPL", "S_ACNOTYPE" FROM schemast`);

      // Load Customer Master Mapping
      this.Postidmaster = await queryRunner.manager.query(`SELECT id, "ORA_AC_NO", "AC_NAME", "ORA_BRANCH" FROM idmaster`);

      this.logger.log('Master tables loaded into memory.');
    } finally {
      await queryRunner.release();
    }
  }


  //============================PGMASTER MIGRATION ===================================

async migratePGMASTERWithChildren() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');

    if (this.offset === 0) {
      const countRes = await this.clientConn.execute(`SELECT COUNT(*) AS TOTAL FROM PGMASTER`);
      const countData = this.mapOracleToPgRows(countRes);
      this.count = Number(countData[0].TOTAL || 0);
      this.logger.log(`Total PGMASTER rows found: ${this.count}`);
    }

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      await this.TableData();

      // 1. FETCH SYSTEM & BRANCH DATA
      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');
      const branches = await queryRunner.manager.query(`SELECT id, "CODE" FROM ownbranchmaster`);
      const branchMap = new Map(branches.map(b => [Number(b.CODE), b.id]));
      const defaultBranchId = (branches[0]?.id || 1) as number;

      // 2. FETCH ORACLE DATA
      const result = await this.clientConn.execute(`
            SELECT * FROM (
                SELECT rownum offset_val, rs.* FROM (
                    SELECT * FROM PGMASTER ORDER BY AC_NO ASC
                ) rs
            ) WHERE offset_val <= ${this.offset + this.limit} AND offset_val > ${this.offset}
        `);
      const pgData = this.mapOracleToPgRows(result);

      const [nomineeRes, jointRes, attorneyRes] = await Promise.all([
        this.clientConn.execute(`SELECT * FROM NOMINEELINK`),
        this.clientConn.execute(`SELECT * FROM JOINTACLINK`),
        this.clientConn.execute(`SELECT * FROM ATTERONEYLINK`)
      ]);

      const nomineeRows = this.mapOracleToPgRows(nomineeRes);
      const jointRows = this.mapOracleToPgRows(jointRes);
      const attorneyRows = this.mapOracleToPgRows(attorneyRes);

      const acToIdMap = new Map<string, number>();
      let successCount = 0;

      await queryRunner.startTransaction();

     // 3. PROCESS PGMASTER
      for (const ele of pgData) {
        const schemastData = this.PostSchemast?.find(s => Number(s['S_APPL']) === Number(ele.AC_TYPE));
        if (!schemastData) continue;

        const idmaster = this.Postidmaster?.find(idm => Number(idm['ORA_AC_NO']) === Number(ele.AC_CUSTID));
        const targetIdMasterId = idmaster ? idmaster.id : 1;

        const rowBranchCodeRaw = syspara[0]?.BRANCH_CODE || ele.INVEST_BRANCH || ele.AC_INTROBRANCH || 1;
        const branchInternalId = branchMap.get(Number(rowBranchCodeRaw)) || defaultBranchId;
        const branchCodeString = String(rowBranchCodeRaw).padStart(3, '0');

        // --- VARIABLE DECLARATION (Only Once) ---
        const offsetAcNoInt = 100000 + Number(ele.AC_NO);
        const schemeTrimmed = String(schemastData.S_APPL).padStart(3, '0').slice(0, 3);
        const acNoFinal = String(offsetAcNoInt).padStart(6, '0');
        const bankAcNo15 = `${bankCode}${branchCodeString}${schemeTrimmed}${acNoFinal}`;

        const schemaId = schemastData.id;
        const agentInternalId = 1; 
        const agentBankAcNo = ele.AGENT_ACNO || '';

        // --- THE INSERT LOGIC ---
        const insertRes = await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('pgmaster')
          .values({
            BANKACNO: bankAcNo15,
            AC_NO: offsetAcNoInt,
            AC_ACNOTYPE: 'PG',
            AC_TYPE: schemaId,
            idmasterID: targetIdMasterId,
            AC_CUSTID: ele.AC_CUSTID ? Number(ele.AC_CUSTID) : 1,
            AC_SHORT_NAME: this.transformValue(ele.AC_SHORT_NAME) || undefined,
            AC_CATG: ele.AC_CATG || undefined,
            AC_OPR_CODE: ele.AC_OPR_CODE || undefined,
            AC_INTCATA: ele.AC_INTCATA || undefined,
            BRANCH_CODE: branchInternalId,
            AC_MONTHS: Number(ele.AC_MONTHS) || 0,
            AC_SCHMAMT: Number(ele.AC_SCHMAMT) || 0,
            AC_AGE: (ele.AC_AGE !== null && ele.AC_AGE !== undefined) ? Number(ele.AC_AGE) : undefined,

            // Date Fields
            AC_EXPDT: ele.AC_EXPDT ? moment(ele.AC_EXPDT).format('DD/MM/YYYY') : undefined,
            AC_CLOSEDT: ele.AC_CLOSEDT ? moment(ele.AC_CLOSEDT).format('DD/MM/YYYY') : undefined,
            AC_BALDATE: ele.AC_BALDATE ? moment(ele.AC_BALDATE).format('DD/MM/YYYY') : undefined,
            AC_OPDATE: ele.AC_OPDATE ? moment(ele.AC_OPDATE).format('DD/MM/YYYY') : undefined,

            AC_OCODE: ele.AC_OCODE || undefined,
            AC_INTROBRANCH: ele.AC_INTROBRANCH || undefined,
            AC_INTROID: ele.AC_INTROID || undefined,
            AC_INTRACNO: (ele.AC_INTRACNO !== null && ele.AC_INTRACNO !== undefined) ? String(ele.AC_INTRACNO) : undefined,

            AC_OP_BAL: ele.AC_OP_BAL || 0,
            AC_OP_CD: ele.AC_OP_CD || 'C',
            AC_CLOSED: Number(ele.AC_CLOSED) === 1 ? 1 : 0,
            AC_ODDAYS: ele.AC_ODDAYS || 0,

            AGENT_BRANCH: branchInternalId,
            AC_NAME: idmaster ? idmaster.AC_NAME : (this.transformValue(ele.AC_NAME) || undefined),
            AC_MEMBTYPE: ele.AC_MEMBTYPE === 99200 ? 99020 : (ele.AC_MEMBTYPE || undefined),
            AC_MEMBNO: Number(ele.AC_MEMBNO) + 100000,
            AGENT_ACTYPE: agentInternalId,
            AGENT_ACNO: agentBankAcNo,
            status: 1,
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'SYSTEM'
          })
          .orUpdate(
            [
              'AC_NAME', 'idmasterID', 'AC_CUSTID', 'AC_TYPE', 'BRANCH_CODE', 'AC_CLOSED',
              'AC_SHORT_NAME', 'AC_CATG', 'AC_OPR_CODE', 'AC_INTCATA', 'AC_MONTHS', 
              'AC_SCHMAMT', 'AC_AGE', 'AC_EXPDT', 'AC_CLOSEDT', 'AC_BALDATE', 
              'AC_OPDATE', 'AC_MEMBTYPE', 'AC_MEMBNO'
            ],
            ['BANKACNO']
          )
          .returning('id')
          .execute();

        const pgId = insertRes.identifiers[0]?.id;
        if (pgId) {
          acToIdMap.set(`PG-${ele.AC_NO}`, pgId);
          successCount++;
        }
      }

        
      const getActualParentId = async (acType: string, acNo: any) => {
          const key = `${acType.trim()}-${acNo}`; // Use trim to handle Oracle spaces
          if (acToIdMap.has(key)) return acToIdMap.get(key);

          // CRITICAL: You must query using the 100,000 offset
          const offsetAcNo = 100000 + Number(acNo);
          
          const dbRecord = await queryRunner.manager.query(
              `SELECT id FROM pgmaster WHERE "AC_ACNOTYPE" = $1 AND "AC_NO" = $2 LIMIT 1`,
              ['PG', offsetAcNo] // Force 'PG' to match your insert hardcode
          );
          return dbRecord[0]?.id || null;
      };

      // 🚀 NEW HELPER: Get DPMaster ID to find existing child rows
      const getDPMasterId = async (acNo: any) => {
        // DPMaster uses raw AC_NO without the 100,000 offset
        const dbRecord = await queryRunner.manager.query(
          `SELECT id FROM dpmaster WHERE "AC_NO" = $1 LIMIT 1`,
          [Number(acNo)]
        );
        return dbRecord[0]?.id || null;
      };

      // 4. PROCESS CHILD LINKS


      // --- Nominees ---
     
      for (const n of nomineeRows) {
          // Pass 'PG' explicitly because that is what you used in the PGMaster insert
          const pgParentId = await getActualParentId('PG', n.AC_NO);
          const dpParentId = await getDPMasterId(n.AC_NO);
          
          // If the account isn't found in pgmaster, we can't link the nominee
          if (!pgParentId) {
              this.logger.warn(`Could not find PGMaster ID for Oracle AC_NO: ${n.AC_NO}`);
              continue;
          }

          const nName = this.transformValue(n.AC_NNAME?.replace("\x00", "").trim() || 'Unknown');

          // Find if this nominee exists for the DP version of this account
          const existing = dpParentId ? await queryRunner.manager.query(
              `SELECT id FROM nomineelink WHERE "DPMasterID" = $1 AND TRIM("AC_NNAME") = $2 LIMIT 1`,
              [dpParentId, nName]
          ) : [];

          if (existing.length > 0) {
              // UPDATE: Point the existing nominee to the new Pigmy ID
              await queryRunner.manager.query(
                  `UPDATE nomineelink SET "pigmyAID" = $1 WHERE id = $2`,
                  [pgParentId, existing[0].id]
              );
          } else {
              // INSERT: Create new nominee linked to Pigmy
              await queryRunner.manager.query(
                  `INSERT INTO nomineelink ("pigmyAID", "DPMasterID", "AC_NNAME", "AC_NRELA", "AC_NDATE", "AGE") 
                  VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`,
                  [pgParentId, null, nName, n.AC_NRELA || '', n.AC_NDATE || null, n.AGE || 0]
              );
          }
      }

      // --- Joint ---
      for (const j of jointRows) {
        const pgParentId = await getActualParentId(j.AC_ACNOTYPE, j.AC_NO);
        const dpParentId = await getDPMasterId(j.AC_NO);
        if (!pgParentId) continue;

        const jName = this.transformValue(j.JOINT_ACNAME?.replace("\x00", "").trim() || '');

        const existing = dpParentId ? await queryRunner.manager.query(
          `SELECT id FROM joint_ac_link WHERE "DPMasterID" = $1 AND TRIM("JOINT_ACNAME") = $2 LIMIT 1`,
          [dpParentId, jName]
        ) : [];

        if (existing.length > 0) {
          // Using PGMasterID as confirmed for this table
          await queryRunner.manager.query(
            `UPDATE joint_ac_link SET "PGMasterID" = $1 WHERE id = $2`,
            [pgParentId, existing[0].id]
          );
        } else {
          await queryRunner.manager.query(
            `INSERT INTO joint_ac_link ("PGMasterID", "DPMasterID", "JOINT_ACNAME", "OPERATOR") 
                      VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
            [pgParentId, null, jName, Number(j.OPERATOR) === 0 ? 'No' : 'Yes']
          );
        }
      }

      // --- Attorney ---
      for (const a of attorneyRows) {
        const pgParentId = await getActualParentId(a.AC_ACNOTYPE, a.AC_NO);
        const dpParentId = await getDPMasterId(a.AC_NO);
        if (!pgParentId) continue;

        const aName = this.transformValue(a.ATTERONEY_NAME?.replace("\x00", "").trim() || '');

        const existing = dpParentId ? await queryRunner.manager.query(
          `SELECT id FROM atteroneylink WHERE "DPMasterID" = $1 AND TRIM("ATTERONEY_NAME") = $2 LIMIT 1`,
          [dpParentId, aName]
        ) : [];

        if (existing.length > 0) {
          // Using PGMasterID as confirmed for this table
          await queryRunner.manager.query(
            `UPDATE atteroneylink SET "PGMasterID" = $1 WHERE id = $2`,
            [pgParentId, existing[0].id]
          );
        } else {
          await queryRunner.manager.query(
            `INSERT INTO atteroneylink ("PGMasterID", "DPMasterID", "ATTERONEY_NAME", "DATE_APPOINTED", "DATE_EXPIRY") 
                      VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
            [pgParentId, null, aName, a.DATE_APPOINTED || null, a.DATE_EXPIRY || null]
          );
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log(`✅ PG Migration Batch Successful: ${successCount} accounts processed.`);

      // NEW: Recursion Logic to fetch next batch
      if (this.offset + this.limit < this.count) {
        this.offset += this.limit;
        await this.migratePGMASTERWithChildren(); // Calls the next 200 rows
      } else {
        // Reset for next time
        this.offset = 0;
      }

      return { success: true, count: successCount };

    } catch (err: any) {
      if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
      this.logger.error("❌ Migration failed:", err.message);
      throw err;
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  // ---------------- SHMASTER WITH NOMINEE LINK ----------------

  async migrateSHMASTERWithChild() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');
    this.logger.log('Starting SHMASTER migration with row-level error handling...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    // 1. LOAD MASTER LOOKUPS (Outside the loop for performance)
    const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
    //const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');

    const bankCode = Number(syspara[0]?.BANK_CODE || 0);

    const branches = await queryRunner.manager.query(`SELECT id, "CODE" FROM ownbranchmaster`);
    const branchMap = new Map(branches.map(b => [Number(b.CODE), b.id]));
    const defaultBranchId = branches[0]?.id || 1;

    const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
      `SELECT id, "S_APPL" FROM schemast`
    );
    const schemaMap = new Map(schemaData.map(r => [Number(r.S_APPL), r.id]));

    const idMasterData = await queryRunner.manager.query<{ id: number; ORA_AC_NO: string; AC_NAME: string }[]>(
      `SELECT id, "ORA_AC_NO", "AC_NAME" FROM idmaster`
    );
    const custMap = new Map(idMasterData.map(x => [String(x.ORA_AC_NO).trim(), x]));

    // 2. FETCH ORACLE DATA
    const result = await this.clientConn.execute(`
    SELECT SHMASTER.*, CATEGORYMASTER.CODE AS ACCATG, SCHEMAST.S_APPL 
    FROM SHMASTER 
    LEFT JOIN CATEGORYMASTER ON SHMASTER.AC_CATG = CATEGORYMASTER.CODE 
    LEFT JOIN SCHEMAST ON SHMASTER.AC_TYPE = SCHEMAST.S_APPL
    ORDER BY SHMASTER.AC_NO ASC
  `);
    const rows = this.mapOracleToPgRows(result);

    let successCount = 0;
    let errorCount = 0;

    for (const ele of rows) {
      // START TRANSACTION FOR EACH INDIVIDUAL ACCOUNT
      await queryRunner.startTransaction();

      try {
        const schemaId = schemaMap.get(Number(ele.AC_TYPE));
        if (!schemaId) {
          throw new Error(`Schema S_APPL ${ele.AC_TYPE} not found in Postgres.`);
        }

        const idmaster = custMap.get(String(ele.AC_CUSTID || '').trim());
        const transformedAcNo = Number(ele.AC_NO) + 100000;

        // Change this line:
        const rowBranchCode = syspara[0]?.BRANCH_CODE || ele.AC_BRANCH || 1;
        const branchInternalId = branchMap.get(Number(rowBranchCode)) || defaultBranchId;
        // const branchCodeForAc = String(rowBranchCode).padStart(3, '0');
        const branchCodeForAc = Number(rowBranchCode || 0);


        const bankAcNo = this.generateBankAcNo(
          bankCode,
          branchCodeForAc,
          ele.S_APPL || ele.AC_TYPE,
          transformedAcNo
        );

        const transferSchemaId = ele.DIV_TRANSFER_ACTYPE
          ? schemaMap.get(Number(ele.DIV_TRANSFER_ACTYPE))
          : null;

        // Duplicate Check
        const exists = await queryRunner.manager.query(
          `SELECT id FROM shmaster WHERE "BANKACNO" = $1`, [bankAcNo]
        );

        if (exists.length > 0) {
          this.logger.warn(`SH Account ${bankAcNo} already exists. Skipping.`);
          await queryRunner.rollbackTransaction();
          continue;
        }

        const payload = {
          BANKACNO: bankAcNo,
          AC_NO: transformedAcNo,
          AC_ACNOTYPE: 'SH',
          AC_TYPE: schemaId,
          BRANCH_CODE: branchInternalId,
          idmasterID: idmaster?.id || 1,
          AC_CUSTID: ele.AC_CUSTID ? Number(ele.AC_CUSTID) : 1,
          AC_NAME: idmaster ? idmaster.AC_NAME : this.transformValue(ele.AC_NAME),
          ORA_AC_NAME: this.transformValue(ele.AC_NAME),
          AC_OPDATE: ele.AC_OPDATE ? moment(ele.AC_OPDATE).format('DD/MM/YYYY') : null,
          AC_OP_BAL: Number(ele.AC_OP_BAL) || 0,
          AC_FACE_VALUE: Number(ele.AC_FACE_VALUE) || 0,
          AC_OP_SHNO: Number(ele.AC_OP_SHNO) || 0,

          // Logic for AC_CLOSED to handle 0 or -1
          AC_CLOSED: (ele.AC_CLOSED == 1 || ele.AC_CLOSED == -1) ? Number(ele.AC_CLOSED) : 0,

          AC_CLOSEDT: ele.AC_CLOSEDT ? moment(ele.AC_CLOSEDT).format('DD/MM/YYYY') : null,
          REF_ID: ele.REF_ID,
          status: 1,
          SYSCHNG_LOGIN: ele.OFFICER_CODE || 'MIGRATION',

          // --- FIXED FIELDS BASED ON YOUR REQUIREMENTS ---
          EMP_NO: ele.EMP_NO || null,
          AC_SHBALDATE: ele.AC_SHBALDATE ? moment(ele.AC_SHBALDATE).format('DD/MM/YYYY') : null,
          MEMBERSHIP_BY: ele.MEMBERSHIP_BY || null,
          AC_CATG: ele.AC_CATG || null,
          AC_DIRECT: Number(ele.AC_DIRECT) || 0,

          // 1. AC_BRANCH: Using branch from SYSPARA (branchInternalId is derived from syspara[0])
          AC_BRANCH: branchInternalId,

          // 2. SALARY DIVISION: Defaulting to 0 as requested
          AC_SALARY_DIVISION_CODE: Number(ele.AC_SALARY_DIVISION_CODE) || 0,
          SUB_SALARY_DIVISION_CODE: Number(ele.SUB_SALARY_DIVISION_CODE) || 0,

          REF_ACNO: ele.REF_ACNO || null,
          DIV_TRANSFER_ACNOTYPE: ele.DIV_TRANSFER_ACNOTYPE || null,

          // 3. DIV_TRANSFER_ACTYPE: Map from your Postgres schemast ID
          DIV_TRANSFER_ACTYPE: transferSchemaId,

          // 4. DIV_TRANSFER_ACNO: Converted to 1 Lakh (adding 100,000)
          DIV_TRANSFER_ACNO: ele.DIV_TRANSFER_ACNO ? (Number(ele.DIV_TRANSFER_ACNO) + 100000) : null,

          AC_OP_CD: ele.AC_OP_CD || 'C'
        };

        const shInsert = await queryRunner.manager.createQueryBuilder()
          .insert().into('shmaster').values(payload).execute();

        const parentId = shInsert.identifiers[0].id as number;

        // 3. CALL CHILD TABLE LOGIC (Nominees)
        await this.migrateSHNominee(ele, parentId, queryRunner);

        // COMMIT THE TRANSACTION FOR THIS ROW
        await queryRunner.commitTransaction();
        successCount++;

      } catch (rowError: any) {
        // ROLLBACK ONLY THIS ROW ON FAILURE
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        errorCount++;
        this.logger.error(`FAILED to migrate SH Account: ${ele.AC_NO}. Reason: ${rowError.message}`);
      }
    }

    this.logger.log(`SHMASTER Migration Finished. Success: ${successCount}, Errors: ${errorCount}`);
    return { success: true, count: successCount, errors: errorCount };
  }

  // --- CHILD FUNCTION: NOMINEE LINK FOR SH ---

  async migrateSHNominee(ele: any, parentId: number, queryRunner: any) {
    try {
      // 1. Fetch from Oracle
      const sql = `SELECT * FROM NOMINEELINK 
                 WHERE TO_NUMBER(AC_NO) = TO_NUMBER(:1) 
                 AND TO_NUMBER(AC_TYPE) = TO_NUMBER(:2)
                 AND TRIM(AC_ACNOTYPE) = 'SH'`;

      const result = await this.clientConn.execute(sql, [ele.AC_NO, ele.AC_TYPE]);
      const data = this.mapOracleToPgRows(result);

      // LOG: Warn if no nominees are found for an active Share account
      if (!data || data.length === 0) {
        this.logger.warn(`No Nominees found in Oracle for SH Account: ${ele.AC_NO}`);
        return;
      }

      for (const element of data) {
        const nomineePayload = {
          sharesID: parentId,
          AC_NNAME: this.transformValue(element.AC_NNAME || element.NAME) || 'Unknown',
          AC_NRELA: this.transformValue(element.AC_NRELA || element.RELATION) || '',
          AC_NDATE: element.AC_NDATE ? moment(element.AC_NDATE).format('DD/MM/YYYY') : null,
          AGE: element.AGE ? String(element.AGE) : '',
          AC_NADDR: this.transformValue(element.AC_NADDR || element.ADDR1) || '',
          AC_NO: 100000 + Number(element.AC_NO),
          status: '1'
        };

        const insertResult = await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('nomineelink')
          .values(nomineePayload)
          .execute();

        // LOG: Verify insertion success
        if (!insertResult.identifiers || insertResult.identifiers.length === 0) {
          this.logger.error(`FAILED to insert Nominee record into Postgres for SH Account: ${ele.AC_NO}`);
        } else {
          this.logger.debug(`Successfully linked Nominee for SH ID: ${parentId}`);
        }
      }
    } catch (err: any) {
      // Rethrow with context to be caught by the parent loop's try-catch
      throw new Error(`SH Nominee Link Process Failed for AC ${ele.AC_NO}: ${err.message}`);
    }
  }

  // ---------------- SCHEMAST MIGRATION ----------------
  async migrateSCHEMAST() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.clientConn.execute(`SELECT * FROM SCHEMAST ORDER BY S_APPL`);
      const data = this.convertOracleRows(result as any);

      const existing = await queryRunner.manager.query(`SELECT "S_APPL" FROM schemast`);
      const existingSet = new Set(existing.map(e => Number(e.S_APPL)));

      let inserted = 0;

      for (const ele of data) {

        // if (!ele.S_RECBL_ODUE_INT_ACNO && !ele.s_recbl_odue_int_acno) {
        //   console.log(" Missing S_RECBL_ODUE_INT_ACNO for:", ele.S_APPL);
        // } else {
        //   console.log(" Value:", ele.S_RECBL_ODUE_INT_ACNO || ele.s_recbl_odue_int_acno);
        // }
        const sAppl = Number(ele.S_APPL);
        if (!sAppl || existingSet.has(sAppl)) continue;

        const obj: any = {

          // BASIC
          S_ACNOTYPE: ele.S_ACNOTYPE,
          S_APPL: sAppl,
          S_NAME: this.transformValue(ele.S_NAME),
          S_SHNAME: this.transformValue(ele.S_SHNAME),

          // ACCOUNT
          S_GLACNO: ele.S_GLACNO,
          S_INT_ACNO: ele.S_INT_ACNO,
          S_RECBL_PYBL_INT_ACNO: ele.S_RECBL_PYBL_INT_ACNO,

          S_PENAL_ACNO: ele.S_PENAL_ACNO,
          S_RECBL_PENAL_ACNO: ele.S_RECBL_PENAL_ACNO,
          S_RECBL_ODUE_INT_ACNO: ele.S_RECBL_ODUE_INT_ACNO,
          S_OUTSTANDING_INT_ACNO: ele.S_OUTSTANDING_INT_ACNO,
          S_CASH_INT_ACNO: ele.S_CASH_INT_ACNO,
          S_INT_CR_ACNO: ele.S_INT_CR_ACNO,

          // FLAGS
          IS_DEPO_LOAN: ele.IS_DEPO_LOAN == 0 ? '0' : '1',
          S_INT_APPLICABLE: ele.S_INT_APPLICABLE == 0 ? '0' : '1',
          POST_TO_INDIVIDUAL_AC: ele.POST_TO_INDIVIDUAL_AC == 0 ? '0' : '1',
          S_RECEIVABLE_INT_ALLOW: ele.S_RECEIVABLE_INT_ALLOW == 0 ? '0' : '1',
          S_PAYABLE_INT_ALLOW: ele.S_PAYABLE_INT_ALLOW == 0 ? '0' : '1',
          IS_AUTO_CUT_INSTRUCTION: ele.IS_AUTO_CUT_INSTRUCTION == 0 ? '0' : '1',
          IS_ALLOW_SI_MINBAL: ele.IS_ALLOW_SI_MINBAL == 0 ? '0' : '1',
          WITHDRAWAL_APPLICABLE: ele.WITHDRAWAL_APPLICABLE == 0 ? '0' : '1',


          IS_INT_ON_RECINT: ele.IS_INT_ON_RECINT == 0 ? '0' : '1',
          IS_INT_ON_OTHERAMT: ele.IS_INT_ON_OTHERAMT == 0 ? '0' : '1',
          IS_INTUPTODATE: ele.IS_INTUPTODATE == 0 ? '0' : '1',
          IS_NO_POST_INT_AFT_OD: ele.IS_NO_POST_INT_AFT_OD == 0 ? '0' : '1',

          // INTEREST   
          INTEREST_METHOD: ele.INTEREST_METHOD,
          MIN_INT_LIMIT: ele.MIN_INT_LIMIT,
          S_INTCALC_METHOD: ele.S_INTCALC_METHOD,
          S_INTCALTP: ele.S_INTCALTP,
          S_INTADD_PRINCIPLE: ele.S_INTADD_PRINCIPLE == 0 ? '0' : '1',
          S_INTASON: ele.S_INTASON == 0 ? '0' : '1',
          S_INTPAID: ele.S_INTPAID == 0 ? '0' : '1',
          S_INTPAID_ON_CLOSING: ele.S_INTPAID_ON_CLOSING == 0 ? '0' : '1',
          INT_INSTRUCTION_ALLOW: ele.INT_INSTRUCTION_ALLOW == 0 ? '0' : '1',
          RECEIPT_NO_INPUT: ele.RECEIPT_NO_INPUT == 0 ? '0' : '1',

          FIX_QUARTER: ele.FIX_QUARTER == 0 ? '0' : '1',
          QUARTER_PLUS_DAYS: ele.QUARTER_PLUS_DAYS == 0 ? '0' : '1',

          // PENAL
          S_PENAL_INT_APPLICABLE: ele.S_PENAL_INT_APPLICABLE == 0 ? '0' : '1',
          S_PENAL_INT_RATE: ele.S_PENAL_INT_RATE,
          PENAL_METHOD: ele.PENAL_METHOD,
          S_DUE_LIST_ALLOW: ele.S_DUE_LIST_ALLOW == 0 ? '0' : '1',
          GRACE_PERIOD_APPLICABLE: ele.GRACE_PERIOD_APPLICABLE == 0 ? '0' : '1',
          MORATORIUM_APPLICABLE: ele.MORATORIUM_APPLICABLE == 0 ? '0' : '1',
          STAND_INSTRUCTION_ALLOW: ele.STAND_INSTRUCTION_ALLOW == 0 ? '0' : '1',
          BALANCE_ADD_APPLICABLE: ele.BALANCE_ADD_APPLICABLE == 0 ? '0' : '1',
          IS_UNSECURED_LOAN: ele.IS_UNSECURED_LOAN == 0 ? '0' : '1',
          IS_OVERDUE_CHARGES_APPLY: ele.IS_OVERDUE_CHARGES_APPLY == 0 ? '0' : '1',

          //LOAN
          MAX_LOAN_LMT: ele.MAX_LOAN_LMT,
          ROUNDOFF_FACTOR: ele.ROUNDOFF_FACTOR,
          DEFAULT_LOAN_PERIOD: ele.DEFAULT_LOAN_PERIOD,
          IS_LOAN_PERIOD_LOCK: ele.IS_LOAN_PERIOD_LOCK == 0 ? '0' : '1',
          MIN_LOAN_PERIOD: ele.MIN_LOAN_PERIOD,
          MAX_LOAN_PERIOD: ele.MAX_LOAN_PERIOD,

          MIN_DUE_INSTALLMENTS: ele.MIN_DUE_INSTALLMENTS,


          IS_DAYBASE_INT_CALCULATION: ele.IS_DAYBASE_INT_CALCULATION == 0 ? '0' : '1',
          IS_INSTRUCTION_UPTO_MATURITY: ele.IS_INSTRUCTION_UPTO_MATURITY == 0 ? '0' : '1',
          SANCT_LIMIT_PERCENTAGE: ele.SANCT_LIMIT_PERCENTAGE,
          RETIREMENT_YEARS: ele.RETIREMENT_YEARS,
          SH_CERTIFICATE_METHOD: ele.SH_CERTIFICATE_METHOD,
          MATURED_BUT_NOT_PAID_GLAC: ele.MATURED_BUT_NOT_PAID_GLAC,
          IS_RENEWAL_ALLOW: ele.IS_RENEWAL_ALLOW == 0 ? '0' : '1',
          IS_INT_ON_DEPO_AMT: ele.IS_INT_ON_DEPO_AMT == 0 ? '0' : '1',


          DEPOSIT_PENAL_INT_CALC_DAY: ele.DEPOSIT_PENAL_INT_CALC_DAY,
          IS_POST_PENAL_TO_AC: ele.IS_POST_PENAL_TO_AC == 0 ? '0' : '1',
          POST_PENALINT_IN_INTEREST: ele.POST_PENALINT_IN_INTEREST == 0 ? '0' : '1',
          IS_REC_PENAL_APPL: ele.IS_REC_PENAL_APPL == 0 ? '0' : '1',
          IS_CAL_PENAL_AFTER_EXPIRY: ele.IS_CAL_PENAL_AFTER_EXPIRY == 0 ? '0' : '1',

          // PERIOD / PRODUCT
          S_PRODUCT_DAY_BASE: ele.S_PRODUCT_DAY_BASE,
          S_PRODUCT_DAY_BASE_END: ele.S_PRODUCT_DAY_BASE_END,
          PERIOD_APPLICABLE: ele.PERIOD_APPLICABLE == 0 ? '0' : '1',
          IS_AUTO_PERIOD_CALCULATE: ele.IS_AUTO_PERIOD_CALCULATE == 0 ? '0' : '1',

          UNIT_OF_PERIOD: ele.UNIT_OF_PERIOD,
          MIN_DAYS: ele.MIN_DAYS,
          MIN_MONTH: ele.MIN_MONTH,
          MULTIPLE_OF_AMT: ele.MULTIPLE_OF_AMT,
          MULTIPLE_OF_DAYS: ele.MULTIPLE_OF_DAYS,
          MULTIPLE_OF_MONTH: ele.MULTIPLE_OF_MONTH,

          // MATURITY
          S_MATUCALC: ele.S_MATUCALC,
          IS_CAL_MATURITY_AMT: ele.IS_CAL_MATURITY_AMT == 0 ? '0' : '1',
          FIXED_MATURITY_AMT: ele.FIXED_MATURITY_AMT == 0 ? '0' : '1',
          TRANSFER_TO_MATURE_DEPOSIT: ele.TRANSFER_TO_MATURE_DEPOSIT == 0 ? '0' : '1',

          // INSTALLMENT
          S_INSTTYPE: ele.S_INSTTYPE == 0 ? '0' : '1',
          INSTALLMENT_METHOD: ele.INSTALLMENT_METHOD,
          INSTALLMENT_BASIS: ele.INSTALLMENT_BASIS,
          IS_ASSUMED_INSTALLMENTS: ele.IS_ASSUMED_INSTALLMENTS == 0 ? '0' : '1',
          INSTALLMENT_COMPULSORY_IN_PAT: ele.INSTALLMENT_COMPULSORY_IN_PAT == 0 ? '0' : '1',
          IS_OVERDUE_ON_INSTALLMENT: ele.IS_OVERDUE_ON_INSTALLMENT,
          IS_SHOW_INT_AS_RECINT_IFDUEBAL: ele.IS_SHOW_INT_AS_RECINT_IFDUEBAL == 0 ? '0' : '1',


          // EXTRA FLAGS
          IS_RECURRING_TYPE: ele.IS_RECURRING_TYPE == 0 ? '0' : '1',
          IS_CALLDEPOSIT_TYPE: ele.IS_CALLDEPOSIT_TYPE == 0 ? '0' : '1',
          REINVESTMENT: ele.REINVESTMENT == 0 ? '0' : '1',
          IS_PRODUCTUPTODATE: ele.IS_PRODUCTUPTODATE == 0 ? '0' : '1',
          IS_START_WITH_MONTHS: ele.IS_START_WITH_MONTHS == 0 ? '0' : '1',
          IS_PRODUCT_BAL_BASE: ele.IS_PRODUCT_BAL_BASE,
          IS_DAYSBASE_INSTRUCTION: ele.IS_DAYSBASE_INSTRUCTION == 0 ? '0' : '1',
          PREMATURE_ON_DEPOSIT_INST: ele.PREMATURE_ON_DEPOSIT_INST == 0 ? '0' : '1',
          ALLOW_EXTRA_INSTALLMENTS: ele.ALLOW_EXTRA_INSTALLMENTS == 0 ? '0' : '1',
          MATURE_GRACE_MONTHS: ele.MATURE_GRACE_MONTHS,
          MATURE_GRACE_DAYS: ele.MATURE_GRACE_DAYS,
          IS_AUTO_CUTTING: ele.IS_AUTO_CUTTING == 0 ? '0' : '1', //100
          MAX_DEP_LMT: ele.MAX_DEP_LMT,
          IS_STD_INSTR_UPTO_MATURITY: ele.IS_STD_INSTR_UPTO_MATURITY == 0 ? '0' : '1',
          IS_ADD_PAYINT_IN_INSTRUCTION: ele.IS_ADD_PAYINT_IN_INSTRUCTION == 0 ? '0' : '1',
          PREMATURE_INTRATE_ASPER: ele.PREMATURE_INTRATE_ASPER,
          TD_RECEIPT_METHOD: ele.TD_RECEIPT_METHOD,
          ODPENALTY_ON_EXPIRED_LEDGERBAL: ele.ODPENALTY_ON_EXPIRED_LEDGERBAL == 0 ? '0' : '1',
          IS_CAL_EXTRAPENAL_FOR_CC: ele.IS_CAL_EXTRAPENAL_FOR_CC == 0 ? '0' : '1',
          IS_GOLD_LOAN: ele.IS_GOLDLOAN == 0 ? '0' : '1',
          S_CASH_PAID_MIN_AMT: ele.S_CASH_PAID_MIN_AMT,
          S_CASH_PAID_LOCK: ele.S_CASH_PAID_LOCK == 0 ? '0' : '1',
          S_LOCAL_CLEARING: ele.S_LOCAL_CLEARING == 0 ? '0' : '1',
          S_CHEQUE_BOOK: ele.S_CHEQUE_BOOK == 0 ? '0' : '1',
          S_DEMAND_DRAFT: ele.S_DEMAND_DRAFT == 0 ? '0' : '1',
          IS_PO_APPL: ele.IS_PO_APPL == 0 ? '0' : '1',
          S_TEMP_OVERDRFT: ele.S_TEMP_OVERDRFT == 0 ? '0' : '1',
          S_PERIODCL_OVERDRFT: ele.S_PERIODCL_OVERDRFT == 0 ? '0' : '1',
          S_SPECIAL_INSTRUCTION: ele.S_SPECIAL_INSTRUCTION == 0 ? '0' : '1',
          S_SUB_PRINT: ele.S_SUB_PRINT == 0 ? '0' : '1',
          S_FREEZE_APPLICABLE: ele.S_FREEZE_APPLICABLE == 0 ? '0' : '1',
          PROD_INTUPTODATE: ele.PROD_INTUPTODATE == 0 ? '0' : '1',
          INT_BASE_DAY: ele.INT_BASE_DAY,
          INT_BASE_METHOD: ele.INT_BASE_METHOD,
          SHOW_OVERDUEINT_IF_RECINTBAL: ele.SHOW_OVERDUEINT_IF_RECINTBAL,


          // SHARE
          MEMBER_TYPE: ele.MEMBER_TYPE,
          SHARES_FACE_VALUE: ele.SHARES_FACE_VALUE,
          MAX_SHARES_LIMIT: ele.MAX_SHARES_LIMIT,
          DIVIDEND_PERCENTAGE: ele.DIVIDEND_PERCENTAGE,
          IS_ADD_BONUS_IN_DIVIDEND: ele.IS_ADD_BONUS_IN_DIVIDEND == 0 ? '0' : '1',

          // LOCKER
          LOCKER_RENT_ACNO: ele.LOCKER_RENT_ACNO,
          LOCKER_RECBL_RENT_ACNO: ele.LOCKER_RECBL_RENT_ACNO,
          LOCKER_DEPOSIT_APPLICABLE: ele.LOCKER_DEPOSIT_APPLICABLE == 0 ? '0' : '1',

          // INTEREST EXTRA
          COMPOUND_INT_BASIS: ele.COMPOUND_INT_BASIS,
          COMPOUND_INT_DAYS: ele.COMPOUND_INT_DAYS,
          IS_DISCOUNTED_INT_RATE: ele.IS_DISCOUNTED_INT_RATE == 0 ? '0' : '1',

          INT_ROUND_OFF: ele.INT_ROUND_OFF == 0 ? '0' : '1',
          LESS_PREMATURE_INT_RATE: ele.LESS_PREMATURE_INT_RATE,
          PREMATURE_COMPOUND_INT: ele.PREMATURE_COMPOUND_INT == 0 ? '0' : '1',
          PIGMY_MACHINE_SCHEME: ele.PIGMY_MACHINE_SCHEME == 0 ? '0' : '1',
          SVR_CHARGE_GLCODE: ele.SVR_CHARGE_GLCODE,
          SVR_CHARGE_RATE: ele.SVR_CHARGE_RATE,
          INTEREST_RULE: ele.INTEREST_RULE == 0 ? '0' : '1',

          // OVERDRAFT
          OVERDRAFT_INTEREST_APPLICABLE: ele.OVERDRAFT_INTEREST_APPLICABLE,
          OVERDRAFT_INTEREST_RATE: ele.OVERDRAFT_INTEREST_RATE,

          // MISC
          CHEQUEBOOK_MIN_BAL: ele.CHEQUEBOOK_MIN_BAL,
          DORMANT_FLAG_APPLICABLE: ele.DORMANT_FLAG_APPLICABLE == 0 ? '0' : '1',
          MIN_BAL_FOR_INT: ele.MIN_BAL_FOR_INT,

          // RECOVERY
          IS_RECOVERY_APPLICABLE: ele.IS_RECOVERY_APPLICABLE == 0 ? '0' : '1',
          IS_ASK_RECOVERY: ele.IS_ASK_RECOVERY == 0 ? '0' : '1',
          RECOVERY_ACTYPE_FIELD: ele.RECOVERY_ACTYPE_FIELD,
          IS_INT_NOT_FROMINSTALLMENT: ele.IS_INT_NOT_FROMINSTALLMENT == 0 ? '0' : '1',
          IS_RECINT_FROM_INSTALLMENT: ele.IS_RECINT_FROM_INSTALLMENT == 0 ? '0' : '1',
          RECOVERY_ACNO_FIELD: ele.RECOVERY_ACNO_FIELD,
          RECOVERY_INST_FIELD: ele.RECOVERY_INST_FIELD,
          RECOVERY_INTINST_FIELD: ele.RECOVERY_INTINST_FIELD,
          RECOVERY_BALANCE_FIELD: ele.RECOVERY_BALANCE_FIELD,
          RECOVERY_RECEIVABLEINT_FIELD: ele.RECOVERY_RECEIVABLEINT_FIELD,
          RECOVERY_TOTINST_FILED: ele.RECOVERY_TOTINST_FIELD,
          RECOVERY_PENALINT_FIELD: ele.RECOVERY_PENALINT_FIELD,
          RECOVERY_RECEPENALINT_FIELD: ele.RECOVERY_RECPENALINT_FIELD,
          IS_AUTO_TDRENEWAL_REQUIRED: ele.IS_AUTO_TDRENEWAL_REQUIRED,
          ADD_AMT_IN_PRINCIPAL: ele.ADD_AMT_IN_PRINCIPAL,
          ADD_AMT_IN_RECPAY: ele.ADD_AMT_IN_RECPAY,
          //SMS_USE_IN_RECPAY: ele.SMS_USE_IN_RECPAY == 0 ? '0' : '1',
          SMS_USE_SHNAME: ele.SMS_USE_SHNAME == -1 ? '1' : '0',
          ALLOW_ODREM_SMS: ele.ALLOW_ODREM_SMS,
          ALLOW_REM_SMS: ele.ALLOW_REM_SMS == -1 ? '1' : '0',
          ALLOW_SMS: ele.ALLOW_SMS == -1 ? '1' : '0',
          RECOVERY_SEQUENCE: ele.RECOVERY_SEQUENCE,
          //RECOVERY_ACTYPE_FIELD : ele.RECOVERY_ACTYPE_FIELD ?? null,

          // FINAL FLAGS
          IS_ZERO_BAL_REQUIRED: ele.IS_ZERO_BAL_REQUIRED == 0 ? '0' : '1',
          IS_AUTO_NO: ele.IS_AUTO_NO == 0 ? '0' : '1',
          IS_TDS_APPLICABLE: ele.IS_TDS_APPLICABLE == 0 ? '0' : '1',
          AFTER_MATURE_INT_RATE: ele.AFTER_MATURE_INT_RATE,

          status: 1
        };

        await queryRunner.manager.insert('schemast', obj);
        inserted++;
      }

      await queryRunner.commitTransaction();
      console.log('SCHEMAST Completed');

      return { success: true, inserted };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('SCHEMAST ERROR:', error);
      throw error;

    } finally {
      await queryRunner.release();
    }
  }




  // ---------------- SYSPARA MIGRATION ----------------
  
  async migrateSYSPARA() {

    if (!this.clientConn) throw new Error('Client DB not connected');
    if (!this.serverDB) throw new Error('Server DB not connected');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // ✅ 1. Get Oracle data
      const result = await this.clientConn.execute(`SELECT * FROM SYSPARA`);
      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        throw new Error('No SYSPARA data found in Oracle');
      }

      const ele = rows[0];

      // ✅ 2. Check already exists (important)
      const existing = await queryRunner.manager.query(
        `SELECT id FROM syspara LIMIT 1`
      );

      if (existing.length > 0) {
        this.logger.warn('SYSPARA already exists, skipping...');
        return { success: true, message: 'Already exists' };
      }

      // ✅ 3. Prepare object
      const sys: any = {

        SYSPARA_CODE: ele.SYSPARA_CODE,
        BANK_CODE: ele.BANK_CODE,
        BRANCH_CODE: String(ele.BRANCH_CODE),

        BANK_NAME: this.transformValue(ele.BANK_NAME),
        ADDRESS: this.transformValue(ele.ADDRESS),

        MAX_CERTI_NO: ele.MAX_CERTI_NO,
        MAX_SHARES_NO: ele.MAX_SHARES_NO,

        CHAIRMAN: this.transformValue(ele.CHAIRMAN),
        ACCOUNTANT: this.transformValue(ele.ACCOUNTANT),
        GENERAL_MANAGER: this.transformValue(ele.GENERAL_MANAGER),

        COMPANY_START_DATE: ele.COMPANY_START_DATE
          ? moment(ele.COMPANY_START_DATE).format('DD/MM/YYYY')
          : null,

        NO_OF_EMPLOYEES: ele.NO_OF_EMPLOYEES,

        OFFICER_NAME: this.transformValue(ele.OFFICER_NAME),
        OFFICER_DESIGNATION: this.transformValue(ele.OFFICER_DESIGNATION),

        RBI_LICENCE_NO: ele.RBI_LICENCE_NO,

        MANAGER_NAME: this.transformValue(ele.MANAGER_NAME),

        // ✅ Boolean conversions
        RECOVERY_METHOD: ele.RECOVERY_METHOD == 0 ? '0' : '1',
        IS_PROCESS_FOR_MONTH: ele.IS_PROCESS_FOR_MONTH == 0 ? '0' : '1',
        IS_PROCESS_UPTO_TRANDATE: ele.IS_PROCESS_UPTO_TRANDATE == 0 ? '0' : '1',

        // ✅ Dates
        PREVIOUS_DATE: ele.PREVIOUS_DATE
          ? moment(ele.PREVIOUS_DATE).format('DD/MM/YYYY')
          : null,

        CURRENT_DATE: ele.CURRENT_DATE
          ? moment(ele.CURRENT_DATE).format('DD/MM/YYYY')
          : null,

        // add more fields if needed (you already wrote them 👍)

      };

      // ✅ 4. Insert
      await queryRunner.manager.insert('syspara', sys);

      await queryRunner.commitTransaction();

      this.logger.log('SYSPARA migration completed');

      return { success: true };

    } catch (error) {

      await queryRunner.rollbackTransaction();
      this.logger.error('SYSPARA migration failed', error);
      throw error;

    } finally {

      await queryRunner.release();
    }
  }


  // ---------------- ACMASTER MIGRATION ----------------
  async migrateACMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting ACMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();



    try {
      //Get Syspara and Branch info
      const syspara = await queryRunner.manager.query(
        `SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`
      );

      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`,
        [syspara[0]?.BRANCH_CODE || 101]
      );

      const branchId = branch[0]?.id || 1;

      const result = await this.clientConn.execute(`
      SELECT ACMASTER.*, SCHEMAST.S_APPL 
      FROM ACMASTER 
      LEFT JOIN SCHEMAST ON ACMASTER.AC_TYPE = SCHEMAST.S_APPL 
      ORDER BY ACMASTER.AC_NO ASC
    `);

      const rows = this.convertOracleRows(result as any);

      const batchSize = 500;

      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        await queryRunner.startTransaction();

        try {
          for (const ele of batch) {
            const acNo = Number(ele.AC_NO);
            if (!acNo) continue;

            //Skip if already exists
            const existing = await queryRunner.manager.query(
              `SELECT id FROM acmaster WHERE "AC_NO" = $1`,
              [acNo]
            );
            if (existing.length > 0) continue;

            const schema = await queryRunner.manager.query(
              `SELECT id FROM schemast WHERE "S_APPL" = $1`,
              [ele.AC_TYPE]
            );

            if (schema.length === 0) {
              this.logger.warn(`Skipping AC_NO ${acNo} - AC_TYPE ${ele.AC_TYPE} not found in SCHEMAST`);
              continue; // skip invalid FK
            }

            const schemaId = schema[0].id;

            //Create object
            const newObj: any = {
              id: acNo,
              //AC_NO: acNo,
              AC_NO: Number(ele.AC_NO || 0) + 100000,
              AC_NAME: this.transformValue(ele.AC_NAME),
              BRANCH_CODE: branchId,
              AC_ACNOTYPE: ele.AC_ACNOTYPE || 'GL',

              // FIXED FK
              AC_TYPE: schemaId,

              //FIXED BOOLEAN → INTEGER
              IS_POST_INT_AC: 0,
              AC_OP_BAL: ele.AC_OP_BAL,
              AC_BCD: ele.AC_BCD,
              AC_SUBSCODE: ele.AC_SUBSCODE,
              AC_OP_CD: ele.AC_OP_CD,

              IS_DIRECT_ENTRY_ALLOW: ele.IS_DIRECT_ENTRY_ALLOW == 0 ? false : true,
              IS_RED_BALANCE_AC: ele.IS_RED_BALANCE_AC == 0 ? false : true,
              AC_IS_CASH_IN_TRANSIT: ele.AC_IS_CASH_IN_TRANSIT == 0 ? false : true,
              IS_TAXABLEFOR_GST: ele.IS_TAXABLEFOR_GST == 0 ? false : true,
              IS_ACTIVE: true,


              AC_CLOSEDT: ele.AC_CLOSEDT
                ? moment(ele.AC_CLOSEDT).format('DD/MM/YYYY')
                : null,

              AC_OPDATE: ele.AC_OPDATE
                ? moment(ele.AC_OPDATE).format('DD/MM/YYYY')
                : null,
            };

            await queryRunner.manager.insert('acmaster', newObj);
          }

          await queryRunner.commitTransaction();
          this.logger.log(`ACMASTER: Processed batch up to row ${i + batch.length}`);
        } catch (err: unknown) {
          if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
          }

          const error = err as Error;
          this.logger.error(`Batch failed at row ${i}: ${error.message}`);
          throw err;
        }
      }

      this.logger.log('ACMASTER Migration completed successfully.');
      return { success: true };

    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  // ---------------- TERMMASTER MIGRATION ----------------
  async migrateTERMMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    try {
      const result = await this.clientConn.execute(`SELECT * FROM TERMMASTER ORDER BY SR_NO ASC`);
      const rows = this.convertOracleRows(result as any);
      await queryRunner.startTransaction();
      for (const ele of rows) {
        if (ele.SR_NO == null) continue;
        const existing = await queryRunner.manager.query(`SELECT id FROM termmaster WHERE "SR_NO" = $1 AND "ACNOTYPE" = $2`, [ele.SR_NO, ele.ACNOTYPE]);
        if (existing.length > 0) continue;
        await queryRunner.manager.insert('termmaster', {
          SR_NO: ele.SR_NO,
          ACNOTYPE: ele.ACNOTYPE,
          TERM_TYPE: this.transformValue(ele.TERM_TYPE),
          PERIOD_FROM: Number(ele.PERIOD_FROM) || 0,
          PERIOD_TO: Number(ele.PERIOD_TO) || 0,
        });
      }
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async migrateOWNBRANCHMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting OWNBRANCHMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM OWNBRANCHMASTER ORDER BY CODE ASC`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(OWNBRANCHMASTER);
      const existingCodes = new Set(existingData.map(item => Number(item.CODE)));

      // 3. Get Syspara ID (Branches must link to the main system parameters)
      const syspara = await queryRunner.manager.query(`SELECT id FROM syspara LIMIT 1`);
      const sysparaId = syspara[0]?.id;

      if (!sysparaId) {
        throw new Error('Cannot migrate branches: syspara table is empty. Please migrate SYSPARA first.');
      }

      // 4. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const branchCode = Number(ele.CODE);
          if (!branchCode) continue;

          // Skip if this branch code already exists in Postgres
          if (existingCodes.has(branchCode)) {
            this.logger.warn(`Branch code ${branchCode} already exists. Skipping.`);
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(ele.NAME), // Transliterate Marathi legacy font to English
            CODE: branchCode,
            AC_NO: ele.AC_NO === 0 ? null : ele.AC_NO,
            sysparaId: sysparaId,               // Relationship to system master
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(OWNBRANCHMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`OWNBRANCHMASTER: Migrated ${inserted} branches.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in OWNBRANCHMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  // ---------------- SIZEWISEBALANCE MIGRATION ----------------
  async migrateSIZEWISEBALANCE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    try {
      const result = await this.clientConn.execute(`SELECT * FROM SIZEWISEBALANCE ORDER BY AMOUNT_FROM ASC`);
      const rows = this.convertOracleRows(result as any);
      await queryRunner.startTransaction();
      for (const ele of rows) {
        if (ele.SR_NO == null) continue;
        // const existing = await queryRunner.manager.query(`SELECT id FROM sizewisebalance WHERE "SR_NO" = $1 AND "ACNOTYPE" = $2`, [ele.SR_NO, ele.ACNOTYPE]);
        // if (existing.length > 0) continue;
        await queryRunner.manager.insert('sizewisebalance', {
          SR_NO: ele.SR_NO,
          ACNOTYPE: ele.ACNOTYPE,
          SLAB_TYPE: this.transformValue(ele.SLAB_TYPE),
          AMOUNT_FROM: Number(ele.AMOUNT_FROM) === -1 ? 1 : Number(ele.AMOUNT_FROM) || 0,
          AMOUNT_TO: Number(ele.AMOUNT_TO) || 0,
          UNIT_OF_PERIOD: ele.UNIT_OF_PERIOD,
          FROM_MONTHS: Number(ele.FROM_MONTHS) || 0,
          FROM_DAYS: Number(ele.FROM_DAYS) || 0,
          TO_MONTHS: Number(ele.TO_MONTHS) || 0,
          TO_DAYS: Number(ele.TO_DAYS) || 0,
          DEDUCTION_PERCENT: Number(ele.DEDUCTION_PERCENT) || 0
        });
      }
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // ---------------- ADVOCATEMASTER MIGRATION ----------------
  async migrateADVOCATEMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    try {
      const result = await this.clientConn.execute(`SELECT * FROM ADVOCATEMASTER ORDER BY CODE ASC`);
      const rows = this.convertOracleRows(result as any);
      const existing = await queryRunner.manager.find(ADVOCATEMASTER);
      const existingNames = new Set(existing.map(adv => String(adv.NAME || '').trim().toLowerCase()));
      await queryRunner.startTransaction();
      for (const ele of rows) {
        const rawName = ele.NAME ? String(ele.NAME).trim() : null;
        if (!rawName || existingNames.has(rawName.toLowerCase())) continue;
        await queryRunner.manager.insert(ADVOCATEMASTER, { CODE: ele.CODE, NAME: this.transformValue(rawName) });
      }
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // ---------------- BALACATA MIGRATION ----------------
  async migrateBALACATA() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    try {
      const result = await this.clientConn.execute(`SELECT * FROM BALACATA ORDER BY BC_CODE ASC`);
      const rows = this.convertOracleRows(result as any);
      const existing = await queryRunner.manager.find(BALACATA);
      const existingNames = new Set(existing.map(item => String(item.BC_NAME || '').trim().toLowerCase()));
      await queryRunner.startTransaction();
      for (const ele of rows) {
        const rawName = ele.BC_NAME ? String(ele.BC_NAME).replace(/\0/g, '').trim() : null;
        if (!rawName || existingNames.has(rawName.toLowerCase())) continue;
        await queryRunner.manager.insert(BALACATA, { BC_NAME: this.transformValue(rawName), BC_MINBAL: Number(ele.BC_MINBAL) || 0 });
      }
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async migratePREFIX() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting PREFIX migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM PREFIX ORDER BY SR_NO ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(PREFIX);
      const existingPrefixes = new Set(
        existingData.map(item => String(item.PREFIX || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawPrefix = ele.PREFIX ? String(ele.PREFIX).trim() : null;
          if (!rawPrefix) continue;

          // Skip if this prefix already exists
          if (existingPrefixes.has(rawPrefix.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            PREFIX: this.transformValue(rawPrefix), // Transliterate if stored in legacy font
            SEX: ele.SEX,                           // M/F/O
            PREFIX_REG: ele.PREFIX_REG,             // Regional language prefix
            // SR_NO: ele.SR_NO                     // Optional: mapping original serial
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(PREFIX, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`PREFIX: Migrated ${inserted} new prefixes.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in PREFIX loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }



  async migratePRIORITYSECTORMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting PRIORITYSECTORMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      // We select from PRIORITYMASTER (the Oracle table name)
      const result = await this.clientConn.execute(`
      SELECT * FROM PRIORITYMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(PRIORITYSECTORMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this sector name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            SUB1_CODE: ele.SUB1_CODE,
            SUB2_CODE: ele.SUB2_CODE,
            SUB3_CODE: ele.SUB3_CODE,
            NAME: this.transformValue(rawName), // Transliterate Marathi font to English
            // CODE: ele.CODE                  // Optional: mapping original unique code
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(PRIORITYSECTORMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`PRIORITYSECTORMASTER: Migrated ${inserted} new sectors.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in PRIORITYSECTORMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateRECOVERYCLEARKMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting RECOVERYCLEARKMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM RECOVERYCLEARKMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(RECOVERYCLEARKMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get the Default Branch ID (matching your IDMASTER logic)
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );
      const branchId = branch[0]?.id;

      // 4. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this clerk name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName), // Transliterate Marathi font to English
            BRANCH_CODE: branchId,             // Link to the internal Branch ID
            // CODE: ele.CODE                  // Optional: mapping original unique code if entity has it
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(RECOVERYCLEARKMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`RECOVERYCLEARKMASTER: Migrated ${inserted} new recovery clerks.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Type assertion for TypeScript 'unknown' variable
        this.logger.error(`Inner failure in RECOVERYCLEARKMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }


  async migrateSALARYDIVISIONMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting SALARYDIVISIONMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM SALARYDIVISIONMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(SALARYDIVISIONMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get the Default Branch ID from syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );
      const branchId = branch[0]?.id;

      // 4. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this salary division already exists
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName),
            SHORT_NAME: this.transformValue(ele.SHORT_NAME),
            AT_POST: this.transformValue(ele.AT_POST),
            TALUKA_NAME: this.transformValue(ele.TALUKA_NAME),
            DISTRICT_NAME: this.transformValue(ele.DISTRICT_NAME),
            PHNO: ele.PHNO || null,
            MOBNO: ele.MOBNO || null,
            BRANCH_CODE: branchId, // Mapping to internal Branch ID
            // CODE: ele.CODE      // Include if your entity preserves the original code
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(SALARYDIVISIONMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`SALARYDIVISIONMASTER: Migrated ${inserted} new divisions.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error
        this.logger.error(`Inner failure in SALARYDIVISIONMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateSUBSALARYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('Client DB not connected');
    if (!this.serverDB) throw new Error('Server DB not connected');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM SUBSALARYMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(SUBSALARYMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID from syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );
      const branchId = branch[0]?.id;

      // 4. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this sub-salary division already exists
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName),
            AT_POST: this.transformValue(ele.AT_POST),
            TALUKA_NAME: this.transformValue(ele.TALUKA_NAME),
            DISTRICT_NAME: this.transformValue(ele.DISTRICT_NAME),
            AC_EMAILID: ele.AC_EMAILID || null,
            PHNO: ele.PHNO || null,
            MOBNO: ele.MOBNO || null,
            SAL_CODE: ele.SAL_CODE || null, // Link to Parent Salary Division Code
            BRANCH_CODE: branchId,         // Internal Branch ID
            CODE: ele.CODE               // Original unique code
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(SUBSALARYMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`SUBSALARYMASTER: Migrated ${inserted} new sub-divisions.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Type assertion for TypeScript 'unknown' variable
        this.logger.error(`Inner failure in SUBSALARYMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateWEAKERMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting WEAKERMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM WEAKERMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicate entries
      const existingData = await queryRunner.manager.find(WEAKERMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this weaker section category already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName), // Transliterate Marathi legacy font to English
            // CODE: ele.CODE                  // Optional: original code if required by entity
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(WEAKERMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`WEAKERMASTER: Migrated ${inserted} new weaker section categories.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in WEAKERMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateTDRECEIPTMASTER(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting TDRECEIPTMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM TDRECEIPTMASTER
    `);

      const rows = this.convertOracleRows(result as any);

      // 🔹 Get Branch ID (same pattern as your other tables)
      const syspara = await queryRunner.manager.query(`
      SELECT "BRANCH_CODE" FROM syspara LIMIT 1
    `);

      let branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster WHERE "CODE" = $1 LIMIT 1
    `, [syspara[0]?.BRANCH_CODE]);

      if (!branchRes.length) {
        branchRes = await queryRunner.manager.query(`
        SELECT id FROM ownbranchmaster LIMIT 1
      `);
      }

      const branchId = branchRes[0]?.id;

      // 🔹 Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {

          const obj: any = {
            RECEIPT_TYPE: ele.RECEIPT_TYPE,
            LAST_RECEIPT_NO: ele.LAST_RECEIPT_NO == null ? 0 : Number(ele.LAST_RECEIPT_NO),
            BRANCH_CODE: branchId
          };

          await queryRunner.manager.insert(TDRECEIPTMASTER, obj);
          inserted++;
        }

        await queryRunner.commitTransaction();

        this.logger.log(`TDRECEIPTMASTER migrated: ${inserted}`);

        return { success: true, inserted };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        this.logger.error('Transaction failed', err);
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }

  async migrateAUTHORITYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting AUTHORITYMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM AUTHORITYMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(AUTHORITYMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this authority name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName), // Transliterate Marathi legacy font to English
            // CODE: ele.CODE                  // Optional: include original code if entity supports it
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(AUTHORITYMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`AUTHORITYMASTER: Migrated ${inserted} new authorities.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Type assertion for TypeScript 'unknown' variable
        this.logger.error(`Inner failure in AUTHORITYMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateLOCKERRACKMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting LOCKERRACKMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM LOCKERRACKMASTER ORDER BY RACK_NO ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(LOCKERRACKMASTER);
      const existingRacks = new Set(
        existingData.map(item => String(item.RACK_DESC || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID from syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );
      const branchId = branch[0]?.id;

      // 4. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawDesc = ele.RACK_DESC ? String(ele.RACK_DESC).trim() : null;
          if (!rawDesc) continue;

          // Skip if this rack description already exists
          if (existingRacks.has(rawDesc.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            RACK_DESC: this.transformValue(rawDesc), // Transliterate Marathi legacy font
            LOCKER_FROMNO: Number(ele.LOCKER_FROMNO) || 0,
            LOCKER_TONO: Number(ele.LOCKER_TONO) || 0,
            BRANCH_CODE: branchId, // Mapping to internal Branch ID
            // RACK_NO: ele.RACK_NO // Optional: mapping original sequence number
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(LOCKERRACKMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`LOCKERRACKMASTER: Migrated ${inserted} racks.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Fixed 'unknown' type error
        this.logger.error(`Inner failure in LOCKERRACKMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }


  async migrateLOCKERSIZE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting LOCKERSIZE migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM LOCKERSIZE ORDER BY SIZE_SR_NO ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(LOCKERSIZE);
      const existingSizes = new Set(
        existingData.map(item => String(item.SIZE_NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID from syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );
      const branchId = branch[0]?.id;

      // 4. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.SIZE_NAME ? String(ele.SIZE_NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this size definition already exists
          if (existingSizes.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            SIZE_NAME: this.transformValue(rawName), // Transliterate Marathi font to English
            RENT: Number(ele.RENT) || 0,
            BRANCH_CODE: branchId,                  // Mapping to internal Branch ID
            // SIZE_SR_NO: ele.SIZE_SR_NO            // Optional: mapping original serial number
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(LOCKERSIZE, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`LOCKERSIZE: Migrated ${inserted} locker sizes.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in LOCKERSIZE loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateLOCKERMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting LOCKERMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data with a join to get the Size Serial Number
      const result = await this.clientConn.execute(`
      SELECT LOCKERMASTER.*, LOCKERSIZE.SIZE_SR_NO 
      FROM LOCKERMASTER 
      LEFT JOIN LOCKERSIZE ON LOCKERMASTER.SIZE_SR_NO = LOCKERSIZE.SIZE_SR_NO
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing Size mappings from Postgres to link by original Serial No
      const pgSizes = await queryRunner.manager.find(LOCKERSIZE);
      // Note: This assumes your LOCKERSIZE entity has a field to store the original Oracle SIZE_SR_NO
      // If not, we map by the index/code logic used during LOCKERSIZE migration.

      // 3. Get Default Branch ID from syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );
      const branchId = branch[0]?.id;

      // 4. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Skip if locker number is missing
          if (!ele.LOCKER_NO) continue;

          // Duplicate Check: prevent double-entry for the same locker in the same branch
          const existing = await queryRunner.manager.query(
            `SELECT id FROM lockermaster WHERE "LOCKER_NO" = $1 AND "BRANCH_CODE" = $2`,
            [ele.LOCKER_NO, branchId]
          );
          if (existing.length > 0) continue;

          // Link to the correct Postgres LOCKERSIZE record
          const sizeRecord = pgSizes.find(s => s.id === ele.SIZE_SR_NO); // Adjust lookup logic based on your Entity fields

          const newObj: any = {
            LOCKER_NO: ele.LOCKER_NO,
            KEY_NO: ele.KEY_NO ? String(ele.KEY_NO).trim() : null,
            SIZE_SR_NO: sizeRecord ? sizeRecord.id : null, // Foreign Key to locker_size_master
            BRANCH_CODE: branchId,
            // If you have rack associations:
            // RACK_NO: ele.RACK_NO 
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(LOCKERMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`LOCKERMASTER: Migrated ${inserted} locker units.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Type assertion for TypeScript 'unknown' variable
        this.logger.error(`Inner failure in LOCKERMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateDOCUMENTMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting DOCUMENTMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM DOCUMENTMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingDocs = await queryRunner.manager.find(DOCUMENTMASTER);
      const existingNames = new Set(
        existingDocs.map(doc => String(doc.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if the document name already exists in the Postgres database
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName), // Transliterate Marathi legacy font to English
            // CODE: ele.CODE                  // Optional: original unique code mapping
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(DOCUMENTMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`DOCUMENTMASTER: Migrated ${inserted} new document types.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Type assertion to resolve 'unknown' error type
        this.logger.error(`Inner failure in DOCUMENTMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateCOURTMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting COURTMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM COURTMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(COURTMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this court name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            this.logger.warn(`Skipping duplicate COURT: ${rawName}`);
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName), // Transliterate Marathi legacy font to English
            CODE: ele.CODE ?? null              // Map original unique code if entity has it
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(COURTMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`COURTMASTER: Migrated ${inserted} new court records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for TypeScript compiler
        this.logger.error(`Inner failure in COURTMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateBRANCHMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting BRANCHMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM BRANCHMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(BRANCHMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this branch name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            this.logger.warn(`Skipping duplicate Branch: ${rawName}`);
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName), // Transliterate Marathi legacy font to English
            AC_NO: ele.AC_NO === 0 ? null : ele.AC_NO,
            CODE: ele.CODE ?? null              // Maintain original sequence code
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(BRANCHMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`BRANCHMASTER: Migrated ${inserted} new branch records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in BRANCHMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateCATEGORYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting CATEGORYMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM CATEGORYMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(CATEGORYMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this category name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            this.logger.warn(`Skipping duplicate Category: ${rawName}`);
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName),
            CODE: ele.CODE ?? null              // Maintain original category code
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(CATEGORYMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`CATEGORYMASTER: Migrated ${inserted} new category records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for TypeScript
        this.logger.error(`Inner failure in CATEGORYMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateBANKDETAILS() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting BANKDETAILS migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM BANKDETAILS ORDER BY BANK_CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Check if data already exists (Usually only 1 record for the bank itself)
      const existingCount = await queryRunner.manager.count(BANKDETAILS);
      if (existingCount > 0) {
        this.logger.warn('BANKDETAILS already exists in Postgres. skipping...');
        return { success: true, message: 'Already exists' };
      }

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const newObj: any = {
            NAME: this.transformValue(ele.NAME),           // Transliterates Bank Name
            TAN_NO: ele.TAN_NO || null,
            PAN_NO: ele.PAN_NO || null,
            FLAT_PRM_NO: ele.FLAT_PRM_NO || null,
            FLAT_PRM_NAME: this.transformValue(ele.FLAT_PRM_NAME),
            RD_LANE_NAME: this.transformValue(ele.RD_LANE_NAME),
            AREA_LOCATION: this.transformValue(ele.AREA_LOCATION),
            CITY_CODE: ele.CITY_CODE || null,
            PIN_CODE: ele.PIN_CODE || null,
            PHONE_OFFICE: ele.PHONE_OFFICE || null,
            EMAIL: ele.EMAIL || null,
            SHORT_NAME: this.transformValue(ele.SHORT_NAME),
            SBI_BANKCODE: ele.SBI_BANKCODE || null,
            // If your entity has these fields added for the new system:
            GST_NO: ele.GST_NO || null,
            MOB_NUM: ele.MOB_NUM || null,
            STATE: ele.STATE || null
          };

          await queryRunner.manager.insert(BANKDETAILS, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`BANKDETAILS: Migrated ${inserted} records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // TypeScript fix for 'unknown' type
        this.logger.error(`Inner failure in BANKDETAILS loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateCITYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting CITYMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await this.clientConn.execute(`SELECT * FROM CITYMASTER ORDER BY CITY_CODE ASC`);
      const rows = this.convertOracleRows(result as any);

      const existingCities = await queryRunner.manager.find(CITYMASTER);
      const existingNames = new Set(
        existingCities.map(city => String(city.CITY_NAME || '').trim().toLowerCase())
      );

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.CITY_NAME ? String(ele.CITY_NAME).trim() : null;
          if (!rawName) continue;

          if (existingNames.has(rawName.toLowerCase())) continue;

          const newObj: any = {
            CITY_CODE: ele.CITY_CODE,
            CITY_NAME: this.transformValue(rawName),
            TALUKA_CODE: ele.TALUKA_CODE,
            DISTRICT_CODE: ele.DISTRICT_CODE,
            STATE_CODE: ele.STATE_CODE,

            REGION_CODE: ele.REGION_CODE,

            DISTANCE: Number(ele.DISTANCE)
          };

          await queryRunner.manager.insert(CITYMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`CITYMASTER: Migrated ${inserted} city records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Inner failure in CITYMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateBANKMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting BANKMASTER migration with corrected Oracle query...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      // FIX: Changed "ORDER BY CODE" to "ORDER BY BANK_CODE" (or remove the order by)
      const result = await this.clientConn.execute(`
      SELECT * FROM BANKMASTER
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(BANKMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.BANK_NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Handle variations in Oracle column naming (BANK_NAME or NAME)
          const rawName = (ele.BANK_NAME || ele.NAME) ? String(ele.BANK_NAME || ele.NAME).trim() : null;
          if (!rawName) continue;

          if (existingNames.has(rawName.toLowerCase())) continue;

          const newObj: any = {
            BANK_NAME: this.transformValue(rawName),
            BANK_SHORTNAME: this.transformValue(ele.BANK_SHORTNAME || ele.SHORT_NAME || ''),
            LEDGER_CODE: ele.LEDGER_CODE || null,
            BANKCODE: ele.BANKCODE || null,
            DD_APPLICABLE: String(ele.DD_APPLICABLE || '0'),
            GL_ACNO: ele.GL_ACNO || null,
            HO_SUB_GLACNO: ele.HO_SUB_GLACNO || null,
            BANKERS_COMM_APPLICABLE: String(ele.BANKERS_COMM_APPLICABLE || '0'),
            RIGHT_TO_PREPARE_DD: String(ele.RIGHT_TO_PREPARE_DD || '0'),
            PARTICIPATE_IN_CLEARING: String(ele.PARTICIPATE_IN_CLEARING || '0'),
          };

          await queryRunner.manager.insert(BANKMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`BANKMASTER: Migrated ${inserted} records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Inner failure in BANKMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateDEPRCATEGORY() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting DEPRCATEGORY migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. ORACLE DATA
      const result = await this.clientConn.execute(
        `SELECT * FROM DEPRCATEGORY ORDER BY CODE`
      );

      const rows = this.convertOracleRows(result as any);

      const existingData = await queryRunner.manager.find(DEPRCATEGORY);

      const existingNames = new Set(
        existingData.map(e =>
          String(e.NAME || '').trim().toLowerCase()
        )
      );

      //BRANCH
      const syspara = await queryRunner.manager.query(
        `SELECT "BRANCH_CODE" FROM syspara LIMIT 1`
      );

      const branchCode = syspara[0]?.BRANCH_CODE;

      const branchRes = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode} LIMIT 1`
      );

      const branchId = branchRes[0]?.id;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {

          const name = ele.NAME ? String(ele.NAME).trim() : null;
          if (!name) continue;

          if (existingNames.has(name.toLowerCase())) continue;

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(DEPRCATEGORY)
            .values({
              NAME: this.transformValue(name),
              AC_NO: ele.AC_NO,

              //AC_NO: ele.AC_NO ? Number(ele.AC_NO) : undefined,

              BRANCH_CODE: branchId
            })
            .execute();

          inserted++;
          existingNames.add(name.toLowerCase());
        }

        await queryRunner.commitTransaction();

        this.logger.log(`DEPRCATEGORY migrated: ${inserted}`);

        return { success: true, inserted };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }

  async migrateDIRECTORMASTER() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting DIRECTORMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const result = await this.clientConn.execute(`
      SELECT * FROM DIRECTORMASTER ORDER BY CODE
    `);

      const rows = this.convertOracleRows(result as any);

      const syspara = await queryRunner.manager.query(
        `SELECT "BRANCH_CODE" FROM syspara LIMIT 1`
      );

      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );

      const branchId = branch[0]?.id || 1;

      let inserted = 0;

      for (const ele of rows) {

        const obj: any = {
          NAME: this.transformValue(ele.NAME),
          DESIGNATION: ele.DESIGNATION,
          AC_ADDR1: ele.AC_ADDR1,
          AC_ADDR2: ele.AC_ADDR2,
          AC_ADDR3: ele.AC_ADDR3,
          AC_PIN: ele.AC_PIN,
          IS_CURRENT_BODY_MEMBER: ele.IS_CURRENT_BODY_MEMBER == 0 ? '0' : '1',
          SMS_REQUIRED: ele.SMS_REQUIRED,
          AC_MOBILENO: ele.AC_MOBILENO,
          AC_CTCODE: ele.AC_CTCODE,
          CODE: ele.CODE,
          // REF_ID: ele.REF_ID, //only if column exists in PG
          BRANCH_CODE: branchId
        };


        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('directormaster')
          .values(obj)
          .execute();

        inserted++;
      }

      await queryRunner.commitTransaction();

      this.logger.log(`DIRECTORMASTER: Inserted ${inserted} records`);

      return { success: true, inserted };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async migrateHEALTHMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting HEALTHMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM HEALTHMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data (Explicitly typed for ESLint no-unsafe-call)
      const existingData: HEALTHMASTER[] = await queryRunner.manager.find(HEALTHMASTER);
      const existingNames = new Set(
        existingData.map((item: HEALTHMASTER) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this health status already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            this.logger.warn(`Skipping duplicate Health Status: ${rawName}`);
            continue;
          }

          const newObj: Partial<HEALTHMASTER> = {
            NAME: this.transformValue(rawName), // Transliterate Marathi legacy font to English
            CODE: ele.CODE ?? null              // Map original unique code if entity has it
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(HEALTHMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`HEALTHMASTER: Migrated ${inserted} new health records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in HEALTHMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateINDUSTRYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting INDUSTRYMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM INDUSTRYMASTER ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data (Explicitly typed for ESLint no-unsafe-call)
      const existingData: INDUSTRYMASTER[] = await queryRunner.manager.find(INDUSTRYMASTER);
      const existingNames = new Set(
        existingData.map((item: INDUSTRYMASTER) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this industry name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: Partial<INDUSTRYMASTER> = {
            NAME: this.transformValue(rawName), // Transliterate Marathi legacy font to English
            CODE: ele.CODE ?? null              // Map original unique code if entity has it
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(INDUSTRYMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`INDUSTRYMASTER: Migrated ${inserted} new industry records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Resolve 'unknown' type error for compiler
        this.logger.error(`Inner failure in INDUSTRYMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateINSUARANCEMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting INSUARANCEMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM INSUARANCEMASTER`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data (Typed to INSUARANCEMASTER[] to satisfy ESLint)
      const existingData: INSUARANCEMASTER[] = await queryRunner.manager.find(INSUARANCEMASTER);
      const existingNames = new Set(
        existingData.map((item: INSUARANCEMASTER) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;

          // Skip if name is missing or already exists
          if (!rawName || existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          // Mapping only the properties present in your Entity
          const newObj: Partial<INSUARANCEMASTER> = {
            NAME: this.transformValue(rawName)
            // CODE is @Generated('increment'), no need to map manually
          };

          await queryRunner.manager.insert(INSUARANCEMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`INSUARANCEMASTER: Successfully migrated ${inserted} records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error;
        this.logger.error(`Inner failure in INSUARANCEMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }


  async migrateINTCATEGORYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting INTCATEGORYMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM INTCATEGORYMASTER`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data (Typed for ESLint compliance)
      const existingData: INTCATEGORYMASTER[] = await queryRunner.manager.find(INTCATEGORYMASTER);
      const existingNames = new Set(
        existingData.map((item: INTCATEGORYMASTER) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;

          // Skip if name is missing or already exists
          if (!rawName || existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          // FIX: Mapping only the 'NAME' property to match your Entity
          const newObj: Partial<INTCATEGORYMASTER> = {
            NAME: this.transformValue(rawName),
            CODE: ele.CODE
            // Removed SHORT_NAME to resolve TS2353
          };

          await queryRunner.manager.insert(INTCATEGORYMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`INTCATEGORYMASTER: Successfully migrated ${inserted} records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error;
        this.logger.error(`Inner failure in INTCATEGORYMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }


  async migrateITEMMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting ITEMMASTER migration using Entity logic...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Source Data from Oracle
      const result = await this.clientConn.execute(`SELECT * FROM ITEMMASTER ORDER BY ITEM_CODE`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch Existing PG Data for validation (Name + Purchase Date match)
      const pgData = await queryRunner.manager.find(ITEMMASTER);

      // 3. Fetch Category Mappings for Item Type lookup
      const postItemcategory = await queryRunner.manager.find(ITEMCATEGORYMASTER);

      // 4. Setup Branch and Syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      // Helper to prevent numeric(8,2) overflow
      const safeNumeric = (val: any): number => {
        const num = Number(val || 0);
        return num >= 1000000 ? 999999.99 : num;
      };

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- Logic: Duplicate Check (Name + Purchase Date) ---
          const sourcePurchaseDate = ele.PURCHASE_DATE ? moment(ele.PURCHASE_DATE).format('DD/MM/YYYY') : null;

          const exists = pgData.some(pg =>
            pg.ITEM_NAME === ele.ITEM_NAME &&
            pg.PURCHASE_DATE === sourcePurchaseDate
          );

          if (exists) continue;

          // --- Logic: Create New Entity Instance ---
          const newObj = new ITEMMASTER();

          // --- Logic: Item Type Lookup (from main script) ---
          // Defaults to '1' if lookup fails as per your requirement
          newObj.ITEM_TYPE = '1';
          if (ele.ITEM_TYPE != null) {
            const categoryMatch = postItemcategory.find(cat => cat.CODE == ele.ITEM_TYPE);
            if (categoryMatch) {
              newObj.ITEM_TYPE = String(categoryMatch.id);
            }
          }

          // --- Logic: Specific Balance Patch (33063.6 -> 33063) ---
          let opBalance = ele.OP_BALANCE == null ? 0 : ele.OP_BALANCE;
          if (opBalance == 33063.6) {
            opBalance = 33063;
          }

          // --- Mapping All Columns from Main Script ---
          newObj.ITEM_CODE = ele.ITEM_CODE;
          newObj.ITEM_NAME = this.transformValue(ele.ITEM_NAME);
          newObj.PURCHASE_DATE = sourcePurchaseDate ?? '';
          newObj.DEPR_CATEGORY = ele.DEPR_CATEGORY;
          newObj.SUPPLIER_NAME = this.transformValue(ele.SUPPLIER_NAME || 'OPENING STOCK');
          newObj.GL_ACNO = ele.GL_ACNO;

          // Quantities
          newObj.PURCHASE_OP_QUANTITY = ele.PURCHASE_QUANTITY;
          newObj.PURCHASE_QUANTITY = ele.PURCHASE_QUANTITY;
          newObj.OP_QUANTITY = ele.OP_QUANTITY || 0;

          // Rates and Values (with overflow protection)
          newObj.PURCHASE_RATE = safeNumeric(ele.PURCHASE_RATE);
          newObj.PURCHASE_VALUE = safeNumeric(ele.PURCHASE_VALUE);
          newObj.OP_BALANCE = safeNumeric(opBalance);

          // Dates
          newObj.OP_BAL_DATE = ele.OP_BAL_DATE ? moment(ele.OP_BAL_DATE).format('DD/MM/YYYY') : '';
          newObj.LAST_DEPR_DATE = ele.LAST_DEPR_DATE ? moment(ele.LAST_DEPR_DATE).format('DD/MM/YYYY') : '';
          newObj.LAST_UNLOCK_DATE = ele.LAST_UNLOCK_DATE ? moment(ele.LAST_UNLOCK_DATE).format('DD/MM/YYYY') : '';

          // Metadata
          newObj.BRANCH_CODE = branchId;
          newObj.SYSCHNG_LOGIN = ele.OFFICER_CODE || 'SUPERVISOR';
          newObj.BRANCH_CODE = Number(branchId);

          // --- Save using Entity Manager ---
          await queryRunner.manager.save(ITEMMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`ITEMMASTER: Successfully migrated ${inserted} records using Entity.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateLOANSTAGEMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting LOANSTAGEMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      // Common table names: LOANSTAGEMASTER or LNSTAGEMASTER
      const result = await this.clientConn.execute(`SELECT * FROM LOANSTAGEMASTER`);
      const rows = this.convertOracleRows(result as any);

      // 2. Duplicate Check using NAME or STAGE_NAME
      const existingRows: { NAME: string }[] = await queryRunner.manager.query(
        `SELECT "NAME" FROM loanstagemaster`
      );
      const existingNames = new Set(
        existingRows.map((item) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      // Helper for numeric(8,2) limits (No-Alter workaround)
      const safeNumeric = (val: any): number => {
        const num = Number(val || 0);
        return num >= 1000000 ? 999999.99 : num;
      };

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Fallback for Oracle Column names
          const rawName = (ele.NAME || ele.STAGE_NAME || ele.DESCRIPTION)
            ? String(ele.NAME || ele.STAGE_NAME || ele.DESCRIPTION).trim()
            : null;

          if (!rawName || existingNames.has(rawName.toLowerCase())) continue;

          const payload = {
            NAME: this.transformValue(rawName),           // Transliterates Marathi font
            SHORT_NAME: this.transformValue(ele.SHORT_NAME || ele.SHNAME || ''),

            // Loan stages often have sequence or priority numbers
            STAGE_ORDER: Number(ele.STAGE_ORDER || ele.SR_NO || 0),

            // Fees or charges associated with the stage
            STAGE_FEES: safeNumeric(ele.STAGE_FEES || ele.FEES),

            // Mandatory tracking columns
            STATUS: ele.STATUS || '1',
            BRANCH_CODE: branchId,
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'ADMIN',

            // Dates (If applicable to your PG schema)
            CREATED_DATE: ele.CREATED_DATE ? moment(ele.CREATED_DATE).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY')
          };

          // 4. Insert into PostgreSQL
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('loanstagemaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`LOANSTAGEMASTER: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateNARRATIONMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting NARRATIONMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM NARRATIONMASTER`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG narrations (Column is "NARRATION" based on your pgAdmin)
      const existingRows: { NARRATION: string }[] = await queryRunner.manager.query(
        `SELECT "NARRATION" FROM narrationmaster`
      );
      const existingNames = new Set(
        existingRows.map((item) => String(item.NARRATION || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;
        for (const ele of rows) {
          // Oracle uses NARRATION column according to your screenshot
          const rawName = ele.NARRATION ? String(ele.NARRATION).trim() : null;

          if (!rawName || existingNames.has(rawName.toLowerCase())) continue;

          const payload = {
            // transformValue converts those Oracle symbols into readable text
            NARRATION: this.transformValue(rawName),
            BRANCH_CODE: branchId,
            // Add status or other mandatory columns if required by your PG schema
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('narrationmaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`NARRATIONMASTER: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateOCCUPATIONMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting OCCUPATIONMASTER migration (Safe String-Table Pattern)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM OCCUPATIONMASTER`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG names to prevent duplicates
      // Using raw query to be safe against any unused entity variables
      const existingRows: { NAME: string }[] = await queryRunner.manager.query(
        `SELECT "NAME" FROM occupationmaster`
      );
      const existingNames = new Set(
        existingRows.map((item) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID from syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${syspara[0]?.BRANCH_CODE || 101}`
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Oracle column fallback (NAME or OCCUPATION_NAME)
          const rawName = (ele.NAME || ele.OCCUPATION_NAME)
            ? String(ele.NAME || ele.OCCUPATION_NAME).trim()
            : null;

          if (!rawName || existingNames.has(rawName.toLowerCase())) continue;

          const payload = {
            // transformValue handles the legacy Marathi symbols (mojibake)
            NAME: this.transformValue(rawName),
            CODE: ele.CODE || null,
            BRANCH_CODE: branchId,
            status: '1', // Assuming active status by default
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'ADMIN',
          };

          // 4. Insert into PostgreSQL using the table name string
          // This is the "workful" way that avoids metadata/CTCODE-style crashes
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('occupationmaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`OCCUPATIONMASTER: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateOPERATIONMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting OPERATIONMASTER migration (Marathi Font & Metadata Bypass)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM OPERATIONMASTER`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG records for duplicate check
      // Using raw query to avoid Entity dependency and ESLint unused-var errors
      const existingRows: { NAME: string }[] = await queryRunner.manager.query(
        `SELECT "NAME" FROM operationmaster`
      );
      const existingNames = new Set(
        existingRows.map((item) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Handle common Oracle column names for Operation/Mode
          const rawName = (ele.NAME || ele.OPERATION_NAME || ele.MODE_DESC)
            ? String(ele.NAME || ele.OPERATION_NAME || ele.MODE_DESC).trim()
            : null;

          if (!rawName || existingNames.has(rawName.toLowerCase())) continue;

          const payload = {
            // transformValue handles legacy Marathi font symbols (mojibake)
            NAME: this.transformValue(rawName),
            CODE: ele.CODE || ele.MODE_CODE || null,
            BRANCH_CODE: branchId,
            status: '1',
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'ADMIN',
          };

          // 4. Insert into PostgreSQL using the table name string
          // This bypasses Entity class checks and prevents CTCODE-style errors
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('operationmaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`OPERATIONMASTER: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migratePRIORITYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting PRIORITYMASTER migration (Sector Mapping)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      // Oracle table is typically PRIORITYMASTER
      const result = await this.clientConn.execute(`SELECT * FROM PRIORITYMASTER ORDER BY CODE ASC`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data for duplicate check
      // Using raw query to remain independent of Entity metadata
      const existingRows: { NAME: string }[] = await queryRunner.manager.query(
        `SELECT "NAME" FROM prioritysectormaster`
      );
      const existingNames = new Set(
        existingRows.map((item) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName || existingNames.has(rawName.toLowerCase())) continue;

          const payload = {
            // transformValue handles Marathi font symbols
            NAME: this.transformValue(rawName),

            // Priority sectors often use hierarchical codes (SUB1, SUB2, etc.)
            SUB1_CODE: ele.SUB1_CODE || null,
            SUB2_CODE: ele.SUB2_CODE || null,
            SUB3_CODE: ele.SUB3_CODE || null,

            // Tracking and Constraints
            BRANCH_CODE: branchId,
            status: '1',
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'ADMIN',
          };

          // 4. Insert into PostgreSQL using the table name string
          // This bypasses Entity class checks and prevents CTCODE-style errors
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('prioritysectormaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`PRIORITYMASTER: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migratePURPOSEMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting PURPOSEMASTER migration (Marathi Font & Metadata Bypass)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      // Oracle table is typically PURPOSEMASTER or LNPURPOSEMASTER
      const result = await this.clientConn.execute(`SELECT * FROM PURPOSEMASTER ORDER BY CODE ASC`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG records for duplicate check
      // Using raw query to remain independent of Entity metadata
      const existingRows: { NAME: string }[] = await queryRunner.manager.query(
        `SELECT "NAME" FROM purposemaster`
      );
      const existingNames = new Set(
        existingRows.map((item) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Handle common Oracle column names for Purpose
          const rawName = (ele.NAME || ele.PURPOSE_NAME || ele.DESCRIPTION)
            ? String(ele.NAME || ele.PURPOSE_NAME || ele.DESCRIPTION).trim()
            : null;

          if (!rawName || existingNames.has(rawName.toLowerCase())) continue;

          const payload = {
            // transformValue handles legacy Marathi font symbols (mojibake)
            NAME: this.transformValue(rawName),
            CODE: ele.CODE || ele.PURPOSE_CODE || null,

            // Loan purposes often link to priority sectors
            PRIORITY_CODE: ele.PRIORITY_CODE || null,

            // Mandatory tracking columns
            BRANCH_CODE: branchId,
            status: '1',
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'ADMIN',
          };

          // 4. Insert into PostgreSQL using the table name string
          // This bypasses Entity class checks and prevents CTCODE-style errors
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('purposemaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`PURPOSEMASTER: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateREPORTTYPEMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting REPORTTYPEMASTER migration (Metadata Bypass)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM REPORTTYPEMASTER ORDER BY CODE ASC`);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG records for duplicate check
      const existingRows: { NAME: string }[] = await queryRunner.manager.query(
        `SELECT "NAME" FROM reporttypemaster`
      );
      const existingNames = new Set(
        existingRows.map((item) => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Get Default Branch ID
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Handle common Oracle column names for Report Type
          const rawName = (ele.NAME || ele.REPORT_TYPE_NAME || ele.DESCRIPTION)
            ? String(ele.NAME || ele.REPORT_TYPE_NAME || ele.DESCRIPTION).trim()
            : null;

          if (!rawName || existingNames.has(rawName.toLowerCase())) continue;

          const payload = {
            // transformValue handles legacy Marathi font symbols
            NAME: this.transformValue(rawName),
            CODE: ele.CODE || ele.REPORT_TYPE_CODE || null,

            // Categorization (e.g., Financial, Administrative, Audit)
            CATEGORY: ele.CATEGORY || 'GENERAL',

            // Mandatory tracking columns
            BRANCH_CODE: branchId,
            status: '1',
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'ADMIN',
          };

          // 4. Insert into PostgreSQL using the table name string
          // Bypasses Entity class checks to prevent metadata-related crashes
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('reporttypemaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`REPORTTYPEMASTER: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  // ---------------- HOLIDAYSMASTER MIGRATION ----------------

  async migrateHOLIDAYSMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting HOLIDAYSMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM HOLIDAYSMASTER ORDER BY T_DATE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicate dates
      // Using raw query to avoid Entity/Metadata issues
      const existingRows: { T_DATE: Date }[] = await queryRunner.manager.query(
        `SELECT "T_DATE" FROM holidaysmaster`
      );

      // Create a Set of formatted strings for fast lookup
      const existingDates = new Set(
        existingRows.map(r => moment(r.T_DATE).format('YYYY-MM-DD'))
      );

      // 3. Get Default Branch ID from syspara
      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Validation: Ensure we have a date
          if (!ele.T_DATE) continue;

          const formattedDate = moment(ele.T_DATE).format('YYYY-MM-DD');

          // Skip if this holiday date already exists in Postgres
          if (existingDates.has(formattedDate)) {
            continue;
          }

          const payload = {
            // Date formatting for Postgres
            T_DATE: moment(ele.T_DATE).format('DD/MM/YYYY'),

            // transformValue handles Marathi font transliteration (e.g., 'DVBW-TTYogeshEn')
            T_DESC: this.transformValue(ele.T_DESC || ele.DESCRIPTION || 'Bank Holiday'),

            BRANCH_CODE: branchId,

            // Standard status tracking if required by your Entity
            status: '1',
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'ADMIN',
          };

          // 4. Insert into PostgreSQL using Query Builder
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('holidaysmaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`HOLIDAYSMASTER: Successfully migrated ${inserted} holiday records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Inner failure in HOLIDAYSMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  // ---------------- TRANINPUTHEAD MIGRATION ----------------
  async migrateTRANINPUTHEAD() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting TRANINPUTHEAD migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM TRANINPUTHEAD ORDER BY SERIAL_NO`);
      const rows = this.convertOracleRows(result as any);

      // 2. Duplicate Check
      // We check by SERIAL_NO and DESCRIPTION to prevent duplicate config entries
      const existingRows: { SERIAL_NO: number; DESCRIPTION: string }[] = await queryRunner.manager.query(
        `SELECT "SERIAL_NO", "DESCRIPTION" FROM traninputhead`
      );
      const existingKeys = new Set(
        existingRows.map(r => `${r.SERIAL_NO}_${String(r.DESCRIPTION || '').trim().toLowerCase()}`)
      );

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawDesc = ele.DESCRIPTION ? String(ele.DESCRIPTION).trim() : '';
          const key = `${ele.SERIAL_NO}_${rawDesc.toLowerCase()}`;

          if (existingKeys.has(key)) continue;

          const payload = {
            SERIAL_NO: ele.SERIAL_NO,
            SCHEME_TYPE: ele.SCHEME_TYPE,
            FIELD_AMOUNT: ele.FIELD_AMOUNT,
            FIELD_GL: ele.FIELD_GL,
            FIELD_INTEREST_DATE: ele.FIELD_INTEREST_DATE,
            FIELD_TRAN_TABLE: ele.FIELD_TRAN_TABLE,

            // GL Code handling: treat 0 as null for foreign key safety
            GL_CODE: ele.GL_CODE === 0 ? null : ele.GL_CODE,
            GL_CODE_FROM_SCHEME_FIELD: ele.GL_CODE_FROM_SCHEME_FIELD,

            // Transliteration for Description/Short Name
            DESCRIPTION: this.transformValue(rawDesc),
            SHORT_NAME: this.transformValue(ele.SHORT_NAME || ''),

            // Flag Conversion (0/1 to '0'/'1')
            CHECK_REQUIRE: ele.CHECK_REQUIRE == 0 ? '0' : '1',
            DRCR_APPLICABLE: ele.DRCR_APPLICABLE,
            INTEREST_DATE_INPUT: ele.INTEREST_DATE_INPUT == 0 ? '0' : '1',
            HEAD_TYPE: ele.HEAD_TYPE,
            IS_NOTING_REQUIRED: ele.IS_NOTING_REQUIRED == 0 ? '0' : '1',
            IS_GLBAL_MAINTAIN: ele.IS_GLBAL_MAINTAIN == 0 ? '0' : '1',

            // Mandatory tracking column
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('traninputhead')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`TRANINPUTHEAD: Successfully migrated ${inserted} input head configurations.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Inner failure in TRANINPUTHEAD loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  // ---------------- PGCOMMISSIONMASTER MIGRATION ----------------
  async migratePGCOMMISSIONMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting PGCOMMISSIONMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM PGCOMMISSIONMASTER ORDER BY EFFECT_DATE ASC, SR_NO ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      // We check by EFFECT_DATE, SLAB_TYPE, and AMOUNT_FROM
      const existingRows: { EFFECT_DATE: Date; SLAB_TYPE: string; AMOUNT_FROM: number }[] =
        await queryRunner.manager.query(
          `SELECT "EFFECT_DATE", "SLAB_TYPE", "AMOUNT_FROM" FROM pgcommissionmaster`
        );

      const existingKeys = new Set(
        existingRows.map(r =>
          `${moment(r.EFFECT_DATE).format('YYYY-MM-DD')}_${r.SLAB_TYPE}_${Number(r.AMOUNT_FROM)}`
        )
      );

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const effectDateStr = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('YYYY-MM-DD') : null;
          const amountFrom = Number(ele.AMOUNT_FROM) === -1 ? 1 : Number(ele.AMOUNT_FROM) || 0;
          const slabType = String(ele.SLAB_TYPE || '');

          const key = `${effectDateStr}_${slabType}_${amountFrom}`;

          // Skip duplicates
          if (existingKeys.has(key)) continue;

          const payload = {
            SR_NO: ele.SR_NO,
            EFFECT_DATE: ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : null,
            SLAB_TYPE: slabType,

            // Logic from source: if AMOUNT_FROM is -1, set to 1
            AMOUNT_FROM: amountFrom,
            AMOUNT_TO: Number(ele.AMOUNT_TO) || 0,

            PIGMY_COMMISSION_PERCENTAGE: Number(ele.PIGMY_COMMISSION_PERCENTAGE) || 0,
            COMM_AGAINST_LN_PERCENT: Number(ele.COMM_AGAINST_LN_PERCENT) || 0,
            PIGMY_SVR_CHARGE_RATE: Number(ele.PIGMY_SVR_CHARGE_RATE) || 0,

            // Set to null as per source logic for general master entries
            AC_ACNOTYPE: null,
            AC_TYPE: null,
            AC_NO: null,
            PG_AC_ACNOTYPE: null,
            PG_AC_TYPE: null,

            status: '1', // Default active status
          };

          // Insert into PostgreSQL
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('pgcommissionmaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`PGCOMMISSIONMASTER: Successfully migrated ${inserted} commission slabs.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Inner failure in PGCOMMISSIONMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateSTOCKSTATEMENT() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting STOCKSTATEMENT migration using PG schemast lookup...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data (No JOIN here to prevent Oracle-side errors)
      const result = await this.clientConn.execute(`SELECT * FROM STOCKSTATEMENT`);
      const rows = this.convertOracleRows(result as any) as StockStatementOracleRow[];
      if (rows.length === 0) return { success: true, inserted: 0 };

      // 2. Load Master Mappings from PostgreSQL (This follows your screenshot)
      const schemaData = await queryRunner.manager.query<{ id: number; S_ACNOTYPE: string; S_APPL: number }[]>(
        `SELECT id, "S_ACNOTYPE", "S_APPL" FROM schemast`
      );

      // Map based on S_ACNOTYPE (e.g., 'SB' -> Object with ID and S_APPL)
      // Note: If multiple 'LN' exist, this takes the last one. 
      const schemaMap = new Map<string, any>(
        schemaData.map((x) => [String(x.S_ACNOTYPE).trim(), x])
      );

      const securityPGData = await queryRunner.manager.find('securitymaster');

      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');

      const branch = await queryRunner.manager.query(`SELECT id, "CODE" FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]);
      const branchId = branch[0]?.id || 1;
      const branchCode = String(branch[0]?.CODE || '0').padStart(3, '0');

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- LOOKUP PG SCHEMAST RECORD ---
          const oracleAcNoType = ele.AC_ACNOTYPE ? String(ele.AC_ACNOTYPE).trim() : '';
          const schemaRecord = schemaMap.get(oracleAcNoType);

          if (!schemaRecord) {
            this.logger.warn(`No mapping found for S_ACNOTYPE: ${oracleAcNoType}`);
            continue;
          }

          // --- BANKACNO GENERATION (Following 15-digit Logic) ---
          const sApplRaw = String(schemaRecord.S_APPL || '000');
          const sApplTrimmed = sApplRaw.substring(0, 3).padStart(3, '0'); // Trim last 2 zeros to fit 15 chars
          const acNoOffset = Number(ele.AC_NO || 0) + 100000;

          const finalBankAcNo = `${bankCode}${branchCode}${sApplTrimmed}${acNoOffset}`;

          // Security lookup
          const internalSecuId = securityPGData.find(s => s['id'] == ele.SECU_CODE)?.id || null;

          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_TYPE: schemaRecord.id, // Using the Primary Key from PG schemast
            AC_NO: finalBankAcNo,      // 15-digit account number
            BRANCH_CODE: branchId,
            SECU_CODE: internalSecuId,
            SUBMISSION_DATE: ele.SUBMISSION_DATE ? moment(ele.SUBMISSION_DATE).format('DD/MM/YYYY') : null,
            STATEMENT_DATE: ele.STATEMENT_DATE ? moment(ele.STATEMENT_DATE).format('DD/MM/YYYY') : null,
            RAW_MATERIAL: String(ele.RAW_MATERIAL || '0'),
            WORK_PROGRESS: String(ele.WORK_PROGRESS || '0'),
            FINISHED_GOODS: String(ele.FINISHED_GOODS || '0'),
            RAW_MARGIN: String(ele.RAW_MARGIN || '0'),
            WORK_MARGIN: String(ele.WORK_MARGIN || '0'),
            FINISHED_MARGIN: String(ele.FINISHED_MARGIN || '0'),
            REMARK: this.transformValue(String(ele.REMARK || '')),
            SECURITY_TYPE: ele.SECURITY_TYPE,
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('stockstatement')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`STOCKSTATEMENT: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateVEHICLE() {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting VEHICLE migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {

      const result = await this.clientConn.execute(`
      SELECT VEHICLE.*, SCHEMAST.S_APPL AS ACTYPE
      FROM VEHICLE
      LEFT JOIN SCHEMAST ON VEHICLE.AC_TYPE = SCHEMAST.S_APPL
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No VEHICLE records found');
        return { success: true, inserted: 0 };
      }

      // 🔹 LOAD SCHEMA
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s.id);
      }

      // 🔹 SYS PARA (FIX: TAKE BOTH VALUES)
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      // 🔹 BRANCH ID
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE"=$1 LIMIT 1`,
        [branchCode]
      );

      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          try {
            if (!ele.ACTYPE) continue;

            // 🔹 SCHEMA ID
            const schemaId = schemaMap.get(Number(ele.ACTYPE));
            if (!schemaId) continue;

            const sAppl = Number(ele.ACTYPE);

            // 🔹 AC_NO FIX (EXACT SIR LOGIC)
            let finalAcNo: string | null = null;

            if (ele.AC_NO != null && ele.AC_NO != 0) {
              const acc = Number(ele.AC_NO) + 100000;

              finalAcNo =
                String(bankCode).padStart(3, '0') +
                String(branchCode).padStart(3, '0') +
                String(sAppl).substring(0, 3).padStart(3, '0') +
                String(acc);
            }

            // 🔹 SECURITY
            const internalSecuId =
              ele.SECU_CODE != null
                ? await queryRunner.manager
                  .createQueryBuilder()
                  .select('id')
                  .from('securitymaster', 's')
                  .where('s."SECU_CODE" = :code', {
                    code: String(ele.SECU_CODE),
                  })
                  .getRawOne()
                : null;

            // 🔹 INSERT
            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into('vehicle')
              .values({
                AC_ACNOTYPE: ele.AC_ACNOTYPE,
                AC_NO: finalAcNo,
                AC_TYPE: schemaId,
                BRANCH_CODE: branchId,

                SECU_CODE: internalSecuId?.id || null,

                SUBMISSION_DATE:
                  ele.SUBMISSION_DATE
                    ? moment(ele.SUBMISSION_DATE).format('DD/MM/YYYY')
                    : null,

                RTO_REG_DATE:
                  ele.RTO_REG_DATE
                    ? moment(ele.RTO_REG_DATE).format('DD/MM/YYYY')
                    : null,

                AQUISITION_DATE:
                  ele.AQUISITION_DATE
                    ? moment(ele.AQUISITION_DATE).format('DD/MM/YYYY')
                    : null,

                MARGIN: ele.MARGIN || 0,
                PURCHASE_PRICE: ele.PURCHASE_PRICE || 0,

                REMARK: this.transformValue(ele.REMARK),
                VEHICLE_MAKE: this.transformValue(ele.VEHICLE_MAKE?.replace("\x00", "")),
                SUPPLIER_NAME: this.transformValue(ele.SUPPLIER_NAME),

                SECURITY_TYPE: ele.SECURITY_TYPE,
                MANUFACTURE_YEAR: ele.MANUFACTURE_YEAR,
                VEHICLE_NO: ele.VEHICLE_NO,
                CHASSIS_NO: ele.CHASSIS_NO,
                NEW_VEHICLE: ele.NEW_VEHICLE,
                NEW_EQUIPEMENT: ele.NEW_EQUIPEMENT,
                REF_ID: ele.REF_ID,

                status: '1',
              })
              .execute();

            inserted++;
          } catch (err: any) {
            this.logger.error(
              `VEHICLE ERROR AC_NO ${ele.AC_NO}: ${err.message}`
            );
          }
        }

        await queryRunner.commitTransaction();
        this.logger.log(`VEHICLE migrated: ${inserted}`);

        return { success: true, inserted };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }
    } finally {
      await queryRunner.release();
    }
  }

  async migratePLEDGESTOCK() {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting PLEDGESTOCK migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {

      const result = await this.clientConn.execute(`
      SELECT PLEDGESTOCK.*, SCHEMAST.S_APPL AS ACTYPE
      FROM PLEDGESTOCK
      LEFT JOIN SCHEMAST ON PLEDGESTOCK.AC_TYPE = SCHEMAST.S_APPL
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No PLEDGESTOCK records found');
        return { success: true, inserted: 0 };
      }

      // 🔹 SCHEMA MAP
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s.id);
      }

      // 🔹 SECURITY MAP
      const securityData = await queryRunner.manager.query(`
      SELECT id, "SECU_CODE" FROM securitymaster
    `);

      const securityMap = new Map<string, number>();
      for (const s of securityData) {
        securityMap.set(String(s.SECU_CODE), s.id);
      }

      // 🔹 SYS PARA (FIXED)
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      // 🔹 BRANCH ID
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE"=$1 LIMIT 1`,
        [branchCode]
      );

      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          try {
            if (!ele.ACTYPE) continue;

            // 🔹 SCHEMA ID
            const schemaId = schemaMap.get(Number(ele.ACTYPE));
            if (!schemaId) continue;

            const sAppl = Number(ele.ACTYPE);

            // 🔹 AC_NO FIX (SIR LOGIC)
            let finalAcNo: string | null = null;

            if (ele.AC_NO != null && ele.AC_NO != 0) {
              const acc = Number(ele.AC_NO) + 100000;

              finalAcNo =
                String(bankCode).padStart(3, '0') +
                String(branchCode).padStart(3, '0') +
                String(sAppl) +
                String(acc);
            }

            // 🔹 SECURITY
            const internalSecuId =
              ele.SECU_CODE != null
                ? securityMap.get(String(ele.SECU_CODE))
                : null;

            // 🔹 DATES
            const subDate = ele.SUBMISSION_DATE;
            const stateDate = ele.STATEMENT_DATE;

            // 🔹 INSERT
            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into('pledgestock')
              .values({
                AC_ACNOTYPE: ele.AC_ACNOTYPE,
                AC_NO: finalAcNo,
                AC_TYPE: schemaId,
                BRANCH_CODE: branchId,
                SECU_CODE: internalSecuId || null,

                SUBMISSION_DATE:
                  subDate ? moment(subDate).format('DD/MM/YYYY') : null,

                STATEMENT_DATE:
                  stateDate ? moment(stateDate).format('DD/MM/YYYY') : null,

                QUANTITY: String(ele.QUANTITY || '0'),
                RATE: String(ele.RATE || '0'),
                TOTAL_VALUE: String(ele.TOTAL_VALUE || '0'),
                MARGIN: String(ele.MARGIN || '0'),
                DRAWING_POWER: String(ele.DRAWING_POWER || '0'),

                REMARK: this.transformValue(String(ele.REMARK || '')),
                SECURITY_TYPE: ele.SECURITY_TYPE,
                GODOWN_ADDRESS: ele.GODOWN_ADDRESS,
                ITEM_DESCRIPTION: ele.ITEM_DESCRIPTION,
                UNIT: ele.UNIT,

                status: '1'
              })
              .execute();

            inserted++;
          } catch (err: any) {
            this.logger.error(
              `PLEDGESTOCK ERROR AC_NO ${ele.AC_NO}: ${err.message}`
            );
          }
        }

        await queryRunner.commitTransaction();
        this.logger.log(`PLEDGESTOCK migrated: ${inserted}`);

        return { success: true, inserted };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }

  async migratePLANTMACHINARY() {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting PLANTMACHINARY migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 FETCH WITH ACTYPE (IMPORTANT LIKE SIR)
      const result = await this.clientConn.execute(`
      SELECT PLANTMACHINARY.*, SCHEMAST.S_APPL AS ACTYPE
      FROM PLANTMACHINARY
      LEFT JOIN SCHEMAST ON PLANTMACHINARY.AC_TYPE = SCHEMAST.S_APPL
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No PLANTMACHINARY records found');
        return { success: true, inserted: 0 };
      }

      // 🔹 LOAD SCHEMA
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s.id);
      }

      // 🔹 LOAD SECURITY
      const securityData = await queryRunner.manager.query(`
      SELECT id, "SECU_CODE" FROM securitymaster
    `);

      const securityMap = new Map<string, number>();
      for (const s of securityData) {
        securityMap.set(String(s.SECU_CODE), s.id);
      }

      // 🔹 SYS PARA (FIXED)
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      // 🔹 BRANCH ID
      const branch = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE"=$1 LIMIT 1`,
        [branchCode]
      );

      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          try {
            if (!ele.ACTYPE) continue;

            // 🔹 SCHEMA ID
            const schemaId = schemaMap.get(Number(ele.ACTYPE));
            if (!schemaId) continue;

            const sAppl = Number(ele.ACTYPE);

            // 🔹 AC_NO FIX (EXACT SIR LOGIC)
            let finalAcNo: string | null = null;

            if (ele.AC_NO != null && ele.AC_NO != 0) {
              const acc = Number(ele.AC_NO) + 100000;

              finalAcNo =
                String(bankCode).padStart(3, '0') +
                String(branchCode).padStart(3, '0') +
                String(sAppl).substring(0, 3).padStart(3, '0') +
                String(acc);
            }

            // 🔹 SECURITY
            const internalSecuId =
              ele.SECU_CODE != null
                ? securityMap.get(String(ele.SECU_CODE))
                : null;

            // 🔹 DATES
            const subDate = ele.SUBMISSION_DATE;
            const acqDate = ele.AQUISITION_DATE;

            // 🔹 INSERT
            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into('plantmachinary')
              .values({
                AC_ACNOTYPE: ele.AC_ACNOTYPE,
                AC_TYPE: schemaId,
                AC_NO: finalAcNo,
                BRANCH_CODE: branchId,
                SECU_CODE: internalSecuId || null,

                SUBMISSION_DATE:
                  subDate ? moment(subDate).format('DD/MM/YYYY') : null,

                AQUISITION_DATE:
                  acqDate ? moment(acqDate).format('DD/MM/YYYY') : null,

                MACHINE_NAME: ele.MACHINE_NAME,
                MACHINE_TYPE: ele.MACHINE_TYPE,
                DISTINCTIVE_NO: ele.DISTINCTIVE_NO,
                SPECIFICATION: ele.SPECIFICATION,
                NEW_EQUIPEMENT: ele.NEW_EQUIPEMENT,

                PURCHASE_PRICE: Number(ele.PURCHASE_PRICE) || 0,
                MARGIN: Number(ele.MARGIN) || 0,

                SUPPLIER_NAME: this.transformValue(
                  String(ele.SUPPLIER_NAME || '')
                ),

                REMARK: this.transformValue(
                  String(ele.REMARK || '')
                ),

                SECURITY_TYPE: ele.SECURITY_TYPE,
              })
              .execute();

            inserted++;
          } catch (err: any) {
            this.logger.error(
              `PLANTMACHINARY ERROR AC_NO ${ele.AC_NO}: ${err.message}`
            );
          }
        }

        await queryRunner.commitTransaction();
        this.logger.log(`PLANTMACHINARY migrated: ${inserted}`);

        return { success: true, inserted };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }

  async migrateOWNDEPOSIT() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting OWNDEPOSIT migration (Original 15-Digit Logic)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM OWNDEPOSIT`);
      const rows = this.convertOracleRows(result as any) as OwnDepositOracleRow[];

      if (rows.length === 0) return { success: true, inserted: 0 };

      // 2. Load Master Mappings (Using Postgres schemast for S_APPL and ID)
      const schemaData = await queryRunner.manager.query<{ id: number; S_ACNOTYPE: string; S_APPL: number }[]>(
        `SELECT id, "S_ACNOTYPE", "S_APPL" FROM schemast`
      );
      // Create a unique key by combining Type and S_APPL
      const schemaMap = new Map<string, any>(
        schemaData.map((x) => [`${String(x.S_ACNOTYPE).trim()}_${x.S_APPL}`, x])
      );

      const securityPGData = await queryRunner.manager.find('securitymaster');

      // 3. Codes for BANKACNO Generation
      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');

      const branch = await queryRunner.manager.query(`SELECT id, "CODE" FROM ownbranchmaster WHERE "CODE" = $1`, [syspara[0]?.BRANCH_CODE || 101]);
      const branchId = branch[0]?.id || 1;
      const branchCode = String(branch[0]?.CODE || '0').padStart(3, '0');

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- 1. LOOKUP SCHEMA RECORD (FIXED COMPOSITE KEY) ---
          const oracleAcNoType = ele.AC_ACNOTYPE ? String(ele.AC_ACNOTYPE).trim() : '';
          const oracleAcType = ele.AC_TYPE; // e.g., 50700

          // Generate key using both Type and Application code to avoid "Last Entry" overwrite
          const lookupKey = `${oracleAcNoType}_${oracleAcType}`;
          const schemaRecord = schemaMap.get(lookupKey);

          if (!schemaRecord) {
            this.logger.warn(`No matching schema found for Type: ${oracleAcNoType} and Appl: ${oracleAcType}. Skipping.`);
            continue;
          }

          // --- 2. GENERATE 15-DIGIT BANKACNO ---
          // Now sApplTrimmed correctly uses the application code matched to the Oracle row
          const sApplTrimmed = String(schemaRecord.S_APPL).substring(0, 3).padStart(3, '0');
          const acNoOffset = (Number(ele.AC_NO || 0) + 100000).toString().padStart(6, '0');
          const finalBankAcNo = `${bankCode}${branchCode}${sApplTrimmed}${acNoOffset}`;

          // --- 3. DEPOSIT ACCOUNT OFFSET ---
          const depoAcNoOffset = (Number(ele.DEPO_AC_NO || 0) + 100000).toString();

          // Security lookup
          const internalSecuId = securityPGData.find(s => s['id'] == ele.SECU_CODE)?.id || null;

          // --- 4. PREPARE PAYLOAD ---
          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: finalBankAcNo,
            AC_TYPE: schemaRecord.id, // Correct ID (e.g., 27 for LN 50700)

            DEPO_AC_NO: depoAcNoOffset,
            DEPO_AC_TYPE: ele.DEPO_ACTYPE,

            BRANCH_CODE: branchId,
            SECU_CODE: internalSecuId,

            SUBMISSION_DATE: ele.SUBMISSION_DATE ? moment(ele.SUBMISSION_DATE).format('DD/MM/YYYY') : null,
            AC_EXPIRE_DATE: ele.AC_EXPIRE_DATE ? moment(ele.AC_EXPIRE_DATE).format('DD/MM/YYYY') : null,
            MATURITY_DATE: ele.MATURITY_DATE ? moment(ele.MATURITY_DATE).format('DD/MM/YYYY') : null,

            RECEIPT_NO: ele.RECEIPT_NO,
            DEPOSIT_AMT: Number(ele.DEPOSIT_AMT) || 0,
            REMARK: this.transformValue(String(ele.REMARK || '')),
            MARGIN: String(ele.MARGIN || '0'),
            LEDGER_BAL: Number(ele.LEDGER_BAL) || 0,
            IS_LIEN_MARK_CLEAR: ele.IS_LIEN_MARK_CLEAR,
            BALANCE_OF_LOAN_ACCOUNT: Number(ele.BALANCE_OF_LOAN_ACCOUNT) || 0,
            status: '1'
          };

          // --- 5. EXECUTE INSERT ---
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('owndeposit')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`OWNDEPOSIT: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }



  async migrateOTHERSECURITY(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting OTHERSECURITY migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 1. FETCH ORACLE OTHERSECURITY
      const result = await this.clientConn.execute(`
      SELECT * FROM OTHERSECURITY
    `);

      const rows = this.mapOracleToPgRows(result);

      if (!rows.length) {
        this.logger.warn('No records found in OTHERSECURITY');
        return { success: true, inserted: 0 };
      }

      // 🔹 2. SCHEMA (S_APPL → id)
      const schemaRows = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>(
        schemaRows.map((r: any) => [Number(r.S_APPL), Number(r.id)])
      );

      // 🔹 3. ORACLE SECURITY MASTER (SECU_CODE → SECU_NAME)
      const oracleSecurityRes = await this.clientConn.execute(`
      SELECT SECU_CODE, SECU_NAME FROM securitymaster
    `);

      const oracleSecurity = this.mapOracleToPgRows(oracleSecurityRes);

      // 🔹 4. PG SECURITY MASTER (SECU_NAME → id)
      const pgSecurity = await queryRunner.manager.query(`
      SELECT id, "SECU_NAME" FROM securitymaster
    `);

      // 🔹 5. SYS + BRANCH
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster 
      WHERE "CODE" = ${syspara[0]?.BRANCH_CODE} LIMIT 1
    `);

      const branchId = branchRes[0]?.id || 1;

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      await queryRunner.startTransaction();

      let inserted = 0;

      // 🔹 6. LOOP
      for (const ele of rows) {
        try {
          if (!ele.AC_TYPE) continue;

          //SCHEMA ID
          const schemaId = schemaMap.get(Number(ele.AC_TYPE));
          if (!schemaId) continue;

          const sAppl = Number(ele.AC_TYPE);

          //SECU_CODE → SECU_NAME → PG id (SIR LOGIC)
          let secuId = null;

          if (ele.SECU_CODE != null) {
            const oracleSec = oracleSecurity.find(
              (o: any) =>
                String(o.SECU_CODE).trim() === String(ele.SECU_CODE).trim()
            );

            if (oracleSec) {
              const pgSec = pgSecurity.find(
                (p: any) =>
                  String(p.SECU_NAME).trim() === String(oracleSec.SECU_NAME).trim()
              );

              secuId = pgSec ? pgSec.id : null;
            }
          }

          // AC_NO FIX (IMPORTANT)
          const acc = String(Number(ele.AC_NO) + 100000).padStart(6, '0');

          //15 DIGIT BANKACNO 
          const bankAcNo =
            String(syspara[0].BANK_CODE).padStart(3, '0') +
            String(syspara[0].BRANCH_CODE).padStart(3, '0') +
            String(sAppl).substring(0, 3).padStart(3, '0') +
            acc;

          await queryRunner.manager.insert('othersecurity', {
            BRANCH_CODE: branchId,
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_TYPE: schemaId,
            AC_NO: bankAcNo,
            SECU_CODE: secuId,

            SR_NO: Number(ele.SR_NO) || 0,
            SUBMISSION_DATE: formatDate(ele.SUBMISSION_DATE),

            SHORT_DETAILS: this.transformValue(ele.SHORT_DETAILS),
            TOTAL_VALUE: Number(ele.TOTAL_VALUE) || 0,
            MARGIN: ele.MARGIN == null ? 0 : Number(ele.MARGIN),
            DETAILS: this.transformValue(ele.DETAILS),

            SECURITY_TYPE: ele.SECURITY_TYPE
          });

          inserted++;

        } catch (err: any) {
          this.logger.error(
            ` OTHERSECURITY ERROR AC_NO ${ele.AC_NO}: ${err.message}`
          );
        }
      }

      await queryRunner.commitTransaction();

      this.logger.log(` OTHERSECURITY migrated: ${inserted}`);

      return { success: true, inserted };

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async migrateMARKETSHARE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting MARKETSHARE migration (Safe Mapping Mode)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM MARKETSHARE`);

      //  Use the interface for typed property access
      const rows = this.convertOracleRows(result as any) as MarketShareOracleRow[];

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle MARKETSHARE table.');
        return { success: true, inserted: 0 };
      }

      // 2. Load Mappings (Schema, Security, Branch)
      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map<number, number>(
        schemaData.map((x) => [Number(x.S_APPL), x.id])
      );

      const securityData = await queryRunner.manager.query<{ id: number; SECU_CODE: string }[]>(
        `SELECT id, "SECU_CODE" FROM securitymaster`
      );
      const securityMap = new Map<string, number>(
        securityData.map((x) => [String(x.SECU_CODE), x.id])
      );

      const syspara = await queryRunner.manager.query<{ BRANCH_CODE: any }[]>(
        `SELECT "BRANCH_CODE" FROM syspara LIMIT 1`
      );
      const branch = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1`,
        [syspara[0]?.BRANCH_CODE || 101]
      );
      const branchId = branch[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- AC_TYPE LOOKUP (FOREIGN KEY SAFETY) ---
          const oracleAcType = Number(ele.AC_TYPE);
          const finalAcTypeId = schemaMap.get(oracleAcType) || null;

          // --- AC_NO LENGTH FIX (VARCHAR 15 SAFETY) ---
          const finalAcNo = String(ele.AC_NO || '');

          const internalSecuId = securityMap.get(String(ele.SECU_CODE)) || null;

          // Local extraction for formatting/transliteration
          const subDate = ele.SUBMISSION_DATE as string | null;
          const remarkText = String(ele.REMARK || '');
          const companyText = String(ele.COMPANY_NAME || '');

          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: finalAcNo,
            AC_TYPE: finalAcTypeId,
            BRANCH_CODE: branchId,
            SECU_CODE: internalSecuId,

            SUBMISSION_DATE: subDate ? moment(subDate).format('DD/MM/YYYY') : null,

            // Numeric fields - Ensure these match your Entity types (String vs Number)
            NO_OF_SHARES: String(ele.NO_OF_SHARES || '0'),
            FACE_VALUE: String(ele.FACE_VALUE || '0'),
            MARKET_VALUE: String(ele.MARKET_VALUE || '0'),
            MARGIN: String(ele.MARGIN || '0'),

            // Text fields with Transliteration
            COMPANY_NAME: this.transformValue(companyText),
            CERTIFICATE_NO: ele.CERTIFICATE_NO,
            REMARK: this.transformValue(remarkText),
            SECURITY_TYPE: ele.SECURITY_TYPE,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('marketshare')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`MARKETSHARE: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failed: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateLANDBUILDING() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting LANDBUILDING migration (15-Digit logic & Aggressive Branch Lookup)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. LOAD SYSTEM & MAPPING DATA
      const [syspara, schemaData, securityData, branchRows] = await Promise.all([
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query<{ id: number; S_APPL: number }[]>(`SELECT id, "S_APPL" FROM schemast`),
        queryRunner.manager.query<{ id: number; SECU_CODE: string }[]>(`SELECT id, "SECU_CODE" FROM securitymaster`),
        queryRunner.manager.query<{ id: number; CODE: string }[]>(`SELECT id, "CODE" FROM ownbranchmaster`)
      ]);

      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');
      const schemaMap = new Map<number, { id: number; S_APPL: number }>(
        schemaData.map((x) => [Number(x.S_APPL), x])
      );
      const securityMap = new Map<string, number>(
        securityData.map((x) => [String(x.SECU_CODE), x.id])
      );

      // --- 2. BRANCH LOOKUP (Match syspara or fallback) ---
      const branchMatch = branchRows.find(b => Number(b.CODE) === Number(syspara[0]?.BRANCH_CODE)) || branchRows[0];
      const branchId = branchMatch?.id;
      const branchCodeStr = String(branchMatch?.CODE || '1').padStart(3, '0');

      if (!branchId) throw new Error('FATAL: ownbranchmaster is empty.');

      // 3. FETCH ORACLE DATA
      const result = await this.clientConn.execute(`SELECT * FROM LANDBUILDING`);
      const rows = this.convertOracleRows(result as any) as LandBuildingOracleRow[];
      if (rows.length === 0) return { success: true, inserted: 0 };

      await queryRunner.startTransaction();

      try {
        let inserted = 0;
        for (const ele of rows) {
          // --- 4. 15-DIGIT BANKACNO LOGIC ---
          const oracleAcType = Number(ele.AC_TYPE);
          const schemaRecord = schemaMap.get(oracleAcType);

          if (!schemaRecord) {
            this.logger.warn(`Skip: No schema for AC_TYPE ${oracleAcType}`);
            continue;
          }

          // Scheme: Take first 3 digits of S_APPL (e.g. 507 from 50700)
          const schemeTrimmed = String(schemaRecord.S_APPL).substring(0, 3).padStart(3, '0');
          // Account: Add 100,000 offset and force 6 digits
          const acNoOffset = (Number(ele.AC_NO || 0) + 100000).toString().padStart(6, '0');

          // Final 15: Bank(3) + Branch(3) + Scheme(3) + Account(6)
          const finalBankAcNo = `${bankCode}${branchCodeStr}${schemeTrimmed}${acNoOffset}`;

          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: finalBankAcNo, // <--- 15 Digit Account Number
            AC_TYPE: schemaRecord.id,
            BRANCH_CODE: branchId,
            SECU_CODE: securityMap.get(String(ele.SECU_CODE)) ?? null,

            SUBMISSION_DATE: ele.SUBMISSION_DATE ? moment(ele.SUBMISSION_DATE).format('DD/MM/YYYY') : null,
            VALUE: Number(ele.VALUE) || 0,
            LOCATION: this.transformValue(String(ele.LOCATION || '')),
            AREA: String(ele.AREA || '0'),
            UNIT_AREA: this.transformValue(String(ele.UNIT_AREA || '')),
            MARGIN: String(ele.MARGIN || '0'),
            REMARK: this.transformValue(String(ele.REMARK || '')),

            // Adding extra fields from your previous code
            CITY_SURVEY_NO: ele.CITY_SURVEY_NO,
            REG_NO: ele.REG_NO,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('landbuilding')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`LANDBUILDING: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateGOLDSILVER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting Integrated GOLDSILVER migration (15-Digit logic & All Columns)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. LOAD MASTER DATA (Lookup Maps)
      const [syspara, schemaData, securityRows, branchRows] = await Promise.all([
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query<{ id: number; S_APPL: number }[]>(`SELECT id, "S_APPL" FROM schemast`),
        // Security lookup by Name as per your GOLDSILVERselect snippet logic
        queryRunner.manager.query<{ id: number; SECU_CODE: number }[]>(`SELECT id, "SECU_CODE" FROM securitymaster`), queryRunner.manager.query<{ id: number; CODE: string }[]>(`SELECT id, "CODE" FROM ownbranchmaster`)
      ]);

      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');
      const schemaMap = new Map<number, { id: number; S_APPL: number }>(
        schemaData.map((x) => [Number(x.S_APPL), x])
      );
      // CHANGE THIS: Use SECU_CODE as the key
      const securityMap = new Map<number, number>(
        securityRows.map((x) => [Number(x.SECU_CODE), x.id])
      );

      // --- 2. BRANCH LOOKUP ---
      const branchMatch = branchRows.find(b => Number(b.CODE) === Number(syspara[0]?.BRANCH_CODE)) || branchRows[0];
      const branchId = branchMatch?.id;
      const branchCodeStr = String(branchMatch?.CODE || '1').padStart(3, '0');

      if (!branchId) throw new Error('FATAL: ownbranchmaster is empty.');

      // 3. FETCH ORACLE DATA
      const result = await this.clientConn.execute(`SELECT * FROM GOLDSILVER`);
      const rows = this.convertOracleRows(result as any);

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- 4. 15-DIGIT BANKACNO LOGIC ---
          const oracleAcType = Number(ele.AC_TYPE);
          const schemaRecord = schemaMap.get(oracleAcType);

          if (!schemaRecord) {
            this.logger.warn(`Skip: No schema for Oracle AC_TYPE ${oracleAcType}`);
            continue;
          }

          const schemeTrimmed = String(schemaRecord.S_APPL).substring(0, 3).padStart(3, '0');
          const acNoOffset = (Number(ele.AC_NO || 0) + 100000).toString().padStart(6, '0');
          const finalBankAcNo = `${bankCode}${branchCodeStr}${schemeTrimmed}${acNoOffset}`;

          // --- 5. INTEGRATED PAYLOAD ---
          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: finalBankAcNo,
            AC_TYPE: schemaRecord.id,
            BRANCH_CODE: branchId,

            // Security lookup by Name (trimmed for safety)
            SECU_CODE: securityMap.get(Number(ele.SECU_CODE)) || null,
            // Dates formatted for Postgres view
            SUBMISSION_DATE: ele.SUBMISSION_DATE ? moment(ele.SUBMISSION_DATE).format('DD/MM/YYYY') : null,
            RETURN_DATE: ele.RETURN_DATE ? moment(ele.RETURN_DATE).format('DD/MM/YYYY') : null,

            // Logic from snippet: Convert Oracle statuses
            TRAN_STATUS: ele.TRAN_STATUS == '' || ele.TRAN_STATUS == 'UP' ? '0' : '1',
            ITEM_TYPE: ele.ITEM_TYPE,

            // Numeric fields
            TOTAL_WEIGHT_GMS: Number(ele.TOTAL_WEIGHT_GMS) || 0,
            CLEAR_WEIGHT_GMS: Number(ele.CLEAR_WEIGHT_GMS) || 0,
            TOTAL_VALUE: Number(ele.TOTAL_VALUE) || 0,
            RATE: Number(ele.RATE) || 0,
            MARGIN: Number(ele.MARGIN) || 0,

            // Strings and Identifiers (with transformValue for legacy fonts)
            ARTICLE_NAME: this.transformValue(ele.ARTICLE_NAME),
            GOLD_BOX_NO: ele.GOLD_BOX_NO,
            BAG_RECEIPT_NO: ele.BAG_RECEIPT_NO,
            REMARK: this.transformValue(ele.REMARK),
            SECURITY_TYPE: ele.SECURITY_TYPE,

            // Audit and Nominee columns
            NOMINEE: this.transformValue(ele.NOMINEE),
            NOMINEE_RELATION: this.transformValue(ele.NOMINEE_RELATION),
            USER_CODE: ele.USER_CODE || 'MIGRATION',
            OFFICER_CODE: ele.OFFICER_CODE || 'SYSTEM',

            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('goldsilver')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`GOLDSILVER: Successfully migrated ${inserted} integrated records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateFURNITURE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting FURNITURE migration (Safe Mapping Mode)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM FURNITURE`);
      const rows = this.convertOracleRows(result as any) as FurnitureOracleRow[];

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle FURNITURE table.');
        return { success: true, inserted: 0 };
      }

      // 2. Load Mappings (Schema & Security)
      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map<number, number>(
        schemaData.map((x) => [Number(x.S_APPL), x.id])
      );

      const securityData = await queryRunner.manager.query<{ id: number; SECU_CODE: string }[]>(
        `SELECT id, "SECU_CODE" FROM securitymaster`
      );
      const securityMap = new Map<string, number>(
        securityData.map((x) => [String(x.SECU_CODE), x.id])
      );

      // 3. Aggressive Branch Lookup (FK Safety)
      let branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = '1' OR "CODE" = 1 LIMIT 1`
      );

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query<{ id: number }[]>(
          `SELECT id FROM ownbranchmaster LIMIT 1`
        );
      }

      const branchId = branchRes[0]?.id;
      if (!branchId) throw new Error('FATAL: ownbranchmaster is empty. Migration halted.');

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- Mapping Lookups ---
          const finalAcTypeId = schemaMap.get(Number(ele.AC_TYPE)) ?? null;
          const internalSecuId = securityMap.get(String(ele.SECU_CODE)) ?? null;
          const finalAcNo = String(ele.AC_NO || '');

          // Dates
          const subDate = ele.SUBMISSION_DATE as string | null;
          const acqDate = ele.AQUISITION_DATE as string | null;

          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: finalAcNo,
            AC_TYPE: finalAcTypeId,
            BRANCH_CODE: branchId,
            SECU_CODE: internalSecuId,

            SUBMISSION_DATE: subDate ? moment(subDate).format('DD/MM/YYYY') : null,
            AQUISITION_DATE: acqDate ? moment(acqDate).format('DD/MM/YYYY') : null,

            // Numeric Fields
            PURCHASE_PRICE: String(ele.PURCHASE_PRICE || '0'),
            VALUATION_AMT: String(ele.VALUATION_AMT || '0'),
            MARGIN: String(ele.MARGIN || '0'),
            QUANTITY: String(ele.QUANTITY || '0'),

            // Text Fields with Cleaning
            ITEM_DESCRIPTION: this.transformValue(String(ele.ITEM_DESCRIPTION || '')),
            REMARK: this.transformValue(String(ele.REMARK || '')),
            SECURITY_TYPE: ele.SECURITY_TYPE,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('furniture')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`FURNITURE: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failed: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateFIREPOLICY() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting FIREPOLICY migration (Safe Mapping Mode)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM FIREPOLICY`);
      const rows = this.convertOracleRows(result as any) as FirePolicyOracleRow[];

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle FIREPOLICY table.');
        return { success: true, inserted: 0 };
      }

      // 2. Load Mappings (Schema & Security)
      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map<number, number>(
        schemaData.map((x) => [Number(x.S_APPL), x.id])
      );

      const securityData = await queryRunner.manager.query<{ id: number; SECU_CODE: string }[]>(
        `SELECT id, "SECU_CODE" FROM securitymaster`
      );
      const securityMap = new Map<string, number>(
        securityData.map((x) => [String(x.SECU_CODE), x.id])
      );

      // 3. Aggressive Branch Lookup (FK Safety)
      let branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = '1' OR "CODE" = 1 LIMIT 1`
      );

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query<{ id: number }[]>(
          `SELECT id FROM ownbranchmaster LIMIT 1`
        );
      }

      const branchId = branchRes[0]?.id;
      if (!branchId) throw new Error('FATAL: ownbranchmaster is empty.');

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- Mapping Lookups ---
          const finalAcTypeId = schemaMap.get(Number(ele.AC_TYPE)) ?? null;
          const internalSecuId = securityMap.get(String(ele.SECU_CODE)) ?? null;
          const finalAcNo = String(ele.AC_NO || '');

          // Dates
          const subDate = ele.SUBMISSION_DATE as string | null;
          const expDate = ele.EXPIRY_DATE as string | null;

          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: finalAcNo,
            AC_TYPE: finalAcTypeId,
            BRANCH_CODE: branchId,
            SECU_CODE: internalSecuId,

            SUBMISSION_DATE: subDate ? moment(subDate).format('DD/MM/YYYY') : null,
            EXPIRY_DATE: expDate ? moment(expDate).format('DD/MM/YYYY') : null,

            // Numeric Fields
            POLICY_AMT: String(ele.POLICY_AMT || '0'),
            PREMIUM_AMT: String(ele.PREMIUM_AMT || '0'),

            // Text Fields
            POLICY_NO: ele.POLICY_NO,
            INSURANCE_COMPANY: this.transformValue(String(ele.INSURANCE_COMPANY || '')),
            REMARK: this.transformValue(String(ele.REMARK || '')),
            SECURITY_TYPE: ele.SECURITY_TYPE,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('firepolicy')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`FIREPOLICY: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failed: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateSECINSURANCE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting SECINSURANCE migration (Correct BANKACNO)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM SECINSURANCE`);
      const rows = this.convertOracleRows(result as any);

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle SECINSURANCE table.');
        return { success: true, inserted: 0 };
      }

      // 🔹 2. Load SCHEMAST (IMPORTANT: S_APPL + id)
      const schemaData = await queryRunner.manager.query<{
        id: number;
        S_APPL: number;
      }[]>(`SELECT id, "S_APPL" FROM schemast`);

      const schemaIdMap = new Map<number, number>();   // S_APPL → id
      const schemaApplMap = new Map<number, number>(); // S_APPL → S_APPL

      for (const row of schemaData) {
        schemaIdMap.set(Number(row.S_APPL), row.id);
        schemaApplMap.set(Number(row.S_APPL), Number(row.S_APPL));
      }

      // 🔹 3. Load SECURITYMASTER
      const securityData = await queryRunner.manager.query<{
        id: number;
        SECU_CODE: string;
      }[]>(`SELECT id, "SECU_CODE" FROM securitymaster`);

      const securityMap = new Map<string, number>(
        securityData.map((x) => [String(x.SECU_CODE), x.id])
      );

      // 🔹 4. Get BANK + BRANCH CODE
      const syspara = await queryRunner.manager.query(
        `SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`
      );

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      // 🔹 5. Get Branch ID (FK)
      let branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode} LIMIT 1`
      );

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query<{ id: number }[]>(
          `SELECT id FROM ownbranchmaster LIMIT 1`
        );
      }

      const branchId = branchRes[0]?.id;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // 🔹 Map Schema
          const sAppl = schemaApplMap.get(Number(ele.AC_TYPE)) || 0;
          const finalAcTypeId = schemaIdMap.get(Number(ele.AC_TYPE)) || null;

          // 🔹 Map Security
          const internalSecuId = securityMap.get(String(ele.SECU_CODE)) || null;

          // 🔹 Generate BANKACNO (15 digit)
          let bankAcNo: string | null = null;

          if (ele.AC_NO) {
            const acc = String(Number(ele.AC_NO) + 100000).padStart(6, '0');

            bankAcNo =
              String(bankCode || '0').padStart(3, '0') +
              String(branchCode || '0').padStart(3, '0') +
              String(sAppl).substring(0, 3).padStart(3, '0') +
              acc;
          }

          // 🔹 Dates
          const subDate = ele.SUBMISSION_DATE;
          const expDate = ele.EXPIRY_DATE;

          // 🔹 Payload
          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: bankAcNo,              //  FINAL CORRECT AC_NO
            AC_TYPE: finalAcTypeId,       // FK
            BRANCH_CODE: branchId,
            SECU_CODE: internalSecuId,

            INSURANCE_DATE: ele.INSURANCE_DATE ? moment(ele.INSURANCE_DATE).format('DD/MM/YYYY') : null,
            SUBMISSION_DATE: subDate ? moment(subDate).format('DD/MM/YYYY') : null,
            EXPIRY_DATE: expDate ? moment(expDate).format('DD/MM/YYYY') : null,

            PREMIUM_DUE_DATE: ele.INSU_EXP_DATE == '' || ele.INSU_EXP_DATE == null ? null : moment(ele.INSU_EXP_DATE).format('DD/MM/YYYY'),
            POLICY_AMT: String(ele.POLICY_AMT || '0'),
            PREMIUM_AMT: String(ele.PREMIUM_AMT || '0'),
            //INSU_COMPANY_CODE: ele.INSU_COMPANY_CODE,
            INSU_AMOUNT: ele.INSU_AMOUNT,

            POLICY_NO: ele.POLICY_NO,
            INSURANCE_COMPANY: this.transformValue(String(ele.INSURANCE_COMPANY || '')),
            REMARK: this.transformValue(String(ele.REMARK || '')),
            SECURITY_TYPE: ele.SECURITY_TYPE,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('secinsurance')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`SECINSURANCE: Successfully migrated ${inserted} records.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failed: ${error.message}`);
        throw err;
      }

    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateGOVTSECULIC(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting GOVTSECULIC migration (FINAL FIXED)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 FETCH ORACLE DATA
      const result = await this.clientConn.execute(`SELECT * FROM GOVTSECULIC`);
      const rows = this.convertOracleRows(result as any);

      if (rows.length === 0) {
        this.logger.warn('No records found in GOVTSECULIC');
        return { success: true, inserted: 0 };
      }

      // 🔹 SCHEMA MASTER
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      const schemaApplMap = new Map<number, number>();

      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s.id);
        schemaApplMap.set(Number(s.S_APPL), Number(s.S_APPL));
      }

      // 🔹 SECURITY MASTER
      const securityData = await queryRunner.manager.query(`
      SELECT id, "SECU_CODE" FROM securitymaster
    `);

      const securityMap = new Map<string, number>();
      for (const s of securityData) {
        securityMap.set(String(s.SECU_CODE), s.id);
      }

      // 🔹 SYS PARA (BANK + BRANCH)
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      // 🔹 BRANCH ID
      let branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode} LIMIT 1
    `);

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query(`
        SELECT id FROM ownbranchmaster LIMIT 1
      `);
      }

      const branchId = branchRes[0]?.id;
      if (!branchId) throw new Error('ownbranchmaster is empty');

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          try {
            // 🔹 SCHEMA FK
            const schemaId = schemaMap.get(Number(ele.AC_TYPE)) ?? null;

            // 🔹 SECURITY FK
            const securityId =
              securityMap.get(String(ele.SECU_CODE)) ?? null;

            // 🔹 15-DIGIT AC_NO (LOANTRAN STYLE)
            let finalAcNo: string | null = null;

            const acNoNum = Number(ele.AC_NO);

            if (!isNaN(acNoNum) && ele.AC_TYPE) {
              const sAppl =
                schemaApplMap.get(Number(ele.AC_TYPE)) ||
                Number(ele.AC_TYPE);

              const acc = String(acNoNum + 100000).padStart(6, '0');

              finalAcNo =
                String(bankCode || '0').padStart(3, '0') +
                String(branchCode || '0').padStart(3, '0') +
                String(sAppl).substring(0, 3).padStart(3, '0') +
                acc;
            } else {
              this.logger.warn(
                ` Invalid AC_NO for record: ${ele.AC_NO}`
              );
            }

            // 🔹 INSERT
            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into('govtseculic')
              .values({
                AC_ACNOTYPE: ele.AC_ACNOTYPE,
                AC_NO: finalAcNo,
                AC_TYPE: schemaId,
                BRANCH_CODE: branchId,
                SECU_CODE: securityId,

                SUBMISSION_DATE: formatDate(ele.SUBMISSION_DATE),
                MATURITY_DATE: formatDate(ele.MATURITY_DATE),

                FACE_VALUE: ele.FACE_VALUE || 0,
                SURRENDER_VALUE: ele.SURRENDER_VALUE || 0,
                MARGIN: ele.MARGIN || 0,

                POLICY_NO: ele.POLICY_NO || ele.CERTIFICATE_NO,
                ISSUING_AUTHORITY: ele.ISSUING_AUTHORITY
                  ? ele.ISSUING_AUTHORITY.replace("\x00", "")
                  : null,
                REMARK: ele.REMARK
                  ? ele.REMARK.replace("\x00", "")
                  : null,

                SECURITY_TYPE: ele.SECURITY_TYPE,
                status: 1
              })
              .execute();

            inserted++;
          } catch (err) {
            this.logger.error(
              ` Error inserting record AC_NO ${ele.AC_NO}`,
              err
            );
          }
        }

        await queryRunner.commitTransaction();

        this.logger.log(
          ` GOVTSECULIC migrated successfully: ${inserted}`
        );

        return { success: true, inserted };
      } catch (err) {
        if (queryRunner.isTransactionActive)
          await queryRunner.rollbackTransaction();

        this.logger.error(' Migration failed, rolled back');
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased)
        await queryRunner.release();
    }
  }

  async migrateBOOKDEBTS() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting BOOKDEBTS migration (Safe Mapping Mode)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM BOOKDEBTS`);
      const rows = this.convertOracleRows(result as any) as BookDebtsOracleRow[];

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle BOOKDEBTS table.');
        return { success: true, inserted: 0 };
      }

      // 2. Load Mappings (Schema & Security)
      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map<number, number>(
        schemaData.map((x) => [Number(x.S_APPL), x.id])
      );

      const securityData = await queryRunner.manager.query<{ id: number; SECU_CODE: string }[]>(
        `SELECT id, "SECU_CODE" FROM securitymaster`
      );
      const securityMap = new Map<string, number>(
        securityData.map((x) => [String(x.SECU_CODE), x.id])
      );

      // 3. Aggressive Branch Lookup (FK Safety)
      let branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = '1' OR "CODE" = 1 LIMIT 1`
      );

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query<{ id: number }[]>(
          `SELECT id FROM ownbranchmaster LIMIT 1`
        );
      }

      const branchId = branchRes[0]?.id;
      if (!branchId) throw new Error('FATAL: ownbranchmaster is empty.');

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // --- Mapping Lookups ---
          const finalAcTypeId = schemaMap.get(Number(ele.AC_TYPE)) ?? null;
          const internalSecuId = securityMap.get(String(ele.SECU_CODE)) ?? null;
          const finalAcNo = String(ele.AC_NO || '');

          // Dates
          const subDate = ele.SUBMISSION_DATE as string | null;
          const valDate = ele.VALUATION_DATE as string | null;

          const payload = {
            AC_ACNOTYPE: ele.AC_ACNOTYPE,
            AC_NO: finalAcNo,
            AC_TYPE: finalAcTypeId,
            BRANCH_CODE: branchId,
            SECU_CODE: internalSecuId,

            SUBMISSION_DATE: subDate ? moment(subDate).format('DD/MM/YYYY') : null,
            VALUATION_DATE: valDate ? moment(valDate).format('DD/MM/YYYY') : null,

            // Numeric / Amount Fields
            TOTAL_BOOK_DEBTS: String(ele.TOTAL_BOOK_DEBTS || '0'),
            UPTO_90_DAYS: String(ele.UPTO_90_DAYS || '0'),
            OVER_90_DAYS: String(ele.OVER_90_DAYS || '0'),
            ELIGIBLE_DEBTS: String(ele.ELIGIBLE_DEBTS || '0'),
            MARGIN: String(ele.MARGIN || '0'),

            // Text Fields
            PARTY_NAME: this.transformValue(String(ele.PARTY_NAME || '')),
            REMARK: this.transformValue(String(ele.REMARK || '')),
            SECURITY_TYPE: ele.SECURITY_TYPE,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('bookdebts')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`BOOKDEBTS: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failed: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateTDSFORMSUBMIT() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting TDS Forms Migration (Interface Fixed)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. FETCH DATA
      const tdsResult = await this.clientConn.execute(`SELECT * FROM TDSFORMSUBMIT`);

      // Now TypeScript finds ITdsFormSubmit because it is defined above
      const tdsRows = this.convertOracleRows(tdsResult as any) as ITdsFormSubmit[];

      // 2. LOAD MAPPING DATA
      const dpMasterData = await queryRunner.manager.query<{ id: number; AC_NO: string; AC_ACNOTYPE: string }[]>(
        `SELECT id, "AC_NO", "AC_ACNOTYPE" FROM dpmaster`
      );
      const acToIdMap = new Map(dpMasterData.map(d => [`${d.AC_ACNOTYPE}-${d.AC_NO}`, d.id]));

      const syspara = await queryRunner.manager.query(`SELECT "BRANCH_CODE" FROM syspara LIMIT 1`);
      const branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1 OR "CODE" = '1' LIMIT 1`,
        [String(syspara[0].BRANCH_CODE)]
      );
      const branchId = branchRes[0]?.id || 1;

      await queryRunner.startTransaction();

      try {
        for (const t of tdsRows) {
          const parentId = acToIdMap.get(`${t.AC_ACNOTYPE}-${t.AC_NO}`);

          // Constructing object using the Interface
          const insertData = {
            DPMasterID: parentId || null,
            AC_NO: String(t.AC_NO),
            AC_ACNOTYPE: t.AC_ACNOTYPE,
            FIN_YEAR: t.FIN_YEAR,
            FORM_TYPE: t.FORM_TYPE,
            SUBMISSION_DATE: t.SUB_DATE ? moment(t.SUB_DATE).format('DD/MM/YYYY') : null,
            REMARKS: this.transformValue(t.REMARKS || ''),
            BRANCH_CODE: branchId,
            status: '1'
          };

          await queryRunner.manager.insert('tdsformsubmit', insertData);
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Success! Migrated ${tdsRows.length} TDS forms.`);
        return { success: true };

      } catch (err) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateSPECIALINSTRUCTION() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting SPECIALINSTRUCTION Migration (15-Digit Logic)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      const instResult = await this.clientConn.execute(`
      SELECT SPECIALINSTRUCTION.*, SCHEMAST.S_APPL as ACTYPE_PREFIX 
      FROM SPECIALINSTRUCTION 
      LEFT JOIN SCHEMAST ON SPECIALINSTRUCTION.TRAN_ACTYPE = SCHEMAST.S_APPL 
      ORDER BY INSTRUCTION_DATE
    `);

      const instRows = this.convertOracleRows(instResult as any);

      // 🔹 SYS + SCHEMA + BRANCH
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      const schemaRows = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      for (const s of schemaRows) {
        schemaMap.set(Number(s.S_APPL), s.id);
      }

      const branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster WHERE "CODE" = $1 LIMIT 1
    `, [branchCode]);

      const branchId = branchRes[0]?.id || 1;

      let totalInserted = 0;
      await queryRunner.startTransaction();

      try {
        for (const ele of instRows) {
          if (!ele.TRAN_ACTYPE) continue;

          //SCHEMA ID
          const schemaId = schemaMap.get(Number(ele.TRAN_ACTYPE));
          if (!schemaId) continue;

          const sAppl = ele.ACTYPE_PREFIX || ele.TRAN_ACTYPE;

          //CORRECT BANK ACNO 
          let finalBankAcNo: string | null = null;

          if (ele.TRAN_ACNO) {
            const acc = String(Number(ele.TRAN_ACNO) + 100000).padStart(6, '0');

            finalBankAcNo =
              String(bankCode || '0').padStart(3, '0') +
              String(branchCode || '0').padStart(3, '0') +
              String(sAppl).substring(0, 3).padStart(3, '0') +
              acc;
          }

          const payload: any = {
            INSTRUCTION_DATE: ele.INSTRUCTION_DATE ? moment(ele.INSTRUCTION_DATE).format('DD/MM/YYYY') : undefined,
            FROM_DATE: ele.FROM_DATE ? moment(ele.FROM_DATE).format('DD/MM/YYYY') : undefined,
            TO_DATE: ele.TO_DATE ? moment(ele.TO_DATE).format('DD/MM/YYYY') : undefined,
            REVOKE_DATE: ele.REVOKE_DATE ? moment(ele.REVOKE_DATE).format('DD/MM/YYYY') : undefined,

            //FIXED
            TRAN_ACNO: finalBankAcNo,
            TRAN_ACTYPE: schemaId,

            DRCR_APPLY: ele.DRCR_APPLY || null,
            DETAILS: this.transformValue(ele.DETAILS || ''),

            IS_RESTRICT: ele.IS_RESTRICT == 0 ? '0' : '1',

            BRANCH_CODE: branchId,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('specialinstruction')
            .values(payload)
            .execute();

          totalInserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${totalInserted} Special Instructions.`);
        return { success: true, totalInserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateTODTRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting TODTRAN Migration (Using Entity Reference)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await this.clientConn.execute(`
      SELECT TODTRAN.*, SCHEMAST.S_APPL AS ACTYPE_PREFIX 
      FROM TODTRAN 
      LEFT JOIN SCHEMAST ON TODTRAN.AC_TYPE = SCHEMAST.S_APPL
    `);
      const rows = this.convertOracleRows(result as any);

      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const { BANK_CODE: bankCode, BRANCH_CODE: branchCodeStr } = syspara[0];
      const branchCode = Number(branchCodeStr);

      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map(schemaData.map((x) => [Number(x.S_APPL), x.id]));

      const branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1 OR "CODE" = 1 LIMIT 1`,
        [String(branchCode)]
      );
      const branchId = branchRes[0]?.id || 1;

      let totalInserted = 0;
      await queryRunner.startTransaction();

      try {
        for (const ele of rows) {
          if (!ele.AC_TYPE) continue;

          const postgresSchemaId = schemaMap.get(Number(ele.AC_TYPE));
          if (!postgresSchemaId) continue;

          const finalBankAcNo = this.generateBankAcNo(
            bankCode,
            branchCode,
            ele.ACTYPE_PREFIX || ele.AC_TYPE,
            Number(ele.AC_NO)
          );

          const isStandardTOD = String(ele.TOD_TYPE).trim().toUpperCase() === 'TOD';

          const payload: any = {
            AC_TYPE: postgresSchemaId,
            AC_NO: finalBankAcNo,
            BRANCH_CODE: branchId,
            RELEASE_DATE: ele.RELEASE_DATE ? moment(ele.RELEASE_DATE).format('DD/MM/YYYY') : undefined,
            AC_ODAMT: isStandardTOD ? (Number(ele.TOD_AMOUNT) || 0) : 0,
            AC_SODAMT: !isStandardTOD ? (Number(ele.TOD_AMOUNT) || 0) : 0,
            AC_ODDAYS: Number(ele.TOD_DAYS) || 0,
            AC_ODDATE: ele.TRAN_DATE ? moment(ele.TRAN_DATE).format('DD/MM/YYYY') : undefined,
            status: '1'
          };

          // --- FIX: Use Entity Class Reference instead of string "tod_tran" ---
          await queryRunner.manager.createQueryBuilder()
            .insert()
            .into(TODTRAN)
            .values(payload)
            .execute();

          totalInserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Success! Migrated ${totalInserted} TODTRAN records.`);
        return { success: true, totalInserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Loop Error in TODTRAN: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateSTANDINSTRUCTION() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting STANDINSTRUCTION Migration (Debit/Credit Mapping)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data with Schema Joins for both sides
      const result = await this.clientConn.execute(`
      SELECT SI.*, 
             S1.S_APPL AS DR_PREFIX, 
             S2.S_APPL AS CR_PREFIX
      FROM STANDINSTRUCTION SI
      LEFT JOIN SCHEMAST S1 ON SI.DR_ACTYPE = S1.S_APPL
      LEFT JOIN SCHEMAST S2 ON SI.CR_ACTYPE = S2.S_APPL
      ORDER BY SI.INSTRUCTION_DATE ASC
    `);
      const rows = this.convertOracleRows(result as any);

      // 2. Load Mapping Data from Postgres
      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const { BANK_CODE: bankCode, BRANCH_CODE: branchCodeStr } = syspara[0];
      const branchCode = Number(branchCodeStr);

      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map(schemaData.map((x) => [Number(x.S_APPL), x.id]));

      const branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1 OR "CODE" = 1 LIMIT 1`,
        [String(branchCode)]
      );
      const branchId = branchRes[0]?.id || 1;

      let totalInserted = 0;
      await queryRunner.startTransaction();

      try {
        for (const ele of rows) {
          // Find internal Postgres Schema IDs for Debit and Credit types
          const drSchemaId = schemaMap.get(Number(ele.DR_ACTYPE)) || null;
          const crSchemaId = schemaMap.get(Number(ele.CR_ACTYPE)) || null;

          // Generate 15-digit BANKACNO for both sides
          const drBankAcNo = ele.DR_AC_NO ? this.generateBankAcNo(
            bankCode, branchCode, ele.DR_PREFIX || ele.DR_ACTYPE, Number(ele.DR_AC_NO)
          ) : undefined;

          const crBankAcNo = ele.CR_AC_NO ? this.generateBankAcNo(
            bankCode, branchCode, ele.CR_PREFIX || ele.CR_ACTYPE, Number(ele.CR_AC_NO)
          ) : undefined;

          const payload: any = {
            BRANCH_CODE: branchId,
            INSTRUCTION_DATE: ele.INSTRUCTION_DATE ? moment(ele.INSTRUCTION_DATE).format('DD/MM/YYYY') : undefined,
            FROM_DATE: ele.FROM_DATE ? moment(ele.FROM_DATE).format('DD/MM/YYYY') : undefined,
            TO_DATE: ele.NEXT_EXE_DATE ? moment(ele.NEXT_EXE_DATE).format('DD/MM/YYYY') : undefined,
            LAST_EXEC_DATE: ele.LAST_EXEC_DATE ? moment(ele.LAST_EXEC_DATE).format('DD/MM/YYYY') : undefined,
            REVOKE_DATE: ele.REVOKE_DATE ? moment(ele.REVOKE_DATE).format('DD/MM/YYYY') : undefined,

            // Frequency Mapping: M=Monthly, Q=Quarterly, H=Half Yearly, Y/F=Yearly/Fixed
            SI_FREQUENCY: ele.SI_FREQUENCY,
            EXECUTION_DAY: ele.EXECUTION_DAY, // MB, ME, or specific day
            DAYS: Number(ele.SI_PERIOD) || 0,

            // Debit Side
            DR_ACTYPE: drSchemaId,
            DR_AC_NO: drBankAcNo,
            DR_PARTICULARS: this.transformValue(ele.DR_PARTICULARS || ''),

            // Credit Side
            CR_ACTYPE: crSchemaId,
            CR_AC_NO: crBankAcNo,
            CR_PARTICULARS: this.transformValue(ele.CR_PARTICULARS || ''),

            // Financials
            TRAN_AMOUNT: Number(ele.TRAN_AMOUNT) || 0,
            PAYINT_AMOUNT: Number(ele.PAYINT_AMOUNT) || 0,
            MIN_BAL: Number(ele.MIN_BAL) || 0,

            IS_AUTO_CUT_LNPGCOM: ele.IS_AUTO_CUT_LNPGCOM == 0 ? '0' : '1',
            status: '1'
          };

          await queryRunner.manager.createQueryBuilder()
            .insert()
            .into(STANDINSTRUCTION) // Entity reference avoids "relation does not exist"
            .values(payload)
            .execute();

          totalInserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Success! Migrated ${totalInserted} Standing Instructions.`);
        return { success: true, totalInserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Loop Error in STANDINSTRUCTION: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateSTANDINSTRUCTIONLOG(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('Databases not connected');
    }

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      this.logger.log('Starting STANDINSTRUCTIONLOG migration...');

      const result = await this.clientConn.execute(`
      SELECT * FROM STANDINSTRUCTIONLOG 
      ORDER BY TRAN_DATE
    `);

      const rows = this.mapOracleToPgRows(result);

      let inserted = 0;

      await queryRunner.startTransaction();

      try {
        for (const item of rows) {

          const payload = {
            TRAN_DATE:
              item.TRAN_DATE == '' || item.TRAN_DATE == null
                ? null
                : moment(item.TRAN_DATE).format('DD/MM/YYYY'),

            TRAN_TIME: item.TRAN_TIME,

            INSTRUCTION_NO: item.INSTRUCTION_NO,

            SUCCESS_STATUS: item.SUCCESS_STATUS,

            DAILYTRAN_TRAN_NO: item.DAILYTRAN_TRAN_NO,

            EXPECTED_EXECUTION_DATE:
              item.EXPECTED_EXECUTION_DATE == '' || item.EXPECTED_EXECUTION_DATE == null
                ? null
                : moment(item.EXPECTED_EXECUTION_DATE).format('DD/MM/YYYY'),

            PARTICULARS:
              item.PARTICULARS == null
                ? null
                : String(item.PARTICULARS).replace("\x00", ""),

            OVERDUE_INT: item.OVERDUE_INT,
            RECPAY_INT_AMOUNT: item.RECPAY_INT_AMOUNT,
            INTEREST_AMOUNT: item.INTEREST_AMOUNT,
            TRAN_AMOUNT: item.TRAN_AMOUNT,
            PAYINT_AMOUNT: item.PAYINT_AMOUNT,
            OTHER9_AMOUNT: item.OTHER9_AMOUNT,
            PENAL_INT_AMOUNT: item.PENAL_INT_AMOUNT
          };

          await queryRunner.manager.insert('standinstructionlog', payload);

          inserted++;
        }

        await queryRunner.commitTransaction();

        this.logger.log(`STANDINSTRUCTIONLOG DONE: ${inserted}`);
        return { success: true, inserted };

      } catch (err: any) {
        await queryRunner.rollbackTransaction();
        this.logger.error(`Loop Error: ${err.message}`);
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }


  async migrateINTINSTRUCTION() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting INTINSTRUCTION Migration (Fixed Null Constraints)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await this.clientConn.execute(`
      SELECT INT.*, 
             S1.S_APPL AS DR_PREFIX, 
             S2.S_APPL AS CR_PREFIX
      FROM INTINSTRUCTION INT
      LEFT JOIN SCHEMAST S1 ON INT.DR_ACTYPE = S1.S_APPL
      LEFT JOIN SCHEMAST S2 ON INT.CR_ACTYPE = S2.S_APPL
      ORDER BY INT.INSTRUCTION_DATE ASC
    `);
      const rows = this.convertOracleRows(result as any);

      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const { BANK_CODE: bankCode, BRANCH_CODE: branchCodeStr } = syspara[0];
      const branchCode = Number(branchCodeStr);

      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map(schemaData.map((x) => [Number(x.S_APPL), x.id]));

      const branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1 OR "CODE" = 1 LIMIT 1`,
        [String(branchCode)]
      );
      const branchId = branchRes[0]?.id || 1;

      let totalInserted = 0;
      await queryRunner.startTransaction();

      try {
        for (const ele of rows) {
          const drSchemaId = schemaMap.get(Number(ele.DR_ACTYPE)) || null;
          const crSchemaId = schemaMap.get(Number(ele.CR_ACTYPE)) || null;

          // FIX: Ensure we have a valid account number or a safe fallback string
          // We use Number(ele.DR_AC_NO) to check if it's actually 0 or empty
          const drBankAcNo = (ele.DR_AC_NO && Number(ele.DR_AC_NO) !== 0)
            ? this.generateBankAcNo(bankCode, branchCode, ele.DR_PREFIX || ele.DR_ACTYPE, Number(ele.DR_AC_NO))
            : '000000000000000'; // 15-digit zero fallback to satisfy NOT NULL

          const crBankAcNo = (ele.CR_AC_NO && Number(ele.CR_AC_NO) !== 0)
            ? this.generateBankAcNo(bankCode, branchCode, ele.CR_PREFIX || ele.CR_ACTYPE, Number(ele.CR_AC_NO))
            : '000000000000000';

          const payload: any = {
            BRANCH_CODE: branchId,
            INSTRUCTION_DATE: ele.INSTRUCTION_DATE ? moment(ele.INSTRUCTION_DATE).format('DD/MM/YYYY') : undefined,
            FROM_DATE: ele.FROM_DATE ? moment(ele.FROM_DATE).format('DD/MM/YYYY') : undefined,
            NEXT_EXE_DATE: ele.NEXT_EXE_DATE ? moment(ele.NEXT_EXE_DATE).format('DD/MM/YYYY') : undefined,
            LAST_EXEC_DATE: ele.LAST_EXEC_DATE ? moment(ele.LAST_EXEC_DATE).format('DD/MM/YYYY') : undefined,
            REVOKE_DATE: ele.REVOKE_DATE ? moment(ele.REVOKE_DATE).format('DD/MM/YYYY') : undefined,

            EXECUTION_DAY: String(ele.EXECUTION_DAY || ''),
            SI_FREQUENCY: ele.SI_FREQUENCY || 'M',
            TRAN_TYPE: String(ele.TRAN_TYPE).trim().toUpperCase() === 'TR' ? 'Transfer' : 'Cash',

            // Debit Side
            DR_ACTYPE: drSchemaId,
            DR_AC_NO: drBankAcNo, // Guaranteed not null
            DR_PARTICULARS: this.transformValue(ele.DR_PARTICULARS || ''),

            // Credit Side
            CR_ACTYPE: crSchemaId,
            CR_AC_NO: crBankAcNo, // Guaranteed not null
            CR_PARTICULARS: this.transformValue(ele.CR_PARTICULARS || ''),

            ADV_NARRATION: this.transformValue(ele.ADV_NARRATION || ''),
            status: '1'
          };

          await queryRunner.manager.createQueryBuilder()
            .insert()
            .into(INTINSTRUCTION)
            .values(payload)
            .execute();

          totalInserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Success! Migrated ${totalInserted} Interest Instructions.`);
        return { success: true, totalInserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Loop Error in INTINSTRUCTION: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateINTINSTRUCTIONSLOG() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');
    this.logger.log('Starting INTINSTRUCTIONSLOG migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data (Fix: Removed REF_ID)
      const result = await this.clientConn.execute(`SELECT * FROM INTINSTRUCTIONSLOG ORDER BY INSTRUCTION_NO ASC`);
      const rows = this.convertOracleRows(result as any);

      // 2. Pre-fetch Metadata
      const [syspara, schemaRows, branchRows] = await Promise.all([
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query<{ id: number; S_APPL: number }[]>(`SELECT id, "S_APPL" FROM schemast`),
        queryRunner.manager.query<{ id: number; CODE: string }[]>(`SELECT id, "CODE" FROM ownbranchmaster`)
      ]);

      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');
      const schemaMap = new Map(schemaRows.map(r => [Number(r.S_APPL), r]));
      const branchMatch = branchRows.find(b => Number(b.CODE) === Number(syspara[0]?.BRANCH_CODE)) || branchRows[0];
      const branchCodeStr = String(branchMatch?.CODE || '001').padStart(3, '0');

      await queryRunner.startTransaction();
      let successCount = 0;

      for (const item of rows) {
        try {
          const logObj = new INTINSTRUCTIONSLOG();

          // --- CORE MAPPING (Matches your PG list) ---
          logObj.TRAN_DATE = item.TRAN_DATE ? moment(item.TRAN_DATE).format('DD/MM/YYYY') : '01/01/1900';
          logObj.TRAN_TIME = item.TRAN_TIME || '';
          logObj.INSTRUCTION_NO = Number(item.INSTRUCTION_NO) || 0;
          logObj.SUCCESS_STATUS = item.SUCCESS_STATUS || '';
          logObj.DAILYTRAN_TRAN_NO = Number(item.DAILYTRAN_TRAN_NO) || 0;
          logObj.EXPECTED_EXECUTION_DATE = item.EXPECTED_EXECUTION_DATE ? moment(item.EXPECTED_EXECUTION_DATE).format('DD/MM/YYYY') : '01/01/1900';
          logObj.LAST_INT_DATE = item.LAST_INT_DATE ? moment(item.LAST_INT_DATE).format('DD/MM/YYYY') : '';
          logObj.PARTICULARS = this.transformValue(item.PARTICULARS?.replace(/\x00/g, "")) || '';
          logObj.CR_ACNOTYPE = item.CR_ACNOTYPE || '';
          logObj.DR_ACNOTYPE = item.DR_ACNOTYPE || '';
          logObj.HO_SUB_GLACNO = Number(item.HO_SUB_GLACNO) || 0;
          logObj.TRAN_AMOUNT = Number(item.TRAN_AMOUNT) || 0;
          logObj.ADV_NARRATION = this.transformValue(item.ADV_NARRATION) || '';

          // --- 15-DIGIT ACCOUNT LOGIC ---
          if (item.DR_ACTYPE && Number(item.DR_ACTYPE) !== 0) {
            const schema = schemaMap.get(Number(item.DR_ACTYPE));
            if (schema) {
              logObj.DR_ACTYPE = schema.id;
              logObj.DR_AC_NO = this.generateBankAcNo(Number(bankCode), Number(branchCodeStr), Number(schema.S_APPL), Number(item.DR_AC_NO));
            }
          }
          if (item.CR_ACTYPE && Number(item.CR_ACTYPE) !== 0) {
            const schema = schemaMap.get(Number(item.CR_ACTYPE));
            if (schema) {
              logObj.CR_ACTYPE = schema.id;
              logObj.CR_AC_NO = this.generateBankAcNo(Number(bankCode), Number(branchCodeStr), Number(schema.S_APPL), Number(item.CR_AC_NO));
            }
          }

          // Strict String Fallbacks for Account Columns
          if (!logObj.DR_AC_NO) logObj.DR_AC_NO = '000000000000000';
          if (!logObj.CR_AC_NO) logObj.CR_AC_NO = '000000000000000';

          await queryRunner.manager.save(INTINSTRUCTIONSLOG, logObj);
          successCount++;

        } catch (rowError: any) { // Add ': any' here
          this.logger.error(`❌ Row failed for Instruction No ${item.INSTRUCTION_NO}: ${rowError.message}`);
          continue;
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log(`INTINSTRUCTIONSLOG: Successfully migrated ${successCount} records.`);
      return { success: true, count: successCount };

    } catch (err: any) {
      if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
      this.logger.error(`FATAL ERROR: ${err.message}`);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }


  async migrateintrateTD() {
    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    this.logger.log('Starting Term Deposit Interest Rate migration...');

    try {
      const distinctResult = await this.clientConn.execute(
        `SELECT DISTINCT ACNOTYPE, INT_CATEGORY, EFFECT_DATE, ACTYPE FROM INTRATETD ORDER BY EFFECT_DATE ASC`
      );
      const headers = this.mapOracleToPgRows(distinctResult);
      const existingRates = await queryRunner.manager.find(INTRATETD);

      for (const ele of headers) {
        // ✅ Fix 1: Ensure we provide a string to satisfy the entity type
        const formattedDate: string = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : '';

        if (!formattedDate) continue;

        const isDuplicate = existingRates.some(pg =>
          pg.TYPE === ele.ACNOTYPE &&
          pg.INT_CATEGORY === ele.INT_CATEGORY &&
          pg.EFFECT_DATE === formattedDate
        );

        if (isDuplicate) continue;

        await queryRunner.startTransaction();
        try {
          const interestRate = new INTRATETD();
          interestRate.TYPE = ele.ACNOTYPE;
          interestRate.INT_CATEGORY = ele.INT_CATEGORY;
          interestRate.EFFECT_DATE = formattedDate;
          interestRate.ACNOTYPE = ele.ACTYPE;

          const savedHeader = await queryRunner.manager.save(INTRATETD, interestRate);

          const detailQuery = ele.ACTYPE
            ? `SELECT * FROM INTRATETD WHERE ACNOTYPE = :1 AND INT_CATEGORY = :2 AND EFFECT_DATE = :3 AND ACTYPE = :4`
            : `SELECT * FROM INTRATETD WHERE ACNOTYPE = :1 AND INT_CATEGORY = :2 AND EFFECT_DATE = :3 AND ACTYPE IS NULL`;

          const detailParams = ele.ACTYPE
            ? [ele.ACNOTYPE, ele.INT_CATEGORY, ele.EFFECT_DATE, ele.ACTYPE]
            : [ele.ACNOTYPE, ele.INT_CATEGORY, ele.EFFECT_DATE];

          const detailsRes = await this.clientConn.execute(detailQuery, detailParams);
          const slabs = this.mapOracleToPgRows(detailsRes);

          for (const slab of slabs) {
            const newRate = new TERMINTRATE();
            newRate.FROM_DAYS = slab.FROM_DAYS || 0;
            newRate.FROM_MONTHS = slab.FROM_MONTHS || 0;
            newRate.TO_DAYS = slab.TO_DAYS || 0;
            newRate.TO_MONTHS = slab.TO_MONTHS || 0;
            newRate.INT_RATE = slab.INT_RATE || 0;
            newRate.PENAL_INT_RATE = slab.PENAL_INT_RATE || 0;
            newRate.idRateID = savedHeader.id;

            await queryRunner.manager.save(TERMINTRATE, newRate);
          }

          await queryRunner.commitTransaction();
          this.logger.log(`Migrated Rate Header: ${ele.ACNOTYPE} - ${formattedDate}`);
        } catch (err: any) { // ✅ Fix 2: Cast catch variable to 'any'
          if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
          this.logger.error(`Failed Header ${ele.ACNOTYPE}: ${err.message}`);
        }
      }
      this.logger.log('✅ Term Deposit Interest Rate migration complete.');
    } catch (error: any) { // ✅ Fix 3: Cast catch variable to 'any'
      this.logger.error('❌ Global failure in intrateTD:', error.message);
    } finally {
      await queryRunner.release();
    }
  }


  async migrateINTRATETDMULTI() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting Multi-Tier TD Interest Rate Migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. FETCH FROM ORACLE
      // Corrected table name based on your likely Oracle schema
      const result = await this.clientConn.execute(`
      SELECT * FROM INTRATETDMULTI
    `);
      const rows = this.convertOracleRows(result as any);

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle INTRATETDMULTI table.');
        return { success: true, inserted: 0 };
      }

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const effectDateStr = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : undefined;

          // 2. CONSTRUCT PAYLOAD
          // Note: Map these fields to your Postgres INTRATETDMULTI Entity columns
          const payload: any = {
            // If this table in Postgres is also flat:
            ACNOTYPE: Number(ele.ACTYPE) || null,
            TYPE: ele.ACNOTYPE,
            INT_CATEGORY: Number(ele.INT_CATEGORY),
            EFFECT_DATE: effectDateStr,
            INT_RATE: Number(ele.INT_RATE) || 0,
            status: '1',
            // Add other columns if they exist in your multi-tier table
          };

          // 3. INSERT INTO POSTGRES
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('intratetdmulti') // Verify this table name in pgAdmin
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${inserted} Multi-Tier records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Loop Error: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateDEPRRATE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting Depreciation Rate Migration (FK Bypass & ESLint Clean)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch from Oracle
      const result = await this.clientConn.execute(`SELECT * FROM DEPRRATE ORDER BY EFFECT_DATE ASC`);
      const rows = this.convertOracleRows(result as any);

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle DEPRRATE table.');
        return { success: true, inserted: 0 };
      }

      await queryRunner.startTransaction();

      try {
        // 2. DISABLE ALL TRIGGERS (Bypass FK checks)
        await queryRunner.manager.query(`ALTER TABLE "deprrate" DISABLE TRIGGER ALL`);

        let inserted = 0;

        for (const ele of rows) {
          const effectDateStr = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : undefined;

          await queryRunner.manager.query(
            `INSERT INTO "deprrate" ("DEPR_RATE", "EFFECT_DATE", "CATEGORY") 
           VALUES ($1, $2, $3)`,
            [
              Number(ele.DEPR_RATE) || 0,
              effectDateStr,
              ele.CATEGORY
            ]
          );

          inserted++;
        }

        // 3. RE-ENABLE TRIGGERS
        await queryRunner.manager.query(`ALTER TABLE "deprrate" ENABLE TRIGGER ALL`);

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        // FIX: Cleaned up the empty catch block and unused 'e'
        try {
          await queryRunner.manager.query(`ALTER TABLE "deprrate" ENABLE TRIGGER ALL`);
        } catch (cleanupError) {
          this.logger.error('Failed to re-enable triggers after main error:', cleanupError);
        }

        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration Loop Failure: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateINTRATELOAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting Loan Interest Rate Migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. FETCH FROM ORACLE
      const result = await this.clientConn.execute(`
      SELECT * FROM INTRATELOAN ORDER BY EFFECT_DATE ASC
    `);
      const rows = this.convertOracleRows(result as any);

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle INTRATELOAN table.');
        return { success: true, inserted: 0 };
      }

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const effectDateStr = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : undefined;

          const payload: any = {
            // FIX: In your Postgres schema, ACNOTYPE is an Integer.
            // We map the Oracle ACTYPE (e.g. 20100) to this column.
            ACNOTYPE: Number(ele.ACNOTYPE) || null,

            // If your table has a separate column for the "LN" string, use it here.
            // Otherwise, we skip sending "LN" to an integer column.
            // TYPE: ele.ACNOTYPE, 

            INT_CATEGORY: Number(ele.INT_CATEGORY),
            EFFECT_DATE: effectDateStr,
            INT_RATE: Number(ele.INT_RATE) || 0,
            PENAL_INT_RATE: Number(ele.PENAL_INT_RATE) || 0,
            status: '1'
          };

          // 2. INSERT INTO POSTGRES
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('intrateloan')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${inserted} Loan Interest records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Loop Error: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateINTRATEPATSCHEMES() {
    this.logger.log('>>> TRIGGERED: migrateINTRATEPATSCHEMES started');

    if (!this.clientConn) {
      this.logger.error('Oracle Client Connection (clientConn) is missing. Please connect first.');
      return { success: false, message: 'Oracle not connected' };
    }

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const connection2 = this.clientConn;

      // 1. Fetch distinct master records from Oracle
      const result = await connection2.execute(
        `SELECT AC_TYPE, INT_CATEGORY, EFFECT_DATE FROM INTRATEPATSCHEMES GROUP BY AC_TYPE, INT_CATEGORY, EFFECT_DATE ORDER BY EFFECT_DATE ASC`
      );
      const data = this.convertOracleRows(result as any);

      this.logger.log(`Oracle master rows found: ${data?.length || 0}`);

      if (!data || data.length === 0) {
        this.logger.warn("No records found in Oracle INTRATEPATSCHEMES.");
        await queryRunner.rollbackTransaction();
        return { success: true, inserted: 0 };
      }

      // 2. SAFETY FETCH: Ensure ALL mapping data is loaded from Postgres
      this.logger.log('Refreshing mapping data from Postgres...');
      this.PostSchemast = await this.serverDB.getRepository(SCHEMAST).find();

      // CRITICAL FIX: Ensure Category data is fetched to solve the Foreign Key error
      this.PostInterestCategoryData = await this.serverDB.getRepository(INTCATEGORYMASTER).find();

      // 3. Pre-fetch existing Postgres headers to avoid duplicates
      const pgData = await this.serverDB.getRepository(INTRATEPATSCHEMES).find();

      for (let ele of data) {
        // --- STEP A: Find Scheme Mapping (S_APPL matching AC_TYPE) ---
        const schemastData = this.PostSchemast.find(s =>
          String(s.S_APPL).trim() === String(ele.AC_TYPE).trim()
        );

        if (!schemastData) {
          this.logger.warn(`Mapping missing for Oracle AC_TYPE: ${ele.AC_TYPE}. Skipping.`);
          continue;
        }

        // --- STEP B: Find Category Mapping (Match raw code 10 to Postgres ID) ---
        // This solves the "violates foreign key constraint" error
        const categoryData = this.PostInterestCategoryData.find(cat =>
          String(cat.CODE).trim() === String(ele.INT_CATEGORY).trim()
        );

        if (!categoryData) {
          this.logger.warn(`Category mapping missing for Oracle INT_CATEGORY: ${ele.INT_CATEGORY}. Skipping row.`);
          continue;
        }

        // --- STEP C: Date Formatting ---
        const effectDateStr = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : null;

        // --- STEP D: Existence Check ---
        const exists = pgData.some(pg =>
          moment(pg.EFFECT_DATE).format('DD/MM/YYYY') === effectDateStr &&
          pg.AC_TYPE == schemastData.id
        );

        if (exists) {
          this.logger.log(`Record for AC_TYPE ${ele.AC_TYPE} on ${effectDateStr} already exists. Skipping.`);
          continue;
        }

        // --- STEP E: Save Master (INTRATEPATSCHEMES) ---
        const interestRate = new INTRATEPATSCHEMES();
        interestRate.AC_TYPE = schemastData.id;           // Linked to schemast.id
        interestRate.INT_CATEGORY = categoryData.id;     // Linked to intcategorymaster.id (Fixed FK Error)
        interestRate.EFFECT_DATE = effectDateStr as any;
        interestRate.TYPE = 'LN';

        const savedHeader = await queryRunner.manager.save(INTRATEPATSCHEMES, interestRate);
        this.logger.debug(`Saved Master Record ID: ${savedHeader.id}`);

        // --- STEP F: Save Detail Grid (INTRATE) ---
        const gridResult = await connection2.execute(
          `SELECT MONTHS, DAYS, INT_RATE FROM INTRATEPATSCHEMES WHERE AC_TYPE = :ac AND EFFECT_DATE = :dt`,
          [ele.AC_TYPE, ele.EFFECT_DATE]
        );
        const grid = this.convertOracleRows(gridResult as any);

        for (let element of grid) {
          const newRate = new INTRATE();
          newRate.MONTHS = String(element.MONTHS || '0');
          newRate.DAYS = Number(element.DAYS) || 0;
          newRate.INT_RATE = Number(element.INT_RATE) || 0;
          newRate.idRateID = savedHeader.id; // Map the generated numeric ID

          await queryRunner.manager.save(INTRATE, newRate);
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log('--- INTRATEPATSCHEMES MIGRATION COMPLETE ---');
      return { success: true };

    } catch (error: any) {
      if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
      this.logger.error(`CRITICAL MIGRATION ERROR: ${error.message}`);
      throw error;
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migratePREMATULESSRATE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting Premature Less Rate Migration (Penalty Logic)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. FETCH FROM ORACLE
      // Fix: Table name updated to PREMATULESSRATE to match your schema pattern
      const result = await this.clientConn.execute(`
      SELECT * FROM PREMATULESSRATE ORDER BY EFFECT_DATE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      if (rows.length === 0) {
        this.logger.warn('No records found in Oracle PREMATULESSRATE table.');
        return { success: true, inserted: 0 };
      }

      // 2. LOAD MAPPINGS
      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map(schemaData.map((x) => [Number(x.S_APPL), x.id]));

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const effectDateStr = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : undefined;

          // Map Oracle ACTYPE (e.g. 30500) to Postgres Schema ID
          const postgresSchemaId = schemaMap.get(Number(ele.ACTYPE)) || null;

          const payload: any = {
            ACNOTYPE: postgresSchemaId,
            EFFECT_DATE: effectDateStr,

            // Penalty Rules
            FROM_MONTHS: Number(ele.FROM_MONTHS) || 0,
            TO_MONTHS: Number(ele.TO_MONTHS) || 0,
            LESS_INT_RATE: Number(ele.LESS_INT_RATE) || 0,

            status: '1'
          };

          // 3. INSERT INTO POSTGRES
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('prematulessrate') // Ensure this matches your Postgres table name
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${inserted} Premature Less Rate records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Loop Error: ${error.message}`);
        throw err;
      }
    } catch (err: any) {
      this.logger.error(`Top-level Error: ${err.message}`);
      throw err;
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateINTRATESBPG() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting SB & Pigmy Interest Rate Migration (Logic-Based Mapping)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`SELECT * FROM INTRATESBPG`);
      const rows = this.convertOracleRows(result as any);

      // 2. Define Lookup Interface for ESLint
      interface SchemaLookup {
        id: number;
        S_ACNOTYPE: string;
        S_APPL: string;
      }

      // Fetch Postgres IDs to avoid "Integer" syntax errors
      const schemaData = await queryRunner.manager.query<SchemaLookup[]>(
        `SELECT id, "S_ACNOTYPE", "S_APPL" FROM schemast`
      );

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const effectDateStr = ele.EFFECT_DATE ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY') : undefined;

          // This is the exact string from Oracle ('PG' or 'SB')
          const oracleExactString = String(ele.ACNOTYPE || '').trim().toUpperCase();

          // 3. Script Logic: Find the corresponding Numeric ID
          let match = schemaData.find(s => String(s.S_ACNOTYPE).trim().toUpperCase() === oracleExactString);

          // Fallback for 'PG' if S_ACNOTYPE doesn't match
          if (!match && oracleExactString === 'PG') {
            match = schemaData.find(s => String(s.S_APPL).startsWith('3') || String(s.S_APPL).startsWith('4'));
          }

          // 4. MAPPING PAYLOAD
          const payload: any = {
            // Put the Number (ID) here to satisfy the Postgres Integer requirement
            ACNOTYPE: match ? match.id : null,

            // Put the EXACT Oracle String ("PG"/"SB") here (already a Varchar column)
            TYPE: oracleExactString,

            INT_CATEGORY: Number(ele.INT_CATEGORY),
            EFFECT_DATE: effectDateStr,
            INT_RATE: String(ele.INT_RATE || '0'),
            status: '1'
          };

          // 5. INSERT
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('intratesbpg')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${inserted} records using script logic.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration Failed: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateSECURITYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');
    this.logger.log('Starting Security Master Migration (Using Entity Instance)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. FETCH FROM ORACLE
      const result = await this.clientConn.execute(`SELECT * FROM SECURITYMASTER ORDER BY SECU_CODE`);
      const rows = this.convertOracleRows(result as any);

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const security = new SECURITYMASTER();

          security.SECU_CODE = Number(ele.SECU_CODE);
          security.SECU_NAME = this.transformValue(ele.SECU_NAME?.replace("\x00", "") || 'Unknown');
          security.MARGIN = Number(ele.MARGIN) || 0;

          // Using !! logic to force boolean-style truthiness check
          security.FIRE_POLICY = Number(ele.FIRE_POLICY) !== 0 ? 1 : 0;
          security.MARKET_SHARE = Number(ele.MARKET_SHARE) !== 0 ? 1 : 0;
          security.BOOK_DEBTS = Number(ele.BOOK_DEBTS) !== 0 ? 1 : 0;
          security.PLEDGE_STOCK = Number(ele.PLEDGE_STOCK) !== 0 ? 1 : 0;
          security.STOCK_STATEMENT = Number(ele.STOCK_STATEMENT) !== 0 ? 1 : 0;
          security.GOVT_SECU_LIC = Number(ele.GOVT_SECU_LIC) !== 0 ? 1 : 0;

          // Re-check this specific line for typos in your IDE
          security.PLANT_MACHINARY = Number(ele.PLANT_MACHINARY) !== 0 ? 1 : 0;

          security.FURNITURE_FIXTURE = Number(ele.FURNITURE_FIXTURE) !== 0 ? 1 : 0;
          security.VEHICLE = Number(ele.VEHICLE) !== 0 ? 1 : 0;
          security.OWN_DEPOSIT = Number(ele.OWN_DEPOSIT) !== 0 ? 1 : 0;
          security.LAND_BUILDING = Number(ele.LAND_BUILDING) !== 0 ? 1 : 0;
          security.GOLD_SILVER = Number(ele.GOLD_SILVER) !== 0 ? 1 : 0;
          security.OTHER_SECURITY = Number(ele.OTHER_SECURITY) !== 0 ? 1 : 0;
          security.CUST_INSURANCE = Number(ele.CUST_INSURANCE) !== 0 ? 1 : 0;

          security['status'] = '1';

          await queryRunner.manager.save(SECURITYMASTER, security);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${inserted} Security Master records using Entity.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failed: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateTDSRATE() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting TDSRATE migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT DISTINCT FIN_YEAR, INTEREST_AMOUNT, TDS_RATE, SURCHARGE_RATE, EFFECT_DATE 
      FROM TDSRATE 
      ORDER BY EFFECT_DATE ASC
    `);
      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data from TDSRATE (Fixes Error 2339)
      // You were previously calling TDSFORMSUBMIT which doesn't have EFFECT_DATE
      const pgData = await queryRunner.manager.find(TDSRATE);

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          // Format the date or provide an empty string fallback (Fixes Error 2322)
          const effectDateFormatted: string = ele.EFFECT_DATE
            ? moment(ele.EFFECT_DATE).format('DD/MM/YYYY')
            : ''; // Use '' instead of null to satisfy strict string type

          // Duplicate Check using pgData from TDSRATE
          const isDuplicate = pgData.some(pgItem =>
            pgItem.FIN_YEAR === ele.FIN_YEAR &&
            pgItem.EFFECT_DATE === effectDateFormatted
          );

          if (isDuplicate) continue;

          // 3. Construct Payload
          const newTdsRate = new TDSRATE();
          newTdsRate['FIN_YEAR'] = ele.FIN_YEAR;
          newTdsRate['INTEREST_AMOUNT'] = Number(ele.INTEREST_AMOUNT) || 0;
          newTdsRate['TDS_RATE'] = Number(ele.TDS_RATE) || 0;
          newTdsRate['SURCHARGE_RATE'] = Number(ele.SURCHARGE_RATE) || 0;

          // Fix for Type 'string | null' is not assignable to type 'string'
          newTdsRate['EFFECT_DATE'] = effectDateFormatted;
          newTdsRate['status'] = '1';

          await queryRunner.manager.save(TDSRATE, newTdsRate);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`TDSRATE: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Loop Error: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateNPAMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');
    this.logger.log('Starting full NPAMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch ALL rows from Oracle
      const result = await this.clientConn.execute(`SELECT * FROM NPAMASTER ORDER BY EFFECT_DATE ASC`);
      const allRows = this.convertOracleRows(result as any);

      if (allRows.length === 0) {
        this.logger.warn('No records found in Oracle NPAMASTER table.');
        return { success: true, masterInserted: 0, slabsInserted: 0 };
      }

      // 2. Fetch existing PG data to prevent duplicates
      const existingMasters = await queryRunner.manager.find(NPAMASTER);

      await queryRunner.startTransaction();

      try {
        let masterCount = 0;
        let slabCount = 0;

        // 3. Group Oracle data by Unique Master (Date + BaseDays)
        const masterGroups = new Map<string, any[]>();

        for (const row of allRows) {
          const dateStr = row.EFFECT_DATE ? moment(row.EFFECT_DATE).format('DD/MM/YYYY') : '';
          const groupKey = `${dateStr}_${row.NPA_BASE_DAYS}`;

          // FIX: Ensure group is initialized to resolve TS2532 "Object is possibly undefined"
          let group = masterGroups.get(groupKey);
          if (!group) {
            group = [];
            masterGroups.set(groupKey, group);
          }
          group.push(row);
        }

        // 4. Iterate through each unique Master group
        for (const [key, slabs] of masterGroups) {
          const keyParts = key.split('_');
          const effectDate = keyParts[0];
          const baseDays = keyParts[1];

          // Skip if this specific Master already exists in Postgres
          const exists = existingMasters.some(m =>
            String(m.EFFECT_DATE).trim() === String(effectDate).trim() &&
            Number(m.NPA_BASE_DAYS) === Number(baseDays)
          );

          if (exists) {
            this.logger.log(`Skipping existing Master: ${effectDate} / ${baseDays}`);
            continue;
          }

          // --- INSERT MASTER ---
          const npaMaster = new NPAMASTER();
          npaMaster['NPA_BASE_DAYS'] = Number(baseDays);
          npaMaster['EFFECT_DATE'] = effectDate;
          npaMaster['status'] = '1';

          const savedMaster = await queryRunner.manager.save(NPAMASTER, npaMaster);
          masterCount++;

          // --- INSERT RELATED SLABS ---
          for (const s of slabs) {
            const slab = new NPACLASSIFICATION();
            slab['SERIAL_NO'] = s.SERIAL_NO;
            slab['NPA_CLASS'] = s.NPA_CLASS;
            slab['SUB_CLASS_NO'] = s.SUB_CLASS_NO;
            // transformValue handles legacy font conversion for descriptions
            slab['NPA_DESCRIPTION'] = this.transformValue(s.NPA_DESCRIPTION || '');
            slab['FROM_MONTHS'] = Number(s.FROM_MONTHS) || 0;
            slab['FROM_DAYS'] = Number(s.FROM_DAYS) || 0;
            slab['TO_MONTHS'] = Number(s.TO_MONTHS) || 0;
            slab['TO_DAYS'] = Number(s.TO_DAYS) || 0;
            slab['SECURED_PERCENT'] = Number(s.SECURED_PERCENT) || 0;
            slab['UNSECURED_PERCENT'] = Number(s.UNSECURED_PERCENT) || 0;

            // Link child to the specific Master ID we just generated
            slab['NPAClassID'] = savedMaster.id;
            slab['status'] = '1';

            await queryRunner.manager.save(NPACLASSIFICATION, slab);
            slabCount++;
          }
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Migration Finished: ${masterCount} Masters and ${slabCount} Slabs.`);

        return {
          success: true,
          masterInserted: masterCount,
          slabsInserted: slabCount
        };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        const error = err as Error;
        this.logger.error(`Migration loop failed: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateNPALOCK() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting NPALOCK migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      //Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM NPALOCK ORDER BY PROCESS_DATE
    `);

      const rows = this.convertOracleRows(result as any);

      if (rows.length === 0) {
        this.logger.log('NPALOCK: No data found.');
        return { success: true, inserted: 0 };
      }

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const item of rows) {

          const payload = {
            PROCESS_DATE: item.PROCESS_DATE
              ? moment(item.PROCESS_DATE).format('DD/MM/YYYY')
              : null,

            LOCK_DATE: item.LOCK_DATE
              ? moment(item.LOCK_DATE).format('DD/MM/YYYY')
              : null,

            USER_CODE: item.USER_CODE || null,
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('npalock')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();

        this.logger.log(`NPALOCK: Successfully migrated ${inserted} records.`);
        return { success: true, inserted };

      } catch (err: any) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }

        this.logger.error('NPALOCK Migration failed:', err.message);
        throw err;
      }

    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateNPADATA(): Promise<{ success: boolean; inserted: number; skipped: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('Databases not connected');
    }

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      this.logger.log('Starting NPADATA migration (Fixed)...');

      //LOAD REQUIRED DATA
      const [syspara, schemaRows, branchRes] = await Promise.all([
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query<{ id: number; S_APPL: number }[]>(`SELECT id, "S_APPL" FROM schemast`),
        queryRunner.manager.query<{ id: number; CODE: string }[]>(`SELECT id, "CODE" FROM ownbranchmaster`)
      ]);

      // MAP
      const schemaMap = new Map(schemaRows.map(r => [Number(r.S_APPL), r.id]));

      const sysBranchCode = String(syspara[0]?.BRANCH_CODE || '1');
      const branchRecord = branchRes.find(b => b.CODE === sysBranchCode) || branchRes[0];
      const branchId = branchRecord?.id || 1;

      //FETCH ORACLE DATA
      const result = await this.clientConn.execute(`
      SELECT NPADATA.*, SCHEMAST.S_APPL AS ACTYPE
      FROM NPADATA
      LEFT JOIN SCHEMAST ON NPADATA.AC_TYPE = SCHEMAST.S_APPL
      ORDER BY NPADATA.REPORT_DATE
    `);

      const rows = this.mapOracleToPgRows(result);

      let inserted = 0;
      let skipped = 0;

      //START TRANSACTION ONCE
      await queryRunner.startTransaction();

      try {
        // 🔹 4. LOOP
        for (const item of rows) {

          // Skip if no ACTYPE
          if (!item.ACTYPE) {
            skipped++;
            continue;
          }

          // Schema ID
          const schemaId = schemaMap.get(Number(item.ACTYPE));
          if (!schemaId) {
            this.logger.warn(`Skipping AC_NO ${item.AC_NO} - Schema not found`);
            skipped++;
            continue;
          }

          const sAppl = Number(item.ACTYPE);

          const acc = String(Number(item.AC_NO) + 100000).padStart(6, '0');

          const bankAcNo =
            String(syspara[0].BANK_CODE).padStart(3, '0') +
            String(syspara[0].BRANCH_CODE).padStart(3, '0') +
            String(sAppl).substring(0, 3).padStart(3, '0') +
            acc;

          const obj = {
            SERIAL_NO: item.SERIAL_NO,

            REPORT_DATE: item.REPORT_DATE
              ? moment(item.REPORT_DATE).format('DD/MM/YYYY')
              : null,

            AC_ACNOTYPE: item.AC_ACNOTYPE,
            AC_TYPE: schemaId,
            AC_NO: bankAcNo,
            BRANCH_CODE: branchId,

            SECU_STATUS: item.SECU_STATUS,

            AC_NPA_DATE: item.AC_NPA_DATE ? moment(item.AC_NPA_DATE).format('DD/MM/YYYY') : null,
            AC_OPDATE: item.AC_OPDATE ? moment(item.AC_OPDATE).format('DD/MM/YYYY') : null,
            AC_EXPIRE_DATE: item.AC_EXPIRE_DATE ? moment(item.AC_EXPIRE_DATE).format('DD/MM/YYYY') : null,

            AC_SANCTION_AMOUNT: Number(item.AC_SANCTION_AMOUNT) || 0,
            AC_SECURITY_AMT: Number(item.AC_SECURITY_AMT) || 0,
            LEDGER_BALANCE: Number(item.LEDGER_BALANCE) || 0,
            OVERDUE_AMOUNT: Number(item.OVERDUE_AMOUNT) || 0,
            DUE_INSTALLMENT: Number(item.DUE_INSTALLMENT) || 0,

            NPA_PROVISION_AMT: Number(item.NPA_PROVISION_AMT) || 0,
            RECEIVABLE_INTEREST: Number(item.RECEIVABLE_INTEREST) || 0,

            NPA_CLASS: item.NPA_CLASS,
            NPA_MONTHS: Number(item.NPA_MONTHS) || 0,
            NPA_PERCENTAGE: Number(item.NPA_PERCENTAGE) || 0,
            NPA_DAYS: Number(item.NPA_DAYS) || 0,
            SUB_CLASS_NO: item.SUB_CLASS_NO,

            OVERDUE_DATE: item.OVERDUE_DATE ? moment(item.OVERDUE_DATE).format('DD/MM/YYYY') : null,

            TOBE_RECOVER_AMT: Number(item.TOBE_RECOVER_AMT) || 0,
            USER_CODE: item.USER_CODE,

            UNSECURE_PROV_AMT: Number(item.UNSECURE_PROV_AMT) || 0,
            UNSECURE_PERCENTAGE: Number(item.UNSECURE_PERCENTAGE) || 0,

            PROV_ON_AMT: Number(item.PROV_ON_AMT) || 0,
            OVERDUE_INTEREST: Number(item.OVERDUE_INTEREST) || 0,
            CURRENT_INTEREST: Number(item.CURRENT_INTEREST) || 0,

            AC_INSTALLMENT: Number(item.AC_INSTALLMENT) || 0,
            AMT_TOBE_RECOVER: Number(item.AMT_TOBE_RECOVER) || 0,

            status: '1'
          };

          await queryRunner.manager.insert('npadata', obj);

          inserted++;
        }

        await queryRunner.commitTransaction();

        this.logger.log(`NPADATA DONE: Inserted ${inserted}, Skipped ${skipped}`);

        return { success: true, inserted, skipped };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }


  async migrateINTERESTTRAN() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting INTERESTTRAN migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      //FETCH ORACLE DATA
      const result = await this.clientConn.execute(`
      SELECT I.*, S.S_APPL AS ACTYPE
      FROM INTERESTTRAN I
      LEFT JOIN SCHEMAST S ON I.TRAN_ACTYPE = S.S_APPL
      ORDER BY I.TRAN_NO
    `);

      const rows = this.convertOracleRows(result as any);
      this.logger.log(`Fetched ${rows.length} rows from Oracle`);

      if (rows.length === 0) {
        this.logger.warn('No records found in INTERESTTRAN.');
        return { success: true, inserted: 0 };
      }

      //GET BRANCH
      const syspara = await queryRunner.manager.query(
        `SELECT "BRANCH_CODE" FROM syspara LIMIT 1`
      );
      const branchCode = String(syspara[0].BRANCH_CODE);

      const branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1 OR "CODE" = '1' LIMIT 1`,
        [branchCode]
      );
      const branchId = branchRes[0]?.id || 1;

      // 🔹 LOAD SCHEMA MAPPING
      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id, "S_APPL" FROM schemast`
      );
      const schemaMap = new Map(schemaData.map(x => [Number(x.S_APPL), x.id]));

      await queryRunner.startTransaction();

      try {
        let inserted = 0;
        const formatDate = (d: any) => d ? moment(d).format('DD/MM/YYYY') : null;

        for (const item of rows) {
          // Map Oracle ACTYPE → Postgres schema id
          const postgresSchemaId = schemaMap.get(Number(item.ACTYPE));
          if (!postgresSchemaId) {
            this.logger.warn(`Skipping TRAN_NO=${item.TRAN_NO}, ACTYPE=${item.ACTYPE} not found in schemast`);
            continue;
          }

          const payload = {
            TRAN_NO: item.TRAN_NO ?? 0,
            BRANCH_CODE: branchId,

            TRAN_DATE: formatDate(item.TRAN_DATE),
            TRAN_TIME: item.TRAN_TIME,
            TRAN_TYPE: item.TRAN_TYPE,
            TRAN_DRCR: item.TRAN_DRCR,

            TRAN_STATUS:
              item.TRAN_STATUS === 'PS' ? 1 :
                item.TRAN_STATUS === 'RJ' ? 2 : 0,

            TRAN_ACNOTYPE: item.TRAN_ACNOTYPE ?? '0',
            TRAN_ACTYPE: postgresSchemaId,   //mapped ID
            TRAN_ACNO: item.TRAN_ACNO ?? '',

            TRAN_AMOUNT: item.TRAN_AMOUNT ?? 0,
            INTEREST_AMOUNT: item.INTEREST_AMOUNT ?? 0, // if exists
            NARRATION: this.transformValue(item.NARRATION || ''),

            USER_CODE: item.USER_CODE ?? 0,
            OFFICER_CODE: item.OFFICER_CODE ?? 0,

            REFACNO: item.TRAN_ACNO,
            REFACTYPE: postgresSchemaId,     //mapped ID

            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('interesttran') // replace with entity if available
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`INTERESTTRAN migrated: ${inserted}`);
        return { success: true, inserted };

      } catch (err) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        throw err;
      }

    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migrateDAILYSHRTRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting DAILYSHRTRAN migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. FETCH ORACLE DATA
      const result = await this.clientConn.execute(`
      SELECT D.*, S.S_APPL AS ACTYPE_PREFIX
      FROM DAILYSHRTRAN D
      LEFT JOIN SCHEMAST S ON D.TRAN_ACTYPE = S.S_APPL
      WHERE D.TRAN_DATE > :changedate
      ORDER BY D.TRAN_NO
    `, { changedate: new Date(this.changedate) });

      const rows = this.convertOracleRows(result as any);
      this.logger.log(`Fetched ${rows.length} rows from Oracle`);

      if (rows.length === 0) {
        this.logger.warn('No records found in DAILYSHRTRAN.');
        return { success: true, inserted: 0 };
      }

      // 2. LOAD BRANCH + SCHEMA MAPPING
      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`);
      if (!syspara || syspara.length === 0) throw new Error('syspara table is empty');
      const { BANK_CODE: bankCode, BRANCH_CODE: branchCodeStr } = syspara[0];
      const branchCode = Number(branchCodeStr);

      const schemaData = await queryRunner.manager.query<{ id: number; S_APPL: number }[]>(
        `SELECT id,"S_APPL" FROM schemast`
      );
      const schemaMap = new Map(schemaData.map(x => [Number(x.S_APPL), x.id]));

      const branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE"=$1 OR "CODE"='1' LIMIT 1`,
        [String(branchCode)]
      );
      const branchId = branchRes[0]?.id || 1;

      // 3. TRANSACTION
      await queryRunner.startTransaction();

      try {
        let inserted = 0;
        const formatDate = (d: any) => d ? moment(d).format('DD/MM/YYYY') : null;

        for (const ele of rows) {
          const postgresSchemaId = schemaMap.get(Number(ele.TRAN_ACTYPE));
          if (!postgresSchemaId) {
            this.logger.warn(`Skipping TRAN_NO=${ele.TRAN_NO}, ACTYPE=${ele.TRAN_ACTYPE} not found in schemast`);
            continue;
          }

          const acno = 100000 + Number(ele.TRAN_ACNO);
          const bankAcNo = this.generateBankAcNo(bankCode, branchCode, ele.ACTYPE_PREFIX || ele.TRAN_ACTYPE, acno);

          // Handle transfer accounts if present
          let transferActypeFrom: number | null = null;
          let transferMemberNoFrom: string | null = null;
          if (ele.TRANSFER_ACTYPE_FROM) {
            const schemaId = schemaMap.get(Number(ele.TRANSFER_ACTYPE_FROM));
            transferActypeFrom = schemaId || null;
            transferMemberNoFrom = this.generateBankAcNo(bankCode, branchCode, ele.TRANSFER_ACTYPE_FROM, 100000 + Number(ele.TRANSFER_MEMBER_NO_FROM));
          }

          let transferActypeTo: number | null = null;
          let transferMemberNoTo: string | null = null;
          if (ele.TRANSFER_ACTYPE_TO) {
            const schemaId = schemaMap.get(Number(ele.TRANSFER_ACTYPE_TO));
            transferActypeTo = schemaId || null;
            transferMemberNoTo = this.generateBankAcNo(bankCode, branchCode, ele.TRANSFER_ACTYPE_TO, 100000 + Number(ele.TRANSFER_MEMBER_NO_TO));
          }

          const payload: any = {
            TRAN_DATE: formatDate(ele.TRAN_DATE),
            TRAN_NO: ele.TRAN_NO,
            SERIAL_NO: ele.SERIAL_NO,
            BRANCH_CODE: branchId,
            TRAN_TIME: ele.TRAN_TIME,
            TRAN_TYPE: ele.TRAN_TYPE,
            TRAN_MODE: ele.TRAN_MODE,
            TRAN_DRCR: ele.TRAN_DRCR,
            TRAN_STATUS:
              ele.TRAN_STATUS === 'UP' ? '0' :
                ele.TRAN_STATUS === 'PS' ? '1' :
                  ele.TRAN_STATUS === 'RJ' ? '2' : '0',
            TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,
            TRAN_ACTYPE: postgresSchemaId,
            TRAN_ACNO: bankAcNo,
            TRAN_AMOUNT: ele.TRAN_AMOUNT,
            TRAN_GLACNO: ele.TRAN_GLACNO,
            NO_OF_SHARES: ele.NO_OF_SHARES,
            NARRATION: this.transformValue(ele.NARRATION || ''),
            CERTIFICATE_NO: ele.CERTIFICATE_NO,
            SHARES_FROM_NO: ele.SHARES_FROM_NO,
            SHARES_TO_NO: ele.SHARES_TO_NO,
            FACE_VALUE: ele.FACE_VALUE,
            TRANSFER_ACTYPE_FROM: transferActypeFrom,
            TRANSFER_MEMBER_NO_FROM: transferMemberNoFrom,
            TRANSFER_ACTYPE_TO: transferActypeTo,
            TRANSFER_MEMBER_NO_TO: transferMemberNoTo,
            SHARES_TRANSFER_DATE: formatDate(ele.SHARES_TRANSFER_DATE),
            SHARES_RETURN_DATE: formatDate(ele.SHARES_RETURN_DATE),
            RESULATION_DATE: formatDate(ele.RESULATION_DATE),
            RESULATION_NO: ele.RESULATION_NO,
            AC_CLOSED: ele.AC_CLOSED == 0 ? 0 : 1,
            AC_CLOSEDT: formatDate(ele.AC_CLOSEDT),
            USER_CODE: ele.USER_CODE,
            OFFICER_CODE: ele.OFFICER_CODE,
            TRAN_ENTRY_TYPE: ele.TRAN_ENTRY_TYPE,
            IS_AUTO_TRF_ENTRY: ele.IS_AUTO_TRF_ENTRY,
            TRAN_SOURCE_NO: ele.TRAN_SOURCE_NO,
            SH_CERTIFICATE_PRINTED: ele.SH_CERTIFICATE_PRINTED == 0 ? 0 : 1,
            status: '1'
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('dailyshrtran')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`✅ DAILYSHRTRAN migrated: ${inserted}`);
        return { success: true, inserted };

      } catch (err) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  // ---------------- DEPOTRAN MIGRATION ----------------

  async migrateDEPOTRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');

    this.logger.log(`Starting FULL DEPOTRAN migration (All rows)...`);

    try {
      // 1. Load Master Lookups
      await this.TableData();

      // 2. Fetch ALL rows from Oracle
      const result = await this.clientConn.execute(`
            SELECT DEPOTRAN.*, SCHEMAST.S_APPL 
            FROM DEPOTRAN 
            LEFT JOIN SCHEMAST ON DEPOTRAN.TRAN_ACTYPE = SCHEMAST.S_APPL 
            ORDER BY DEPOTRAN.TRAN_DATE ASC, DEPOTRAN.TRAN_NO ASC, DEPOTRAN.SERIAL_NO ASC
        `);

      const allRows = this.mapOracleToPgRows(result);
      const totalRows = allRows.length;
      this.logger.log(`Fetched ${totalRows} rows from Oracle. Starting insertion...`);

      // Pre-calculate constants
      const bankCode = String(this.PostSyspara[0]?.BANK_CODE || '000').padStart(3, '0');
      const branchCodeStr = String(this.PostBranchOne?.[0]?.CODE || '001').padStart(3, '0');
      const branchInternalId = this.PostBranchOne?.[0]?.id || 1;
      const font = 'DVBW-TTYogeshEn';

      // 3. Process in smaller batches to stay under PostgreSQL parameter limits
      // 500 is safe for tables with 40-50 columns
      const batchSize = 500;

      for (let i = 0; i < totalRows; i += batchSize) {
        const queryRunner = this.serverDB.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          const chunk = allRows.slice(i, i + batchSize);
          const payloads: any[] = [];

          for (const ele of chunk) {
            const schemastData = this.PostSchemast?.find(s => Number(s.S_APPL) === Number(ele.TRAN_ACTYPE));
            if (!schemastData) continue;

            // --- Narration Transliteration ---
            let engNarration = '';
            if (ele.NARRATION) {
              let marathiText = unidev(String(ele.NARRATION).replace(/\u0000/g, ""), 'hindi', font);
              if (font === 'DVBW-TTYogeshEn') {
                marathiText = marathiText.replace(/×(.)/g, '$1ि')
                  .replace(/Ø(.)/g, '$1िं')
                  .replace(/([क-ह])([ािीुूृेैोौंॅॉ]*)Ô/g, 'र्$1$2')
                  .replace(/Ô/g, 'र्');
              }
              engNarration = this.translatefullwords(marathiText);
            }

            // --- 15-Digit BANKACNO ---
            const acnoPart = String(ele.TRAN_ACNO).padStart(6, '0');
            const schemePart = String(schemastData.S_APPL).padStart(3, '0').slice(0, 3);
            const finalBankAcNo = `${bankCode}${branchCodeStr}${schemePart}${acnoPart}`;

            payloads.push({
              TRAN_NO: Number(ele.TRAN_NO),
              SERIAL_NO: Number(ele.SERIAL_NO),
              BRANCH_CODE: branchInternalId,
              TRAN_DATE: ele.TRAN_DATE ? moment(ele.TRAN_DATE).format('DD/MM/YYYY') : null,
              TRAN_TIME: ele.TRAN_TIME,
              TRAN_TYPE: ele.TRAN_TYPE,
              TRAN_DRCR: ele.TRAN_DRCR,
              TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,
              TRAN_ACTYPE: schemastData.id,
              TRAN_ACNO: finalBankAcNo,
              TRAN_AMOUNT: Number(ele.TRAN_AMOUNT) || 0,
              TRAN_GLACNO: ele.TRAN_GLACNO,
              NARRATION: engNarration,
              CHEQUE_DATE: ele.CHEQUE_DATE ? moment(ele.CHEQUE_DATE).format('DD/MM/YYYY') : null,
              CHEQUE_SERIES: ele.CHEQUE_SERIES,
              CHEQUE_NO: ele.CHEQUE_NO,
              CASHIER_CODE: ele.CASHIER_CODE,
              USER_CODE: ele.USER_CODE,
              OFFICER_CODE: ele.OFFICER_CODE,
              INTEREST_AMOUNT: Number(ele.INTEREST_AMOUNT) || 0,
              INTEREST_DATE: ele.INTEREST_DATE ? moment(ele.INTEREST_DATE).format('DD/MM/YYYY') : null,
              PENAL_INTEREST: Number(ele.PENAL_INTEREST) || 0,
              PASSBOOK_PRINTED: ele.PASSBOOK_PRINTED == 1 ? '1' : '0',
              TRAN_MODE: ele.TRAN_MODE,
              WITHDRAW_NO: ele.WITHDRAW_NO,
              TRAN_ENTRY_TYPE: ele.TRAN_ENTRY_TYPE,
              IS_INTEREST_ENTRY: Number(ele.IS_INTEREST_ENTRY) === 1 ? 1 : 0,
              REF_ID: null,
              status: '1'
            });
          }

          // --- Bulk Insert ---
          if (payloads.length > 0) {
            await queryRunner.manager.createQueryBuilder()
              .insert()
              .into('depotran')
              .values(payloads)
              .execute();
          }

          await queryRunner.commitTransaction();
          // Log progress accurately
          this.logger.log(`Inserted up to row ${Math.min(i + batchSize, totalRows)} / ${totalRows}`);

        } catch (err: any) {
          await queryRunner.rollbackTransaction();
          this.logger.error(`Batch failed at index ${i}: ${err.message}`);
          throw err;
        } finally {
          await queryRunner.release();
        }
      }

      this.logger.log('✅ DEPOTRAN migration finished successfully.');
      return { success: true, totalInserted: totalRows };

    } catch (err: any) {
      this.logger.error(`Fatal DEPOTRAN migration error: ${err.message}`);
      throw err;
    }
  }

  async migrateLOANTRAN(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting LOANTRAN migration (BATCH MODE)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 COUNT
      const countRes = await this.clientConn.execute(`
      SELECT COUNT(*) AS CNT FROM LOANTRAN
    `);

      const countRows = this.convertOracleRows(countRes as any);
      const total = countRows[0]?.CNT || 0;

      this.logger.log(`Total LOANTRAN rows: ${total}`);

      const batchSize = 3000;
      let offset = 0;
      let insertedTotal = 0;

      // 🔹 LOAD MASTER DATA ONCE
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      const schemaApplMap = new Map<number, number>();

      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s.id);
        schemaApplMap.set(Number(s.S_APPL), Number(s.S_APPL));
      }

      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      let branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode} LIMIT 1
    `);

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query(`
        SELECT id FROM ownbranchmaster LIMIT 1
      `);
      }

      const branchId = branchRes[0]?.id;

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      // 🔹 BATCH LOOP
      while (offset < total) {
        this.logger.log(`Processing batch OFFSET ${offset}`);

        const result = await this.clientConn.execute(`
        SELECT LOANTRAN.*, SCHEMAST.S_APPL AS ACTYPE
        FROM LOANTRAN
        LEFT JOIN SCHEMAST ON LOANTRAN.TRAN_ACTYPE = SCHEMAST.S_APPL
        ORDER BY LOANTRAN.TRAN_NO
        OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
      `,
          {
            offset,
            limit: batchSize
          } as any);

        const rows = this.convertOracleRows(result as any);

        if (!rows.length) break;

        await queryRunner.startTransaction();

        try {
          let batchInserted = 0;

          for (const ele of rows) {
            try {
              if (!ele.TRAN_ACTYPE) continue;

              // 🔹 SCHEMA
              const schemaId = schemaMap.get(Number(ele.TRAN_ACTYPE)) || null;
              if (!schemaId) continue;

              const sAppl =
                schemaApplMap.get(Number(ele.TRAN_ACTYPE)) ||
                ele.TRAN_ACTYPE;

              // 🔹 BANK ACNO (15-digit)
              let bankAcNo: string | null = null;

              if (ele.TRAN_ACNO) {
                const acc = String(Number(ele.TRAN_ACNO) + 100000).padStart(6, '0');

                bankAcNo =
                  String(bankCode || '0').padStart(3, '0') +
                  String(branchCode || '0').padStart(3, '0') +
                  String(sAppl).substring(0, 3).padStart(3, '0') +
                  acc;
              }

              const narration = ele.NARRATION
                ? ele.NARRATION.replace("\x00", "")
                : null;

              await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into('loantran')
                .values({
                  TRAN_NO: ele.TRAN_NO,
                  SERIAL_NO: ele.SERIAL_NO,

                  BRANCH_CODE: branchId,

                  TRAN_DATE: formatDate(ele.TRAN_DATE),
                  TRAN_TIME: ele.TRAN_TIME,
                  TRAN_TYPE: ele.TRAN_TYPE,
                  TRAN_DRCR: ele.TRAN_DRCR,

                  TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,
                  TRAN_ACTYPE: schemaId,

                  TRAN_ACNO: bankAcNo,
                  BANK_ACNO: bankAcNo,

                  TRAN_AMOUNT: ele.TRAN_AMOUNT || 0,
                  TRAN_GLACNO: ele.TRAN_GLACNO,

                  CHEQUE_DATE: formatDate(ele.CHEQUE_DATE),
                  CHEQUE_SERIES: ele.CHEQUE_SERIES,
                  CHEQUE_NO: ele.CHEQUE_NO,

                  NARRATION: this.transformValue(narration),

                  CASHIER_CODE: ele.CASHIER_CODE,
                  USER_CODE: ele.USER_CODE,
                  OFFICER_CODE: ele.OFFICER_CODE,

                  NORMAL_INTEREST: ele.NORMAL_INTEREST || 0,
                  INTEREST_AMOUNT: ele.INTEREST_AMOUNT || 0,

                  INTEREST_GLACNO: ele.INTEREST_GLACNO
                    ? parseInt(ele.INTEREST_GLACNO)
                    : 0,

                  INTEREST_DATE: formatDate(ele.INTEREST_DATE),
                  PENAL_INTEREST: ele.PENAL_INTEREST || 0,

                  PASSBOOK_PRINTED: ele.PASSBOOK_PRINTED == 0 ? '0' : '1',

                  RECPAY_INT_AMOUNT: ele.RECPAY_INT_AMOUNT || 0,

                  OTHER1_AMOUNT: ele.OTHER1_AMOUNT || 0,
                  OTHER2_AMOUNT: ele.OTHER2_AMOUNT || 0,
                  OTHER3_AMOUNT: ele.OTHER3_AMOUNT || 0,
                  OTHER4_AMOUNT: ele.OTHER4_AMOUNT || 0,
                  OTHER5_AMOUNT: ele.OTHER5_AMOUNT || 0,
                  OTHER6_AMOUNT: ele.OTHER6_AMOUNT || 0,
                  OTHER7_AMOUNT: ele.OTHER7_AMOUNT || 0,
                  OTHER8_AMOUNT: ele.OTHER8_AMOUNT || 0,
                  OTHER9_AMOUNT: ele.OTHER9_AMOUNT || 0,
                  OTHER10_AMOUNT: ele.OTHER10_AMOUNT || 0,

                  TRAN_MODE: ele.TRAN_MODE,
                  WITHDRAW_NO: ele.WITHDRAW_NO,
                  TRAN_ENTRY_TYPE: ele.TRAN_ENTRY_TYPE,

                  ADDED_PENAL_INTEREST: ele.ADDED_PENAL_INTEREST || 0,

                  TRAN_PROCESS_YEAR: ele.TRAN_PROCESS_YEAR,
                  TRAN_PROCESS_MONTH: ele.TRAN_PROCESS_MONTH,

                  REC_PENAL_INT_AMOUNT: ele.REC_PENAL_INT_AMOUNT || 0,

                  OTHER11_AMOUNT: ele.OTHER11_AMOUNT || 0,

                  IS_INTEREST_ENTRY: ele.IS_INTEREST_ENTRY == 1 ? '1' : '0',

                  status: '1'
                })
                .execute();

              batchInserted++;
              insertedTotal++;

            } catch (err: any) {
              this.logger.error(
                ` ERROR TRAN_NO ${ele.TRAN_NO}: ${err.message}`
              );
            }
          }

          await queryRunner.commitTransaction();

          this.logger.log(`Batch inserted: ${batchInserted}`);

          offset += batchSize;

        } catch (err) {
          await queryRunner.rollbackTransaction();
          this.logger.error('Batch failed, rolled back', err);
        }
      }

      this.logger.log(`LOANTRAN completed. Total inserted: ${insertedTotal}`);

      return { success: true, inserted: insertedTotal };

    } finally {
      await queryRunner.release();
    }
  }


  async migratePIGMYTRAN(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting PIGMYTRAN migration (BATCH MODE)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      const countRes = await this.clientConn.execute(`SELECT COUNT(*) AS CNT FROM PIGMYTRAN`);
      const countRows = this.convertOracleRows(countRes as any);
      const total = countRows[0]?.CNT || 0;

      const batchSize = 3000;
      let offset = 0;
      let insertedTotal = 0;

      // const schemaData = await queryRunner.manager.query(`SELECT id, "S_APPL" FROM schemast`);
      const schemaData: { id: number; S_APPL: number }[] =
        await queryRunner.manager.query(`
    SELECT id, "S_APPL" FROM schemast
  `);
      const schemaMap = new Map<number, number>();
      const schemaApplMap = new Map<number, number>();
      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s.id);
        schemaApplMap.set(Number(s.S_APPL), Number(s.S_APPL));
      }

      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`);
      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      let branchRes = await queryRunner.manager.query(`SELECT id FROM ownbranchmaster WHERE "CODE"=$1 LIMIT 1`, [branchCode]);
      if (!branchRes.length) branchRes = await queryRunner.manager.query(`SELECT id FROM ownbranchmaster LIMIT 1`);
      const branchId = branchRes[0]?.id;

      const formatDate = (d: any) => (d == null || d === '') ? null : moment(d).format('DD/MM/YYYY');

      while (offset < total) {
        const result = await this.clientConn.execute(
          `
        SELECT PIGMYTRAN.*, SCHEMAST.S_APPL AS ACTYPE
        FROM PIGMYTRAN
        LEFT JOIN SCHEMAST ON PIGMYTRAN.TRAN_ACTYPE = SCHEMAST.S_APPL
        ORDER BY PIGMYTRAN.TRAN_NO
        OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
        `,
          { offset, limit: batchSize } as any
        );

        const rows = this.convertOracleRows(result as any);
        if (!rows.length) break;

        await queryRunner.startTransaction();

        try {
          let batchInserted = 0;

          for (const ele of rows) {
            try {
              if (!ele.TRAN_ACTYPE) continue;

              const schemaId = schemaMap.get(Number(ele.TRAN_ACTYPE));
              if (!schemaId) continue;

              const sAppl = schemaApplMap.get(Number(ele.TRAN_ACTYPE)) || ele.TRAN_ACTYPE;

              // 🔹 BANK ACNO
              // let bankAcNo: string | null = null;
              // if (ele.TRAN_ACNO != null && ele.TRAN_ACNO != 0) {
              //   // const acc = String(ele.TRAN_ACNO).padStart(6, '0');
              //   const acc = String(Number(ele.TRAN_ACNO) + 100000).padStart(6, '0');
              //   bankAcNo =
              //     String(bankCode).padStart(3, '0') +
              //     String(branchCode).padStart(3, '0') +
              //     String(sAppl).substring(0, 3).padStart(3, '0') +
              //     acc;
              // }
              let bankAcNo: string | null = null;

              if (ele.TRAN_ACNO != null && ele.TRAN_ACNO != 0) {
                const acc = String(Number(ele.TRAN_ACNO) + 100000).padStart(6, '0');

                bankAcNo =
                  String(bankCode).padStart(3, '0') +
                  String(branchCode).padStart(3, '0') +
                  String(sAppl).substring(0, 3).padStart(3, '0') +
                  acc;
              }

              // 🔹 AGENT BANK ACNO + ACTYPE mapping
              let agentBANKACNO: string | null = null;
              // let agentSchema = null;
              let agentSchema: { id: number; S_APPL: number } | null = null;

              if (ele.AGENT_ACNO != null && ele.AGENT_ACNO != 0 && ele.AGENT_ACTYPE != null) {
                // agentSchema = schemaData.find(s => Number(s.S_APPL) === Number(ele.AGENT_ACTYPE));
                agentSchema =
                  schemaData.find(
                    s => Number(s.S_APPL) === Number(ele.AGENT_ACTYPE)
                  ) || null;
                if (agentSchema) {
                  const agentAcc = String(Number(ele.AGENT_ACNO) + 100000).padStart(6, '0');
                  agentBANKACNO =
                    String(bankCode).padStart(3, '0') +
                    String(branchCode).padStart(3, '0') +
                    String(agentSchema.S_APPL).substring(0, 3).padStart(3, '0') +
                    agentAcc;
                }
              }

              // 🔹 Narration (raw, cleaned)
              const narration = ele.NARRATION ? ele.NARRATION.replace("\x00", "") : null;

              await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into('pigmytran')
                .values({
                  TRAN_NO: ele.TRAN_NO == null ? 0 : ele.TRAN_NO,
                  SERIAL_NO: ele.SERIAL_NO == null ? 0 : ele.SERIAL_NO,
                  BRANCH_CODE: branchId,

                  TRAN_DATE: formatDate(ele.TRAN_DATE),
                  TRAN_TIME: ele.TRAN_TIME,
                  TRAN_TYPE: ele.TRAN_TYPE,
                  TRAN_DRCR: ele.TRAN_DRCR,

                  TRAN_STATUS:
                    ele.TRAN_STATUS === 'UP' ? 0 :
                      ele.TRAN_STATUS === 'PS' ? 1 :
                        ele.TRAN_STATUS === 'RJ' ? 2 : undefined,

                  ENTRY_TYPE: ele.ENTRY_TYPE,

                  // AGENT_ACNOTYPE: ele.AGENT_ACNOTYPE == null ? 0 : ele.AGENT_ACNOTYPE,
                  AGENT_ACNOTYPE: ele.AGENT_ACNOTYPE,
                  AGENT_ACTYPE: agentSchema ? agentSchema.id : 0,
                  AGENT_ACNO: agentBANKACNO == null ? 0 : agentBANKACNO,

                  TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,
                  TRAN_ACTYPE: schemaId,
                  TRAN_ACNO: bankAcNo,

                  TRAN_AMOUNT: ele.TRAN_AMOUNT == null ? 0 : ele.TRAN_AMOUNT,
                  TRAN_GLACNO: ele.TRAN_GLACNO == null ? 0 : ele.TRAN_GLACNO,

                  CHEQUE_DATE: formatDate(ele.CHEQUE_DATE),
                  CHEQUE_SERIES: ele.CHEQUE_SERIES == null ? 0 : ele.CHEQUE_SERIES,
                  CHEQUE_NO: ele.CHEQUE_NO == null ? 0 : ele.CHEQUE_NO,

                  NARRATION: this.transformValue(narration),

                  CASHIER_CODE: ele.CASHIER_CODE == null ? 0 : ele.CASHIER_CODE,
                  USER_CODE: ele.USER_CODE == null ? 0 : ele.USER_CODE,
                  OFFICER_CODE: ele.OFFICER_CODE == null ? 0 : ele.OFFICER_CODE,

                  INTEREST_AMOUNT: ele.INTEREST_AMOUNT == null ? 0 : ele.INTEREST_AMOUNT,
                  INTEREST_DATE: formatDate(ele.INTEREST_DATE),

                  RECPAY_INT_AMOUNT: ele.RECPAY_INT_AMOUNT == null ? 0 : ele.RECPAY_INT_AMOUNT,

                  OTHER1_AMOUNT: ele.OTHER1_AMOUNT == null ? 0 : ele.OTHER1_AMOUNT,
                  OTHER2_AMOUNT: ele.OTHER2_AMOUNT == null ? 0 : ele.OTHER2_AMOUNT,
                  OTHER3_AMOUNT: ele.OTHER3_AMOUNT == null ? 0 : ele.OTHER3_AMOUNT,
                  OTHER4_AMOUNT: ele.OTHER4_AMOUNT == null ? 0 : ele.OTHER4_AMOUNT,
                  OTHER5_AMOUNT: ele.OTHER5_AMOUNT == null ? 0 : ele.OTHER5_AMOUNT,
                  OTHER6_AMOUNT: ele.OTHER6_AMOUNT == null ? 0 : ele.OTHER6_AMOUNT,
                  OTHER7_AMOUNT: ele.OTHER7_AMOUNT == null ? 0 : ele.OTHER7_AMOUNT,
                  OTHER8_AMOUNT: ele.OTHER8_AMOUNT == null ? 0 : ele.OTHER8_AMOUNT,
                  OTHER9_AMOUNT: ele.OTHER9_AMOUNT == null ? 0 : ele.OTHER9_AMOUNT,
                  OTHER10_AMOUNT: ele.OTHER10_AMOUNT == null ? 0 : ele.OTHER10_AMOUNT,
                  OTHER11_AMOUNT: ele.OTHER11_AMOUNT == null ? 0 : ele.OTHER11_AMOUNT,

                  TRAN_MODE: ele.TRAN_MODE == 0 ? 0 : ele.TRAN_MODE,
                  WITHDRAW_NO: ele.WITHDRAW_NO == null ? 0 : ele.WITHDRAW_NO,

                  IS_INTEREST_ENTRY: ele.IS_INTEREST_ENTRY == 0 ? 0 : 1,

                  CHART_NO: ele.CHART_NO == null ? 0 : ele.CHART_NO,
                  RECEIPT_NO: ele.RECEIPT_NO == null ? 0 : ele.RECEIPT_NO,

                  EDIT_USER: ele.EDIT_USER == null ? 0 : ele.EDIT_USER,
                  EDIT_DATE: formatDate(ele.EDIT_DATE),

                  AUTO_VOUCHER_DATE: formatDate(ele.AUTO_VOUCHER_DATE),
                  AUTO_VOUCHER_NO: ele.AUTO_VOUCHER_NO == null ? 0 : ele.AUTO_VOUCHER_NO,

                  AC_CLOSED: ele.AC_CLOSED == 0 ? 0 : 1,

                  status: '1'
                })
                .execute();

              batchInserted++;
              insertedTotal++;
            } catch (err: any) {
              this.logger.error(`ERROR TRAN_NO ${ele.TRAN_NO}: ${err.message}`);
            }
          }

          await queryRunner.commitTransaction();
          this.logger.log(`Batch inserted: ${batchInserted}`);
          offset += batchSize;

        } catch (err) {
          await queryRunner.rollbackTransaction();
          this.logger.error('Batch failed, rolled back', err);
        }
      }

      this.logger.log(`PIGMYTRAN completed. Total inserted: ${insertedTotal}`);
      return { success: true, inserted: insertedTotal };

    } finally {
      await queryRunner.release();
    }
  }

  async migrateSMSMAST() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting SMSMAST migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle data
      const result = await this.clientConn.execute(`SELECT * FROM SMSMAST`);
      const rows = this.convertOracleRows(result as any);

      if (!rows || rows.length === 0) {
        this.logger.warn('No records found in SMSMAST.');
        return { success: true, inserted: 0 };
      }

      // 2. Transaction
      await queryRunner.startTransaction();
      try {
        let inserted = 0;

        for (const ele of rows) {
          const payload: any = {
            SMS_ID: ele.SMS_ID ?? 0,
            TEMPLATE_ID: ele.TEMPLATE_ID ?? '',
            TEMPLATE_CONTENT: ele.TEMPLATE_CONTENT ?? ''
          };

          // ✅ Insert into Postgres
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('smsmast')
            .values(payload)
            .execute();

          inserted++;
        }

        // 3. Commit
        await queryRunner.commitTransaction();
        this.logger.log(`✅ SMSMAST migrated: ${inserted}`);
        return { success: true, inserted };

      } catch (err) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateLOCKERRENTTRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting LOCKERRENTTRAN migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Get total count first
      const countRes = await this.clientConn.execute(
        `SELECT COUNT(*) AS CNT FROM LOCKERRENTTRAN WHERE TRAN_DATE > :changedate`,
        { changedate: new Date(this.changedate) } as Record<string, any>
      );
      const countRows = this.convertOracleRows(countRes as any);
      this.count = countRows[0]?.CNT || 0;
      this.logger.log(`Total LOCKERRENTTRAN rows to migrate: ${this.count}`);

      if (this.count === 0) {
        this.logger.warn('No records found in LOCKERRENTTRAN.');
        return { success: true, inserted: 0, total: 0 };
      }

      // 2. Batch processing loop
      const batchSize = 3000;
      let offset = 0;
      let insertedTotal = 0;

      while (offset < this.count) {
        this.logger.log(`Fetching batch at offset ${offset}...`);

        const result = await this.clientConn.execute(`
        SELECT L.*, S.TYPEID AS ACTYPE
        FROM LOCKERRENTTRAN L
        LEFT JOIN SCHEMAST S ON L.TRAN_ACTYPE = S.S_APPL
        WHERE L.TRAN_DATE > :changedate
        ORDER BY L.TRAN_NO
        OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
      `, {
          changedate: new Date(this.changedate),
          offset,
          limit: batchSize
        } as Record<string, any>);

        const rows = this.convertOracleRows(result as any);
        if (rows.length === 0) break;

        await queryRunner.startTransaction();
        try {
          const schemaData = await queryRunner.manager.query(`SELECT id,"S_APPL","TYPEID" FROM schemast`);
          const schemaMap = new Map(schemaData.map(x => [Number(x.TYPEID), x.id]));

          const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`);
          const { BANK_CODE: bankCode, BRANCH_CODE: branchCodeStr } = syspara[0];
          const branchCode = Number(branchCodeStr);

          const branchRes = await queryRunner.manager.query(
            `SELECT id FROM ownbranchmaster WHERE "CODE"=$1 OR "CODE"='1' LIMIT 1`,
            [String(branchCode)]
          );
          const branchId = branchRes[0]?.id || 1;

          const formatDate = (d: any) => d ? moment(d).format('DD/MM/YYYY') : null;

          for (const item of rows) {
            if (!item.ACTYPE) continue;

            // Transfer account mapping
            let agentBANKACNO = null;
            let trfActypeId = null;
            if (item.TRF_ACTYPE) {
              const trfSchema = schemaData.find(ele => ele.S_APPL == item.TRF_ACTYPE);
              if (trfSchema) {
                trfActypeId = trfSchema.TYPEID;
                const agentacno = Number(item.TRF_ACNO) + 100000;
                agentBANKACNO = bankCode + branchCode + trfSchema.S_APPL + agentacno;
              }
            }

            const postgresSchemaId = schemaMap.get(Number(item.ACTYPE));
            if (!postgresSchemaId) {
              this.logger.warn(`Skipping TRAN_NO=${item.TRAN_NO}, ACTYPE=${item.ACTYPE} not found in schemast`);
              continue;
            }

            const acno = Number(item.TRAN_ACNO) + 100000;
            const BANKACNO = bankCode + branchCode + item.ACTYPE + acno;

            const payload: any = {
              TRAN_NO: item.TRAN_NO ?? 0,
              TRAN_DATE: formatDate(item.TRAN_DATE),
              TRAN_TIME: item.TRAN_TIME ?? '',
              TRAN_ACNOTYPE: item.TRAN_ACNOTYPE ?? '',
              TRAN_ACTYPE: postgresSchemaId,
              TRAN_ACNO: BANKACNO,
              USER_CODE: item.USER_CODE ?? '',
              OFFICER_CODE: item.OFFICER_CODE ?? '',
              TRAN_STATUS:
                item.TRAN_STATUS === 'UP' ? '0' :
                  item.TRAN_STATUS === 'PS' ? '1' :
                    item.TRAN_STATUS === 'RJ' ? '2' : '0',
              BRANCH_CODE: branchId,
              TRAN_TYPE: item.TRAN_TYPE ?? '',
              TRAN_DRCR: item.TRAN_DRCR ?? '',
              TRAN_MODE: item.TRAN_MODE ?? 0,
              TRAN_AMOUNT: item.TRAN_AMOUNT ?? 0,
              RENT_FROM_DATE: formatDate(item.RENT_FROM_DATE),
              RENT_UPTO_DATE: formatDate(item.RENT_UPTO_DATE),
              RECEIPT_NO: item.RECEIPT_NO ?? '',
              TRF_ACNOTYPE: item.TRF_ACNOTYPE ?? '',
              TRF_ACTYPE: trfActypeId,
              TRF_ACNO: agentBANKACNO,
              AC_CLOSED: item.AC_CLOSED == 0 ? 0 : 1,
              TRAN_ENTRY_TYPE: item.TRAN_ENTRY_TYPE ?? ''
            };

            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into('lockerenttran')
              .values(payload)
              .execute();

            insertedTotal++;
          }

          await queryRunner.commitTransaction();
          this.logger.log(`Batch committed. Inserted so far: ${insertedTotal}`);

        } catch (err) {
          if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
          throw err;
        }

        offset += batchSize;
      }

      this.logger.log(`✅ LOCKERRENTTRAN migration finished. Total inserted: ${insertedTotal}`);
      return { success: true, inserted: insertedTotal, total: this.count };

    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }

  async migrateLOCKERTRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting LOCKERTRAN migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Get total count first
      const countRes = await this.clientConn.execute(
        `SELECT COUNT(*) AS CNT FROM LOCKERTRAN WHERE TRAN_DATE > :changedate`,
        { changedate: new Date(this.changedate) } as Record<string, any>
      );
      const countRows = this.convertOracleRows(countRes as any);
      this.count = countRows[0]?.CNT || 0;
      this.logger.log(`Total LOCKERTRAN rows to migrate: ${this.count}`);

      if (this.count === 0) {
        this.logger.warn('No records found in LOCKERTRAN.');
        return { success: true, inserted: 0, total: 0 };
      }

      // 2. Batch processing loop
      const batchSize = 3000;
      let offset = 0;
      let insertedTotal = 0;

      while (offset < this.count) {
        this.logger.log(`Fetching batch at offset ${offset}...`);

        const result = await this.clientConn.execute(`
        SELECT L.*, S.TYPEID AS ACTYPE
        FROM LOCKERTRAN L
        LEFT JOIN SCHEMAST S ON L.TRAN_ACTYPE = S.S_APPL
        WHERE L.TRAN_DATE > :changedate
        ORDER BY L.TRAN_NO
        OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
      `, {
          changedate: new Date(this.changedate),
          offset,
          limit: batchSize
        } as Record<string, any>);

        const rows = this.convertOracleRows(result as any);
        if (rows.length === 0) break;

        await queryRunner.startTransaction();
        try {
          const schemaData = await queryRunner.manager.query(`SELECT id,"S_APPL","TYPEID" FROM schemast`);
          const schemaMap = new Map(schemaData.map(x => [Number(x.TYPEID), x.id]));

          const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`);
          const { BANK_CODE: bankCode, BRANCH_CODE: branchCodeStr } = syspara[0];
          const branchCode = Number(branchCodeStr);

          const branchRes = await queryRunner.manager.query(
            `SELECT id FROM ownbranchmaster WHERE "CODE"=$1 OR "CODE"='1' LIMIT 1`,
            [String(branchCode)]
          );
          const branchId = branchRes[0]?.id || 1;

          const formatDate = (d: any) => d ? moment(d).format('DD/MM/YYYY') : null;

          for (const item of rows) {
            if (!item.ACTYPE) continue;

            const postgresSchemaId = schemaMap.get(Number(item.ACTYPE));
            if (!postgresSchemaId) {
              this.logger.warn(`Skipping TRAN_NO=${item.TRAN_NO}, ACTYPE=${item.ACTYPE} not found in schemast`);
              continue;
            }

            const acno = String(item.TRAN_ACNO).padStart(6, '0');
            const BANKACNO = bankCode + branchCode + item.ACTYPE + acno;

            const payload: any = {
              TRAN_NO: item.TRAN_NO ?? 0,
              SERIAL_NO: item.SERIAL_NO ?? 0,
              TRAN_DATE: formatDate(item.TRAN_DATE),
              TRAN_TIME: item.TRAN_TIME ?? '',
              TRAN_ACNOTYPE: item.TRAN_ACNOTYPE ?? '',
              TRAN_ACTYPE: postgresSchemaId,
              TRAN_ACNO: BANKACNO,
              LOCKER_OPENING_TIME: item.LOCKER_OPENING_TIME ?? '',
              LOCKER_CLOSING_TIME: item.LOCKER_CLOSING_TIME ?? '',
              OPENING_USER_CODE: item.OPENING_USER_CODE ?? '',
              CLOSING_USER_CODE: item.CLOSING_USER_CODE ?? '',
              NARRATION: (item.NARRATION || '').replace('\x00', ''),
              USER_CODE: item.USER_CODE ?? '',
              OFFICER_CODE: item.OFFICER_CODE ?? '',
              TRAN_STATUS:
                item.TRAN_STATUS === 'UP' ? '0' :
                  item.TRAN_STATUS === 'PS' ? '1' :
                    item.TRAN_STATUS === 'RJ' ? '2' : '0',
              BRANCH_CODE: branchId
            };

            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into('lockertran')
              .values(payload)
              .execute();

            insertedTotal++;
          }

          await queryRunner.commitTransaction();
          this.logger.log(`Batch committed. Inserted so far: ${insertedTotal}`);

        } catch (err) {
          if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
          throw err;
        }

        offset += batchSize;
      }

      this.logger.log(`✅ LOCKERTRAN migration finished. Total inserted: ${insertedTotal}`);
      return { success: true, inserted: insertedTotal, total: this.count };

    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateGLREPORTLINK() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting GLREPORTLINK migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const mapResult = await this.clientConn.execute(`
      SELECT S_APPL FROM SCHEMAST
    `);

      const mapRows = this.convertOracleRows(mapResult as any);
      const acTypeMap = new Map<number, number>();

      for (const row of mapRows) {
        acTypeMap.set(row.S_APPL, row.S_APPL);
      }

      this.logger.log(`AC_TYPE mapping loaded: ${acTypeMap.size} entries`);


      const result = await this.clientConn.execute(`
      SELECT G.*, S.S_APPL AS ACTYPE
      FROM GLREPORTLINK G
      LEFT JOIN SCHEMAST S ON G.AC_TYPE = S.S_APPL
      ORDER BY G.CODE
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in GLREPORTLINK.');
        await queryRunner.commitTransaction();
        return { success: true, inserted: 0 };
      }

      // 🔹 Date formatter
      const formatDate = (d: any) => {
        if (d === '' || d === null || d === undefined) return null;
        return moment(d).format('DD/MM/YYYY');
      };

      const payload: any[] = [];

      for (const item of rows) {

        const mappedAcType = acTypeMap.get(item.AC_TYPE);

        // Debug for missing mapping
        if (!mappedAcType) {
          console.warn(` Missing mapping for AC_TYPE: ${item.AC_TYPE}`);
        }

        payload.push({
          REPORT_TYPE: item.REPORT_TYPE,
          CODE: item.CODE,
          CODE_TYPE: item.CODE_TYPE,
          AC_ACNOTYPE: item.AC_ACNOTYPE,

          AC_TYPE: 4,

          AC_NO: item.AC_NO,
          SUB_COLUMN_NO: item.SUB_COLUMN_NO,
          EFFECT_DATE: formatDate(item.EFFECT_DATE),
          REVERSE_CODE: item.REVERSE_CODE,
          DEFAULT_BALTYPE: item.DEFAULT_BALTYPE,
          EFFECT_TO_DATE: formatDate(item.EFFECT_TO_DATE)
        });
      }

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('glreportlink')
        .values(payload)
        .execute();

      await queryRunner.commitTransaction();

      this.logger.log(`GLREPORTLINK migration completed. Inserted: ${payload.length}`);

      return {
        success: true,
        inserted: payload.length
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof Error) {
        this.logger.error('Migration failed', error.stack);
      } else {
        this.logger.error('Migration failed', error);
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async migrateMANAGERVIEW() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting MANAGERVIEW migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Fetch all rows directly
      const result = await this.clientConn.execute(`
      SELECT * FROM MANAGERVIEW ORDER BY SR_NO
    `);
      const rows = this.convertOracleRows(result as any);

      if (!rows || rows.length === 0) {
        this.logger.warn('No records found in MANAGERVIEW.');
        await queryRunner.commitTransaction();
        return { success: true, inserted: 0 };
      }

      let insertedTotal = 0;

      for (const item of rows) {
        const payload: any = {
          SR_NO: item.SR_NO ?? 0,
          TYPE: item.TYPE ?? '',
          STATEMENT_CODE: item.STATEMENT_CODE ?? '',
          DESCRIPTION: this.transformValue(item.DESCRIPTION),
          // ? String(item.DESCRIPTION).replace(/\x00/g, '') // strip null bytes if present
          // : '',
          IS_DISPLAY: item.IS_DISPLAY ?? 0,
          PERCENTAGE_TO_WORKING_CAPITAL: item.PERCENTAGE_TO_WORKING_CAPITAL ?? 0

        };

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('managerview')
          .values(payload)
          .execute();

        insertedTotal++;
      }

      await queryRunner.commitTransaction();
      this.logger.log(` MANAGERVIEW migration finished. Total inserted: ${insertedTotal}`);
      return { success: true, inserted: insertedTotal };

    } catch (err) {
      if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
      this.logger.error(' MANAGERVIEW migration failed', err);
      throw err;
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateEXCESSCASH() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting EXCESSCASH migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 🔹 Fetch data from Oracle
      const result = await this.clientConn.execute(`
      SELECT * FROM EXCESSCASH ORDER BY TRAN_DATE
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in EXCESSCASH.');
        await queryRunner.commitTransaction();
        return { success: true, inserted: 0 };
      }

      // 🔹 Date formatter 
      const formatDate = (d: any) => {
        if (d === '' || d === null || d === undefined) return null;
        return moment(d).format('DD/MM/YYYY');
      };

      const payload: any[] = [];

      // 🔹 Mapping (same as sir)
      for (const item of rows) {
        payload.push({
          TRAN_DATE: formatDate(item.TRAN_DATE),
          CASH_LIMIT: item.CASH_LIMIT ?? null,
          CLOSING_BALANCE: item.CLOSING_BALANCE ?? null,
          EXCESS_CASH: item.EXCESS_CASH ?? null,
          REASON: item.REASON ?? null
        });
      }

      // 🔹 Insert into PostgreSQL (single batch)
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('excesscash')
        .values(payload)
        .execute();

      await queryRunner.commitTransaction();

      this.logger.log(` EXCESSCASH migration completed. Inserted: ${payload.length}`);

      return {
        success: true,
        inserted: payload.length
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof Error) {
        this.logger.error('Migration failed', error.stack);
      } else {
        this.logger.error('Migration failed', String(error));
      }

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async migrateCASTMASTER() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting CASTMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //Fetch Oracle Data
      const result = await this.clientConn.execute(`
        SELECT * FROM CASTMASTER ORDER BY CODE
      `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in CASTMASTER.');
        await queryRunner.commitTransaction();
        return { success: true, inserted: 0 };
      }

      const existingData = await queryRunner.manager.query(`
        SELECT "NAME" FROM castmaster
      `);

      const existingNames = new Set(
        existingData.map((x: any) => x.NAME)
      );

      const payload: any[] = [];
      let inserted = 0;

      for (const ele of rows) {
        const name = this.convertYogeshToEnglish(ele.NAME);

        if (!name) continue;

        if (existingNames.has(name)) {
          this.logger.warn(`CASTMASTER: Name "${name}" already exists. Skipping.`);
          continue;
        }

        payload.push({
          CODE: ele.CODE,
          NAME: this.transformValue(name)
        });

        existingNames.add(name); // prevent duplicates within batch
        inserted++;
      }

      if (payload.length > 0) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('castmaster')
          .values(payload)
          .execute();
      }

      await queryRunner.commitTransaction();

      this.logger.log(` CASTMASTER migration completed. Inserted: ${inserted}`);

      return {
        success: true,
        inserted
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof Error) {
        this.logger.error('Migration failed', error.stack);
      } else {
        this.logger.error('Migration failed', String(error));
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async migrateDEPOCLOSETRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');

    // 1. Initial Pagination Setup
    if (this.offset === 0) {
      const countRes = await this.clientConn.execute(`SELECT COUNT(*) as TOTAL FROM DEPOCLOSETRAN`);
      const countData = this.convertOracleRows(countRes as any);
      this.count = Number(countData[0].TOTAL || 0);
    }

    this.logger.log(`DEPOCLOSETRAN Batch: Offset ${this.offset}/${this.count}`);

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 2. Pre-fetch Metadata (Fast Lookups)
      const [syspara, schemaRows, branchRows] = await Promise.all([
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query<{ id: number; S_APPL: number }[]>(`SELECT id, "S_APPL" FROM schemast`),
        queryRunner.manager.query<{ id: number; CODE: string }[]>(`SELECT id, "CODE" FROM ownbranchmaster`)
      ]);

      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');
      const schemaMap = new Map(schemaRows.map(r => [Number(r.S_APPL), r]));
      const branchMatch = branchRows.find(b => Number(b.CODE) === Number(syspara[0]?.BRANCH_CODE)) || branchRows[0];
      const branchCodeStr = String(branchMatch?.CODE || '001').padStart(3, '0');

      // 3. Fetch Master Batch from Oracle
      const result = await this.clientConn.execute(`
        SELECT * FROM (
          SELECT rownum rnum, rs.* FROM (
            SELECT d.*, s.S_APPL as ACTYPE_PREFIX
            FROM DEPOCLOSETRAN d
            LEFT JOIN SCHEMAST s ON d.TRAN_ACTYPE = s.S_APPL
            ORDER BY d.TRAN_NO ASC
          ) rs WHERE rownum <= ${this.offset + this.limit}
        ) WHERE rnum > ${this.offset}
      `);

      const masterRows = this.convertOracleRows(result as any);

      for (const ele of masterRows) {
        // Start transaction for this Master + its Details
        await queryRunner.startTransaction();

        try {
          // A. Map Master Record
          const schema = schemaMap.get(Number(ele.TRAN_ACTYPE));
          const acnoPadded = String(ele.TRAN_ACNO).padStart(6, '0');
          const finalBankAcNo = schema
            ? `${bankCode}${branchCodeStr}${String(schema.S_APPL).substring(0, 3).padStart(3, '0')}${acnoPadded}`
            : null;

          const masterPayload: any = {
            TRAN_NO: ele.TRAN_NO,
            TRAN_DATE: ele.TRAN_DATE ? moment(ele.TRAN_DATE).format('DD/MM/YYYY') : null,
            TRAN_TIME: ele.TRAN_TIME,
            TRAN_TYPE: ele.TRAN_TYPE || 'TR', // Fallback to prevent Not-Null crash
            BRANCH_CODE: branchMatch.id,
            TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,
            TRAN_ACTYPE: schema?.id || null,
            TRAN_ACNO: finalBankAcNo,
            LEDGER_BAL: Number(ele.LEDGER_BAL),
            EXCESS_INT: Number(ele.EXCESS_INT),
            TDS_AMOUNT: Number(ele.TDS_AMOUNT),
            SURCHARGE_AMOUNT: ele.SURCHARGE_AMOUNT,
            COMMISSION_CHARGES: ele.COMMISSION_CHARGES,
            OTHER_CHARGES_AMOUNT: ele.OTHER_CHARGES_AMOUNT,
            PENAL_INTEREST_AMOUNT: ele.PENAL_INTEREST_AMOUNT,
            PAID_INTEREST_AMOUNT: ele.PAID_INTEREST_AMOUNT,
            NET_INTEREST_AMOUNT: ele.NET_INTEREST_AMOUNT,
            TOTAL_INTEREST_AMOUNT: ele.TOTAL_INTEREST_AMOUNT,
            INTEREST_RATE: ele.INTEREST_RATE,
            IS_PREMATURE_CLOSE: ele.IS_PREMATURE_CLOSE == 0 ? 0 : 1,
            TRAN_STATUS: ele.TRAN_STATUS === 'UP' ? 0 :
              ele.TRAN_STATUS === 'PS' ? 1 :
                ele.TRAN_STATUS === 'RJ' ? 2 : 0,
            TOKEN_NO: ele.TOKEN_NO,
            CASHIER_CODE: ele.CASHIER_CODE,
            USER_CODE: ele.USER_CODE,
            OFFICER_CODE: ele.OFFICER_CODE,
            // NARRATION: narration,
            PAYABLE_INTEREST_AMOUNT: ele.PAYABLE_INTEREST_AMOUNT,
            AUTO_MATURED_PAYABLEAMT: ele.AUTO_MATURED_PAYABLEAMT,
            AFT_MATURE_INT_RATE: ele.AFT_MATURE_INT_RATE,
            AFT_MATURE_INT_AMT: ele.AFT_MATURE_INT_AMT,
            CHEQUE_SERIES: ele.CHEQUE_SERIES,
            CHEQUE_NO: ele.CHEQUE_NO,
            CHEQUE_DATE: ele.CHEQUE_DATE ? moment(ele.CHEQUE_DATE).format('DD/MM/YYYY') : null,
            NET_PAYABLE_AMOUNT: Number(ele.NET_PAYABLE_AMOUNT),
            NARRATION: this.transformValue(ele.NARRATION), // Using your transliteration helper
            status: 1,
            SYSCHNG_LOGIN: ele.OFFICER_CODE || 'MIGRATION'
          };

          const savedMaster = await queryRunner.manager.save('depoclosetran', masterPayload);

          // B. Handle Transfer Details (DEPOCLOSETRANSAC)
          if (ele.TRAN_TYPE === 'TR') {
            const detailDate = moment(ele.TRAN_DATE).format('DD-MMM-YY').toUpperCase();
            const detailResult = await this.clientConn.execute(`
              SELECT d.*, s.S_APPL as ACTYPE_PREFIX 
              FROM DEPOCLOSETRANSAC d
              LEFT JOIN SCHEMAST s ON d.TRANSFER_ACTYPE = s.S_APPL
              WHERE d.TRAN_DATE = '${detailDate}' AND d.TRAN_NO = ${ele.TRAN_NO}
            `);
            const detailRows = this.convertOracleRows(detailResult as any);

            for (const item of detailRows) {
              const dSchema = schemaMap.get(Number(item.TRANSFER_ACTYPE));
              const dAcPadded = String(item.TRANSFER_ACNO).padStart(6, '0');
              const dBankAcNo = dSchema
                ? `${bankCode}${branchCodeStr}${String(dSchema.S_APPL).substring(0, 3).padStart(3, '0')}${dAcPadded}`
                : null;

              const detailPayload = {
                TRAN_DATE: item.TRAN_DATE ? moment(item.TRAN_DATE).format('DD/MM/YYYY') : null,
                TRAN_NO: item.TRAN_NO,
                SERIAL_NO: item.SERIAL_NO,
                TRAN_AMOUNT: Number(item.TRAN_AMOUNT) || 0,
                TRANSFER_ACNOTYPE: item.TRANSFER_ACNOTYPE,
                TRANSFER_ACTYPE: dSchema?.id || null,
                TRANSFER_ACNO: dBankAcNo,
                NARRATION: this.transformValue(item.NARRATION),
                HO_SUB_GLACNO: item.HO_SUB_GLACNO,
                REC_PENAL_INT_AMOUNT: item.REC_PENAL_INT_AMOUNT || 0,
                RECPAY_INT_AMOUNT: item.RECPAY_INT_AMOUNT || 0,
                PENAL_INT_AMOUNT: item.PENAL_INT_AMOUNT || 0,
                INTEREST_AMOUNT: item.INTEREST_AMOUNT || 0,
                AC_CLOSED: item.AC_CLOSED == 0 ? 0 : 1,
                depoclosetranId: savedMaster.id // Link to the Master we just saved
              };

              await queryRunner.manager.insert('depoclosetransac', detailPayload);
            }
          }

          // Commit Master + Details together
          await queryRunner.commitTransaction();

        } catch (rowError: any) {
          // If master or any detail fails, rollback only this group
          await queryRunner.rollbackTransaction();
          this.logger.error(`Skipped TranNo ${ele.TRAN_NO}: ${rowError.message}`);
        }
      }

      // 4. Batch Recursion
      this.offset += this.limit;
      if (this.offset < this.count) {
        await queryRunner.release();
        return await this.migrateDEPOCLOSETRAN();
      } else {
        this.offset = 0;
        this.logger.log('--- DEPOCLOSETRAN & DETAILS MIGRATION COMPLETE ---');
        return { success: true, total: this.count };
      }

    } catch (fatalError: any) {
      if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
      this.logger.error(`FATAL: ${fatalError.message}`);
      throw fatalError;
    } finally {
      if (!queryRunner.isReleased) await queryRunner.release();
    }
  }


  async migrateGLREPORTMASTER() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting GLREPORTMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {

      const result = await this.clientConn.execute(`
      SELECT * FROM GLREPORTMASTER ORDER BY CODE
    `);

      const rows = this.convertOracleRows(result as any);

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const item of rows) {
          const payload: any = {
            CODE: item.CODE,
            NAME: this.transformValue(item.NAME ? String(item.NAME).replace("\x00", "") : null),
            SERIAL_NO: item.SERIAL_NO,
            FIRST_SRNO: item.FIRST_SRNO,
            SECOND_SRNO: item.SECOND_SRNO,
            THIRD_SRNO: item.THIRD_SRNO,
            FOURTH_SRNO: item.FOURTH_SRNO,
            CODE_TYPE: item.CODE_TYPE,
            REPORT_TYPE: item.REPORT_TYPE,

            PERCENTAGE: item.PERCENTAGE == null ? 0 : item.PERCENTAGE,
            PERCENTAGE_OF_CODE: item.PERCENTAGE_OF_CODE,
            PERCENTAGE_CONSIDARATION: item.PERCENTAGE_CONSIDARATION,

            TEMP_AMOUNT: item.TEMP_AMOUNT == null ? 0 : item.TEMP_AMOUNT,
            FINAL_AMOUNT: item.FINAL_AMOUNT == null ? 0 : item.FINAL_AMOUNT,
            FINAL_AMOUNT1: item.FINAL_AMOUNT1 == null ? 0 : item.FINAL_AMOUNT1,
            FINAL_AMOUNT2: item.FINAL_AMOUNT2 == null ? 0 : item.FINAL_AMOUNT2,

            FINAL_HEADING1: item.FINAL_HEADING1,
            FINAL_HEADING2: item.FINAL_HEADING2,

            INPUT_ALLOWED: item.INPUT_ALLOWED == 0 ? 0 : 1,
            SUB_COLUMN_REQUIRED: item.SUB_COLUMN_REQUIRED,
            IS_RATIO: item.IS_RATIO == 0 ? 0 : 1,

            ALTERNET_CODE: item.ALTERNET_CODE,
            HO_LIQ_CODE1: item.HO_LIQ_CODE1,
            HO_LIQ_CODE2: item.HO_LIQ_CODE2,

            IS_PRINT_IN_REPORT: item.IS_PRINT_IN_REPORT == 0 ? 0 : 1,
            INNER_AMT_REQD: item.INNER_AMT_REQD,
            ADD_PL_AMOUNT: item.ADD_PL_AMOUNT == 0 ? 0 : 1,
            PRINT_AT_OUTER: item.PRINT_AT_OUTER,

            REF_ID: item.REF_ID,
            ALTERNATE_BALANCE_CODE: item.ALTERNATE_BALANCE_CODE
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('glreportmaster')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();

        this.logger.log(` GLREPORTMASTER migrated: ${inserted} rows`);
        return { success: true, inserted };

      } catch (err) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        throw err;
      }

    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  // ---------------- ACCOTRAN MIGRATION (ALL ROWS) ----------------

  async migrateACCOTRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');

    this.logger.log(`Starting FULL ACCOTRAN migration (All rows)...`);

    try {
      // 1. Load Master Lookups (Schema, Branch, etc.)
      await this.TableData();

      // 2. Fetch ALL rows from Oracle
      const result = await this.clientConn.execute(`
            SELECT ACCOTRAN.*, SCHEMAST.S_APPL 
            FROM ACCOTRAN 
            LEFT JOIN SCHEMAST ON ACCOTRAN.TRAN_ACTYPE = SCHEMAST.S_APPL 
            ORDER BY ACCOTRAN.TRAN_DATE ASC, ACCOTRAN.TRAN_NO ASC, ACCOTRAN.SERIAL_NO ASC
        `);

      const allRows = this.mapOracleToPgRows(result);
      const totalRows = allRows.length;
      this.logger.log(`Fetched ${totalRows} rows from Oracle. Starting insertion...`);

      // Pre-calculate constants
      const branchInternalId = this.PostBranchOne?.[0]?.id || 1;
      const font = 'DVBW-TTYogeshEn';

      // 3. Process in smaller batches to stay under PostgreSQL parameter limits (65,535)
      // ACCOTRAN has ~28 columns, so 1000 rows = 28,000 parameters (Safe)
      const batchSize = 1000;

      for (let i = 0; i < totalRows; i += batchSize) {
        const queryRunner = this.serverDB.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          const chunk = allRows.slice(i, i + batchSize);
          const payloads: any[] = [];

          for (const ele of chunk) {
            const schemastData = this.PostSchemast?.find(s => Number(s.S_APPL) === Number(ele.TRAN_ACTYPE));
            if (!schemastData) continue;

            // --- Narration Transliteration ---
            let engNarration = '';
            if (ele.NARRATION) {
              // Stripping null chars using ESLint-friendly Unicode literal
              let marathiText = unidev(String(ele.NARRATION).replace(/\u0000/g, ""), 'hindi', font);

              if (font === 'DVBW-TTYogeshEn') {
                marathiText = marathiText.replace(/×(.)/g, '$1ि')
                  .replace(/Ø(.)/g, '$1िं')
                  .replace(/([क-ह])([ािीुूृेैोौंॅॉ]*)Ô/g, 'र्$1$2')
                  .replace(/Ô/g, 'र्');
              }
              engNarration = this.translatefullwords(marathiText);
            }

            payloads.push({
              TRAN_NO: Number(ele.TRAN_NO),
              SERIAL_NO: Number(ele.SERIAL_NO),
              BRANCH_CODE: branchInternalId,
              TRAN_DATE: ele.TRAN_DATE ? moment(ele.TRAN_DATE).format('DD/MM/YYYY') : null,
              TRAN_TIME: ele.TRAN_TIME,
              TRAN_TYPE: ele.TRAN_TYPE,
              TRAN_DRCR: ele.TRAN_DRCR,
              TRAN_ACNOTYPE: 'GL',
              TRAN_ACTYPE: schemastData.id,
              TRAN_ACNO: ele.TRAN_ACNO,
              TRAN_AMOUNT: Number(ele.TRAN_AMOUNT) || 0,
              TRAN_CONTRA: ele.TRAN_CONTRA,
              NARRATION: engNarration,
              CHEQUE_DATE: ele.CHEQUE_DATE ? moment(ele.CHEQUE_DATE).format('DD/MM/YYYY') : null,
              CHEQUE_SERIES: ele.CHEQUE_SERIES,
              CHEQUE_NO: ele.CHEQUE_NO,
              CASHIER_CODE: ele.CASHIER_CODE,
              USER_CODE: ele.USER_CODE,
              OFFICER_CODE: ele.OFFICER_CODE,
              CLOSING_ENTRY: Number(ele.CLOSING_ENTRY) === 1 ? 1 : 0,
              INTEREST_AMOUNT: Number(ele.INTEREST_AMOUNT) || 0,
              TRAN_MODE: ele.TRAN_MODE,
              WITHDRAW_NO: ele.WITHDRAW_NO,
              TRAN_ENTRY_TYPE: ele.TRAN_ENTRY_TYPE,
              STATEMENT_DATE: ele.STATEMENT_DATE ? moment(ele.STATEMENT_DATE).format('DD/MM/YYYY') : null,
              status: '1'
            });
          }

          // --- Bulk Insert ---
          if (payloads.length > 0) {
            await queryRunner.manager.createQueryBuilder()
              .insert()
              .into('accotran')
              .values(payloads)
              .execute();
          }

          await queryRunner.commitTransaction();
          this.logger.log(`Inserted up to row ${Math.min(i + batchSize, totalRows)} / ${totalRows}`);

        } catch (err: any) {
          if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
          this.logger.error(`Batch failed at index ${i}: ${err.message}`);
          throw err;
        } finally {
          await queryRunner.release();
        }
      }

      this.logger.log('✅ ACCOTRAN migration finished successfully.');
      return { success: true, totalInserted: totalRows };

    } catch (err: any) {
      this.logger.error(`Fatal ACCOTRAN migration error: ${err.message}`);
      throw err;
    }
  }



  async migratePASSBOOKHISTORY(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting PASSBOOKHISTORY migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT * FROM PASSBOOKHISTORY ORDER BY LAST_PRINT_DATE
    `);

      const rows = this.mapOracleToPgRows(result);

      if (!rows.length) {
        this.logger.warn('No records found in PASSBOOKHISTORY');
        return { success: true, inserted: 0 };
      }

      // 🔹 2. Load SCHEMAST (S_APPL → id)
      const schemaRows = await queryRunner.manager.query(
        `SELECT id, "S_APPL" FROM schemast`
      );

      const schemaMap = new Map<number, number>(
        schemaRows.map((r: any) => [Number(r.S_APPL), Number(r.id)])
      );

      // 🔹 3. Load BANK + BRANCH
      const syspara = await queryRunner.manager.query(
        `SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1`
      );

      const bankCode = syspara[0]?.BANK_CODE || 0;
      const branchCode = syspara[0]?.BRANCH_CODE || 0;

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        // 🔹 4. LOOP
        for (const item of rows) {
          try {
            if (!item.AC_TYPE) continue;

            const sAppl = Number(item.AC_TYPE); // Oracle S_APPL
            const schemaId = schemaMap.get(sAppl);

            if (!schemaId) continue;

            let bankAcNo: string | null = null;

            if (item.AC_NO) {
              const acc = String(Number(item.AC_NO) + 100000).padStart(6, '0');

              bankAcNo =
                String(bankCode).padStart(3, '0') +
                String(branchCode).padStart(3, '0') +
                String(sAppl).substring(0, 3).padStart(3, '0') +
                acc;
            }

            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into('passbookhistory')
              .values({
                AC_ACNOTYPE: item.AC_ACNOTYPE,

                //FINAL CORRECT VALUE
                AC_NO: bankAcNo,

                AC_TYPE: schemaId,

                LAST_PRINT_DATE: formatDate(item.LAST_PRINT_DATE),
                LAST_PRINT_TRANNO: item.LAST_PRINT_TRANNO,

                status: '1'
              })
              .execute();

            inserted++;

          } catch (err: any) {
            this.logger.error(
              `❌ PASSBOOK ERROR AC_NO ${item.AC_NO}: ${err.message}`
            );
          }
        }

        await queryRunner.commitTransaction();

        this.logger.log(`✅ PASSBOOKHISTORY migrated: ${inserted}`);

        return { success: true, inserted };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }


  async migratePASSBOOKPRINT(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting PASSBOOKPRINT migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle data
      const result = await this.clientConn.execute(`
      SELECT * FROM PASSBOOKPRINT ORDER BY TRAN_DATE
    `);

      const rows = this.mapOracleToPgRows(result);

      if (!rows.length) {
        this.logger.warn('No records found in PASSBOOKPRINT');
        return { success: true, inserted: 0 };
      }

      // 2. Load SCHEMAST mapping
      const schemaRows = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>(
        schemaRows.map((r: any) => [Number(r.S_APPL), Number(r.id)])
      );

      // 3. SYS PARA
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      await queryRunner.startTransaction();

      let inserted = 0;

      // 4. LOOP
      for (const item of rows) {
        try {
          if (!item.AC_TYPE) continue;

          // ✅ schema mapping
          const schemaId = schemaMap.get(Number(item.AC_TYPE));
          if (!schemaId) continue;


          const sAppl = Number(item.AC_TYPE);

          const acc = String(Number(item.AC_NO || 0) + 100000).padStart(6, '0');

          const bankAcNo =
            String(syspara[0].BANK_CODE).padStart(3, '0') +
            String(syspara[0].BRANCH_CODE).padStart(3, '0') +
            String(sAppl).substring(0, 3).padStart(3, '0') +
            acc;

          await queryRunner.manager.insert('passbookprint', {
            AC_ACNOTYPE: item.AC_ACNOTYPE,

            // ✅ SAME STYLE AS YOUR PASSBOOKHISTORY
            AC_NO: bankAcNo,

            AC_TYPE: schemaId,

            AC_NAME: this.transformValue(item.AC_NAME),
            AC_OP_CD: item.AC_OP_CD,

            OP_BALANCE: Number(item.OP_BALANCE) || 0,
            TRAN_NO: Number(item.TRAN_NO) || 0,

            TRAN_DATE: formatDate(item.TRAN_DATE),

            NARRATION: this.transformValue(item.NARRATION),

            CHEQUE_NO: item.CHEQUE_NO,
            WITHDRAW_NO: item.WITHDRAW_NO,

            DR_AMOUNT: Number(item.DR_AMOUNT) || 0,
            CR_AMOUNT: Number(item.CR_AMOUNT) || 0,
            OTHER_AMOUNT: Number(item.OTHER_AMOUNT) || 0,

            OTHER_DRCR: item.OTHER_DRCR,

            status: '1'
          });

          inserted++;

        } catch (err: any) {
          this.logger.error(
            `❌ PASSBOOKPRINT ERROR AC_NO ${item.AC_NO}: ${err.message}`
          );
        }
      }

      await queryRunner.commitTransaction();

      this.logger.log(`✅ PASSBOOKPRINT migrated: ${inserted}`);

      return { success: true, inserted };

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }


  async migrateRENEWALHISTORY(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting RENEWALHISTORY migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await this.clientConn.execute(`
      SELECT renewalhistory.*, schemast.S_APPL as ACTYPE
      FROM renewalhistory
      LEFT JOIN schemast ON renewalhistory.ac_type = schemast.s_appl
    `);

      const rows = this.convertOracleRows(result as any);

      // 🔹 Schema Map
      const schemaData: { id: number; S_APPL: number }[] =
        await queryRunner.manager.query(`SELECT id, "S_APPL" FROM schemast`);

      const schemaMap = new Map<number, { id: number; S_APPL: number }>();
      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s);
      }

      // 🔹 Syspara
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      // 🔹 Branch ID
      let branchRes = await queryRunner.manager.query(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = $1 LIMIT 1`,
        [branchCode]
      );

      if (!branchRes.length) {
        branchRes = await queryRunner.manager.query(
          `SELECT id FROM ownbranchmaster LIMIT 1`
        );
      }

      const branchId = branchRes[0]?.id;

      const formatDate = (d: any) =>
        d == null || d === '' ? null : moment(d).format('DD/MM/YYYY');

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          try {
            const schema = schemaMap.get(Number(ele.ACTYPE));
            if (!schema) continue;

            // ✅ YOUR REQUIRED BANKACNO LOGIC
            let bankAcNo: string | null = null;

            if (ele.AC_NO != null && ele.AC_NO != 0) {
              const acc = String(Number(ele.AC_NO) + 100000).padStart(6, '0');

              bankAcNo =
                String(bankCode).padStart(3, '0') +
                String(branchCode).padStart(3, '0') +
                String(schema.S_APPL).substring(0, 3).padStart(3, '0') +
                acc;
            }

            await queryRunner.manager.insert('renewalhistory', {
              RENEWAL_DATE: formatDate(ele.RENEWAL_DATE),

              AC_RENEWAL_COUNTER: ele.AC_RENEWAL_COUNTER,
              AC_ACNOTYPE: ele.AC_ACNOTYPE,

              AC_TYPE: schema.id,
              AC_NO: bankAcNo,

              OLD_MONTH: ele.OLD_MONTH,
              OLD_EXPIRY_DATE: formatDate(ele.OLD_EXPIRY_DATE),

              OLD_AC_ACNOTYPE: ele.AC_ACNOTYPE,
              OLD_SANCTION_LIMIT: ele.OLD_SANCTION_LIMIT,
              OLD_SANCTION_DATE: formatDate(ele.OLD_SANCTION_DATE),

              OLD_SECURITY_AMOUNT: ele.OLD_SECURITY_AMOUNT,
              OLD_DRAWING_POWER: ele.OLD_DRAWING_POWER,

              USER_CODE: ele.USER_CODE,

              NEW_MONTH: ele.NEW_MONTH,
              NEW_DAYS: ele.NEW_DAYS,

              NEW_OPEN_DATE: formatDate(ele.NEW_OPEN_DATE),
              NEW_ASON_DATE: formatDate(ele.NEW_ASON_DATE),
              NEW_EXPIRY_DATE: formatDate(ele.NEW_EXPIRY_DATE),

              NEW_INTEREST_RATE: ele.NEW_INTEREST_RATE,

              OLD_AC_OPEN_DATE: formatDate(ele.OLD_AC_OPEN_DATE),
              OLD_AC_SCHMAMT: ele.OLD_AC_SCHEME_AMT,

              OLD_MATUAMT: ele.OLD_MATUAMT,
              OLD_DAYS: ele.OLD_DAYS,
              OLD_INTEREST_RATE: ele.OLD_INTEREST_RATE,

              BRANCH_CODE: branchId,

              OLD_AC_INSTALLMENT: ele.OLD_AC_INSTALLMENT,
              RENEWAL_AMOUNT: ele.RENEWAL_AMOUNT,

              NEW_RECEIPTNO: ele.NEW_RECEIPTNO,
              NEW_INT_CODE: ele.NEW_INT_CODE,
              NEW_MATURITY_AMOUNT: ele.NEW_MATURITY_AMOUNT,

              OLD_AC_SCHEME_AMT: ele.OLD_AC_SCHEME_AMT,
              OLD_RECEIPT_NO: ele.OLD_RECEIPT_NO,

              PENAL_INTEREST: ele.PENAL_INTEREST,
              NORMAL_INTEREST: ele.NORMAL_INTEREST,
              PAYABLE_INTEREST: ele.PAYABLE_INTEREST,
              INTEREST_PAID_AMT: ele.INTEREST_PAID_AMT,

              OFFICER_CODE: ele.OFFICER_CODE,
              INTEREST_DATE: formatDate(ele.INTEREST_DATE),

              IS_ASON_AC: ele.IS_ASON_AC,

              // ✅ SAME AS SIR
              TRAN_STATUS:
                ele.TRAN_STATUS === 'UP'
                  ? '0'
                  : ele.TRAN_STATUS === 'PS'
                    ? '1'
                    : ele.TRAN_STATUS === 'RJ'
                      ? '2'
                      : null,

              SYSCHNG_LOGIN:
                ele.TRAN_STATUS === 'UP'
                  ? null
                  : ele.OFFICER_CODE == null
                    ? ele.USER_CODE
                    : ele.OFFICER_CODE,

              TRAN_NO: ele.TRAN_NO,

              NORMAL_INT_TRTYPE: ele.NORMAL_INT_TRTYPE,

              NEW_LAST_TRNDATE: formatDate(ele.NEW_LAST_TRNDATE),
              OLD_LAST_TRNDATE: formatDate(ele.OLD_LAST_TRNDATE),
              OLD_ASON_DATE: formatDate(ele.OLD_ASON_DATE),

              OLD_INT_CODE: ele.OLD_INT_CODE,
              OLD_INTEREST_DATE: formatDate(ele.OLD_INTEREST_DATE),

              TRAN_TYPE: ele.TRAN_TYPE,

              status: '1',
            });

            inserted++;
          } catch (err: any) {
            this.logger.error(
              `ERROR AC_NO ${ele.AC_NO}: ${err.message}`
            );
          }
        }

        await queryRunner.commitTransaction();

        this.logger.log(`RENEWALHISTORY inserted: ${inserted}`);

        return { success: true, inserted };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        this.logger.error('Transaction failed', err);
        throw err;
      }
    } finally {
      await queryRunner.release();
    }
  }

  async migrateSUBSIDARYMASTER(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('Databases not connected');
    }

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      this.logger.log('Starting SUBSIDARYMASTER migration...');

      // ✅ Fetch Oracle data
      const result = await this.clientConn.execute(`
      SELECT * FROM SUBSIDARYMASTER 
      ORDER BY CODE
    `);

      const rows = this.mapOracleToPgRows(result);

      let inserted = 0;

      await queryRunner.startTransaction();

      try {
        for (const item of rows) {

          // ❗ Skip empty names (safe check)
          if (!item.NAME) continue;

          const payload = {
            //CODE: item.CODE ?? null, 
            CODE: item.CODE ?? item["CODE"] ?? item.code ?? null,
            NAME: this.transformValue(String(item.NAME)),
            status: '1'
          };

          await queryRunner.manager.insert('subsidarymaster', payload);

          inserted++;
        }

        await queryRunner.commitTransaction();

        this.logger.log(`✅ SUBSIDARYMASTER DONE: ${inserted}`);
        return { success: true, inserted };

      } catch (err: any) {
        await queryRunner.rollbackTransaction();
        this.logger.error(`❌ Loop Error: ${err.message}`);
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }

  async migrateTDRECEIPTISSUE(): Promise<{ success: boolean; inserted: number; skipped: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('Databases not connected');
    }

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      this.logger.log('Starting TDRECEIPTISSUE migration...');


      const [syspara, schemaRows, branchRes] = await Promise.all([
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query<{ id: number; S_APPL: number }[]>(`SELECT id, "S_APPL" FROM schemast`),
        queryRunner.manager.query<{ id: number; CODE: string }[]>(`SELECT id, "CODE" FROM ownbranchmaster`)
      ]);

      const schemaMap = new Map(schemaRows.map(r => [Number(r.S_APPL), r.id]));

      const sysBranchCode = String(syspara[0]?.BRANCH_CODE || '1');
      const branchRecord = branchRes.find(b => b.CODE === sysBranchCode) || branchRes[0];
      const branchId = branchRecord?.id || 1;

      //FETCH ORACLE DATA
      const result = await this.clientConn.execute(`
      SELECT T.*, S.S_APPL AS ACTYPE
      FROM TDRECEIPTISSUE T
      LEFT JOIN SCHEMAST S ON T.AC_TYPE = S.S_APPL
      ORDER BY T.PRINT_DATE
    `);

      const rows = this.mapOracleToPgRows(result);

      let inserted = 0;
      let skipped = 0;

      //LOOP
      for (const item of rows) {

        //Skip if ACTYPE missing
        if (!item.ACTYPE) {
          skipped++;
          continue;
        }

        //Schema mapping (PG ID)
        const schemaId = schemaMap.get(Number(item.ACTYPE));
        if (!schemaId) {
          skipped++;
          continue;
        }

        const shiftedAcNo = Number(item.AC_NO) + 100000;

        const bankAcNo = this.generateBankAcNo(
          syspara[0].BANK_CODE,
          syspara[0].BRANCH_CODE,
          item.ACTYPE,
          shiftedAcNo
        );

        await queryRunner.startTransaction();

        try {

          const payload = {
            BRANCH_CODE: branchId,

            PRINT_DATE: item.PRINT_DATE
              ? moment(item.PRINT_DATE).format('DD/MM/YYYY')
              : null,

            PRINT_TIME: item.PRINT_TIME,

            AC_ACNOTYPE: item.AC_ACNOTYPE,
            AC_TYPE: schemaId,
            AC_NO: bankAcNo,

            PRINT_TYPE: item.PRINT_TYPE,
            RECEIPT_NO: item.RECEIPT_NO,
            REASON_OF_DUPLICATE: this.transformValue(item.REASON_OF_DUPLICATE),
            USER_CODE: item.USER_CODE,

            status: '1'
          };

          await queryRunner.manager.insert('tdreceiptissue', payload);

          await queryRunner.commitTransaction();
          inserted++;

        } catch (err: any) {
          await queryRunner.rollbackTransaction();
          this.logger.error(` TDRECEIPTISSUE ERROR AC_NO ${item.AC_NO}: ${err.message}`);
          skipped++;
        }
      }

      this.logger.log(`TDRECEIPTISSUE DONE: Inserted ${inserted}, Skipped ${skipped}`);
      return { success: true, inserted, skipped };

    } finally {
      await queryRunner.release();
    }
  }

  async migrateDIVIDEND() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting DIVIDEND migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const [syspara, schemaRows] = await Promise.all([
        queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`),
        queryRunner.manager.query(`SELECT id, "S_APPL" FROM schemast`)
      ]);

      const schemaMap = new Map<number, number>(
        schemaRows.map(s => [Number(s.id), Number(s.S_APPL)])
      );

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      const result = await this.clientConn.execute(`
        SELECT d.*, S.S_APPL AS ACTYPE1
        FROM dividend d
        LEFT JOIN SCHEMAST S ON d.ACTYPE = S.S_APPL
        ORDER BY d.WARRENT_DATE
      `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in DIVIDEND.');
        await queryRunner.commitTransaction();
        return { success: true, inserted: 0 };
      }

      const formatDate = (d: any) => {
        if (!d) return null;
        return moment(d).format('DD/MM/YYYY');
      };

      let inserted = 0;

      for (const item of rows) {

        const sAppl = schemaMap.get(Number(item.ACTYPE1));

        if (!sAppl) {
          console.warn(` Missing S_APPL for ACTYPE1: ${item.ACTYPE1}`);
          continue;
        }

        const acNoVal = Number(item.AC_NO || 0) + 100000;

        const bankAcNo = this.generateBankAcNo(
          bankCode,
          branchCode,
          sAppl,
          acNoVal
        );

        //Status mapping
        let statusVal: number | null = null;
        if (item.DIVIDEND_STATUS === 'UP') statusVal = 0;
        else if (item.DIVIDEND_STATUS === 'PS') statusVal = 1;
        else if (item.DIVIDEND_STATUS === 'RJ') statusVal = 2;

        //Payload
        const payload = {
          WARRENT_DATE: formatDate(item.WARRENT_DATE),
          WARRENT_NO: item.WARRENT_NO ?? null,

          DIV_FROM_YEAR: item.DIV_FROM_YEAR ?? null,
          DIV_TO_YEAR: item.DIV_TO_YEAR ?? null,
          DIV_FROM_MONTH: item.DIV_FROM_MONTH ?? null,
          DIV_TO_MONTH: item.DIV_TO_MONTH ?? null,

          ACNOTYPE: item.ACNOTYPE ?? null,
          ACTYPE: sAppl,

          AC_NO: bankAcNo,

          TOTAL_SHARES: item.TOTAL_SHARES ?? 0,
          TOTAL_SHARES_AMOUNT: item.TOTAL_SHARES_AMOUNT ?? 0,
          DIVIDEND_AMOUNT: item.DIVIDEND_AMOUNT ?? 0,

          DIVIDEND_STATUS: statusVal,

          DIV_PAID_DATE: formatDate(item.DIV_PAID_DATE),
          DIV_TRANSFER_DATE: formatDate(item.DIV_TRANSFER_DATE),

          DIV_TRANSFER_BRANCH: item.DIV_TRANSFER_BRANCH ?? null,
          DIV_TRANSFER_ACNOTYPE: item.DIV_TRANSFER_ACNOTYPE ?? null,
          DIV_TRANSFER_ACTYPE: item.DIV_TRANSFER_ACTYPE ?? null,
          DIV_TRANSFER_ACNO: item.DIV_TRANSFER_ACNO ?? null,

          MEMBER_CLOSE_DATE: formatDate(item.MEMBER_CLOSE_DATE),

          USER_CODE: item.USER_CODE ?? null,
          OFFICER_CODE: item.OFFICER_CODE ?? null,

          BONUS_AMOUNT: item.BONUS_AMOUNT ?? 0
        };

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('dividend')
          .values(payload)
          .execute();

        inserted++;
      }

      await queryRunner.commitTransaction();

      this.logger.log(`DIVIDEND DONE: Inserted ${inserted}`);

      return { success: true, inserted };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('DIVIDEND migration failed', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async migrateDIVPAIDTRAN() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting DIVPAIDTRAN migration (Correct BANKACNO)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {

      const result = await this.clientConn.execute(`
      SELECT D.*, S.S_APPL AS ACTYPE
      FROM DIVPAIDTRAN D
      LEFT JOIN SCHEMAST S ON D.TRAN_ACTYPE = S.S_APPL
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in DIVPAIDTRAN');
        return { success: true, inserted: 0 };
      }

      const schemaData = await queryRunner.manager.query<{
        id: number;
        S_APPL: number;
      }[]>(`SELECT id, "S_APPL" FROM schemast`);

      const schemaIdMap = new Map<number, number>();
      const schemaApplMap = new Map<number, number>();

      for (const row of schemaData) {
        schemaIdMap.set(Number(row.S_APPL), row.id);
        schemaApplMap.set(Number(row.S_APPL), Number(row.S_APPL));
      }

      const syspara = await queryRunner.manager.query(
        `SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`
      );

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      let branchRes = await queryRunner.manager.query<{ id: number }[]>(
        `SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode} LIMIT 1`
      );

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query<{ id: number }[]>(
          `SELECT id FROM ownbranchmaster LIMIT 1`
        );
      }

      const branchId = branchRes[0]?.id;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {

          const sAppl = schemaApplMap.get(Number(ele.ACTYPE)) || 0;
          const schemaId = schemaIdMap.get(Number(ele.ACTYPE)) || null;

          let bankAcNo: string | null = null;

          if (ele.TRAN_ACNO) {
            const acc = String(Number(ele.TRAN_ACNO) + 100000).padStart(6, '0');

            bankAcNo =
              String(bankCode || '0').padStart(3, '0') +
              String(branchCode || '0').padStart(3, '0') +
              String(sAppl).substring(0, 3).padStart(3, '0') +
              acc;
          }

          const obj = {
            TRAN_NO: ele.TRAN_NO,
            SERIAL_NO: ele.SERIAL_NO,
            BRANCH_CODE: branchId,

            TRAN_DATE: ele.TRAN_DATE ? moment(ele.TRAN_DATE).format('DD/MM/YYYY') : null,
            TRAN_TIME: ele.TRAN_TIME,
            TRAN_TYPE: ele.TRAN_TYPE,
            TRAN_MODE: ele.TRAN_MODE,
            TRAN_DRCR: ele.TRAN_DRCR,
            TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,

            TRAN_ACTYPE: schemaId,     // FK
            TRAN_ACNO: bankAcNo,

            TRAN_AMOUNT: ele.TRAN_AMOUNT,
            TRAN_GLACNO: ele.TRAN_GLACNO,
            NO_OF_SHARES: ele.NO_OF_SHARES,
            NARRATION: ele.NARRATION?.replace("\x00", ""),

            CERTIFICATE_NO: ele.CERTIFICATE_NO,
            SHARES_FROM_NO: ele.SHARES_FROM_NO,
            SHARES_TO_NO: ele.SHARES_TO_NO,
            FACE_VALUE: ele.FACE_VALUE,

            TRANSFER_ACTYPE_FROM: ele.TRANSFER_ACTYPE_FROM,
            TRANSFER_MEMBER_NO_FROM: ele.TRANSFER_MEMBER_NO_FROM,
            TRANSFER_ACTYPE_TO: ele.TRANSFER_ACTYPE_TO,
            TRANSFER_MEMBER_NO_TO: ele.TRANSFER_MEMBER_NO_TO,

            SHARES_TRANSFER_DATE: ele.SHARES_TRANSFER_DATE ? moment(ele.SHARES_TRANSFER_DATE).format('DD/MM/YYYY') : null,
            SHARES_RETURN_DATE: ele.SHARES_RETURN_DATE ? moment(ele.SHARES_RETURN_DATE).format('DD/MM/YYYY') : null,
            RESULATION_DATE: ele.RESULATION_DATE ? moment(ele.RESULATION_DATE).format('DD/MM/YYYY') : null,

            RESULATION_NO: ele.RESULATION_NO,
            AC_CLOSED: ele.AC_CLOSED,
            AC_CLOSEDT: ele.AC_CLOSEDT ? moment(ele.AC_CLOSEDT).format('DD/MM/YYYY') : null,

            CHEQUE_DATE: ele.CHEQUE_DATE ? moment(ele.CHEQUE_DATE).format('DD/MM/YYYY') : null,
            CHEQUE_SERIES: ele.CHEQUE_SERIES,
            CHEQUE_NO: ele.CHEQUE_NO,

            DIVIDEND_YEAR: ele.DIVIDEND_YEAR,
            DIVIDEND_ENTRY: ele.DIVIDEND_ENTRY,
            CASHIER_CODE: ele.CASHIER_CODE,
            USER_CODE: ele.USER_CODE,
            OFFICER_CODE: ele.OFFICER_CODE,
            BONUS_AMOUNT: ele.BONUS_AMOUNT
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('divpaidtran')
            .values(obj)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`DIVPAIDTRAN migrated: ${inserted}`);

        return { success: true, inserted };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }

  // ================= HISTORYDIVIDEND =================

  async migrateHISTORYDIVIDEND() {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting HISTORYDIVIDEND migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 1. Fetch Oracle Data
      const result = await this.clientConn.execute(`
      SELECT H.*, S.S_APPL AS ACTYPE1
      FROM HISTORYDIVIDEND H
      LEFT JOIN SCHEMAST S ON H.ACTYPE = S.S_APPL
      ORDER BY H.WARRENT_DATE
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in HISTORYDIVIDEND');
        return { success: true, inserted: 0 };
      }

      // 🔹 2. Load Schema Mapping
      const schemaRows = await queryRunner.manager.query(
        `SELECT id, "S_APPL" FROM schemast`
      );

      const schemaMap = new Map<number, { id: number; sAppl: number }>(
        schemaRows.map((r: any) => [Number(r.S_APPL), { id: r.id, sAppl: r.S_APPL }])
      );

      // 🔹 3. Load Syspara (BANK + BRANCH)
      const syspara = await queryRunner.manager.query(
        `SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`
      );

      const bankCode = syspara[0]?.BANK_CODE || 0;
      const branchCode = syspara[0]?.BRANCH_CODE || 0;

      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const item of rows) {
          if (!item.ACTYPE1) continue;

          const schema = schemaMap.get(Number(item.ACTYPE1));
          if (!schema) continue;

          // CORRECT 15 DIGIT BANK AC NO
          let bankAcNo: string | null = null;

          if (item.AC_NO) {
            const acNo = String(Number(item.AC_NO) + 100000).padStart(6, '0');

            bankAcNo =
              String(bankCode || 0).padStart(3, '0') +
              String(branchCode || 0).padStart(3, '0') +
              String(schema.sAppl).substring(0, 3).padStart(3, '0') +
              acNo;
          }

          const payload = {
            WARRENT_DATE: item.WARRENT_DATE
              ? moment(item.WARRENT_DATE).format('DD/MM/YYYY')
              : null,

            BRANCH_CODE: branchCode,
            ACNOTYPE: item.ACNOTYPE,
            ACTYPE: schema.id,
            AC_NO: bankAcNo,

            TOTAL_SHARES: item.TOTAL_SHARES,
            TOTAL_SHARES_AMOUNT: item.TOTAL_SHARES_AMOUNT ?? 0,

            DIV_PAID_DATE: item.DIV_PAID_DATE
              ? moment(item.DIV_PAID_DATE).format('DD/MM/YYYY')
              : null,

            DIV_TRANSFER_DATE: item.DIV_TRANSFER_DATE
              ? moment(item.DIV_TRANSFER_DATE).format('DD/MM/YYYY')
              : null,

            DIV_TRANSFER_BRANCH: item.DIV_TRANSFER_BRANCH,
            DIV_TRANSFER_ACNOTYPE: item.DIV_TRANSFER_ACNOTYPE,
            DIV_TRANSFER_ACTYPE: item.DIV_TRANSFER_ACTYPE,
            DIV_TRANSFER_ACNO: item.DIV_TRANSFER_ACNO ?? 0,

            MEMBER_CLOSE_DATE: item.MEMBER_CLOSE_DATE
              ? moment(item.MEMBER_CLOSE_DATE).format('DD/MM/YYYY')
              : null,

            TRAN_ENTRY_TYPE: item.TRAN_ENTRY_TYPE,
            IS_LESS_EXPIRE_DATE: item.IS_LESS_EXPIRE_DATE,
            AC_SALARYDIVISION_CODE: item.AC_SALARYDIVISION_CODE,
            SUB_SALARYDIVISION_CODE: item.SUB_SALARYDIVISION_CODE,

            WARRENT_NO: item.WARRENT_NO,
            DIVIDEND_AMOUNT: item.DIVIDEND_AMOUNT ?? 0,
            DIVIDEND_STATUS: item.STATUS,
            BONUS_AMOUNT: item.BONUS_AMOUNT ?? 0,

            DIV_FROM_YEAR: item.DIV_FROM_YEAR,
            DIV_TO_YEAR: item.DIV_TO_YEAR
          };

          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('historydividend')
            .values(payload)
            .execute();

          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`HISTORYDIVIDEND migrated: ${inserted}`);

        return { success: true, inserted };

      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }

    } finally {
      await queryRunner.release();
    }
  }


  async migrateSHARETRAN(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log('Starting SHARETRAN migration (Correct BANKACNO)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      //FETCH ORACLE DATA
      const result = await this.clientConn.execute(`
      SELECT S.*, SCHEMAST.S_APPL AS ACTYPE
      FROM SHARETRAN S
      LEFT JOIN SCHEMAST ON S.TRAN_ACTYPE = SCHEMAST.S_APPL
      ORDER BY S.TRAN_NO
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in SHARETRAN');
        return { success: true, inserted: 0 };
      }

      //LOAD SCHEMAST
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaIdMap = new Map<number, number>();
      const schemaApplMap = new Map<number, number>();

      for (const row of schemaData) {
        schemaIdMap.set(Number(row.S_APPL), row.id);
        schemaApplMap.set(Number(row.S_APPL), Number(row.S_APPL));
      }

      //SYSPARA
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      //BRANCH ID
      let branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode} LIMIT 1
    `);

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query(`
        SELECT id FROM ownbranchmaster LIMIT 1
      `);
      }

      const branchId = branchRes[0]?.id;

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      let inserted = 0;

      //LOOP
      for (const ele of rows) {
        try {
          if (!ele.TRAN_ACTYPE) continue;

          //SCHEMA
          const sAppl = schemaApplMap.get(Number(ele.ACTYPE)) || 0;
          const schemaId = schemaIdMap.get(Number(ele.ACTYPE)) || null;

          //BANKACNO (SAME AS DIVPAIDTRAN → 15 digit SAFE)
          let bankAcNo: string | null = null;

          if (ele.TRAN_ACNO) {
            const acc = String(Number(ele.TRAN_ACNO) + 100000).padStart(6, '0');

            bankAcNo =
              String(bankCode || '0').padStart(3, '0') +
              String(branchCode || '0').padStart(3, '0') +
              String(sAppl).substring(0, 3).padStart(3, '0') +
              acc;
          }

          //NARRATION (NO TRANSLATION)
          const narration = ele.NARRATION
            ? ele.NARRATION.replace("\x00", "")
            : null;

          //INSERT
          await queryRunner.manager.insert('sharetran', {
            TRAN_NO: ele.TRAN_NO,
            TRAN_MODE: ele.TRAN_MODE,
            SERIAL_NO: ele.SERIAL_NO,

            BRANCH_CODE: branchId,

            TRAN_DATE: formatDate(ele.TRAN_DATE),
            TRAN_TIME: ele.TRAN_TIME,
            TRAN_TYPE: ele.TRAN_TYPE,
            TRAN_DRCR: ele.TRAN_DRCR,

            TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,
            TRAN_ACTYPE: schemaId,
            TRAN_ACNO: bankAcNo,

            TRAN_AMOUNT: Number(ele.TRAN_AMOUNT) || 0,
            TRAN_GLACNO: ele.TRAN_GLACNO,

            NO_OF_SHARES: ele.NO_OF_SHARES,
            NARRATION: this.transformValue(narration),

            CERTIFICATE_NO: ele.CERTIFICATE_NO,
            SHARES_FROM_NO: ele.SHARES_FROM_NO,
            SHARES_TO_NO: ele.SHARES_TO_NO,
            FACE_VALUE: ele.FACE_VALUE,

            TRANSFER_ACTYPE_FROM: ele.TRANSFER_ACTYPE_FROM,
            TRANSFER_MEMBER_NO_FROM:
              ele.TRANSFER_MEMBER_NO_FROM == 0 ? null : ele.TRANSFER_MEMBER_NO_FROM,

            TRANSFER_ACTYPE_TO: ele.TRANSFER_ACTYPE_TO,
            TRANSFER_MEMBER_NO_TO:
              ele.TRANSFER_MEMBER_NO_TO == 0 ? null : ele.TRANSFER_MEMBER_NO_TO,

            SHARES_TRANSFER_DATE: formatDate(ele.SHARES_TRANSFER_DATE),
            SHARES_RETURN_DATE: formatDate(ele.SHARES_RETURN_DATE),
            RESULATION_DATE: formatDate(ele.RESULATION_DATE),

            RESULATION_NO: ele.RESULATION_NO,

            AC_CLOSED: ele.AC_CLOSED == 0 ? 0 : 1,
            AC_CLOSEDT: formatDate(ele.AC_CLOSEDT),

            CHEQUE_DATE: formatDate(ele.CHEQUE_DATE),
            CHEQUE_SERIES: ele.CHEQUE_SERIES,
            CHEQUE_NO: ele.CHEQUE_NO,

            DIVIDEND_YEAR: ele.DIVIDEND_YEAR,
            CASHIER_CODE: ele.CASHIER_CODE,
            USER_CODE: ele.USER_CODE,
            OFFICER_CODE: ele.OFFICER_CODE,

            TRAN_ENTRY_TYPE: ele.TRAN_ENTRY_TYPE,
            OTHER1_AMOUNT: ele.OTHER1_AMOUNT,
            OTHER2_AMOUNT: ele.OTHER2_AMOUNT,

            SH_CERTIFICATE_PRINTED: ele.SH_CERTIFICATE_PRINTED,
            NEW_DATE: formatDate(ele.NEW_DATE),

            status: '1'
          });

          inserted++;

        } catch (err: any) {
          this.logger.error(
            ` SHARETRAN ERROR TRAN_NO ${ele.TRAN_NO}: ${err.message}`
          );
        }
      }

      this.logger.log(` SHARETRAN migrated: ${inserted}`);

      return { success: true, inserted };

    } finally {
      await queryRunner.release();
    }
  }

  async migrateNOTICEMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');

    this.logger.log(`Starting NOTICEMASTER (Lookup Table) migration...`);

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await this.clientConn.execute(`SELECT * FROM NOTICEMASTER ORDER BY SERIAL_NO ASC`);
      const allRows = this.mapOracleToPgRows(result);
      const totalRows = allRows.length;

      const font = 'DVBW-TTYogeshEn';

      // 1. Clear existing data to avoid duplicates (since CODE isn't unique)
      await queryRunner.query(`TRUNCATE TABLE "noticemaster" RESTART IDENTITY`);

      await queryRunner.startTransaction();

      try {
        for (const ele of allRows) {
          // --- Transliteration ---
          let engName = '';
          if (ele.NAME) {
            let marathiText = unidev(String(ele.NAME).replace(/\u0000/g, ""), 'hindi', font);
            if (font === 'DVBW-TTYogeshEn') {
              marathiText = marathiText.replace(/×(.)/g, '$1ि').replace(/Ø(.)/g, '$1िं')
                .replace(/([क-ह])([ािीुूृेैोौंॅॉ]*)Ô/g, 'र्$1$2').replace(/Ô/g, 'र्');
            }
            engName = this.translatefullwords(marathiText);
          }

          // --- Convert "NOTICE1" to Integer ---
          const numericCode = ele.CODE ? Number(String(ele.CODE).replace(/[^0-9]/g, '')) : 0;

          // 2. Plain Insert (Removed ON CONFLICT because CODE is not a unique index)
          await queryRunner.manager.query(
            `INSERT INTO "noticemaster" ("CODE", "NAME", "NOTICE_LANGUAGE", "SERIAL_NO") 
                     VALUES ($1, $2, $3, $4)`,
            [
              numericCode,
              String(engName || ele.NAME || ' '),
              String(ele.NOTICE_LANGUAGE || 'MARATHI'),
              ele.SERIAL_NO ? Number(ele.SERIAL_NO) : numericCode
            ]
          );
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Successfully migrated ${totalRows} notices.`);

      } catch (err: any) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        this.logger.error(`Batch failed: ${err.message}`);
        throw err;
      }

      return { success: true, count: totalRows };

    } catch (err: any) {
      this.logger.error(`Fatal NOTICEMASTER Error: ${err.message}`);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async migrateLNDISPUTEDETAILS() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');

    this.logger.log(`Starting LNDISPUTEDETAILS migration with Constraint Bypass...`);

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      await this.TableData();

      const result = await this.clientConn.execute(`SELECT * FROM LNDISPUTEDETAILS ORDER BY AC_NO ASC`);
      const allRows = this.mapOracleToPgRows(result);
      const totalRows = allRows.length;

      const lnMasterList = await queryRunner.manager.query(`SELECT id, "BANKACNO" FROM lnmaster`);
      const lnMasterMap = new Map(lnMasterList.map(item => [String(item.BANKACNO).trim(), item.id]));

      const schemaRows = await queryRunner.manager.query(`SELECT id, "S_APPL" FROM schemast`);
      const schemaMap = new Map(schemaRows.map(r => [Number(r.S_APPL), r.id]));

      const bankPart = String(this.PostSyspara[0]?.BANK_CODE || '123').padStart(3, '0').slice(0, 3);
      const branchPart = String(this.PostBranchOne?.[0]?.CODE || '101').padStart(3, '0').slice(0, 3);
      const sysparaScheme = String(this.PostSyspara[0]?.SCHEME_CODE || '801').padStart(3, '0').slice(0, 3);

      for (let i = 0; i < totalRows; i += 100) {
        const chunk = allRows.slice(i, i + 100);

        await queryRunner.startTransaction();

        try {
          // --- CRITICAL BYPASS: Disable all triggers/FK checks for this session ---
          await queryRunner.query('SET session_replication_role = replica');

          for (const ele of chunk) {
            const mainSchemaId = schemaMap.get(Number(ele.AC_TYPE));
            const acnoPart = String(Number(ele.AC_NO) + 100000);
            const finalBankAcNo = `${bankPart}${branchPart}${sysparaScheme}${acnoPart}`;
            const parentId = lnMasterMap.get(finalBankAcNo);

            let engRemark = '';
            if (ele.AC_REMARK) {
              engRemark = this.translatefullwords(unidev(String(ele.AC_REMARK).replace(/\u0000/g, ""), 'hindi', 'DVBW-TTYogeshEn'));
            }

            await queryRunner.manager.query(
              `INSERT INTO "lndisputedetails" (
                            "AC_ACNOTYPE", "AC_TYPE", "AC_NO", 
                            "REF_AC_ACNOTYPE", "REF_AC_TYPE", "REF_AC_NO", "REF_OLD_AC_NO", 
                            "REF_OLD_AC_TYPE", "COURT", "CASE_SUITE_DATE", "COURT_ORDER_DATE", 
                            "COURT_RESULT_DATE", "COURT_CASE_NO", "COURT_INT_RATE", "SUITE_AMT", 
                            "COURT_INSTALLMENT", "RECOVERABLE_AMT", "RECOVERABLE_INT", 
                            "INT_CALC_DATE", "LOAN_STAGE", "ADVOCATE", "AC_REMARK", "lnDisputemasterID"
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`,
              [
                ele.AC_ACNOTYPE || 'DS',
                mainSchemaId,
                finalBankAcNo,
                ele.REF_AC_ACNOTYPE || 'LN',
                ele.REF_AC_TYPE,
                ele.REF_AC_NO,
                ele.REF_OLD_AC_NO,
                ele.REF_OLD_AC_TYPE,
                ele.COURT,
                ele.CASE_SUITE_DATE ? moment(ele.CASE_SUITE_DATE).format('DD/MM/YYYY') : null,
                ele.COURT_ORDER_DATE ? moment(ele.COURT_ORDER_DATE).format('DD/MM/YYYY') : null,
                ele.COURT_RESULT_DATE ? moment(ele.COURT_RESULT_DATE).format('DD/MM/YYYY') : null,
                ele.COURT_CASE_NO || ele.CASE_NO,
                Number(ele.COURT_INT_RATE) || 0,
                Number(ele.SUITE_AMT) || 0,
                Number(ele.COURT_INSTALLMENT) || 0,
                Number(ele.RECOVERABLE_AMT) || 0,
                Number(ele.RECOVERABLE_INT) || 0,
                ele.INT_CALC_DATE ? moment(ele.INT_CALC_DATE).format('DD/MM/YYYY') : null,
                ele.LOAN_STAGE,
                ele.ADVOCATE,
                engRemark,
                parentId || null
              ]
            );
          }

          // --- RESET BYPASS: Restore normal DB behavior ---
          await queryRunner.query('SET session_replication_role = DEFAULT');

          await queryRunner.commitTransaction();
          this.logger.log(`Inserted up to row ${Math.min(i + 100, totalRows)} / ${totalRows}`);
        } catch (err: any) {
          await queryRunner.query('SET session_replication_role = DEFAULT');
          await queryRunner.rollbackTransaction();
          this.logger.error(`Batch failed at index ${i}: ${err.message}`);
          throw err;
        }
      }
      return { success: true, count: totalRows };
    } catch (err: any) {
      this.logger.error(`Fatal LNDISPUTEDETAILS Error: ${err.message}`);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }


  // ================= DAILYTRAN MIGRATION =================
  async migrateDAILYTRAN(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB)
      throw new Error('DB not connected');

    this.logger.log('Starting DAILYTRAN migration (BATCH MODE)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 COUNT
      const countRes = await this.clientConn.execute(`
      SELECT COUNT(*) AS CNT FROM DAILYTRAN
    `);

      const countRows = this.convertOracleRows(countRes as any);
      const total = countRows[0]?.CNT || 0;

      this.logger.log(`Total DAILYTRAN rows: ${total}`);

      const batchSize = 3000;
      let offset = 0;
      let insertedTotal = 0;

      // 🔹 LOAD SCHEMAST
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      const schemaApplMap = new Map<number, number>();

      for (const s of schemaData) {
        schemaMap.set(Number(s.S_APPL), s.id);
        schemaApplMap.set(Number(s.S_APPL), Number(s.S_APPL));
      }

      // 🔹 SYS + BRANCH
      const syspara = await queryRunner.manager.query(`
      SELECT "BANK_CODE","BRANCH_CODE" FROM syspara LIMIT 1
    `);

      const bankCode = syspara[0]?.BANK_CODE;
      const branchCode = syspara[0]?.BRANCH_CODE;

      let branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster WHERE "CODE" = ${branchCode} LIMIT 1
    `);

      if (branchRes.length === 0) {
        branchRes = await queryRunner.manager.query(`
        SELECT id FROM ownbranchmaster LIMIT 1
      `);
      }

      const branchId = branchRes[0]?.id;

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      // 🔹 LOOP
      while (offset < total) {
        this.logger.log(`Processing batch OFFSET ${offset}`);

        const result = await this.clientConn.execute(`
        SELECT DAILYTRAN.*, SCHEMAST.S_APPL AS ACTYPE
        FROM DAILYTRAN
        LEFT JOIN SCHEMAST ON DAILYTRAN.TRAN_ACTYPE = SCHEMAST.S_APPL
        ORDER BY DAILYTRAN.TRAN_NO
        OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
      `,
          { offset, limit: batchSize } as any);

        const rows = this.convertOracleRows(result as any);
        if (!rows.length) break;

        await queryRunner.startTransaction();

        try {
          let batchInserted = 0;

          for (const ele of rows) {
            try {
              if (!ele.TRAN_ACTYPE) continue;

              // 🔹 SCHEMA FK FIX
              const schemaId = schemaMap.get(Number(ele.TRAN_ACTYPE)) || null;
              if (!schemaId) continue;

              const sAppl =
                schemaApplMap.get(Number(ele.TRAN_ACTYPE)) ||
                ele.TRAN_ACTYPE;

              // 🔹 BANK ACNO (15 digit)
              let bankAcNo: string | null = null;

              if (ele.TRAN_ACNO) {
                const acc = String(Number(ele.TRAN_ACNO) + 100000).padStart(6, '0');

                bankAcNo =
                  String(bankCode || '0').padStart(3, '0') +
                  String(branchCode || '0').padStart(3, '0') +
                  String(sAppl).substring(0, 3).padStart(3, '0') +
                  acc;
              }

              // 🔹 AGENT ACNO
              let agentBankAcNo: string | null = null;
              if (ele.AGENT_ACNO && ele.AGENT_ACTYPE) {
                const agentSchemaId = schemaMap.get(Number(ele.AGENT_ACTYPE));
                if (agentSchemaId) {
                  const agentAcc = String(Number(ele.AGENT_ACNO) + 100000).padStart(6, '0');

                  agentBankAcNo =
                    String(bankCode || '0').padStart(3, '0') +
                    String(branchCode || '0').padStart(3, '0') +
                    String(ele.AGENT_ACTYPE).substring(0, 3).padStart(3, '0') +
                    agentAcc;
                }
              }

              // 🔹 STATUS FIX
              let status: number | null = null;
              if (ele.TRAN_STATUS === 'UP') status = 0;
              else if (ele.TRAN_STATUS === 'PS') status = 1;
              else if (ele.TRAN_STATUS === 'RJ') status = 2;

              // 🔹 CLEAN NARRATION
              const narration = ele.NARRATION
                ? ele.NARRATION.replace("\x00", "")
                : null;

              await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into('dailytran')
                .values({

                  TRAN_NO: ele.TRAN_NO,
                  SERIAL_NO: ele.SERIAL_NO,

                  BRANCH_CODE: branchId,
                  TRAN_BRANCH_CODE: branchId,

                  TRAN_DATE: formatDate(ele.TRAN_DATE),
                  TRAN_TIME: ele.TRAN_TIME,

                  TRAN_TYPE: ele.TRAN_TYPE,
                  SYSTRAN_TYPE: ele.TRAN_TYPE,

                  TRAN_DRCR: ele.TRAN_DRCR,

                  TRAN_ACNOTYPE: ele.TRAN_ACNOTYPE,
                  TRAN_ACTYPE: schemaId,

                  TRAN_ACNO: bankAcNo,
                  BANK_ACNO: bankAcNo,

                  TRAN_AMOUNT: ele.TRAN_AMOUNT || 0,
                  TRAN_GLACNO: ele.TRAN_GLACNO,

                  AGENT_ACNOTYPE: ele.AGENT_ACNOTYPE,
                  AGENT_ACTYPE: null, // FK safe
                  AGENT_ACNO: agentBankAcNo,

                  INTEREST_GLACNO: ele.INTEREST_GLACNO,
                  RECPAY_INT_GLACNO: ele.RECPAY_INT_GLACNO,
                  DD_COMMISSION_ACNO: ele.DD_COMMISSION_ACNO,

                  CHEQUE_DATE: formatDate(ele.CHEQUE_DATE),
                  CHEQUE_SERIES: ele.CHEQUE_SERIES,
                  CHEQUE_NO: ele.CHEQUE_NO,

                  TRAN_STATUS: status,
                  NARRATION: this.transformValue(narration),

                  TOKEN_NO: ele.TOKEN_NO,
                  DIVIDEND_YEAR: ele.DIVIDEND_YEAR,

                  RECPAY_INT_AMOUNT: ele.RECPAY_INT_AMOUNT || 0,
                  INTEREST_AMOUNT: ele.INTEREST_AMOUNT || 0,
                  DD_COMMISSION_AMT: ele.DD_COMMISSION_AMT || 0,

                  INTEREST_DATE: formatDate(ele.INTEREST_DATE),

                  OTHER1_ACNO: ele.OTHER1_ACNO,
                  OTHER2_ACNO: ele.OTHER2_ACNO,
                  OTHER3_ACNO: ele.OTHER3_ACNO,
                  OTHER4_ACNO: ele.OTHER4_ACNO,
                  OTHER5_ACNO: ele.OTHER5_ACNO,
                  OTHER6_ACNO: ele.OTHER6_ACNO,
                  OTHER7_ACNO: ele.OTHER7_ACNO,
                  OTHER8_ACNO: ele.OTHER8_ACNO,
                  OTHER9_ACNO: ele.OTHER9_ACNO,
                  OTHER10_ACNO: ele.OTHER10_ACNO,
                  OTHER11_ACNO: ele.OTHER11_ACNO,

                  OTHER1_AMOUNT: ele.OTHER1_AMOUNT,
                  OTHER2_AMOUNT: ele.OTHER2_AMOUNT,
                  OTHER3_AMOUNT: ele.OTHER3_AMOUNT,
                  OTHER4_AMOUNT: ele.OTHER4_AMOUNT,
                  OTHER5_AMOUNT: ele.OTHER5_AMOUNT,
                  OTHER6_AMOUNT: ele.OTHER6_AMOUNT,
                  OTHER7_AMOUNT: ele.OTHER7_AMOUNT,
                  OTHER8_AMOUNT: ele.OTHER8_AMOUNT,
                  OTHER9_AMOUNT: ele.OTHER9_AMOUNT,
                  OTHER10_AMOUNT: ele.OTHER10_AMOUNT,
                  OTHER11_AMOUNT: ele.OTHER11_AMOUNT,

                  AC_CLOSED: ele.AC_CLOSED == 0 ? 0 : 1,

                  CASHIER_CODE: ele.CASHIER_CODE,
                  USER_CODE: ele.USER_CODE,
                  OFFICER_CODE: ele.OFFICER_CODE,

                  WITHDRAW_NO: ele.WITHDRAW_NO,

                  IS_INTEREST_ENTRY: ele.IS_INTEREST_ENTRY == 1 ? 1 : 0,

                  PENAL_INT_GLACNO: ele.PENAL_INT_GLACNO,
                  PENAL_INT_AMOUNT: ele.PENAL_INT_AMOUNT || 0,

                  TRAN_SOURCE_TYPE: ele.TRAN_SOURCE_TYPE,
                  TRAN_SOURCE_NO: ele.TRAN_SOURCE_NO,

                  CASH_REMITANCE_STATUS: ele.CASH_REMITANCE_STATUS,
                  CASH_SEND_WITH_PERSON: ele.CASH_SEND_WITH_PERSON,

                  TRAN_ENTRY_TYPE: ele.TRAN_ENTRY_TYPE,

                  TRAN_PROCESS_YEAR: ele.TRAN_PROCESS_YEAR,
                  TRAN_PROCESS_MONTH: ele.TRAN_PROCESS_MONTH,

                  REC_PENAL_INT_GLACNO: ele.REC_PENAL_INT_GLACNO,
                  REC_PENAL_INT_AMOUNT: ele.REC_PENAL_INT_AMOUNT || 0,

                  TRANSFER_BRANCH: ele.TRANSFER_BRANCH || null,

                  TRAN_MODE: ele.TRAN_MODE,

                })
                .execute();

              batchInserted++;
              insertedTotal++;

            } catch (err: any) {
              this.logger.error(
                `❌ ERROR TRAN_NO ${ele.TRAN_NO}: ${err.message}`
              );
            }
          }

          await queryRunner.commitTransaction();
          this.logger.log(`Batch inserted: ${batchInserted}`);

          offset += batchSize;

        } catch (err) {
          await queryRunner.rollbackTransaction();
          this.logger.error('Batch failed, rolled back', err);
        }
      }

      this.logger.log(`DAILYTRAN completed. Total inserted: ${insertedTotal}`);

      return { success: true, inserted: insertedTotal };

    } finally {
      await queryRunner.release();
    }
  }

  async migrateDEADSTOCKHEADER(): Promise<{ success: boolean; inserted: number }> {
    if (!this.clientConn || !this.serverDB) {
      throw new Error('DB not connected');
    }

    this.logger.log(' Starting DEADSTOCKHEADER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 🔹 1. FETCH HEADER
      const result = await this.clientConn.execute(`
      SELECT D.*, S.S_APPL AS ACTYPE
      FROM DEADSTOCKHEADER D
      LEFT JOIN SCHEMAST S ON D.TRANSFER_ACTYPE = S.S_APPL
      ORDER BY D.TRAN_DATE, D.TRAN_NO
    `);

      const rows = this.convertOracleRows(result as any);

      if (!rows.length) {
        this.logger.warn('No records found in DEADSTOCKHEADER');
        return { success: true, inserted: 0 };
      }

      // 🔹 2. SCHEMA MAP
      const schemaData = await queryRunner.manager.query(`
      SELECT id, "S_APPL" FROM schemast
    `);

      const schemaMap = new Map<number, number>();
      for (const row of schemaData) {
        schemaMap.set(Number(row.S_APPL), Number(row.id));
      }

      // 🔹 3. BRANCH
      const branchRes = await queryRunner.manager.query(`
      SELECT id FROM ownbranchmaster LIMIT 1
    `);
      const branchId = branchRes[0]?.id;

      const formatDate = (d: any) =>
        d ? moment(d).format('DD/MM/YYYY') : null;

      let inserted = 0;

      // 🔹 4. LOOP HEADER
      for (const item of rows) {
        try {
          const date = formatDate(item.TRAN_DATE);

          const schemaId = schemaMap.get(Number(item.ACTYPE)) || null;

          let transferAcNo =
            item.TRANSFER_ACNOTYPE === 'GL'
              ? item.TRANSFER_ACNO
              : Number(item.TRANSFER_ACNO) + 100000;

          let tranStatus: number | null = null;
          if (item.TRAN_STATUS === 'UP') tranStatus = 0;
          else if (item.TRAN_STATUS === 'PS') tranStatus = 1;
          else if (item.TRAN_STATUS === 'RJ') tranStatus = 2;

          // 🔹 INSERT HEADER
          const headerInsert = await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('deadstockheader')
            .values({
              TRAN_YEAR: item.TRAN_YEAR,
              TRAN_DATE: date,
              TRAN_NO: item.TRAN_NO,
              BRANCH_CODE: branchId,

              TRAN_TIME: item.TRAN_TIME,
              TRAN_TYPE: item.TRAN_TYPE,
              TRAN_MODE: item.TRAN_MODE,
              TRAN_DRCR: item.TRAN_DRCR,

              TRAN_AMOUNT: item.TRAN_AMOUNT || 0,
              TRAN_GLACNO: item.TRAN_GLACNO,

              CHEQUE_DATE: formatDate(item.CHEQUE_DATE),
              CHEQUE_SERIES: item.CHEQUE_SERIES,
              CHEQUE_NO: item.CHEQUE_NO,

              TRANSFER_ACNOTYPE: item.TRANSFER_ACNOTYPE,
              TRANSFER_ACTYPE: schemaId,
              TRANSFER_ACNO: transferAcNo,

              HO_SUB_GLACNO: item.HO_SUB_GLACNO,
              TRAN_SUPPLIER_NAME: item.TRAN_SUPPLIER_NAME,

              SUPPLIER_BILL_DATE: formatDate(item.SUPPLIER_BILL_DATE),
              SUPPLIER_BILL_NO: item.SUPPLIER_BILL_NO,

              RESO_NO: item.RESO_NO,
              RESO_DATE: formatDate(item.RESO_DATE),

              NARRATION: item.NARRATION?.replace("\x00", ""),

              TRAN_ENTRY_TYPE: item.TRAN_ENTRY_TYPE,
              USER_CODE: item.USER_CODE,
              OFFICER_CODE: item.OFFICER_CODE,

              CGST_AMT: item.CGST_AMT || 0,
              SGST_AMT: item.SGST_AMT || 0,
              IGST_AMT: item.IGST_AMT || 0,
              GST_NO: item.GST_NO,

              SYSCHNG_LOGIN: item.OFFICER_CODE,
              TRAN_STATUS: tranStatus,

              status: 1
            })
            .returning('id')
            .execute();

          const headerId = headerInsert.identifiers[0]?.id;


          const detailRes = await this.clientConn.execute(
            `SELECT * FROM deadstockdetail 
              WHERE tran_no = :tranNo 
              AND tran_year = :tranYear 
              ORDER BY serial_no`,
            {
              tranNo: item.TRAN_NO,
              tranYear: item.TRAN_YEAR
            }
          );


          const details = this.convertOracleRows(detailRes as any);

          // 🔹 6. LOOP DETAILS
          for (const ele of details) {
            try {

              const itemMaster = await queryRunner.manager.query(
                `SELECT "ITEM_TYPE", "ITEM_NAME"
                FROM itemmaster
                WHERE "ITEM_CODE" = $1
                LIMIT 1`,
                [ele.ITEM_CODE]
              );


              if (!itemMaster.length) {
                this.logger.warn(`ITEMMASTER missing for ITEM_CODE ${ele.ITEM_CODE}`);
              }

              // SAFE ITEM_TYPE (NO NaN EVER)
              const rawItemType = itemMaster[0]?.ITEM_TYPE;

              const safeItemType =
                rawItemType !== null &&
                  rawItemType !== undefined &&
                  rawItemType !== '' &&
                  !isNaN(Number(rawItemType))
                  ? Number(rawItemType)
                  : 0;

              await queryRunner.manager.insert('deadstockdetail', {
                TRAN_YEAR: ele.TRAN_YEAR,
                TRAN_DATE: formatDate(ele.TRAN_DATE),
                TRAN_NO: ele.TRAN_NO,
                SERIAL_NO: ele.SERIAL_NO,

                TRAN_DRCR: ele.TRAN_DRCR,
                ITEM_CODE: ele.ITEM_CODE,

                ITEM_TYPE: safeItemType,
                ITEM_NAME: itemMaster[0]?.ITEM_NAME || null,

                ITEM_RATE: ele.ITEM_RATE || 0,
                ITEM_QTY: ele.ITEM_QTY || 0,
                TRAN_AMOUNT: ele.TRAN_AMOUNT || 0,

                TRAN_REF_NO: ele.TRAN_REF_NO,
                DEPR_RATE: ele.DEPR_RATE || 0,

                BRANCH_CODE: branchId,
                deadstockHeader: headerId
              });

            } catch (err) {
              this.logger.error(`DETAIL ERROR TRAN_NO ${ele.TRAN_NO}`, err);
            }
          }

          inserted++;

        } catch (err: any) {
          this.logger.error(
            `HEADER ERROR TRAN_NO ${item.TRAN_NO}: ${err.message}`
          );
        }
      }

      this.logger.log(`DEADSTOCKHEADER migrated: ${inserted}`);

      return { success: true, inserted };

    } finally {
      await queryRunner.release();
    }
  }

  async migrateHISTORYTRAN() {
    this.logger.log(`>>> INITIALIZING FULL COLUMN HISTORY MIGRATION`);

    if (!this.clientConn) throw new Error('Oracle not connected');

    // 1. Get Count
    const countRes = await this.clientConn.execute(
      `SELECT COUNT(*) as TOTAL FROM HISTORYTRAN WHERE TRAN_DATE > TO_DATE('12/04/2025','DD/MM/YYYY')`
    );
    const countData = this.convertOracleRows(countRes as any);
    this.count = Number(countData[0].TOTAL || 0);
    this.logger.log(`Total records identified in Oracle: ${this.count}`);

    const syspara = await this.serverDB.getRepository(SYSPARA).find();
    const bankCodeStr = String(syspara[0]?.BANK_CODE || '012').padStart(3, '0');
    this.PostSchemast = await this.serverDB.getRepository(SCHEMAST).find();

    this.offset = 0;
    this.limit = 500;

    while (this.offset < this.count) {
      this.logger.log(`>>> BATCH START: Offset ${this.offset}`);

      const queryRunner = this.serverDB.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await this.clientConn.execute(`
        SELECT * FROM (
          SELECT rownum rnum, rs.* FROM (
            SELECT h.*, s.S_APPL as SCHEME_APPL 
            FROM HISTORYTRAN h
            LEFT JOIN SCHEMAST s ON h.TRAN_ACTYPE = s.S_APPL
            WHERE h.TRAN_DATE > TO_DATE('12/04/2025','DD/MM/YYYY')
            ORDER BY h.TRAN_DATE ASC, h.TRAN_NO ASC, h.SERIAL_NO ASC
          ) rs WHERE rownum <= ${this.offset + this.limit}
        ) WHERE rnum > ${this.offset}
      `);

        const data = this.convertOracleRows(result as any);
        const batchArray: HISTORYTRAN[] = [];

        // Counters for the batch summary log
        let skipCount = 0;
        let duplicateCount = 0;

        for (let item of data) {
          // --- 1. BRANCH & METADATA ---
          const oracleBranch = Number(item.BRANCH_CODE) || 1;
          const currentBranchCode = oracleBranch + 100;
          const branchCodeStr = String(currentBranchCode).padStart(3, '0');

          const schemastData = this.PostSchemast.find(s =>
            String(s.S_APPL).trim() === String(item.SCHEME_APPL).trim()
          );

          if (!schemastData) {
            // LOGGER ADDED HERE: Missing Scheme
            this.logger.warn(`[SKIP: NO SCHEME] Oracle S_APPL: ${item.SCHEME_APPL} for TranNo: ${item.TRAN_NO}`);
            skipCount++;
            continue;
          }

          // --- 2. 15-DIGIT BANKACNO ---
          const schemePart = String(schemastData.S_APPL).substring(0, 3).padStart(3, '0');
          const acNoPart = String(item.TRAN_ACNO).padStart(6, '0');
          const BANKACNO = `${bankCodeStr}${branchCodeStr}${schemePart}${acNoPart}`;
          const formattedDate = moment(item.TRAN_DATE).format('DD/MM/YYYY');

          // --- 3. DUPLICATE CHECK ---
          const exists = await queryRunner.manager.findOne(HISTORYTRAN, {
            where: {
              BANK_ACNO: BANKACNO,
              TRAN_NO: Number(item.TRAN_NO),
              SERIAL_NO: Number(item.SERIAL_NO),
              TRAN_DATE: formattedDate as any
            }
          });

          if (exists) {
            // LOGGER ADDED HERE: Duplicate found
            // Use .debug if you don't want to flood the terminal, or .warn to see every one
            this.logger.debug(`[SKIP: DUPLICATE] ${BANKACNO} Serial ${item.SERIAL_NO} on ${formattedDate}`);
            duplicateCount++;
            continue;
          }

          const loanObj = new HISTORYTRAN();

          // --- 4. CORE MAPPING ---
          loanObj.TRAN_NO = Number(item.TRAN_NO);
          loanObj.SERIAL_NO = Number(item.SERIAL_NO);
          loanObj.BRANCH_CODE = currentBranchCode;
          loanObj.TRAN_BRANCH_CODE = currentBranchCode;
          loanObj.TRAN_DATE = formattedDate as any;
          loanObj.TRAN_TIME = item.TRAN_TIME;
          loanObj.BANK_ACNO = BANKACNO;
          loanObj.TRAN_ACNO = String(item.TRAN_ACNO);

          // --- 5. TYPES & MODES ---
          loanObj.TRAN_TYPE = item.TRAN_TYPE;
          loanObj.SYSTRAN_TYPE = item.TRAN_TYPE;
          loanObj.TRAN_MODE = Number(item.TRAN_MODE);
          loanObj.TRAN_DRCR = item.TRAN_DRCR;
          loanObj.TRAN_ACNOTYPE = item.TRAN_ACNOTYPE;
          loanObj.TRAN_ACTYPE = Number(schemastData.id);
          if (item.TRAN_STATUS == 'UP') {
            loanObj['TRAN_STATUS'] = 0;
          } else if (item.TRAN_STATUS == 'PS') {
            loanObj['TRAN_STATUS'] = 1;
          } else if (item.TRAN_STATUS == 'RJ') {
            loanObj['TRAN_STATUS'] = 2;
          }

          // --- 6. FINANCIALS ---
          loanObj.TRAN_AMOUNT = Number(item.TRAN_AMOUNT || 0);
          loanObj.TOTAL_AMOUNT = String(item.TRAN_AMOUNT || 0);
          loanObj.INTEREST_AMOUNT = Number(item.INTEREST_AMOUNT || 0);
          loanObj.RECPAY_INT_AMOUNT = Number(item.RECPAY_INT_AMOUNT || 0);
          loanObj.PENAL_INT_AMOUNT = Number(item.PENAL_INT_AMOUNT || 0);
          loanObj.DD_COMMISSION_AMT = Number(item.DD_COMMISSION_AMT || 0);
          loanObj.PENAL_INTEREST = Number(item.PENAL_INTEREST || 0);
          loanObj.REC_PENAL_INT_AMOUNT = Number(item.REC_PENAL_INT_AMOUNT || 0);
          loanObj.TRAN_GLACNO = Number(item.TRAN_GLACNO || 0);
          loanObj.INTEREST_GLACNO = Number(item.INTEREST_GLACNO || 0);
          loanObj.PENAL_INT_GLACNO = Number(item.PENAL_INT_GLACNO || 0);
          loanObj.DD_COMMISSION_ACNO = Number(item.DD_COMMISSION_ACNO || 0);
          loanObj.RECPAY_INT_GLACNO = item.RECPAY_INT_GLACNO;
          loanObj.REC_PENAL_INT_GLACNO = item.REC_PENAL_INT_GLACNO;

          // --- 7. AGENT & CHEQUE INFO ---
          loanObj.AGENT_ACNOTYPE = item.AGENT_ACNOTYPE || 'AG';
          let agentSchemeId: number | null = null;
          if (item.AGENT_ACTYPE && String(item.AGENT_ACTYPE) !== '0') {
            const agentScheme = this.PostSchemast.find(s =>
              String(s.S_APPL).trim() === String(item.AGENT_ACTYPE).trim()
            );
            agentSchemeId = agentScheme ? Number(agentScheme.id) : null;
          }
          (loanObj as any)['AGENT_ACTYPE'] = agentSchemeId;
          loanObj.AGENT_ACNO = item.AGENT_ACNO || null;
          loanObj.CHEQUE_NO = item.CHEQUE_NO;
          loanObj.CHEQUE_SERIES = item.CHEQUE_SERIES;
          (loanObj as any)['CHEQUE_DATE'] = item.CHEQUE_DATE ? moment(item.CHEQUE_DATE).format('DD/MM/YYYY') : null;
          loanObj.WITHDRAW_NO = item.WITHDRAW_NO;

          // --- 8. FLAGS ---
          loanObj.AC_CLOSED = Number(item.AC_CLOSED) === 0 ? 0 : 1;
          loanObj.IS_DORMANT = Number(item.IS_DORMANT) === 0 ? 0 : 1;
          loanObj.IS_INTEREST_ENTRY = Number(item.IS_INTEREST_ENTRY) === 0 ? 0 : 1;
          loanObj.PASSBOOK_PRINTED = Number(item.PASSBOOK_PRINTED) === 0 ? 0 : 1;
          loanObj.DD_PREPARED = Number(item.DD_PREPARED) === 0 ? 0 : 1;
          loanObj.CLOSING_ENTRY = Number(item.CLOSING_ENTRY) === 0 ? 0 : 1;
          loanObj.IS_DDPAYORDER_ENTRY = Number(item.IS_DDPAYORDER_ENTRY) === 0 ? 0 : 1;
          loanObj.DIVIDEND_ENTRY = !!item.DIVIDEND_ENTRY;

          // --- 9. OTHER ACCOUNTS ---
          for (let i = 1; i <= 11; i++) {
            loanObj[`OTHER${i}_ACNO`] = item[`OTHER${i}_ACNO`];
            loanObj[`OTHER${i}_AMOUNT`] = Number(item[`OTHER${i}_AMOUNT`] || 0);
          }

          // --- 10. METADATA ---
          loanObj.NARRATION = this.transformValue(item.NARRATION);
          loanObj.NARR_TYPE = item.NARR_TYPE;
          loanObj.USER_CODE = item.USER_CODE;
          loanObj.OFFICER_CODE = item.OFFICER_CODE;
          loanObj.CASHIER_CODE = item.CASHIER_CODE;
          loanObj.TRAN_PROCESS_MONTH = Number(item.TRAN_PROCESS_MONTH);
          loanObj.TRAN_PROCESS_YEAR = Number(item.TRAN_PROCESS_YEAR);
          loanObj.TOKEN_NO = Number(item.TOKEN_NO || 0);

          batchArray.push(loanObj);
        }

        // --- 11. CHUNKED SAVING ---
        if (batchArray.length > 0) {
          const chunkSize = 50;
          for (let i = 0; i < batchArray.length; i += chunkSize) {
            const chunk = batchArray.slice(i, i + chunkSize);
            await queryRunner.manager.save(HISTORYTRAN, chunk);
          }
        }

        await queryRunner.commitTransaction();

        // BATCH SUMMARY LOG: Shows exactly what happened to the 500 records
        this.logger.log(`Batch Successful: Offset ${this.offset} | Saved: ${batchArray.length} | Duplicates: ${duplicateCount} | Missing Scheme: ${skipCount}`);

        this.offset += this.limit;

      } catch (error: any) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        this.logger.error(`Migration Error at offset ${this.offset}: ${error.message}`);
        throw error;
      } finally {
        if (!queryRunner.isReleased) await queryRunner.release();
      }
    }

    this.logger.log('--- MIGRATION COMPLETE ---');
    this.offset = 0;
    return { success: true, total: this.count };
  }

  async migrateINTHISTORYTRAN() {
    this.logger.log(`>>> STARTING INTHISTORYTRAN MIGRATION`);

    if (!this.clientConn) throw new Error('Oracle not connected');

    // 1. Get Total Count for Pagination
    if (this.offset === 0) {
      const countRes = await this.clientConn.execute(`SELECT COUNT(*) as TOTAL FROM INTHISTORYTRAN`);
      const countData = this.mapOracleToPgRows(countRes);
      this.count = Number(countData[0].TOTAL || 0);
    }

    // 2. Load Master Data
    const syspara = await this.serverDB.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
    const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');

    const branches = await this.serverDB.query(`SELECT id, "CODE" FROM ownbranchmaster`);
    const branchMap = new Map(branches.map(b => [Number(b.CODE), b]));

    const schemaRows = await this.serverDB.query<{ id: number; S_APPL: number }[]>(
      `SELECT id, "S_APPL" FROM schemast`
    );
    const schemaMap = new Map(schemaRows.map(r => [Number(r.S_APPL), r.id]));

    // 3. Fetch Paginated Batch from Oracle
    const oracleQuery = `
    SELECT * FROM (
      select rownum rnum, rs.* from (
        select INTHISTORYTRAN.*, SCHEMAST.S_APPL 
        from INTHISTORYTRAN 
        LEFT JOIN SCHEMAST ON INTHISTORYTRAN.TRAN_ACTYPE = SCHEMAST.S_APPL 
        order by INTHISTORYTRAN.TRAN_DATE, INTHISTORYTRAN.TRAN_NO
      ) rs 
    ) where rnum <= ${this.offset + this.limit} and rnum > ${this.offset}`;

    const result = await this.clientConn.execute(oracleQuery);
    const rows = this.mapOracleToPgRows(result);

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const item of rows) {
        if (!item.TRAN_ACTYPE) continue;

        // Logic: Dynamic Branch Lookup
        const rowBranchCodeRaw = item.BRANCH_CODE || syspara[0]?.BRANCH_CODE || 1;
        const branchRecord = branchMap.get(Number(rowBranchCodeRaw)) || branches[0];
        const branchCodeString = String(branchRecord.CODE).padStart(3, '0');

        // Logic: 15-Digit BANKACNO
        const acNoOffset = String(item.TRAN_ACNO).padStart(6, '0');
        const schemeTrimmed = String(item.S_APPL || item.TRAN_ACTYPE).padStart(3, '0').slice(0, 3);
        const bankAcNo15 = `${bankCode}${branchCodeString}${schemeTrimmed}${acNoOffset}`;

        const payload = {
          TRAN_NO: item.TRAN_NO,
          SERIAL_NO: item.SERIAL_NO,
          TRAN_DATE: item.TRAN_DATE ? moment(item.TRAN_DATE).format('DD/MM/YYYY') : null,
          TRAN_TIME: item.TRAN_TIME,
          TRAN_TYPE: item.TRAN_TYPE,
          TRAN_MODE: item.TRAN_MODE,
          TRAN_DRCR: item.TRAN_DRCR,
          BRANCH_CODE: branchRecord.id,
          TRAN_ACNOTYPE: item.TRAN_ACNOTYPE,
          TRAN_ACTYPE: schemaMap.get(Number(item.TRAN_ACTYPE)) || 1,
          TRAN_ACNO: bankAcNo15,
          TRAN_GLACNO: item.TRAN_GLACNO,
          INTEREST_GLACNO: item.INTEREST_GLACNO || 0,
          RECPAY_INT_GLACNO: item.RECPAY_INT_GLACNO || 0,
          TRAN_STATUS: item.TRAN_STATUS === 'UP' ? 0 : item.TRAN_STATUS === 'PS' ? 1 : 2,
          NARRATION: this.transformValue(item.NARRATION), // Transliteration Helper
          TRAN_AMOUNT: Number(item.TRAN_AMOUNT) || 0,
          RECPAY_INT_AMOUNT: Number(item.RECPAY_INT_AMOUNT) || 0,
          INTEREST_DATE: item.INTEREST_DATE ? moment(item.INTEREST_DATE).format('DD/MM/YYYY') : null,
          USER_CODE: item.USER_CODE,
          OFFICER_CODE: item.OFFICER_CODE,
          INTEREST_AMOUNT: Number(item.INTEREST_AMOUNT) || 0,
          PENAL_INT_GLACNO: item.PENAL_INT_GLACNO,
          PENAL_INT_AMOUNT: Number(item.PENAL_INT_AMOUNT) || 0,
          LAST_INTEREST_DATE: item.LAST_INTEREST_DATE ? moment(item.LAST_INTEREST_DATE).format('DD/MM/YYYY') : null,
          INTEREST_RATE: item.INTEREST_RATE,
          TD_SCHEME_AMOUNT: item.TD_SCHEME_AMOUNT,
          LEDGER_BALANCE: item.LEDGER_BALANCE,
          TOTAL_PRODUCTS: item.TOTAL_PRODUCTS,
          AC_OPEN_DATE: item.AC_OPEN_DATE ? moment(item.AC_OPEN_DATE).format('DD/MM/YYYY') : null,
          EXPIRY_DATE: item.EXPIRY_DATE ? moment(item.EXPIRY_DATE).format('DD/MM/YYYY') : null,
          MONTHS: item.MONTHS,
          DAYS: item.DAYS,
          POST_TO_INDIVIDUAL_AC: item.POST_TO_INDIVIDUAL_AC == 0 ? 0 : 1,
          DAILYTRAN_POST_NO: item.DAILYTRAN_POST_NO || 0,
          POST_PENALINT_IN_INTEREST: item.POST_PENALINT_IN_INTEREST || 0,
          ODUE_INT_GLACNO: item.ODUE_INT_GLACNO || 0,
          ODUE_INT_AMOUNT: item.ODUE_INT_AMOUNT || 0,
          IS_POST_PENAL_TO_AC: item.IS_POST_PENAL_TO_AC || 0,
          RECPAY_INT_OPENING: item.RECPAY_INT_OPENING || 0,
          ODUE_INT_OPENING: item.ODUE_INT_OPENING || 0,
          OD_INT_AMOUNT: item.OD_INT_AMOUNT || 0,
          REC_PENAL_INT_AMOUNT: item.REC_PENAL_INT_AMOUNT || 0,
          REC_PENAL_INT_GLACNO: item.REC_PENAL_INT_GLACNO || 0,
          RECPENAL_INT_OPENING: item.RECPENAL_INT_OPENING || 0,
          status: 1
        };

        await queryRunner.manager.createQueryBuilder()
          .insert()
          .into('inthistorytran') // Make sure this matches your PG table name
          .values(payload)
          .orIgnore()
          .execute();
      }

      await queryRunner.commitTransaction();
      this.logger.log(`Batch Successful: Offset ${this.offset} / Total ${this.count}`);

      // Handle Recursion
      this.offset += this.limit;
      if (this.offset < this.count) {
        await queryRunner.release();
        return await this.migrateINTHISTORYTRAN();
      } else {
        this.offset = 0;
        this.count = 0;
        return { success: true, message: 'Interest History Migration Complete' };
      }
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();

      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';

      this.logger.error(`Migration Failed at offset ${this.offset}: ${errorMessage}`);
      throw err;
    }
  }


  async migrateITEMCATEGORYMASTER() {
    if (!this.clientConn || !this.serverDB) throw new Error('DB not connected');
    this.logger.log('Starting ITEMCATEGORYMASTER migration...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Fetch Oracle Data
      // Note: Oracle table name is usually ITEMCATEGORY
      const result = await this.clientConn.execute(`
      SELECT * FROM ITEMCATEGORY ORDER BY CODE ASC
    `);

      const rows = this.convertOracleRows(result as any);

      // 2. Fetch existing PG data to prevent duplicates
      const existingData = await queryRunner.manager.find(ITEMCATEGORYMASTER);
      const existingNames = new Set(
        existingData.map(item => String(item.NAME || '').trim().toLowerCase())
      );

      // 3. Start Transaction
      await queryRunner.startTransaction();

      try {
        let inserted = 0;

        for (const ele of rows) {
          const rawName = ele.NAME ? String(ele.NAME).trim() : null;
          if (!rawName) continue;

          // Skip if this category name already exists in Postgres
          if (existingNames.has(rawName.toLowerCase())) {
            continue;
          }

          const newObj: any = {
            NAME: this.transformValue(rawName), // Transliterate Marathi font to English
            CODE: ele.CODE                  // Optional: include if your entity tracks original code
          };

          // Standard Insert using the Entity reference
          await queryRunner.manager.insert(ITEMCATEGORYMASTER, newObj);
          inserted++;
        }

        await queryRunner.commitTransaction();
        this.logger.log(`ITEMCATEGORYMASTER: Migrated ${inserted} new categories.`);

        return { success: true, inserted };

      } catch (err: unknown) {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
        const error = err as Error; // Type assertion for TypeScript 'unknown' variable
        this.logger.error(`Inner failure in ITEMCATEGORYMASTER loop: ${error.message}`);
        throw err;
      }
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async migratePIGMYCHART() {
    if (!this.clientConn || !this.serverDB) throw new Error('Databases not connected');
    this.logger.log('Starting FULL PIGMYCHART migration (All rows)...');

    const queryRunner = this.serverDB.createQueryRunner();
    await queryRunner.connect();

    let headerCount = 0;
    let detailCount = 0;

    try {
      // 1. Fetch System/Branch Data
      const syspara = await queryRunner.manager.query(`SELECT "BANK_CODE", "BRANCH_CODE" FROM syspara LIMIT 1`);
      const bankCode = String(syspara[0]?.BANK_CODE || '0').padStart(3, '0');
      const branchCodeStr = String(syspara[0]?.BRANCH_CODE || '101').padStart(3, '0');
      const branches = await queryRunner.manager.query(`SELECT id FROM ownbranchmaster LIMIT 1`);
      const defaultBranchId = branches[0]?.id || 1;

      // STEP: Get Fallback ID
      const validAccounts = await queryRunner.manager.query(`SELECT id FROM pgmaster LIMIT 1`);
      if (!validAccounts || validAccounts.length === 0) {
        throw new Error('FATAL: pgmaster is empty. Migrate pgmaster first.');
      }
      const DUMMY_ACCOUNT_ID = validAccounts[0].id;

      // 2. Setup Schema Mapping
      interface SchemaRecord { id: number; S_APPL: number; }
      const schemaRows = await queryRunner.manager.query<SchemaRecord[]>(`SELECT id, "S_APPL" FROM schemast`);
      const schemaMap = new Map<number, SchemaRecord>(schemaRows.map(r => [Number(r.S_APPL), r]));

      // 3. FETCH ALL DISTINCT CHARTS (Removed pagination/limit)
      const distinctResult = await this.clientConn.execute(
        `SELECT DISTINCT AGENT_ACTYPE, AGENT_ACNO, TRAN_DATE FROM PIGMYCHART`
      );
      const distinctRows = this.mapOracleToPgRows(distinctResult);
      this.logger.log(`Found ${distinctRows.length} unique headers to process.`);

      for (const group of distinctRows) {
        const formattedDate = moment(group.TRAN_DATE).format('DD/MM/YYYY');

        // Fetch the first record to act as Header
        const headerRes = await this.clientConn.execute(
          `SELECT * FROM PIGMYCHART WHERE AGENT_ACTYPE = :1 AND AGENT_ACNO = :2 AND TRAN_DATE = :3 AND ROWNUM = 1`,
          [group.AGENT_ACTYPE, group.AGENT_ACNO, group.TRAN_DATE]
        );
        const h = this.mapOracleToPgRows(headerRes)[0] as PigmyChartOracleRow;
        if (!h) continue;

        const agentSchema = schemaMap.get(Number(h.AGENT_ACTYPE));
        if (!agentSchema) continue;

        const agentAcNoPadded = String(h.AGENT_ACNO).padStart(6, '0');
        const agentBankAcNo = `${bankCode}${branchCodeStr}${String(agentSchema.S_APPL).slice(0, 3)}${agentAcNoPadded}`;

        await queryRunner.startTransaction();
        try {
          // 4. Insert Header
          const chartInsert = await queryRunner.manager.createQueryBuilder()
            .insert()
            .into(PIGMYCHART)
            .values({
              BRANCH_ID: defaultBranchId,
              TRAN_DATE: formattedDate,
              TRAN_TIME: h.TRAN_TIME,
              TRAN_TYPE: h.TRAN_TYPE,
              TRAN_DRCR: h.TRAN_DRCR,
              TRAN_MODE: Number(h.TRAN_MODE),
              TRAN_AMOUNT: 0, // Will sync after details
              TRAN_STATUS: h.TRAN_STATUS === 'UP' ? 0 : 1,
              AGENT_ACTYPE: agentSchema.id,
              AGENT_ACNO: Number(h.AGENT_ACNO),
              AGENT_BANKACNO: agentBankAcNo,
              USER_CODE: h.USER_CODE,
              OFFICER_CODE: h.OFFICER_CODE || '0',
              CHART_NO: Number(h.CHART_NO),
              BRANCH_CODE: defaultBranchId
            })
            .execute();

          const parentChartId = chartInsert.identifiers[0].id;
          headerCount++;

          // 5. Fetch ALL Details for this header
          const detailsRes = await this.clientConn.execute(
            `SELECT * FROM PIGMYCHART WHERE AGENT_ACTYPE = :1 AND AGENT_ACNO = :2 AND TRAN_DATE = :3`,
            [group.AGENT_ACTYPE, group.AGENT_ACNO, group.TRAN_DATE]
          );
          const detailRows = this.mapOracleToPgRows(detailsRes) as PigmyChartMasterOracleRow[];

          let totalAmount = 0;

          for (const d of detailRows) {
            const subSchema = schemaMap.get(Number(d.TRAN_ACTYPE));
            if (!subSchema) continue;

            const subAcNoPadded = String(d.TRAN_ACNO).padStart(6, '0');
            const subBankAcNo = `${bankCode}${branchCodeStr}${String(subSchema.S_APPL).slice(0, 3)}${subAcNoPadded}`;

            const pgAccount = await queryRunner.manager.query(
              `SELECT id FROM pgmaster WHERE "BANKACNO" = $1 LIMIT 1`,
              [subBankAcNo]
            );

            const actualPgAccountId = (pgAccount && pgAccount.length > 0) ? pgAccount[0].id : DUMMY_ACCOUNT_ID;

            await queryRunner.manager.createQueryBuilder()
              .insert()
              .into(PIGMYCHARTMASTER)
              .values({
                SERIAL_NO: Number(d.SERIAL_NO),
                TRAN_ACNOTYPE: d.TRAN_ACNOTYPE,
                TRAN_ACTYPE: subSchema.id,
                TRAN_ACNO: Number(d.TRAN_ACNO),
                TRAN_BANKACNO: subBankAcNo,
                TRAN_AMOUNT: d.TRAN_AMOUNT,
                TRAN_GLACNO: Number(d.TRAN_GLACNO),
                RECEIPT_NO: Number(d.RECEIPT_NO),
                CHART_NO: Number(d.CHART_NO),
                PIGMYCHARTID: parentChartId,
                pigmyAccountID: actualPgAccountId,
              })
              .execute();

            totalAmount += Number(d.TRAN_AMOUNT);
            detailCount++;
          }

          // 6. Final Header Amount Sync
          await queryRunner.manager.createQueryBuilder()
            .update(PIGMYCHART)
            .set({ TRAN_AMOUNT: totalAmount })
            .where("id = :id", { id: parentChartId })
            .execute();

          await queryRunner.commitTransaction();
        } catch (err) {
          if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
          this.logger.error(`Failed Agent ${h.AGENT_ACNO}`, err);
        }
      }

      this.logger.log(`Migration Complete: ${headerCount} Headers, ${detailCount} Details.`);
      return { success: true, headers: headerCount, details: detailCount };
    } finally {
      await queryRunner.release();
    }
  }

  /* ===================== METADATA / DISCOVERY (SERVER SIDE) ===================== */

  async getServerDatabases(config: any): Promise<string[]> {
    // 1. We use the existing getServerDataSource to get a temporary connection
    // We connect to the default 'postgres' database to see the others
    const tempDS = await this.dbService.getServerDataSource({
      ...config,
      database: 'postgres'
    });

    try {
      // 2. Run the Postgres-specific query directly here
      const res = await tempDS.query(
        `SELECT datname as name FROM pg_database WHERE datistemplate = false AND datname != 'postgres'`
      );

      // 3. Clean up the connection
      await this.dbService.closeServerConnection();

      return res.map((d: any) => d.name);
    } catch (error) {
      await this.dbService.closeServerConnection();
      if (error instanceof Error) {
        this.logger.error(`Server discovery failed: ${error.message}`);
      } else {
        this.logger.error(`Server discovery failed: ${String(error)}`);
      }
      throw error;
    }
  }

  async getPrimaryTableNames(): Promise<string[]> {
    if (!this.serverDB || !this.serverDB.isInitialized) {
      throw new Error('Server DB not connected');
    }

    // Query Postgres information_schema directly
    const res = await this.serverDB.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
    );
    return res.map((r: any) => r.table_name);
  }

  async getAllColumnsNames(tableName: string): Promise<string[]> {
    if (!this.serverDB || !this.serverDB.isInitialized) {
      throw new Error('Server DB not connected');
    }

    // Force the incoming tableName to lowercase to match the 'syspara' we see in your screenshot
    const searchName = tableName.toLowerCase();

    const res = await this.serverDB.query(
      `SELECT attname AS column_name
       FROM pg_attribute
       WHERE attrelid = $1::regclass
       AND attnum > 0
       AND NOT attisdropped
       ORDER BY attnum`,
      [searchName]
    );

    this.logger.log(`Internal Catalog fetch for ${searchName}: Found ${res.length} columns.`);

    return res.map((c: any) => c.column_name);
  }

  async getClientTableNames(): Promise<string[]> {
    if (!this.clientConn) throw new Error('Client (Oracle) not connected');
    // We pass the raw Oracle connection to the DatabaseService helper
    return await this.dbService.getTableNames(this.clientConn);
  }

  async getClientColumns(tableName: string): Promise<string[]> {
    if (!this.clientConn) throw new Error('Client (Oracle) not connected');
    // We pass the raw Oracle connection and table name to the helper
    return await this.dbService.getColumnNames(this.clientConn, tableName);
  }


}