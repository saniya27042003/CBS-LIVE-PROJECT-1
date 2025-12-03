import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity()
@Index('NDXINTHISTORYTRAN', [
  'BRANCH_CODE',
  'TRAN_DATE',
  'TRAN_ACNOTYPE',
  'TRAN_ACTYPE',
  'TRAN_ACNO',
])
@Index('NDXINTHISTORYTRAN1', [
  'BRANCH_CODE',
  'TRAN_DATE',
  'TRAN_NO',
  'SERIAL_NO',
])
export class INTHISTORYTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_NO: number;

  @Column()
  SERIAL_NO: number;

  @Column()
  TRAN_DATE: string;

  @Column({ nullable: true })
  TRAN_TIME: string;

  @Column()
  TRAN_TYPE: string;

  @Column()
  TRAN_MODE: number;

  @Column({ nullable: true })
  TRAN_DRCR: string;

  @Column()
  BRANCH_CODE: number;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column()
  TRAN_ACTYPE: number;

  @Column({ length: 15 })
  TRAN_ACNO: string;

  @Column({ default: 0 })
  TRAN_GLACNO: number;

  @Column({ default: 0 })
  INTEREST_GLACNO: number;

  @Column({ default: 0 })
  RECPAY_INT_GLACNO: number;

  @Column({ default: 0 })
  TRAN_STATUS: number;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RECPAY_INT_AMOUNT: number;

  @Column({ nullable: true })
  INTEREST_DATE: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INTEREST_AMOUNT: number;

  @Column({ nullable: true })
  PENAL_INT_GLACNO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PENAL_INT_AMOUNT: number;

  @Column({ nullable: true })
  LAST_INTEREST_DATE: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  INTEREST_RATE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TD_SCHEME_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  LEDGER_BALANCE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TOTAL_PRODUCTS: number;

  @Column({ nullable: true })
  AC_OPEN_DATE: string;

  @Column({ nullable: true })
  EXPIRY_DATE: string;

  @Column({ default: 0 })
  MONTHS: number;

  @Column({ default: 0 })
  DAYS: number;

  @Column({ default: 0 })
  POST_TO_INDIVIDUAL_AC: number;

  @Column({ default: 0 })
  DAILYTRAN_POST_NO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  POST_PENALINT_IN_INTEREST: number;

  @Column({ default: 0 })
  ODUE_INT_GLACNO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  ODUE_INT_AMOUNT: number;

  @Column({ default: 0 })
  IS_POST_PENAL_TO_AC: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RECPAY_INT_OPENING: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  ODUE_INT_OPENING: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OD_INT_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  REC_PENAL_INT_AMOUNT: number;

  @Column({ default: 0 })
  REC_PENAL_INT_GLACNO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RECPENAL_INT_OPENING: number;
}
