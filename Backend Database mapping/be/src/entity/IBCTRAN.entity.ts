import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IBCTRAN {
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
  HO_SUB_GLACNO: number;

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

  @Column()
  DRAWEE_NAME: string;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column({ nullable: true })
  COLLECTION_STATUS: string;

  @Column({ nullable: true })
  COLLECTION_DATE: string;

  @Column({ nullable: true })
  EFFECTED_AMOUNT: number;

  @Column({ nullable: true })
  CHARGES_AMOUNT: number;

  @Column()
  BANK_BRANCH_NAME: string;

  @Column({ nullable: true })
  BANK_BRANCH_ADDRESS: string;

  @Column({ nullable: true })
  RETURN_CODE: number;

  @Column({ nullable: true })
  NARRATION: string;

  @Column({ nullable: true })
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  DOC_TYPE: string;

  @Column({ nullable: true })
  DOC_REF_NO: number;
}
