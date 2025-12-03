import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
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
  Unique,
  Index,
} from 'typeorm';
import { COBORROWER } from './coborrower.entity';
import { IDMASTER } from './customer-id.entity';
import { LNDISPUTEDETAILS } from './dispute-loan-master.entity';
import { GUARANTERDETAILS } from './guarantor.entity';
import { SECURITYDETAILS } from './security.entity';
import { PURPOSEMASTER } from './purpose-master.entity';
import { AUTHORITYMASTER } from './authority-master.entity';

@Entity()
@Unique(['BANKACNO'])
@Index('NDXLNMASTER', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'BANKACNO'])
@Index('NDXLNMASTER1', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'AC_NO'])
export class LNMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('lnmasteracnotype')
  @Column()
  AC_ACNOTYPE: string;

  @Index('lnmasteractype')
  @Column()
  AC_TYPE: number;

  @Index('lnmasteracno')
  @Column()
  AC_NO: number;

  @Column({ nullable: true })
  AC_CUSTID: number;

  @Index('lnmasterbankacno')
  @Column({ length: 15 })
  BANKACNO: string;

  @Column({ nullable: true })
  AC_NAME: string;

  @Column({ nullable: true })
  AC_OPDATE: string;

  @Column({ nullable: true })
  AC_OPEN_OLD_DATE: string;

  @Column({ nullable: true, default: 0 })
  AC_IS_RECOVERY: number;

  @Column({ nullable: true, default: 0 })
  IS_WEAKER: number;

  @Column({ nullable: true })
  REF_ACNO: string;

  @Column({ nullable: true })
  AC_INTCATA: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SANCTION_AMOUNT: number;

  @Column({ nullable: true })
  AC_SANCTION_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_DRAWPOWER_AMT: number;

  @Column({ nullable: true })
  AC_MONTHS: number;

  @Column({ nullable: true })
  AC_EXPIRE_DATE: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  AC_INTRATE: number;

  @Column({ nullable: true })
  AC_REPAYMODE: string;

  @Column({ nullable: true })
  INSTALLMENT_METHOD: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_INSTALLMENT: number;

  @Column({ nullable: true })
  AC_MORATORIUM_PERIOD: number;

  @Column({ nullable: true })
  AC_GRACE_PERIOD: number;

  @Column({ nullable: true })
  AC_AUTHORITY: number;
  @ManyToOne(() => AUTHORITYMASTER, (authority) => authority.authority, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_AUTHORITY' })
  authority: AUTHORITYMASTER[];

  @Column({ nullable: true })
  AC_RECOMMEND_BY: number;

  @Column({ nullable: true })
  AC_RECOVERY_CLERK: number;

  @Column({ nullable: true })
  AC_PRIORITY: number;

  @Column({ nullable: true })
  AC_PRIORITY_SUB1: number;

  @Column({ nullable: true })
  AC_PRIORITY_SUB2: number;

  @Column({ nullable: true })
  AC_PRIORITY_SUB3: number;

  @Column({ nullable: true })
  AC_WEAKER: number;

  @Column({ nullable: true })
  AC_PURPOSE: number;
  @ManyToOne(() => PURPOSEMASTER, (purpose) => purpose.purpose, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_PURPOSE' })
  purpose: PURPOSEMASTER[];

  @Column({ nullable: true })
  AC_INDUSTRY: number;

  @Column({ nullable: true })
  AC_HEALTH: number;

  @Column({ nullable: true })
  AC_RELATION_TYPE: string;

  @Column({ nullable: true })
  AC_DIRECTOR: number;

  @Column({ nullable: true })
  AC_DIRECTOR_RELATION: string;

  @Column({ nullable: true })
  AC_COREG_NO: string;

  @Column({ nullable: true })
  AC_COREG_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_COREG_AMT: number;

  @Column({ nullable: true })
  AC_RESO_NO: string;

  @Column({ nullable: true })
  AC_RESO_DATE: string;
  //freez account fields
  @Column({ nullable: true })
  AC_FREEZE_STATUS: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_FREEZE_AMOUNT: number;

  @Column({ nullable: true })
  AC_FREEZE_DATE: string;

  @Column({ nullable: true })
  AC_FREEZE_REASON: string;

  //overdraft fields
  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_ODAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SODAMT: number;

  @Column({ nullable: true })
  AC_ODDAYS: number;

  @Column({ nullable: true })
  AC_ODDATE: string;

  @Column({ nullable: true })
  AC_REMARK: string;

  @Column({ nullable: true, default: 1 })
  status: number;

  @Column({ nullable: true })
  AC_CLOSEDT: string;

  @Column({ default: 0 })
  AC_CLOSED: number;

  @CreateDateColumn()
  SYSADD_DATETIME: Date;

  @Column({ nullable: true })
  SYSADD_LOGIN: string;

  @UpdateDateColumn()
  SYSCHNG_DATETIME: Date;

  @Column({ nullable: true })
  SYSCHNG_LOGIN: string;

  //dormant field
  @Column({ default: false })
  IS_DORMANT: boolean;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_PAYABLEAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_INTERESTAMT: number;

  //NPA opening Details Entry fields
  @Column({ nullable: true })
  AC_ACTDATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_OP_TOTAL_DEPOSITAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OP_POSTED_INT: number;

  @Column({ nullable: true })
  IS_DISPUTE_LOAN: string;

  @Column({ default: 0 })
  IS_POST_INT_AC: number;

  @Column({ default: 0 })
  IS_AGGRI_LOAN: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_OP_BAL: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PAYBLEINT_OP: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PINT_OP: number;

  @Column({ nullable: true })
  AC_MEMBTYPE: number;

  @Column({ nullable: true })
  AC_MEMBNO: number;

  //relation

  @Column({ unique: false })
  idmasterID: number;

  @ManyToOne(() => IDMASTER, (termLoan) => termLoan.termLoan, {
    cascade: true,
  })
  @JoinColumn({ name: 'idmasterID' })
  idmaster: IDMASTER[];

  @OneToMany(
    () => GUARANTERDETAILS,
    (guaranterMaster) => guaranterMaster.lnmaster,
    {
      cascade: ['insert', 'update'],
    },
  )
  guaranterMaster: GUARANTERDETAILS[];

  @OneToMany(
    () => COBORROWER,
    (CoborrowerMaster) => CoborrowerMaster.lnmaster,
    {
      cascade: ['insert', 'update'],
    },
  )
  CoborrowerMaster: COBORROWER[];
  lnmaster: any;

  @OneToMany(
    () => LNDISPUTEDETAILS,
    (disputeloan) => disputeloan.lnDisputemasterID,
    {
      cascade: ['insert', 'update'],
    },
  )
  disputeloanMaster: LNDISPUTEDETAILS[];

  @OneToMany(
    () => SECURITYDETAILS,
    (securityMaster) => securityMaster.lnmaster,
    {
      cascade: ['insert', 'update'],
    },
  )
  securityMaster: SECURITYDETAILS[];

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BranchCodeMaster) => BranchCodeMaster.branchCodeLN,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER[];

  @ManyToOne(() => SCHEMAST, (LNCCMaster) => LNCCMaster.lncccode, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_TYPE' })
  LNCCMaster: SCHEMAST[];

  @OneToMany(() => LNMASTER, (termLoan) => termLoan.termLoan, {
    cascade: ['insert', 'update'],
  })
  termLoan: LNMASTER[];
  // @OneToMany(() => LNACINTRATE, (lnacint) => lnacint.lnacintrate, {
  //     cascade: ["insert", "update"]
  // })
  // lnacint: LNACINTRATE[]

  // @OneToMany(() => NOMINEELINK, (nomineeDetails) => nomineeDetails.sharesId, {
  //     cascade: ["insert", "update"]
  // })
  // nomineeDetails: NOMINEELINK[]

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SECURITY_AMT: number;

  @Column({ nullable: true })
  AC_OP_CD: string;

  @Column({ nullable: true })
  AC_BALDATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PAID_INT_OP: number;

  @Column({ nullable: true })
  AC_LINTEDT: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_RECBLEODUEINT_OP: number;

  @Column({ nullable: true })
  OP_NPA_DATE: string;

  @Column({ nullable: true })
  AC_LINTDT: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_RECBLEINT_OP: number;
}
