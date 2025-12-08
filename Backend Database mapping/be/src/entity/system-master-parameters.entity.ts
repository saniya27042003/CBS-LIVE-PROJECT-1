/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { Column, Entity, JoinColumn,  OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SHARECAPITALAMTDETAILS } from './SHARECAPITALANTDETAILS.entity';
@Entity()
export class SYSPARA {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  SYSPARA_CODE: string;

  @Column({ nullable: true })
  BANK_CODE: string;

  @Column({ nullable: true })
  BRANCH_CODE: string;

  @Column({ nullable: true })
  BANK_NAME: string;

  @Column({ nullable: true })
  SHORTBANK_NAME: string;

  @Column({ nullable: true })
  ADDRESS: string;

  @Column({ nullable: true })
  MAX_CERTI_NO: number;

  @Column({ nullable: true })
  MAX_SHARES_NO: number;

  @Column({ nullable: true })
  CHAIRMAN: string;

  @Column({ nullable: true })
  ACCOUNTANT: string;

  @Column({ nullable: true })
  GENERAL_MANAGER: string;

  @Column({ nullable: true })
  COMPANY_START_DATE: string;

  @Column({ nullable: true })
  NO_OF_EMPLOYEES: string;

  @Column({ nullable: true })
  OFFICER_NAME: string;

  @Column({ nullable: true })
  OFFICER_DESIGNATION: string;

  @Column({ nullable: true })
  RBI_LICENCE_NO: string;

  @Column({ nullable: true })
  MANAGER_NAME: string;

  @Column({ nullable: true })
  DD_COMMISSION_ACNO: string;

  @Column({ nullable: true })
  DIVIDEND_ACNO: string;

  @Column({ nullable: true })
  BONUS_GLACNO: string;

  @Column({ nullable: true, default: 0 })
  CGST_GLACNO: number

  @Column({ nullable: true })
  SGST_GLACNO: number

  @Column({ nullable: true })
  IGST_GLACNO: number

  @Column({ nullable: true })
  BILL_RECEIVABLE_ACNO: string;

  @Column({ nullable: true })
  BILL_FOR_COLLECTION_ACNO: string;

  @Column({ nullable: true })
  BCBR_DR_GLACNO: string;

  @Column({ nullable: true })
  BCBR_DR_SUB_GLACNO: string;

  @Column({ nullable: true })
  CLG_SUSPENCE_ACNO: string;

  @Column({ nullable: true })
  INWARD_BILL_COLLECTION_ACNO: string;

  @Column({ nullable: true })
  INWARD_BILL_RECEIVABLE_ACNO: string;

  @Column({ nullable: true, default: 0 })
  RECOVERY_METHOD: string;

  @Column({ nullable: true, default: 0 })
  IS_PROCESS_FOR_MONTH: string;

  @Column({ nullable: true, default: 0 })
  IS_PROCESS_UPTO_TRANDATE: string;

  @Column({ nullable: true, default: 0 })
  IS_ALLOW_CLG_TALLY_VOUCHER: string;

  @Column({ nullable: true, default: 0 })
  IS_CLG_DATE_ADD: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_CLEARING_EFFECT: string;

  @Column({ nullable: true, default: 0 })
  AUTO_NO: string;

  @Column({ nullable: true, default: 0 })
  MASTER_APPROVAL_REQUIRED: string;

  @Column({ nullable: true, default: 0 })
  IS_POSTING_DD_PREPARATION: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_INSTRUCTION_PASS: string;

  @Column({ nullable: true, default: 0 })
  MAINTAIN_CHEQUE_SERIES: string;

  @Column({ nullable: true, default: 0 })
  PIGMY_IS_AUTO_VOUCHER: string;

  @Column({ nullable: true, default: 0 })
  IS_MICR_CHARGES_APPL: string;

  @Column({ nullable: true, default: 0 })
  IS_GURR_FROM_MEMBERS: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTOPOSTDAILY_OVERDRAFT_INT: string;

