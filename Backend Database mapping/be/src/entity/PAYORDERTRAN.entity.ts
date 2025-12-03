import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PAYORDERTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  PO_TRAN_NO: number;

  @Column()
  PO_TRAN_DATE: string;

  @Column({ nullable: true })
  PO_TRAN_TIME: string;

  @Column({ nullable: true })
  SOURCE_TYPE: string;

  @Column()
  SOURCE_TRAN_NO: number;

  @Column()
  SOURCE_TRAN_TYPE: string;

  @Column()
  SOURCE_TRAN_MODE: string;

  @Column({ nullable: true })
  SOURCE_TRAN_DRCR: string;

  @Column()
  BRANCH_CODE: number;

  @Column()
  SOURCE_TRAN_ACNOTYPE: string;

  @Column()
  SOURCE_TRAN_ACTYPE: string;

  @Column()
  SOURCE_TRAN_ACNO: number;

  @Column({ nullable: true })
  PURCHASER_NAME: string;

  @Column({ nullable: true })
  PURCHASER_ADDRESS: string;

  @Column({ nullable: true })
  CITY_CODE: number;

  @Column({ nullable: true })
  VOUCHER_AMOUNT: number;

  @Column({ nullable: true })
  BANK_COMMISSION_AMOUNT: number;

  @Column({ nullable: true })
  OTHER_AMOUNT: number;

  @Column({ nullable: true })
  OTHER_GLACNO: number;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  REJECT_OFFICER_CODE: string;
}
