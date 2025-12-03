import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BANKDEPOTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_DATE: string;

  @Column()
  TRAN_NO: number;

  @Column()
  SERIAL_NO: number;

  @Column({ nullable: true })
  TRAN_TIME: string;

  @Column()
  TRAN_TYPE: string;

  @Column()
  BRANCH_CODE: number;

  @Column()
  TRAN_ACNOTYPE: string;

  @Column()
  TRAN_ACTYPE: string;

  @Column({ length: 15 })
  TRAN_ACNO: String;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INTEREST_AMOUNT: number;

  @Column({ nullable: true })
  AC_LINTEDT: string;

  @Column({ nullable: true })
  CREDIT_GLACNO: number;

  @Column({ default: 0 })
  TRAN_STATUS: number;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ default: 0 })
  IS_CLOSING_ENTRY: number;

  @Column({ nullable: true })
  DEBIT_ACTYPE: string;

  @Column({ nullable: true })
  DEBIT_GLACNO: number;
}
