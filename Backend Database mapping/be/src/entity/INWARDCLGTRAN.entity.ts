import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class INWARDCLGTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_NO: number;

  @Column()
  TRAN_YEAR: string;

  @Column()
  BRANCH_CODE: number;

  @Column()
  TRAN_DATE: string;

  @Column({ nullable: true })
  TRAN_TIME: string;

  @Column({ nullable: true })
  TRAN_TYPE: string;

  @Column({ nullable: true })
  TRAN_DRCR: string;

  @Column({ nullable: true })
  TRAN_ACNOTYPE: string;

  @Column({ nullable: true })
  TRAN_ACTYPE: string;

  @Column({ nullable: true })
  TRAN_ACNO: number;

  @Column({ nullable: true })
  TRAN_AMOUNT: number;

  @Column()
  TRAN_GLACNO: number;

  @Column()
  BANK_CODE: number;

  @Column()
  CHEQUE_NO: number;

  @Column({ nullable: true })
  CHEQUE_SERIES: string;

  @Column()
  CHEQUE_DATE: string;

  @Column({ nullable: true })
  REJECTION_CODE: number;

  @Column({ nullable: true })
  REJECTION_CHARGES: number;

  @Column({ nullable: true })
  REJECTION_DATE: string;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  DAILY_TRAN_NO: number;

  @Column({ nullable: true })
  PAYORDER_NO: number;

  @Column({ nullable: true })
  PO_SERIES: string;

  @Column({ nullable: true })
  EFFECT_DATE: string;

  @Column({ nullable: true })
  AUTO_CLG_TALLY_TRAN_NO: number;

  @Column({ nullable: true })
  CLG_HO_CHARGES: number;
}
