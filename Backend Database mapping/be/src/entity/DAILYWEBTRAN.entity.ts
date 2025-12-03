import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DAILYWEBTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  TRAN_NO: number;

  @Column({ nullable: true })
  SERIAL_NO: number;

  @Column()
  BRANCH_CODE: number;

  @Column()
  BANK_CODE: string;

  @Column({ nullable: true })
  CHART_NO: number;

  @Column({ nullable: true })
  TRAN_DATE: string;

  @Column({ nullable: true })
  TRAN_TIME: string;

  @Column({ nullable: true })
  TRAN_DRCR: string;

  @Column()
  TRAN_MODE: number;

  @Column({ nullable: true })
  TRAN_TYPE: string;

  @Column({ nullable: true })
  AGENT_ACNOTYPE: string;

  @Column({ nullable: true })
  AGENT_ACTYPE: number;

  @Column({ length: 15 })
  AGENT_ACNO: string;

  @Column({ nullable: true })
  TRAN_ACNOTYPE: string;

  @Column({ nullable: true })
  TRAN_ACTYPE: string;

  @Column({ length: 15 })
  TRAN_ACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ nullable: true })
  TRAN_GLACNO: number;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column({ nullable: true })
  RECEIPT_NO: number;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  AC_CLOSED: number;

  @Column({ nullable: true })
  ENTRY_TYPE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;
}
