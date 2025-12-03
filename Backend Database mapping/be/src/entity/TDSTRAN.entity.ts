import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TDSTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_DATE: string;

  @Column()
  SERIAL_NO: number;

  @Column()
  FIN_YEAR: number;

  @Column()
  AC_CUSTID: number;

  @Column()
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;

  @Column({ length: 15 })
  AC_NO: string;

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @Column({ nullable: true })
  LAST_TDS_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INTEREST_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TDS_AMOUNT: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  TDS_RATE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  IS_TDS_DEDUCTED: number;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINANCIAL_INTEREST: number;
}
