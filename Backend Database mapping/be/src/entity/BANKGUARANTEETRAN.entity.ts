import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BANKGUARANTEETRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ID_TYPE: string;

  @Column()
  BG_NO: number;

  @Column()
  BANEFICIERY_NAME: string;

  @Column({ nullable: true })
  ADDR1: string;

  @Column({ nullable: true })
  ADDR2: string;

  @Column({ nullable: true })
  ADDR3: string;

  @Column({ nullable: true })
  CITY_CODE: number;

  @Column({ nullable: true })
  PIN_CODE: number;

  @Column({ nullable: true })
  PHONE_OFFICE: string;

  @Column({ nullable: true })
  PHONE_RES: string;

  @Column({ nullable: true })
  ISSUE_DATE: string;

  @Column({ nullable: true })
  BG_REF_NO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  BG_AMOUNT: number;

  @Column({ nullable: true })
  EXPIRE_DATE: string;

  @Column({ nullable: true })
  MONTHS: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  SECURITY_AMT: number;

  @Column()
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: string;

  @Column()
  AC_NO: number;

  @Column({ nullable: true })
  PURPOSE: string;

  @Column({ nullable: true })
  SECURITY_DETAILS: string;

  @Column({ nullable: true })
  REMARK: string;

  @Column({ nullable: true })
  CLOSE_DATE: string;

  @Column({ nullable: true })
  RENEWAL_COUNTER: number;

  @Column({ default: 0 })
  TRAN_STATUS: number;

  @Column()
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  CLOSE_OFFICER_CODE: string;

  @Column({ nullable: true })
  CITY_NAME: string;
}
