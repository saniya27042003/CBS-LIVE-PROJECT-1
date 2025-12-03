import { Column, Entity, PrimaryGeneratedColumn, Check, Index } from 'typeorm';

@Entity()
@Check(`"TRAN_DRCR" IN ('D', 'C')`)
@Check(`"TRAN_TYPE" IN ('CS', 'TR', 'JV','IS','RN','CN', 'IBT')`)
@Index('NDXSHARETRAN', [
  'BRANCH_CODE',
  'TRAN_DATE',
  'TRAN_ACNOTYPE',
  'TRAN_ACTYPE',
  'TRAN_ACNO',
])
@Index('NDXSHARETRAN1', ['BRANCH_CODE', 'TRAN_DATE', 'TRAN_NO', 'SERIAL_NO'])
export class SHARETRAN {
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

  @Column({ default: 0 })
  TRAN_MODE: number;

  @Column({ nullable: true })
  TRAN_DRCR: string;

  @Column({ nullable: true })
  TRAN_ACNOTYPE: string;

  @Column()
  TRAN_ACTYPE: number;

  @Column({ nullable: true, length: 15 })
  TRAN_ACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ nullable: true })
  TRAN_GLACNO: number;

  @Column({ nullable: true })
  NO_OF_SHARES: number;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ nullable: true })
  CERTIFICATE_NO: number;

  @Column({ nullable: true })
  SHARES_FROM_NO: number;

  @Column({ nullable: true })
  SHARES_TO_NO: number;

  @Column({ nullable: true })
  FACE_VALUE: number;

  @Column({ nullable: true })
  TRAN_SOURCE_TYPE: string;

  @Column({ nullable: true })
  TRANSFER_ACTYPE_FROM: number;

  @Column({ nullable: true, length: 15 })
  TRANSFER_MEMBER_NO_FROM: string;

  @Column({ nullable: true })
  TRANSFER_ACTYPE_TO: number;

  @Column({ nullable: true, length: 15 })
  TRANSFER_MEMBER_NO_TO: string;

  @Column({ nullable: true })
  SHARES_TRANSFER_DATE: string;

  @Column({ nullable: true })
  SHARES_RETURN_DATE: string;

  @Column({ nullable: true })
  RESULATION_DATE: string;

  @Column({ nullable: true })
  RESULATION_NO: string;

  @Column({ nullable: true })
  AC_CLOSED: number;

  @Column({ nullable: true })
  AC_CLOSEDT: string;

  @Column({ nullable: true })
  CHEQUE_DATE: string;

  @Column({ nullable: true })
  CHEQUE_SERIES: string;

  @Column({ nullable: true })
  CHEQUE_NO: string;

  @Column({ nullable: true })
  DIVIDEND_YEAR: number;

  @Column({ default: false })
  DIVIDEND_ENTRY: boolean;

  @Column({ nullable: true })
  CASHIER_CODE: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  TRAN_ENTRY_TYPE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER1_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OTHER2_AMOUNT: number;

  @Column({ nullable: true })
  SH_CERTIFICATE_PRINTED: string;

  @Column({ nullable: true })
  NEW_DATE: string;
}