  @Column({ nullable: true, default: 0 })
  SCHMWISE_REC_IMPEXP: string;

  @Column({ nullable: true, default: 0 })
  DENOMINATION_REQUIRE: string;

  @Column({ nullable: true, default: 0 })
  TELLER_MODE: string;

  @Column({ nullable: true, default: 0 })
  IS_ALLOW_SCHEME_GL_ENTRY: string;

  @Column({ nullable: true, default: 0 })
  TOKEN_NO_APPLICABLE: string;

  @Column({ nullable: true, default: 0 })
  MASTER_ATTACH_JOINT_NAMES: string;

  @Column({ nullable: true, default: 0 })
  MASTER_ATTACH_GUARDIAN_NAMES: string;

  @Column({ nullable: true, default: 0 })
  PIGMY_AC_RENEW_APPLY: string;

  @Column({ nullable: true, default: 0 })
  IS_RECEIPTNO_IN_PIGMYCHART: string;

  @Column({ nullable: true, default: 0 })
  IS_REBIT_INTRATE_CAL: string;

  @Column({ nullable: true, default: 0 })
  IS_ALLOW_LOANINT_CHANGE: string;

  @Column({ nullable: true, default: 0 })
  IS_CONSIDER_CCRENEWAL_AS_OPEN: string;

  @Column({ nullable: true, default: 0 })
  IS_ALLOW_RECOVERY_DIFF: string;

  @Column({ nullable: true, default: 0 })
  IS_TDS_CALCULATE: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_VOUCHER_NPA_OIR: string;

  @Column({ nullable: true, default: 0 })
  IS_HO_SUB_GLACNO_REQUIRED: string;

  @Column({ nullable: true, default: 0 })
  IS_REQUIRE_CLEARING_OPTION: string;

  @Column({ nullable: true, default: 0 })
  IS_ALLOW_USER_MULTI_LOGIN: string;

  @Column({ nullable: true, default: 0 })
  IS_BANKERS_COMM_TRAN_REQD: string;

  @Column({ nullable: true, default: 0 })
  IS_IBCIBR_VOUCH_REQD: string;

  @Column({ nullable: true, default: 0 })
  DEPRECIATION_WITH_HALFFULLRATE: string;

  @Column({ nullable: true, default: 0 })
  IS_AUTO_UPDATE_SHARES_NO: string;

  @Column({ nullable: true, default: 0 })
  ON_LINE: string;

  @Column({ nullable: true, default: 0 })
  IS_RECEIPT_PRINT_DESIGNMETHOD: string;

  @Column({ nullable: true })
  IS_ALLOW_RECOVERY: string;


  @Column({ nullable: true })
  RECOVERY_DR_ACNO: string


  @Column({ nullable: true })
  HO_GLACNO: string;

  @Column({ nullable: true })
  BG_DR_ACNO: string;

  @Column({ nullable: true })
  BG_CR_ACNO: string;

  @Column({ nullable: true })
  PAY_ORDER_ACNO: string;

  @Column({ nullable: true })
  INWARD_BILLS_PURCHASE_ACNO: string;

  @Column({ nullable: true })
  YEAR_CLOSING_TRANSFER_ACNO: string;

  @Column({ nullable: true })
  PL_TRANSFER_ACNO: string;

  @Column({ nullable: true })
  AUTHORIZED_SHARE_CAPITAL_CODE: string;

  @Column({ nullable: true })
  TDS_PAYABLE_GLACNO: string;

  @Column({ nullable: true })
  SURCHARGE_GLACNO: string;

  @Column({ nullable: true })
  CHEQUE_CHARGES_ACNO: string;

  @Column({ nullable: true })
  CHEQUE_BOUNCE_ACNO: string;

  @Column({ nullable: true })
  CHEQUE_BOUNCE_CHARGES: string;

  @Column({ nullable: true })
  MICR_CHARGES_ACNO: string;

  @Column({ nullable: true })
  MICR_CHARGES_AMOUNT: string

