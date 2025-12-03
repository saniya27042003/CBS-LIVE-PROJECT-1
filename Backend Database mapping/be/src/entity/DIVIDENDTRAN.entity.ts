import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DIVIDENDTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  TRAN_DATE: string;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column({ default: 0 })
  TRAN_ACTYPE: number;

  @Column()
  TRAN_ACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DIVIDEND_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  KAYAM_INTEREST: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  MASHIK_DEPOSIT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  MASHIK_INTEREST: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  SEVAK_DED_AMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  JUSEVAK_DED_AMT: number;

  @Column({ length: 15 })
  BANK_ACNO: string;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column({ nullable: true })
  AC_SALARYDIV: number;

  @Column({ nullable: true })
  SUB_SALARYDIV: number;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  POST_TO_AC: number;
}
