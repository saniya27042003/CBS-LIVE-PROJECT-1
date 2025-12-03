import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DAILYSHRTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_DATE: string;

  @Column()
  TRAN_NO: number;

  @Column({ nullable: true })
  SERIAL_NO: number;

  @Column()
  BRANCH_CODE: number;

  @Column({ nullable: true })
  TRAN_TIME: string;

  @Column({ nullable: true })
  TRAN_TYPE: string;

  @Column({ nullable: true })
  TRAN_MODE: number;

  @Column()
  TRAN_DRCR: string;

  @Column()
  TRAN_STATUS: string;

  @Column({ nullable: true })
  TRAN_ACNOTYPE: string;

  @Column({ nullable: true })
  TRAN_ACTYPE: number;

  @Column({ nullable: true })
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

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FACE_VALUE: number;

  @Column({ nullable: true })
  TRANSFER_ACTYPE_FROM: number;

  @Column({ nullable: true })
  TRANSFER_MEMBER_NO_FROM: string;

  @Column({ nullable: true })
  TRANSFER_ACTYPE_TO: number;

  @Column({ nullable: true })
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
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  TRAN_ENTRY_TYPE: string;

  @Column({ nullable: true })
  IS_AUTO_TRF_ENTRY: number;

  @Column({ nullable: true })
  TRAN_SOURCE_NO: number;

  @Column({ nullable: true })
  SH_CERTIFICATE_PRINTED: number;
}
