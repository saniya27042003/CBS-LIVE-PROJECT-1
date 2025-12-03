import { Column, Entity, PrimaryGeneratedColumn, Check, Index } from 'typeorm';
@Entity()
@Check(`"TRAN_DRCR" IN ('D', 'C')`)
@Check(`"TRAN_TYPE" IN ('CS', 'TR', 'JV', 'CL', 'IBT')`)
@Index('NDXDEPOTRAN', [
  'BRANCH_CODE',
  'TRAN_DATE',
  'TRAN_ACNOTYPE',
  'TRAN_ACTYPE',
  'TRAN_ACNO',
])
@Index('NDXDEPOTRAN1', ['BRANCH_CODE', 'TRAN_DATE', 'TRAN_NO', 'SERIAL_NO'])
export class DEPOTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_NO: number;

  @Column()
  SERIAL_NO: number;

  @Column()
  BRANCH_CODE: number;

  @Column()
  TRAN_DATE: string;

  @Column()
  TRAN_TIME: string;

  @Column()
  TRAN_TYPE: string;

  @Column()
  TRAN_DRCR: string;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column()
  TRAN_ACTYPE: number;

  @Column({ length: 15 })
  TRAN_ACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ nullable: true })
  TRAN_GLACNO: number;

  @Column({ nullable: true })
  TRAN_SOURCE_TYPE: string;

  @Column({ nullable: true })
  CHEQUE_DATE: string;

  @Column({ nullable: true })
  CHEQUE_SERIES: string;

  @Column({ nullable: true })
  CHEQUE_NO: string;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  CASHIER_CODE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INTEREST_AMOUNT: number;

  @Column({ nullable: true })
  INTEREST_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PENAL_INTEREST: number;

  @Column({ nullable: true })
  PASSBOOK_PRINTED: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RECPAY_INT_AMOUNT: number;

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

  @Column({ default: 0 })
  TRAN_MODE: number;

  @Column({ default: 0 })
  IS_INTEREST_ENTRY: number;

  @Column({ nullable: true })
  WITHDRAW_NO: string;

  @Column({ nullable: true })
  TRAN_ENTRY_TYPE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  ADDED_PENAL_INTEREST: number;

  @Column({ nullable: true })
  TRAN_PROCESS_YEAR: number;

  @Column({ nullable: true })
  TRAN_PROCESS_MONTH: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  REC_PENAL_INT_AMOUNT: number;

  @Column({ default: 0 })
  IS_DORMANT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER11_AMOUNT: number;
}
