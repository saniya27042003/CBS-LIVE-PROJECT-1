import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SECURITYDETAILS } from './security.entity';
import { IDMASTER } from './customer-id.entity';
import { GUARANTERDETAILS } from './guarantor.entity';
import { LNMASTER } from './term-loan-master.entity';

@Entity()
export class LNDISPUTEDETAILS {
  @PrimaryGeneratedColumn()
  id: number;

  // AC_ACNOTYPE:string;
  // basic
  // @Column({ nullable: true })
  // AC_ACNOTYPE:string;

  // @Column({ nullable: true })
  // AC_NO: string;

  // @Column({ nullable: true })
  // REF_AC_NO:string;

  // @Column({ nullable: true })
  // REF_AC_TYPE: string;

  // @Column({ nullable: true })
  // AC_CUSTID: string;

  // @Column({ nullable: true })
  // AC_NAME: string;

  // @Column({ nullable: true })
  // AC_OPDATE: string;

  // @Column({ nullable: true })
  // AC_MEMBTYPE: string;

  // @Column({ nullable: true })
  // AC_MEMBNO: string;

  // @Column({ nullable: true })
  // AC_CAST: string;

  // @Column({ nullable: true })
  // AC_OCODE: string;

  // @Column({ nullable: true })
  // AC_INTCATA: string;

  // @Column({ nullable: true })
  // AC_HEALTH: string;

  // @Column({ nullable: true })
  // AC_REPAYMODE: string;

  // @Column({ nullable: true })
  // AC_SANCTION_AMOUNT: string;

  // @Column({ nullable: true })
  // AC_SANCTION_DATE: string;

  // @Column({ nullable: true })
  // AC_DRAWPOWER_AMT: string;

  // @Column({ nullable: true })
  // AC_INSTALLMENT: string;

  // @Column({ nullable: true })
  // AC_MONTHS: string;

  // @Column({ nullable: true })
  // AC_MORATORIUM_PERIOD: string;

  // @Column({ nullable: true })
  // AC_GRACE_PERIOD: string;

  // @Column({ nullable: true })
  // AC_EXPIRE_DATE: string;

  // @Column({ nullable: true })
  // AC_INTRATE: string;

  // @Column({ nullable: true })
  // AC_PENALINTRATE: string;

  // @Column({ nullable: true })
  // EFFECT_DATE: string;

  // // other details
  // @Column({ nullable: true })
  // AC_AUTHORITY: string;

  // @Column({ nullable: true })
  // AC_RECOMMEND_BY: string;

  // @Column({ nullable: true })
  // AC_PRIORITY: string;

  // @Column({ nullable: true })
  // AC_PURPOSE: string;

  // @Column({ nullable: true })
  // AC_INDUSTRY: string;

  // @Column({ nullable: true })
  // AC_WEAKER: string;

  // @Column({ nullable: true })
  // AC_RELATION_TYPE: string;

  // @Column({ nullable: true })
  // AC_DIRECTOR: string;

  // @Column({ nullable: true })
  // AC_DIRECTOR_RELATION: string;

  // @Column({ nullable: true })
  // AC_COREG_NO: string;

  // @Column({ nullable: true })
  // AC_COREG_DATE: string;

  // @Column({ nullable: true })
  // AC_COREG_AMT: string;

  // @Column({ nullable: true })
  // AC_RESO_NO: string;

  // @Column({ nullable: true })
  // AC_RESO_DATE: string;

  // // address

  // @Column({ nullable: true })
  // AC_HONO: string;

  // @Column({ nullable: true })
  // AC_WARD: string;

  // @Column({ nullable: true })
  // AC_GALLI: string;

  // @Column({ nullable: true })
  // AC_AREA: string;

  // @Column({ nullable: true })
  // AC_ADDR: string;

  // @Column({ nullable: true })
  // AC_CTCODE: string;

  // @Column({ nullable: true })
  // AC_PIN: string;

  // @Column({ nullable: true })
  // AC_PHNO: string;

  // @Column({ nullable: true })
  // AC_MOBNO: string;

  // @Column({ nullable: true })
  // AC_EMAIL: string;

  // @Column({ nullable: true })
  // AC_ADDFLAG: string;

  // @Column({ nullable: true })
  // AC_THONO: string;

  // @Column({ nullable: true })
  // AC_TWARD: string;

  // @Column({ nullable: true })
  // AC_TGALLI: string;

  // @Column({ nullable: true })
  // AC_TAREA: string;

  // @Column({ nullable: true })
  // AC_TADDR: string;

  // @Column({ nullable: true })
  // AC_TCTCODE: string;

  // @Column({ nullable: true })
  // AC_TPIN: string;

  // //guarantor -securities

  // @Column({ nullable: true })
  // MEMBER_TYPE: string;

  // @Column({ nullable: true })
  // MEMBER_NO: string;

