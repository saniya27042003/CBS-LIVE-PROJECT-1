import { SCHEMAST } from './schemeParameters.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Check(`"TRAN_DRCR" IN ('D', 'C')`)
@Check(`"TRAN_TYPE" IN ('CS', 'TR', 'JV', 'CL', 'IBT')`)
@Index('NDXDAILYTRAN', [
  'BRANCH_CODE',
  'TRAN_DATE',
  'TRAN_ACNOTYPE',
  'TRAN_ACTYPE',
  'TRAN_ACNO',
])
@Index('NDXDAILYTRAN1', ['BRANCH_CODE', 'TRAN_DATE', 'TRAN_NO', 'SERIAL_NO'])
export class DAILYTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_NO: number;

  @Column()
  SERIAL_NO: number;

  @Column()
  TRAN_DATE: string;

  @Column()
  TRAN_TIME: string;

  @Column()
  TRAN_TYPE: string;

  @Column()
  TRAN_MODE: number;

  @Column()
  TRAN_DRCR: string;

  @Column()
  BRANCH_CODE: number;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column()
  TRAN_ACTYPE: number;

  @Column({ length: 15 })
  TRAN_ACNO: string;

  @Column()
  TRAN_GLACNO: number;

  @Column({ default: 'AG' })
  AGENT_ACNOTYPE: string;

  @Column({ nullable: true })
  AGENT_ACTYPE: number;

  @Column({ nullable: true, length: 15 })
  AGENT_ACNO: string;

  @Column({ nullable: true })
  INTEREST_GLACNO: number;

  @Column({ default: 0 })
  TRAN_STATUS: number;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ default: 0 })
  TOKEN_NO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ nullable: true })
  WITHDRAW_NO: string;

  @Column({ nullable: true })
  CHEQUE_DATE: string;

  @Column({ nullable: true })
  CHEQUE_SERIES: string;

  @Column({ nullable: true })
  CHEQUE_NO: string;

  @Column({ nullable: true, length: 15 })
  BANK_ACNO: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ default: 0 })
  AC_CLOSED: number;

  @Column({ nullable: true })
  CASH_REMITANCE_STATUS: string;

  @Column({ nullable: true })
  CASH_SEND_WITH_PERSON: string;

  @Column({ nullable: true })
  TRAN_SOURCE_TYPE: string;

  @Column({ nullable: true })
  TRAN_SOURCE_NO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RECPAY_INT_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INTEREST_AMOUNT: number;

  @Column({ nullable: true })
  DD_COMMISSION_ACNO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DD_COMMISSION_AMT: number;

  @Column({ nullable: true })
  INTEREST_DATE: string;

  @Column({ nullable: true })
  OTHER1_ACNO: string;

  @Column({ nullable: true })
  OTHER2_ACNO: string;

  @Column({ nullable: true })
  OTHER3_ACNO: string;

  @Column({ nullable: true })
  OTHER4_ACNO: string;

  @Column({ nullable: true })
  OTHER5_ACNO: string;

  @Column({ nullable: true })
  OTHER6_ACNO: string;

  @Column({ nullable: true })
  OTHER7_ACNO: string;

  @Column({ nullable: true })
  OTHER8_ACNO: string;

  @Column({ nullable: true })
  OTHER9_ACNO: string;

  @Column({ nullable: true })
  OTHER10_ACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER1_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER2_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER3_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER4_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER5_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER6_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER7_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER8_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER9_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER10_AMOUNT: number;

  @Column({ nullable: true })
  PENAL_INT_GLACNO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PENAL_INT_AMOUNT: number;

  @Column({ nullable: true })
  RECPAY_INT_GLACNO: string;

  @Column({ nullable: true, default: 0 })
  IS_INTEREST_ENTRY: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER11_AMOUNT: number;

  @Column({ nullable: true })
  OTHER11_ACNO: string;

  @Column({ nullable: true })
  REC_PENAL_INT_GLACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  REC_PENAL_INT_AMOUNT: number;

  @Column({ nullable: true })
  TRAN_ENTRY_TYPE: string;

  @Column({ nullable: true })
  DIVIDEND_YEAR: number;

  @Column({ nullable: true })
  TRANSFER_BRANCH: number;

  @Column({ nullable: true })
  DIV_PAID_YEARS: number;

  @Column({ nullable: true })
  TRAN_PROCESS_YEAR: number;

  @Column({ nullable: true })
  TRAN_PROCESS_MONTH: number;

  @Column({ default: false })
  DIVIDEND_ENTRY: boolean;

  @Column({ nullable: true })
  OD_INT_DATE: string;

  @Column({ default: 0 })
  HO_SUB_GLACNO: number;

  @Column({ default: 0 })
  NO_OF_SHARES: number;

  @Column({ nullable: true })
  DENO_TRAN_NO: number;

  @Column({ nullable: true })
  CASHIER_CODE: number;

  @Column({ nullable: false })
  TRAN_BRANCH_CODE: Number;

  @Column({ nullable: false })
  SYSTRAN_TYPE: string;

  @Column({ nullable: true })
  IBT_ACNOTYPE: string;

  @Column({ nullable: true })
  IBT_ACTYPE: number;

  @Column({ nullable: true, length: 15 })
  IBT_ACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TOTAL_AMOUNT: number;

  @Column({ nullable: true })
  ADD_DATETIME: string;

  @Column({ nullable: true })
  APR_DATETIME: string;

  @Column({ default: 0 })
  SENDSMS: number;

  @ManyToOne(
    () => SCHEMAST,
    (dailytranschemes) => dailytranschemes.dailytranscheme,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'TRAN_ACTYPE' })
  dailytranschemes: SCHEMAST[];
}