  @Column({ nullable: true })
  MICR_CHARGES_INWORD_CLG: string

  @Column({ nullable: true })
  GRACE_PERIOD: string;

  @Column({ nullable: true })
  WEEKLY_HOLIDAY: string;

  @Column({ nullable: true })
  HALF_DAY: string;

  @Column({ nullable: true })
  INT_CALC_METHOD: string;

  @Column({ nullable: true })
  MORATORIUM_PERIOD: string;

  @Column({ nullable: true })
  SANCTIONED_CASH_LIMIT: string;

  @Column({ nullable: true })
  IS_PGCOMMISSION_PERCALCULATION: string;

  @Column({ nullable: true })
  DIV_CALCU_MONTH: string;

  @Column({ nullable: true })
  HIGH_VALUE_CLEARING_AMT: string;

  @Column({ nullable: true })
  NPA_METHOD: string;

  @Column({ nullable: true })
  NPA_SUBMETHOD: string;

  @Column({ nullable: true })
  DIV_PAYABLE_FOR_LAST_YEARS: string;

  @Column({ nullable: true })
  MEMBER_FOR_GUR: string;

  @Column({ nullable: true })
  AUTO_LOCK_TIME: string;

  @Column({ nullable: true })
  PASSWORD_EXPIRE_DAYS: string;

  @Column({ nullable: true })
  WITHDRW_CLOSING_FOR_GURMEMBERS: string;

  @Column({ nullable: true })
  PREVIOUS_DATE: string;

  @Column({ nullable: true })
  CURRENT_DATE: string;

  @Column({ nullable: true })
  DAY_BEGIN_EXECUTED: string;

  @Column({ nullable: true })
  DAY_END_EXECUTED: string;

  @Column({ nullable: true })
  PIGMY_PREVIOUS_DATE: string;

  @Column({ nullable: true })
  PIGMY_CURRENT_DATE: string;

  @Column({ nullable: true })
  PIGMY_DAY_BEGIN_EXECUTED: string;

  @Column({ nullable: true })
  PIGMY_DAY_END_EXECUTED: string;

  @Column({ nullable: true })
  BACK_DAY_OPTION: string;


  @Column({ nullable: true })
  CASH_IN_HAND_ACNO: string;

  @Column({ nullable: true })
  CLG_HOUSE_METHOD: string;

  @Column({ nullable: true })
  LINES_PER_PASSBOOKPAGE: string;

  @Column({ nullable: true })
  PRODUCT_TYPE: string;

  @Column({ nullable: true })
  NPA_BASE_DAYS: number

  @Column({ default: 0 })
  AUTO_INT_DEBIT_VOCHER: string;

  @Column({ nullable: true })
  PRODUCTWISE_INT_ROUND: string;

  @Column({ nullable: true })
  IS_ALLOW_OLD_LOAN_EDIT: string;

  @Column({ default: 0 })
  ALLOW_AUTO_DAYEND_INTPOST: string;

  @Column({ nullable: true, default: 0 })
  SCHEMEWISE_NO: string;

  @Column({ nullable: true, default: 0 })
  PG_MACHINE_METHOD: string;


  @Column({ default: 0 })
  IS_MONTHLY_INTPOST_APPLY_TO_LN: string;

  @Column({ default: 0 })
  ALLOW_AUTO_TD_RENEW_FACILITY: number;

  @Column({ default: 0 })
  ALLOW_SMS_FACILITY: number;

  // @Column({ nullable: true})
  // AUTO_INT_DEBIT_VOCHER: number;

  @OneToMany(type => OWNBRANCHMASTER, branch => branch.id)
  @JoinColumn({ name: "BRANCH_CODE" })
  branch: OWNBRANCHMASTER[]


  @OneToMany(() => SHARECAPITALAMTDETAILS, SYSPARAID => SYSPARAID.SYSPARAID, {
    cascade: ["insert", "update"]
  })
  SYSPARAID: SHARECAPITALAMTDETAILS[];
}