  // @Column({ nullable: true })
  // NAME: string;

  // @Column({ nullable: true })
  // EXP_DATE: string;

  // @Column({ nullable: true })
  // AC_ADDR1: string;

  // @Column({ nullable: true })
  // AC_ADDR2: string;

  // @Column({ nullable: true })
  // AC_ADDR3: string;

  // @Column({ nullable: true })
  // CTCODE: string;

  // @Column({ nullable: true })
  // SECURITY_CODE:string;

  // @Column({ nullable: true })
  // SECURITY_VALUE:string;

  // // dispute setails
  // @Column({ nullable: true })
  // CASE_SUITE_DATE: string;

  // @Column({ nullable: true })
  // COURT_INT_RATE: string;

  // @Column({ nullable: true })
  // COURT_INSTALLMENT: string;

  // @Column({ nullable: true })
  // COURT_ORDER_DATE: string;

  // @Column({ nullable: true })
  // SUITE_AMT: string;

  // @Column({ nullable: true })
  // COURT_RESULT_DATE: string;

  // @Column({ nullable: true })
  // BRANCH_CODE: string;

  // @Column({ nullable: true })
  // RECOVERABLE_AMT: string;

  // @Column({ nullable: true })
  // INT_CALC_DATE: string;

  // @Column({ nullable: true })
  // RECOVERABLE_INT: string;

  // @Column({ nullable: true })
  // COURT_CASE_NO: string;

  // @Column({ nullable: true })
  // REF_OLD_AC_TYPE: string;

  // @Column({ nullable: true })
  // REF_OLD_AC_NO: string;

  // @Column({ nullable: true })
  // ADVOCATE: string;

  // @Column({ nullable: true })
  // LOAN_STAGE: string;

  // @Column({ nullable: true })
  // COURT: string;

  // @Column({ nullable: true })
  // AC_REMARK: string;
  // // documents
  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column({ nullable: true })
  AC_TYPE: number;

  @Column({ nullable: true })
  AC_NO: number;

  @Column({ nullable: true })
  AC_NAME: string;

  @Column({ nullable: true })
  REF_AC_ACNOTYPE: string;

  @Column({ nullable: true })
  REF_AC_TYPE: string;

  @Column({ nullable: true })
  REF_AC_NO: number;

  @Column({ nullable: true })
  REF_OLD_AC_NO: string;

  @Column({ nullable: true })
  COURT: string;

  @Column({ nullable: true })
  CASE_SUITE_DATE: string;

  @Column({ nullable: true })
  COURT_ORDER_DATE: string;

  @Column({ nullable: true })
  COURT_RESULT_DATE: string;

  @Column({ nullable: true })
  COURT_CASE_NO: string;

  @Column({ nullable: true })
  COURT_INT_RATE: string;

  @Column({ nullable: true })
  SUITE_AMT: string;

  @Column({ nullable: true })
  COURT_INSTALLMENT: string;

  @Column({ nullable: true })
  RECOVERABLE_AMT: string;

  @Column({ nullable: true })
  RECOVERABLE_INT: string;

  @Column({ nullable: true })
  INT_CALC_DATE: string;

  @Column({ nullable: true })
  LOAN_STAGE: string;

  @Column({ nullable: true })
  ADVOCATE: string;

  @Column({ nullable: true })
  REF_OLD_AC_TYPE: string;

  @Column({ nullable: true })
  AC_REMARK: string;

  @Column({ nullable: true })
  lnDisputemasterID: number;
  @ManyToOne(
    () => LNDISPUTEDETAILS,
    (disputeloan) => disputeloan.disputeloanmaster,
  )
  @JoinColumn({ name: 'lnDisputemasterID' })
  disputeloanmaster: LNDISPUTEDETAILS[];

  @OneToMany(() => LNMASTER, (termloan) => termloan.lnmaster, {
    cascade: ['insert', 'update'],
  })
  termloan: LNMASTER[];

  @OneToMany(
    () => GUARANTERDETAILS,
    (guaranterMaster) => guaranterMaster.lnmaster,
    {
      cascade: ['insert', 'update'],
    },
  )
  guaranterMaster: GUARANTERDETAILS[];

  @OneToMany(
    () => SECURITYDETAILS,
    (securityMaster) => securityMaster.lnmaster,
    {
      cascade: ['insert', 'update'],
    },
  )
  securityMaster: SECURITYDETAILS[];
  // securityMaster: SECURITYDETAILS[];
  // AC_ADDFLAG: boolean;
  // AC_THONO: string;
  // AC_TWARD: string;
  // AC_TADDR: string;
  // AC_TGALLI: string;
  // AC_TAREA: string;
  // AC_TCTCODE: string;
  // AC_TPIN: string;
  // AC_CUSTID: any;
  // GuarantorData: any;
  // SecurityData: any;
}
