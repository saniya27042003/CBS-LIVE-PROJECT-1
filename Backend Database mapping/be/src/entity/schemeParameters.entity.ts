<<<<<<< HEAD
import { StringifyOptions } from 'querystring';
import { ACDOCUMENTDETAILS } from 'src/entity//ACDOCUMENTDETAILS.entity';
import { AGENTCHANGEHISTORY } from 'src/entity//AGENTCHANGEHISTORY.entity';
import { CHEQUEBOOKISSUED } from 'src/entity//CHEQUEBOOKISSUED.entity';
import { HISTORYTRAN } from 'src/entity//HISTORYTRAN.entity';
import { DPMASTER } from 'src/entity//dpmaster.entity';
import { PGMASTER } from './pgmaster.entity';
import { SHMASTER } from 'src/entity//share-master.entity';
import { LNACINTRATE } from 'src/entity//lnacintrate.entity';
import { LNMASTER } from './term-loan-master.entity';
import { INTRATETDMULTI } from './deposit-intrest-rate.entity';
import { INTRATELOAN } from './interest-rate-for-loan-and-cc.entity';
import { INTRATETD } from './interest-rate-for-term-deposit.entity';
import { INTRATEPATSCHEMES } from './pat-scheme-interest-rates.entity';
import { PREMATULESSRATE } from 'src/entity//premature-pigmy-less-int-rate.entity';
import { INTRATESBPG } from 'src/entity//saving-and-pigmy-interest-rates.entity';
import { COMPANYGROUPMASTER } from './company-group-master.entity';
import { INTINSTRUCTION } from 'src/entity//interest-instruction.entity';
import { SPECIALINSTRUCTION } from './special-instruction.entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PIGMYCHART } from './pigmy-chart.entity';
import { STANDINSTRUCTION } from 'src/entity//standing-instruction.entity';
import { MORATORIUMPERIOD } from 'src/entity//moratorium-peroid-master.entity';
import { BOOKDEBTS } from './book-debts.entity';
import { COMPANYGROUPLINKMASTER } from 'src/entity//company-group-link-master.entity';
import { CHARGESNOTING } from './CHARGESNOTING.entity';
import { ACMASTER } from 'src/entity//gl-account-master.entity';
import { RENEWALHISTORY } from 'src/entity//RENEWALHISTORY.entity';
import { OWNDEPOSIT } from 'src/entity//own-deposits.entity';
import { DEPOCLOSETRAN } from 'src/entity//DEPOCLOSETRAN.entity';
import { DEPOCLOSETRANSAC } from './DEPOCLOSETRANSAC.entity';
import { FIREPOLICY } from 'src/entity//fire-policy.entity';
import { PLANTMACHINARY } from 'src/entity//plant-and-machinery.entity';
import { MARKETSHARE } from 'src/entity//market-shares.entity';
import { FURNITURE } from 'src/entity//furniture-and-fixture.entity';
import { VEHICLE } from 'src/entity//vehicle.entity';
import { PLEDGESTOCK } from './pleadge-stock.entity';
import { STOCKSTATEMENT } from 'src/entity//stock-statement.entity';
import { LANDBUILDING } from 'src/entity//land-and-buildings.entity';
import { OTHERSECURITY } from 'src/entity//other-security.entity';
import { GOVTSECULIC } from 'src/entity//govt-security-and-lic.entity';
import { GOLDSILVER } from 'src/entity//gold-and-silver.entity';
import { SECINSURANCE } from 'src/entity//customer-insurance.entity';
import { DAILYTRAN } from 'src/entity//voucher.entity';
@Entity()
export class SCHEMAST {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 0 })
  S_ACNOTYPE: string;

  @Column({ nullable: true, unique: true })
  S_APPL: number;

  @Column({ length: 90, nullable: true, default: 0 })
  S_NAME: string;

  @Column({ length: 20, nullable: true, default: 0 })
  S_SHNAME: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_GLACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_INT_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_RECBL_PYBL_INT_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_PENAL_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_RECBL_PENAL_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_RECBL_ODUE_INT_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_OUTSTANDING_INT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  IS_DEPO_LOAN: string;

  @Column({ default: 0 })
  S_INT_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  POST_TO_INDIVIDUAL_AC: string;

  @Column({ nullable: true, default: 0 })
  S_RECEIVABLE_INT_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  IS_INT_ON_RECINT: string;

  @Column({ nullable: true, default: 0 })
  IS_INT_ON_OTHERAMT: string;

  @Column({ nullable: true, default: 0 })
  IS_INTUPTODATE: string;

  @Column({ nullable: true, default: 0 })
  IS_NO_POST_INT_AFT_OD: string;

  @Column({ nullable: true, default: 0 })
  INTEREST_METHOD: string;

  @Column({ nullable: true, default: 0 })
  MIN_INT_LIMIT: string;

  @Column({ nullable: true, default: 0 })
  S_PENAL_INT_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  IS_POST_PENAL_TO_AC: string;

  @Column({ nullable: true, default: 0 })
  POST_PENALINT_IN_INTEREST: string;

  @Column({ nullable: true, default: 0 })
  IS_REC_PENAL_APPL: string;

  @Column({ nullable: true, default: 0 })
  IS_CAL_PENAL_AFTER_EXPIRY: string;

  @Column({ nullable: true, default: 0 })
  S_PENAL_INT_RATE: string;

  @Column({ nullable: true, default: 0 })
  PENAL_METHOD: string;

  @Column({ nullable: true, default: 0 })
  S_DUE_LIST_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  GRACE_PERIOD_APPLICABLE: string;

  @Column({ default: 0 })
  MORATORIUM_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  STAND_INSTRUCTION_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  BALANCE_ADD_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  IS_UNSECURED_LOAN: string;

  @Column({ nullable: true, default: 0 })
  IS_OVERDUE_CHARGES_APPLY: string;

  @Column({ nullable: true, default: 0 })
  MAX_LOAN_LMT: string;

  @Column({ nullable: true, default: 0 })
  ROUNDOFF_FACTOR: string;

  @Column({ nullable: true, default: 0 })
  DEFAULT_LOAN_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  IS_LOAN_PERIOD_LOCK: string;

  @Column({ nullable: true, default: 0 })
  MIN_LOAN_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  MAX_LOAN_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  S_INSTTYPE: string;

  @Column({ nullable: true, default: 0 })
  INSTALLMENT_METHOD: string;

  @Column({ nullable: true, default: 0 })
  IS_OVERDUE_ON_INSTALLMENT: string;

  @Column({ nullable: true, default: 0 })
  IS_SHOW_INT_AS_RECINT_IFDUEBAL: string;

  @Column({ nullable: true, default: 0 })
  MIN_DUE_INSTALLMENTS: string;

  //current scheme check for required validation
  @Column({ length: 2, nullable: true, default: 0 })
  S_PRODUCT_DAY_BASE: string;

  @Column({ length: 2, nullable: true, default: 0 })
  S_PRODUCT_DAY_BASE_END: string;

  @Column({ nullable: true, default: 0 })
  CHEQUEBOOK_MIN_BAL: string;

  @Column({ nullable: true, default: 0 })
  DORMANT_FLAG_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  OVERDRAFT_INTEREST_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  OVERDRAFT_INTEREST_RATE: string;

  //general ledger
  // all are included
  @Column({ nullable: true, default: 0 })
  GL_ACNO: string;

  //pigmy ac scheme
  @Column({ nullable: true, default: 0 })
  S_PAYABLE_INT_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_CUT_INSTRUCTION: string;

  @Column({ nullable: true, default: 0 })
  IS_ALLOW_SI_MINBAL: string;

  @Column({ nullable: true, default: 0 })
  WITHDRAWAL_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  S_INTPAID_ON_CLOSING: string;

  @Column({ nullable: true, default: 0 })
  PREMATURE_COMPOUND_INT: string;

  @Column({ length: 6, nullable: true, default: 0 })
  PIGMY_MACHINE_SCHEME: string;

  @Column({ length: 6, nullable: true, default: 0 })
  SVR_CHARGE_GLCODE: string;

  @Column({ nullable: true, default: 0 })
  SVR_CHARGE_RATE: string;

  //other bank deposit
  @Column({ nullable: true, default: 0 })
  S_CASH_INT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  INTEREST_RULE: string;

  @Column({ nullable: true, default: 0 })
  IS_RECURRING_TYPE: string;

  @Column({ nullable: true, default: 0 })
  IS_CALLDEPOSIT_TYPE: string;

  @Column({ nullable: true, default: 0 })
  REINVESTMENT: string;

  @Column({ nullable: true, default: 0 })
  S_INTCALC_METHOD: string;

  @Column({ nullable: true, default: 0 })
  FIX_QUARTER: string;

  @Column({ nullable: true, default: 0 })
  QUARTER_PLUS_DAYS: string;

  @Column({ nullable: true, default: 0 })
  COMPOUND_INT_BASIS: string;

  @Column({ nullable: true, default: 0 })
  COMPOUND_INT_DAYS: string;

  @Column({ nullable: true, default: 0 })
  IS_DISCOUNTED_INT_RATE: string;

  @Column({ nullable: true, default: 0 })
  INSTALLMENT_BASIS: string;

  @Column({ nullable: true, default: 0 })
  IS_ASSUMED_INSTALLMENTS: string;

  @Column({ nullable: true, default: 0 })
  INSTALLMENT_COMPULSORY_IN_PAT: string;

  @Column({ nullable: true, default: 0 })
  DEPOSIT_PENAL_INT_CALC_DAY: string;

  @Column({ nullable: true, default: 0 })
  S_MATUCALC: string;

  @Column({ nullable: true, default: 0 })
  IS_CAL_MATURITY_AMT: string;

  @Column({ nullable: true, default: 0 })
  FIXED_MATURITY_AMT: string;

  @Column({ nullable: true, default: 0 })
  TRANSFER_TO_MATURE_DEPOSIT: string;

  @Column({ nullable: true, default: 0 })
  S_INTASON: string;

  @Column({ nullable: true, default: 0 })
  PERIOD_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_PERIOD_CALCULATE: string;

  @Column({ nullable: true, default: 0 })
  UNIT_OF_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  MIN_DAYS: string;

  @Column({ nullable: true, default: 0 })
  MIN_MONTH: string;

  @Column({ nullable: true, default: 0 })
  MULTIPLE_OF_AMT: string;

  @Column({ nullable: true, default: 0 })
  MULTIPLE_OF_DAYS: string;

  @Column({ nullable: true, default: 0 })
  MULTIPLE_OF_MONTH: string;

  @Column({ nullable: true, default: 0 })
  S_INTPAID: string;

  @Column({ nullable: true, default: 0 })
  INT_INSTRUCTION_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  RECEIPT_NO_INPUT: string;

  @Column({ nullable: true, default: 0 })
  LESS_PREMATURE_INT_RATE: string;

  @Column({ nullable: true, default: 0 })
  LOCKER_RENT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  LOCKER_RECBL_RENT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  LOCKER_DEPOSIT_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  IS_DAYBASE_INT_CALCULATION: string;

  @Column({ nullable: true, default: 0 })
  IS_INSTRUCTION_UPTO_MATURITY: string;

  @Column({ nullable: true, default: 0 })
  MEMBER_TYPE: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_NO: string;

  @Column({ nullable: true, default: 0 })
  SHARES_FACE_VALUE: string;

  @Column({ nullable: true, default: 0 })
  MAX_SHARES_LIMIT: string;

  @Column({ nullable: true, default: 0 })
  DIVIDEND_PERCENTAGE: string;

  @Column({ default: 0 })
  IS_ADD_BONUS_IN_DIVIDEND: string;

  @Column({ default: 0 })
  INT_ROUND_OFF: string;

  @Column({ nullable: true, default: 0 })
  SANCT_LIMIT_PERCENTAGE: string;

  @Column({ nullable: true, default: 0 })
  RETIREMENT_YEARS: string;

  @Column({ nullable: true, default: 0 })
  SH_CERTIFICATE_METHOD: string;

  @Column({ nullable: true, default: 0 })
  MATURED_BUT_NOT_PAID_GLAC: string;

  @Column({ nullable: true, default: 0 })
  IS_RENEWAL_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  IS_INT_ON_DEPO_AMT: string;

  @Column({ nullable: true, default: 0 })
  S_INTCALTP: string;

  @Column({ nullable: true, default: 0 })
  IS_PRODUCTUPTODATE: string;

  @Column({ nullable: true, default: 0 })
  IS_START_WITH_MONTHS: string;

  @Column({ nullable: true, default: 0 })
  IS_PRODUCT_BAL_BASE: string;

  @Column({ nullable: true, default: 0 })
  IS_DAYSBASE_INSTRUCTION: string;

  @Column({ nullable: true, default: 0 })
  PREMATURE_ON_DEPOSIT_INST: string;

  @Column({ nullable: true, default: 0 })
  ALLOW_EXTRA_INSTALLMENTS: string;

  @Column({ nullable: true, default: 0 })
  MATURE_GRACE_MONTHS: string;

  @Column({ nullable: true, default: 0 })
  MATURE_GRACE_DAYS: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_CUTTING: string;

  @Column({ nullable: true, default: 0 })
  MAX_DEP_LMT: string;

  @Column({ nullable: true, default: 0 })
  IS_TDS_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  S_INTADD_PRINCIPLE: string;

  @Column({ nullable: true, default: 0 })
  IS_STD_INSTR_UPTO_MATURITY: string;

  @Column({ nullable: true, default: 0 })
  IS_ADD_PAYINT_IN_INSTRUCTION: string;

  @Column({ nullable: true, default: 0 })
  RECEIPT_TYPE: string;

  @Column({ nullable: true, default: 0 })
  PREMATURE_INTRATE_ASPER: string;

  @Column({ nullable: true, default: 0 })
  AFTER_MATURE_INT_RATE: string;

  @Column({ nullable: true, default: 0 })
  TD_RECEIPT_METHOD: string;

  @Column({ nullable: true, default: 0 })
  MIN_BAL_FOR_INT: string;

  @Column({ nullable: true, default: 0 })
  ODPENALTY_ON_EXPIRED_LEDGERBAL: string;

  @Column({ nullable: true, default: 0 })
  IS_CAL_EXTRAPENAL_FOR_CC: string;

  //

  @Column({ nullable: true, default: 0 })
  IS_GOLD_LOAN: string;

  @Column({ nullable: true, default: 0 })
  S_SINGLE_VOUCHER: string;

  @Column({ nullable: true, default: 0 })
  S_MULTY_VOUCHER: string;

  @Column({ nullable: true, default: 0 })
  S_CASH_PAID_MIN_AMT: string;

  @Column({ nullable: true, default: 0 })
  S_CASH_PAID_LOCK: string;

  @Column({ nullable: true, default: 0 })
  S_LOCAL_CLEARING: string;

  @Column({ nullable: true, default: 0 })
  S_CHEQUE_BOOK: string;

  @Column({ nullable: true, default: 0 })
  S_DEMAND_DRAFT: string;

  @Column({ nullable: true, default: 0 })
  IS_PO_APPL: string;

  @Column({ nullable: true, default: 0 })
  S_TEMP_OVERDRFT: string;

  @Column({ nullable: true, default: 0 })
  S_PERIODCL_OVERDRFT: string;

  @Column({ nullable: true, default: 0 })
  S_SPECIAL_INSTRUCTION: string;

  @Column({ nullable: true, default: 0 })
  S_SUB_PRINT: string;

  @Column({ nullable: true, default: 0 })
  S_FREEZE_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  PROD_INTUPTODATE: string;

  @Column({ nullable: true, default: 0 })
  S_INT_CR_ACNO: string;

  @Column({ nullable: true, default: 0 })
  IS_ZERO_BAL_REQUIRED: string;

  @Column({ nullable: true, default: 0 })
  INT_BASE_DAY: number;

  @Column({ nullable: true, default: 0 })
  INT_BASE_METHOD: number;

  @Column({ nullable: true, default: 0 })
  SHOW_OVERDUEINT_IF_RECINTBAL: string;

  @Column({ nullable: true })
  IS_RECOVERY_APPLICABLE: string;

  @Column({ nullable: true })
  IS_ASK_RECOVERY: string;

  @Column({ nullable: true })
  RECOVERY_ACTYPE_FILED: string;

  @Column({ nullable: true })
  RECOVERY_ACNO_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_INST_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_INTINST_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_BALANCE_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_RECEIVABLEINT_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_TOTINST_FILED: string;

  @Column({ nullable: true })
  RECOVERY_PENALINT_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_RECEPENALINT_FIELD: string;

  @Column({ default: 0 })
  IS_AUTO_TDRENEWAL_REQUIRED: number;

  @Column({ default: 0 })
  ADD_AMT_IN_PRINCIPLE: number;

  @Column({ default: 0 })
  ADD_AMT_IN_RECPAY: number;

  @Column({ default: 0 })
  SMS_USE_SHNAME: number;

  @Column({ default: 0 })
  ALLOW_ODREM_SMS: number;

  @Column({ default: 0 })
  ALLOW_REM_SMS: number;

  @Column({ default: 0 })
  ALLOW_SMS: number;

  @OneToMany(() => DPMASTER, (DPschemecode) => DPschemecode.DPMaster, {})
  DPschemecode: DPMASTER[];

  @OneToMany(() => PGMASTER, (PGschemecode) => PGschemecode.PGMaster, {})
  PGschemecode: PGMASTER[];

  @OneToMany(
    () => DEPOCLOSETRANSAC,
    (depoCloseTranAc) => depoCloseTranAc.depoCloseTranAc,
    {},
  )
  depoCloseTranAc: DEPOCLOSETRANSAC[];

  @OneToMany(() => LNMASTER, (lncccode) => lncccode.LNCCMaster, {})
  lncccode: LNMASTER[];

  @OneToMany(() => SHMASTER, (shareCode) => shareCode.shareMaster, {})
  shareCode: SHMASTER[];

  @OneToMany(
    () => RENEWALHISTORY,
    (renewalHistory) => renewalHistory.renewalHistory,
    {},
  )
  renewalHistory: RENEWALHISTORY[];

  @OneToMany(() => PIGMYCHART, (pigmyChart) => pigmyChart.Scheme, {})
  pigmyChart: PIGMYCHART[];

  @OneToMany(() => HISTORYTRAN, (historyTran) => historyTran.HistoryTran, {})
  historyTran: HISTORYTRAN[];

  @OneToMany(
    () => HISTORYTRAN,
    (historyTranType) => historyTranType.HistoryTranType,
    {},
  )
  historyTranType: HISTORYTRAN[];

  @OneToMany(
    () => ACDOCUMENTDETAILS,
    (acDocumentDetails) => acDocumentDetails.acDocument,
    {},
  )
  acDocumentDetails: ACDOCUMENTDETAILS[];

  @OneToMany(
    () => AGENTCHANGEHISTORY,
    (agentChange) => agentChange.agentChange,
    {},
  )
  agentChange: AGENTCHANGEHISTORY[];

  @OneToMany(
    () => AGENTCHANGEHISTORY,
    (agentACChange) => agentACChange.agentACChange,
    {},
  )
  agentACChange: AGENTCHANGEHISTORY[];

  @OneToMany(() => CHEQUEBOOKISSUED, (chequeBook) => chequeBook.chequeBook, {})
  chequeBook: CHEQUEBOOKISSUED[];

  @OneToMany(
    () => SPECIALINSTRUCTION,
    (specialIns) => specialIns.specialIns,
    {},
  )
  specialIns: SPECIALINSTRUCTION[];

  @OneToMany(() => INTINSTRUCTION, (interestDr) => interestDr.interestDr, {})
  interestDr: INTINSTRUCTION[];

  @OneToMany(() => INTINSTRUCTION, (interestCr) => interestCr.interestCr, {})
  interestCr: INTINSTRUCTION[];

  @OneToMany(
    () => STANDINSTRUCTION,
    (standingInsDr) => standingInsDr.standingInsDr,
    {},
  )
  standingInsDr: STANDINSTRUCTION[];

  @OneToMany(
    () => STANDINSTRUCTION,
    (standingInsCr) => standingInsCr.standingInsCr,
    {},
  )
  standingInsCr: STANDINSTRUCTION[];

  @OneToMany(() => COMPANYGROUPMASTER, (scheme) => scheme.company, {
    cascade: ['insert', 'update'],
  })
  scheme: COMPANYGROUPMASTER[];

  @OneToMany(() => INTRATETD, (irftd) => irftd.scheme, {
    cascade: ['insert', 'update'],
  })
  irftd: INTRATETD[];

  @OneToMany(() => INTRATEPATSCHEMES, (patscheme) => patscheme.scheme, {
    cascade: ['insert', 'update'],
  })
  patscheme: INTRATEPATSCHEMES[];

  @OneToMany(() => INTRATESBPG, (sapint) => sapint.scheme, {
    cascade: ['insert', 'update'],
  })
  sapint: INTRATESBPG[];

  @OneToMany(() => INTRATELOAN, (intloancc) => intloancc.scheme, {
    cascade: ['insert', 'update'],
  })
  intloancc: INTRATELOAN[];

  @OneToMany(() => INTRATETDMULTI, (depoint) => depoint.scheme, {
    cascade: ['insert', 'update'],
  })
  depoint: INTRATETDMULTI[];

  @OneToMany(() => PREMATULESSRATE, (prepigmy) => prepigmy.scheme, {
    cascade: ['insert', 'update'],
  })
  prepigmy: PREMATULESSRATE[];

  @OneToMany(
    () => MORATORIUMPERIOD,
    (moratoriumScheme) => moratoriumScheme.moratoriumScheme,
    {
      cascade: ['insert', 'update'],
    },
  )
  moratoriumScheme: MORATORIUMPERIOD[];

  @OneToMany(
    () => CHARGESNOTING,
    (chargesScheme) => chargesScheme.chargesScheme,
    {
      cascade: ['insert', 'update'],
    },
  )
  chargesScheme: CHARGESNOTING[];
  @OneToMany(() => BOOKDEBTS, (bookdebts) => bookdebts.scheme, {
    cascade: ['insert', 'update'],
  })
  bookdebts: BOOKDEBTS[];

  @OneToMany(() => ACMASTER, (glAcMaster) => glAcMaster.glAcMaster, {
    cascade: ['insert', 'update'],
  })
  glAcMaster: ACMASTER[];

  @OneToMany(() => DPMASTER, (PGDPMaster) => PGDPMaster.PGDPMaster, {
    cascade: ['insert', 'update'],
  })
  PGDPMaster: DPMASTER[];

  @OneToMany(() => OWNDEPOSIT, (depoactype) => depoactype.depoactype, {
    cascade: ['insert', 'update'],
  })
  depoactype: OWNDEPOSIT[];
  @OneToMany(
    () => DEPOCLOSETRAN,
    (depocloseTran) => depocloseTran.depocloseTran,
    {
      cascade: ['insert', 'update'],
    },
  )
  depocloseTran: DEPOCLOSETRAN[];

  @OneToMany(() => OWNDEPOSIT, (actypeowndepo) => actypeowndepo.actypeowndepo, {
    cascade: ['insert', 'update'],
  })
  actypeowndepo: OWNDEPOSIT[];

  @OneToMany(() => FIREPOLICY, (fireactype) => fireactype.fireactype, {
    cascade: ['insert', 'update'],
  })
  fireactype: FIREPOLICY[];

  @OneToMany(
    () => PLANTMACHINARY,
    (plantmachinary) => plantmachinary.plantmachinary,
    {
      cascade: ['insert', 'update'],
    },
  )
  plantmachinary: PLANTMACHINARY[];

  @OneToMany(() => MARKETSHARE, (marketshare) => marketshare.marketshare, {
    cascade: ['insert', 'update'],
  })
  marketshare: MARKETSHARE[];

  @OneToMany(() => FURNITURE, (furniture) => furniture.furniture, {
    cascade: ['insert', 'update'],
  })
  furniture: FURNITURE[];

  @OneToMany(() => VEHICLE, (vehicle) => vehicle.vehicle, {
    cascade: ['insert', 'update'],
  })
  vehicle: VEHICLE[];

  @OneToMany(() => PLEDGESTOCK, (pledge) => pledge.pledge, {
    cascade: ['insert', 'update'],
  })
  pledge: PLEDGESTOCK[];

  @OneToMany(
    () => STOCKSTATEMENT,
    (stockstatement) => stockstatement.stockstatement,
    {
      cascade: ['insert', 'update'],
    },
  )
  stockstatement: STOCKSTATEMENT[];

  @OneToMany(() => LANDBUILDING, (land) => land.land, {
    cascade: ['insert', 'update'],
  })
  land: LANDBUILDING[];

  @OneToMany(() => OTHERSECURITY, (othersec) => othersec.othersec, {
    cascade: ['insert', 'update'],
  })
  othersec: OTHERSECURITY[];

  @OneToMany(() => GOVTSECULIC, (govsec) => govsec.govsec, {
    cascade: ['insert', 'update'],
  })
  govsec: GOVTSECULIC[];

  @OneToMany(() => GOLDSILVER, (goldsilver) => goldsilver.goldsilver, {
    cascade: ['insert', 'update'],
  })
  goldsilver: GOLDSILVER[];

  @OneToMany(() => SECINSURANCE, (custinsurace) => custinsurace.custinsurace, {
    cascade: ['insert', 'update'],
  })
  custinsurace: SECINSURANCE[];

  @OneToMany(
    () => DAILYTRAN,
    (dailytranscheme) => dailytranscheme.dailytranschemes,
    {},
  )
  dailytranscheme: DAILYTRAN[];
}
=======
import { StringifyOptions } from 'querystring';
import { ACDOCUMENTDETAILS } from './ACDOCUMENTDETAILS.entity';
import { AGENTCHANGEHISTORY } from './AGENTCHANGEHISTORY.entity';
import { CHEQUEBOOKISSUED } from './CHEQUEBOOKISSUED.entity';
import { HISTORYTRAN } from './HISTORYTRAN.entity';
import { DPMASTER } from './dpmaster.entity';
import { PGMASTER } from './pgmaster.entity'
import { SHMASTER } from './share-master.entity';
import { LNACINTRATE } from './lnacintrate.entity';
import { LNMASTER } from './term-loan-master.entity';
import { INTRATETDMULTI } from './deposit-intrest-rate.entity';
import { INTRATELOAN } from './interest-rate-for-loan-and-cc.entity';
import { INTRATETD } from './interest-rate-for-term-deposit.entity';
import { INTRATEPATSCHEMES } from './pat-scheme-interest-rates.entity';
import { PREMATULESSRATE } from './premature-pigmy-less-int-rate.entity';
import { INTRATESBPG } from './saving-and-pigmy-interest-rates.entity';
import { COMPANYGROUPMASTER } from './company-group-master.entity';
import { INTINSTRUCTION } from './interest-instruction.entity';
import { SPECIALINSTRUCTION } from './special-instruction.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PIGMYCHART } from './pigmy-chart.entity'
import { STANDINSTRUCTION } from './standing-instruction.entity';
import { MORATORIUMPERIOD } from './moratorium-peroid-master.entity';
import { BOOKDEBTS } from './book-debts.entity';
// import { COMPANYGROUPLINKMASTER } from 'src/entity//company-group-link-master.entity';
import { CHARGESNOTING } from './CHARGESNOTING.entity';
import { ACMASTER } from './gl-account-master.entity';
import { RENEWALHISTORY } from './RENEWALHISTORY.entity';
import { OWNDEPOSIT } from './own-deposits.entity';
import { DEPOCLOSETRAN } from './DEPOCLOSETRAN.entity';
import { DEPOCLOSETRANSAC } from './DEPOCLOSETRANSAC.entity';
import { FIREPOLICY } from './/fire-policy.entity';
import { PLANTMACHINARY } from './plant-and-machinery.entity';
import { MARKETSHARE } from './market-shares.entity';
import { FURNITURE } from './furniture-and-fixture.entity';
import { VEHICLE } from './vehicle.entity';
import { PLEDGESTOCK } from './pleadge-stock.entity';
import { STOCKSTATEMENT } from './stock-statement.entity';
import { LANDBUILDING } from './land-and-buildings.entity';
import { OTHERSECURITY } from './other-security.entity';
import { GOVTSECULIC } from './govt-security-and-lic.entity';
import { GOLDSILVER } from './gold-and-silver.entity';
import { SECINSURANCE } from './customer-insurance.entity';
import { DAILYTRAN } from './voucher.entity';
@Entity()
export class SCHEMAST {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 0 })
  S_ACNOTYPE: string;

  @Column({ nullable: true, unique: true })
  S_APPL: number;

  @Column({ length: 90, nullable: true, default: 0 })
  S_NAME: string;

  @Column({ length: 20, nullable: true, default: 0 })
  S_SHNAME: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_GLACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_INT_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_RECBL_PYBL_INT_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_PENAL_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_RECBL_PENAL_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_RECBL_ODUE_INT_ACNO: string;

  @Column({ length: 15, nullable: true, default: 0 })
  S_OUTSTANDING_INT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  IS_DEPO_LOAN: string;

  @Column({ default: 0 })
  S_INT_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  POST_TO_INDIVIDUAL_AC: string;

  @Column({ nullable: true, default: 0 })
  S_RECEIVABLE_INT_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  IS_INT_ON_RECINT: string;

  @Column({ nullable: true, default: 0 })
  IS_INT_ON_OTHERAMT: string;

  @Column({ nullable: true, default: 0 })
  IS_INTUPTODATE: string;

  @Column({ nullable: true, default: 0 })
  IS_NO_POST_INT_AFT_OD: string;

  @Column({ nullable: true, default: 0 })
  INTEREST_METHOD: string;

  @Column({ nullable: true, default: 0 })
  MIN_INT_LIMIT: string;

  @Column({ nullable: true, default: 0 })
  S_PENAL_INT_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  IS_POST_PENAL_TO_AC: string;

  @Column({ nullable: true, default: 0 })
  POST_PENALINT_IN_INTEREST: string;

  @Column({ nullable: true, default: 0 })
  IS_REC_PENAL_APPL: string;

  @Column({ nullable: true, default: 0 })
  IS_CAL_PENAL_AFTER_EXPIRY: string;

  @Column({ nullable: true, default: 0 })
  S_PENAL_INT_RATE: string;

  @Column({ nullable: true, default: 0 })
  PENAL_METHOD: string;

  @Column({ nullable: true, default: 0 })
  S_DUE_LIST_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  GRACE_PERIOD_APPLICABLE: string;

  @Column({ default: 0 })
  MORATORIUM_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  STAND_INSTRUCTION_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  BALANCE_ADD_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  IS_UNSECURED_LOAN: string;

  @Column({ nullable: true, default: 0 })
  IS_OVERDUE_CHARGES_APPLY: string;

  @Column({ nullable: true, default: 0 })
  MAX_LOAN_LMT: string;

  @Column({ nullable: true, default: 0 })
  ROUNDOFF_FACTOR: string;

  @Column({ nullable: true, default: 0 })
  DEFAULT_LOAN_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  IS_LOAN_PERIOD_LOCK: string;

  @Column({ nullable: true, default: 0 })
  MIN_LOAN_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  MAX_LOAN_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  S_INSTTYPE: string;

  @Column({ nullable: true, default: 0 })
  INSTALLMENT_METHOD: string;

  @Column({ nullable: true, default: 0 })
  IS_OVERDUE_ON_INSTALLMENT: string;

  @Column({ nullable: true, default: 0 })
  IS_SHOW_INT_AS_RECINT_IFDUEBAL: string;

  @Column({ nullable: true, default: 0 })
  MIN_DUE_INSTALLMENTS: string;


  //current scheme check for required validation
  @Column({ length: 2, nullable: true, default: 0 })
  S_PRODUCT_DAY_BASE: string

  @Column({ length: 2, nullable: true, default: 0 })
  S_PRODUCT_DAY_BASE_END: string

  @Column({ nullable: true, default: 0 })
  CHEQUEBOOK_MIN_BAL: string

  @Column({ nullable: true, default: 0 })
  DORMANT_FLAG_APPLICABLE: string

  @Column({ nullable: true, default: 0 })
  OVERDRAFT_INTEREST_APPLICABLE: string

  @Column({ nullable: true, default: 0 })
  OVERDRAFT_INTEREST_RATE: string

  //general ledger
  // all are included
  @Column({ nullable: true, default: 0 })
  GL_ACNO: string

  //pigmy ac scheme
  @Column({ nullable: true, default: 0 })
  S_PAYABLE_INT_ALLOW: string

  @Column({ nullable: true, default: 0 })
  IS_AUTO_CUT_INSTRUCTION: string

  @Column({ nullable: true, default: 0 })
  IS_ALLOW_SI_MINBAL: string

  @Column({ nullable: true, default: 0 })
  WITHDRAWAL_APPLICABLE: string

  @Column({ nullable: true, default: 0 })
  S_INTPAID_ON_CLOSING: string

  @Column({ nullable: true, default: 0 })
  PREMATURE_COMPOUND_INT: string

  @Column({ length: 6, nullable: true, default: 0 })
  PIGMY_MACHINE_SCHEME: string

  @Column({ length: 6, nullable: true, default: 0 })
  SVR_CHARGE_GLCODE: string

  @Column({ nullable: true, default: 0 })
  SVR_CHARGE_RATE: string

  //other bank deposit
  @Column({ nullable: true, default: 0 })
  S_CASH_INT_ACNO: string

  @Column({ nullable: true, default: 0 })
  INTEREST_RULE: string

  @Column({ nullable: true, default: 0 })
  IS_RECURRING_TYPE: string

  @Column({ nullable: true, default: 0 })
  IS_CALLDEPOSIT_TYPE: string

  @Column({ nullable: true, default: 0 })
  REINVESTMENT: string

  @Column({ nullable: true, default: 0 })
  S_INTCALC_METHOD: string

  @Column({ nullable: true, default: 0 })
  FIX_QUARTER: string

  @Column({ nullable: true, default: 0 })
  QUARTER_PLUS_DAYS: string

  @Column({ nullable: true, default: 0 })
  COMPOUND_INT_BASIS: string

  @Column({ nullable: true, default: 0 })
  COMPOUND_INT_DAYS: string

  @Column({ nullable: true, default: 0 })
  IS_DISCOUNTED_INT_RATE: string

  @Column({ nullable: true, default: 0 })
  INSTALLMENT_BASIS: string

  @Column({ nullable: true, default: 0 })
  IS_ASSUMED_INSTALLMENTS: string

  @Column({ nullable: true, default: 0 })
  INSTALLMENT_COMPULSORY_IN_PAT: string

  @Column({ nullable: true, default: 0 })
  DEPOSIT_PENAL_INT_CALC_DAY: string

  @Column({ nullable: true, default: 0 })
  S_MATUCALC: string

  @Column({ nullable: true, default: 0 })
  IS_CAL_MATURITY_AMT: string

  @Column({ nullable: true, default: 0 })
  FIXED_MATURITY_AMT: string

  @Column({ nullable: true, default: 0 })
  TRANSFER_TO_MATURE_DEPOSIT: string

  @Column({ nullable: true, default: 0 })
  S_INTASON: string

  @Column({ nullable: true, default: 0 })
  PERIOD_APPLICABLE: string

  @Column({ nullable: true, default: 0 })
  IS_AUTO_PERIOD_CALCULATE: string

  @Column({ nullable: true, default: 0 })
  UNIT_OF_PERIOD: string

  @Column({ nullable: true, default: 0 })
  MIN_DAYS: string

  @Column({ nullable: true, default: 0 })
  MIN_MONTH: string

  @Column({ nullable: true, default: 0 })
  MULTIPLE_OF_AMT: string

  @Column({ nullable: true, default: 0 })
  MULTIPLE_OF_DAYS: string

  @Column({ nullable: true, default: 0 })
  MULTIPLE_OF_MONTH: string

  @Column({ nullable: true, default: 0 })
  S_INTPAID: string

  @Column({ nullable: true, default: 0 })
  INT_INSTRUCTION_ALLOW: string

  @Column({ nullable: true, default: 0 })
  RECEIPT_NO_INPUT: string

  @Column({ nullable: true, default: 0 })
  LESS_PREMATURE_INT_RATE: string

  @Column({ nullable: true, default: 0 })
  LOCKER_RENT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  LOCKER_RECBL_RENT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  LOCKER_DEPOSIT_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  IS_DAYBASE_INT_CALCULATION: string;

  @Column({ nullable: true, default: 0 })
  IS_INSTRUCTION_UPTO_MATURITY: string;

  @Column({ nullable: true, default: 0 })
  MEMBER_TYPE: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_NO: string;

  @Column({ nullable: true, default: 0 })
  SHARES_FACE_VALUE: string;

  @Column({ nullable: true, default: 0 })
  MAX_SHARES_LIMIT: string;

  @Column({ nullable: true, default: 0 })
  DIVIDEND_PERCENTAGE: string;

  @Column({ default: 0 })
  IS_ADD_BONUS_IN_DIVIDEND: string;

  @Column({ default: 0 })
  INT_ROUND_OFF: string;

  @Column({ nullable: true, default: 0 })
  SANCT_LIMIT_PERCENTAGE: string;

  @Column({ nullable: true, default: 0 })
  RETIREMENT_YEARS: string;

  @Column({ nullable: true, default: 0 })
  SH_CERTIFICATE_METHOD: string;

  @Column({ nullable: true, default: 0 })
  MATURED_BUT_NOT_PAID_GLAC: string;

  @Column({ nullable: true, default: 0 })
  IS_RENEWAL_ALLOW: string;

  @Column({ nullable: true, default: 0 })
  IS_INT_ON_DEPO_AMT: string;

  @Column({ nullable: true, default: 0 })
  S_INTCALTP: string;

  @Column({ nullable: true, default: 0 })
  IS_PRODUCTUPTODATE: string;

  @Column({ nullable: true, default: 0 })
  IS_START_WITH_MONTHS: string;

  @Column({ nullable: true, default: 0 })
  IS_PRODUCT_BAL_BASE: string;

  @Column({ nullable: true, default: 0 })
  IS_DAYSBASE_INSTRUCTION: string;

  @Column({ nullable: true, default: 0 })
  PREMATURE_ON_DEPOSIT_INST: string;

  @Column({ nullable: true, default: 0 })
  ALLOW_EXTRA_INSTALLMENTS: string;

  @Column({ nullable: true, default: 0 })
  MATURE_GRACE_MONTHS: string;

  @Column({ nullable: true, default: 0 })
  MATURE_GRACE_DAYS: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_CUTTING: string;

  @Column({ nullable: true, default: 0 })
  MAX_DEP_LMT: string;

  @Column({ nullable: true, default: 0 })
  IS_TDS_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  S_INTADD_PRINCIPLE: string;

  @Column({ nullable: true, default: 0 })
  IS_STD_INSTR_UPTO_MATURITY: string;

  @Column({ nullable: true, default: 0 })
  IS_ADD_PAYINT_IN_INSTRUCTION: string;

  @Column({ nullable: true, default: 0 })
  RECEIPT_TYPE: string;

  @Column({ nullable: true, default: 0 })
  PREMATURE_INTRATE_ASPER: string;

  @Column({ nullable: true, default: 0 })
  AFTER_MATURE_INT_RATE: string;

  @Column({ nullable: true, default: 0 })
  TD_RECEIPT_METHOD: string;

  @Column({ nullable: true, default: 0 })
  MIN_BAL_FOR_INT: string;

  @Column({ nullable: true, default: 0 })
  ODPENALTY_ON_EXPIRED_LEDGERBAL: string;

  @Column({ nullable: true, default: 0 })
  IS_CAL_EXTRAPENAL_FOR_CC: string;


  //  

  @Column({ nullable: true, default: 0 })
  IS_GOLD_LOAN: string;

  @Column({ nullable: true, default: 0 })
  S_SINGLE_VOUCHER: string;

  @Column({ nullable: true, default: 0 })
  S_MULTY_VOUCHER: string;

  @Column({ nullable: true, default: 0 })
  S_CASH_PAID_MIN_AMT: string;

  @Column({ nullable: true, default: 0 })
  S_CASH_PAID_LOCK: string;

  @Column({ nullable: true, default: 0 })
  S_LOCAL_CLEARING: string;

  @Column({ nullable: true, default: 0 })
  S_CHEQUE_BOOK: string

  @Column({ nullable: true, default: 0 })
  S_DEMAND_DRAFT: string;

  @Column({ nullable: true, default: 0 })
  IS_PO_APPL: string;

  @Column({ nullable: true, default: 0 })
  S_TEMP_OVERDRFT: string;

  @Column({ nullable: true, default: 0 })
  S_PERIODCL_OVERDRFT: string;

  @Column({ nullable: true, default: 0 })
  S_SPECIAL_INSTRUCTION: string;

  @Column({ nullable: true, default: 0 })
  S_SUB_PRINT: string;

  @Column({ nullable: true, default: 0 })
  S_FREEZE_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  PROD_INTUPTODATE: string

  @Column({ nullable: true, default: 0 })
  S_INT_CR_ACNO: string;

  @Column({ nullable: true, default: 0 })
  IS_ZERO_BAL_REQUIRED: string;

  @Column({ nullable: true, default: 0 })
  INT_BASE_DAY: number;

  @Column({ nullable: true, default: 0 })
  INT_BASE_METHOD: number;

  @Column({ nullable: true, default: 0 })
  SHOW_OVERDUEINT_IF_RECINTBAL: string;


  @Column({ nullable: true })
  IS_RECOVERY_APPLICABLE: string;

  @Column({ nullable: true })
  IS_ASK_RECOVERY: string;

  @Column({ nullable: true })
  RECOVERY_ACTYPE_FILED: string;

  @Column({ nullable: true })
  RECOVERY_ACNO_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_INST_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_INTINST_FIELD:  string;

  @Column({ nullable: true })
  RECOVERY_BALANCE_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_RECEIVABLEINT_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_TOTINST_FILED: string;

  @Column({ nullable: true })
  RECOVERY_PENALINT_FIELD: string;

  @Column({ nullable: true })
  RECOVERY_RECEPENALINT_FIELD: string;

  @Column({ default: 0 })
  IS_AUTO_TDRENEWAL_REQUIRED: number;

  @Column({ default: 0 })
  ADD_AMT_IN_PRINCIPLE: number;

  @Column({ default: 0 })
  ADD_AMT_IN_RECPAY: number;

  @Column({ default: 0 })
  SMS_USE_SHNAME: number;

  @Column({ default: 0 })
  ALLOW_ODREM_SMS: number;

  @Column({ default: 0 })
  ALLOW_REM_SMS: number;

  @Column({ default: 0 })
  ALLOW_SMS: number;

  @OneToMany(() => DPMASTER, (DPschemecode) => DPschemecode.DPMaster, {
  })
  DPschemecode: DPMASTER[]

  @OneToMany(() => PGMASTER, (PGschemecode) => PGschemecode.PGMaster, {
  })
  PGschemecode: PGMASTER[]

  @OneToMany(() => DEPOCLOSETRANSAC, (depoCloseTranAc) => depoCloseTranAc.depoCloseTranAc, {
  })
  depoCloseTranAc: DEPOCLOSETRANSAC[]

  @OneToMany(() => LNMASTER, (lncccode) => lncccode.LNCCMaster, {
  })
  lncccode: LNMASTER[]

  @OneToMany(() => SHMASTER, (shareCode) => shareCode.shareMaster, {
  })
  shareCode: SHMASTER[]

  @OneToMany(() => RENEWALHISTORY, (renewalHistory) => renewalHistory.renewalHistory, {
  })
  renewalHistory: RENEWALHISTORY[]

  @OneToMany(() => PIGMYCHART, (pigmyChart) => pigmyChart.Scheme, {
  })
  pigmyChart: PIGMYCHART[]

  @OneToMany(() => HISTORYTRAN, (historyTran) => historyTran.HistoryTran, {
  })
  historyTran: HISTORYTRAN[]

  @OneToMany(() => HISTORYTRAN, (historyTranType) => historyTranType.HistoryTranType, {
  })
  historyTranType: HISTORYTRAN[]

  @OneToMany(() => ACDOCUMENTDETAILS, (acDocumentDetails) => acDocumentDetails.acDocument, {
  })
  acDocumentDetails: ACDOCUMENTDETAILS[]

  @OneToMany(() => AGENTCHANGEHISTORY, (agentChange) => agentChange.agentChange, {
  })
  agentChange: AGENTCHANGEHISTORY[]

  @OneToMany(() => AGENTCHANGEHISTORY, (agentACChange) => agentACChange.agentACChange, {
  })
  agentACChange: AGENTCHANGEHISTORY[]

  @OneToMany(() => CHEQUEBOOKISSUED, (chequeBook) => chequeBook.chequeBook, {
  })
  chequeBook: CHEQUEBOOKISSUED[]

  @OneToMany(() => SPECIALINSTRUCTION, (specialIns) => specialIns.specialIns, {
  })
  specialIns: SPECIALINSTRUCTION[]

  @OneToMany(() => INTINSTRUCTION, (interestDr) => interestDr.interestDr, {
  })
  interestDr: INTINSTRUCTION[]

  @OneToMany(() => INTINSTRUCTION, (interestCr) => interestCr.interestCr, {
  })
  interestCr: INTINSTRUCTION[]

  @OneToMany(() => STANDINSTRUCTION, (standingInsDr) => standingInsDr.standingInsDr, {
  })
  standingInsDr: STANDINSTRUCTION[]

  @OneToMany(() => STANDINSTRUCTION, (standingInsCr) => standingInsCr.standingInsCr, {
  })
  standingInsCr: STANDINSTRUCTION[]

  @OneToMany(() => COMPANYGROUPMASTER, scheme => scheme.company, {
    cascade: ["insert", "update"]
  })
  scheme: COMPANYGROUPMASTER[];


  @OneToMany(() => INTRATETD, irftd => irftd.scheme, {
    cascade: ["insert", "update"]
  })
  irftd: INTRATETD[];

  @OneToMany(() => INTRATEPATSCHEMES, patscheme => patscheme.scheme, {
    cascade: ["insert", "update"]
  })
  patscheme: INTRATEPATSCHEMES[];

  @OneToMany(() => INTRATESBPG, sapint => sapint.scheme, {
    cascade: ["insert", "update"]
  })
  sapint: INTRATESBPG[];

  @OneToMany(() => INTRATELOAN, intloancc => intloancc.scheme, {
    cascade: ["insert", "update"]
  })
  intloancc: INTRATELOAN[];

  @OneToMany(() => INTRATETDMULTI, depoint => depoint.scheme, {
    cascade: ["insert", "update"]
  })
  depoint: INTRATETDMULTI[];

  @OneToMany(() => PREMATULESSRATE, prepigmy => prepigmy.scheme, {
    cascade: ["insert", "update"]
  })
  prepigmy: PREMATULESSRATE[];

  @OneToMany(() => MORATORIUMPERIOD, moratoriumScheme => moratoriumScheme.moratoriumScheme, {
    cascade: ["insert", "update"]
  })
  moratoriumScheme: MORATORIUMPERIOD[];

  @OneToMany(() => CHARGESNOTING, chargesScheme => chargesScheme.chargesScheme, {
    cascade: ["insert", "update"]
  })
  chargesScheme: CHARGESNOTING[];
  @OneToMany(() => BOOKDEBTS, bookdebts => bookdebts.scheme, {
    cascade: ["insert", "update"]
  })
  bookdebts: BOOKDEBTS[];


  @OneToMany(() => ACMASTER, glAcMaster => glAcMaster.glAcMaster, {
    cascade: ["insert", "update"]
  })
  glAcMaster: ACMASTER[];

  @OneToMany(() => DPMASTER, PGDPMaster => PGDPMaster.PGDPMaster, {
    cascade: ["insert", "update"]
  })
  PGDPMaster: DPMASTER[];

  @OneToMany(() => OWNDEPOSIT, depoactype => depoactype.depoactype, {
    cascade: ["insert", "update"]
  })
  depoactype: OWNDEPOSIT[];
  @OneToMany(() => DEPOCLOSETRAN, depocloseTran => depocloseTran.depocloseTran, {
    cascade: ["insert", "update"]
  })
  depocloseTran: DEPOCLOSETRAN[];

  @OneToMany(() => OWNDEPOSIT, actypeowndepo => actypeowndepo.actypeowndepo, {
    cascade: ["insert", "update"]
  })
  actypeowndepo: OWNDEPOSIT[];

  @OneToMany(() => FIREPOLICY, fireactype => fireactype.fireactype, {
    cascade: ["insert", "update"]
  })
  fireactype: FIREPOLICY[];

  @OneToMany(() => PLANTMACHINARY, plantmachinary => plantmachinary.plantmachinary, {
    cascade: ["insert", "update"]
  })
  plantmachinary: PLANTMACHINARY[];

  @OneToMany(() => MARKETSHARE, marketshare => marketshare.marketshare, {
    cascade: ["insert", "update"]
  })
  marketshare: MARKETSHARE[];

  @OneToMany(() => FURNITURE, furniture => furniture.furniture, {
    cascade: ["insert", "update"]
  })
  furniture: FURNITURE[];

  @OneToMany(() => VEHICLE, vehicle => vehicle.vehicle, {
    cascade: ["insert", "update"]
  })
  vehicle: VEHICLE[];

  @OneToMany(() => PLEDGESTOCK, pledge => pledge.pledge, {
    cascade: ["insert", "update"]
  })
  pledge: PLEDGESTOCK[];

  @OneToMany(() => STOCKSTATEMENT, stockstatement => stockstatement.stockstatement, {
    cascade: ["insert", "update"]
  })
  stockstatement: STOCKSTATEMENT[];

  @OneToMany(() => LANDBUILDING, land => land.land, {
    cascade: ["insert", "update"]
  })
  land: LANDBUILDING[];

  @OneToMany(() => OTHERSECURITY, othersec => othersec.othersec, {
    cascade: ["insert", "update"]
  })
  othersec: OTHERSECURITY[];

  @OneToMany(() => GOVTSECULIC, govsec => govsec.govsec, {
    cascade: ["insert", "update"]
  })
  govsec: GOVTSECULIC[];

  @OneToMany(() => GOLDSILVER, goldsilver => goldsilver.goldsilver, {
    cascade: ["insert", "update"]
  })
  goldsilver: GOLDSILVER[];

  @OneToMany(() => SECINSURANCE, custinsurace => custinsurace.custinsurace, {
    cascade: ["insert", "update"]
  })
  custinsurace: SECINSURANCE[];

  @OneToMany(() => DAILYTRAN, (dailytranscheme) => dailytranscheme.dailytranschemes, {
  })
  dailytranscheme: DAILYTRAN[]

}
>>>>>>> 4ad060f30ce45d7b10b77bb6e7522ec4db76c0ea
