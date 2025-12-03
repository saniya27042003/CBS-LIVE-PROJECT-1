import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DIVPAIDTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_NO: number;

  @Column()
  SERIAL_NO: number;

  @Column()
  BRANCH_CODE: number;

  @Column({ nullable: true })
  TRAN_DATE: string;

  @Column()
  TRAN_TIME: string;

  @Column({ nullable: true })
  TRAN_TYPE: string;

  @Column()
  TRAN_MODE: string;

  @Column({ nullable: true })
  TRAN_DRCR: string;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column({ nullable: true })
  TRAN_ACTYPE: string;

  @Column({ nullable: true })
  TRAN_ACNO: string;

  @Column({ nullable: true })
  TRAN_AMOUNT: string;

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
  TRANSFER_ACTYPE_FROM: string;

  @Column({ nullable: true })
  TRANSFER_MEMBER_NO_FROM: number;

  @Column({ nullable: true })
  TRANSFER_ACTYPE_TO: string;

  @Column({ nullable: true })
  TRANSFER_MEMBER_NO_TO: number;

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
  CHEQUE_NO: number;

  @Column({ nullable: true })
  DIVIDEND_YEAR: string;

  @Column({ nullable: true })
  DIVIDEND_ENTRY: number;

  @Column({ nullable: true })
  CASHIER_CODE: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  BONUS_AMOUNT: string;
}
