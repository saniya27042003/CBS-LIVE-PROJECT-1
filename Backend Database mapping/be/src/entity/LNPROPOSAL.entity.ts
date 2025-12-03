import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LNPROPOSAL {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_YEAR: string;

  @Column()
  TRAN_DATE: string;

  @Column()
  TRAN_NO: string;

  @Column()
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;

  @Column()
  AC_NAME: string;

  @Column({ nullable: true })
  AC_TITLE: string;

  @Column({ nullable: true })
  AC_SEXCODE: string;

  @Column({ nullable: true })
  AC_MEMBTYPE: number;

  @Column({ nullable: true })
  AC_MEMBNO: number;

  @Column({ nullable: true })
  AC_CUSTID: number;

  @Column({ nullable: true })
  AC_OCODE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SANCTION_AMOUNT: number;

  @Column({ nullable: true })
  AC_RESO_NO: string;

  @Column({ nullable: true })
  AC_RESO_DATE: string;

  @Column({ nullable: true })
  AC_MONTHS: number;

  @Column({ nullable: true })
  AC_EXPIRE_DATE: string;

  @Column({ nullable: true })
  AC_AUTHORITY: number;

  @Column({ nullable: true })
  AC_REMARK: string;

  @Column({ nullable: true })
  AC_REPAYMODE: string;

  @Column({ nullable: true })
  REJECT_REASON: string;

  @Column({ nullable: true })
  SANCTION_DATE: string;

  @Column({ nullable: true })
  REJECT_DATE: string;

  @Column()
  USER_CODE: string;

  @Column({ nullable: true })
  OFFICER_CODE: string;

  @Column({ nullable: true })
  FORWARD_DATE: string;
}
