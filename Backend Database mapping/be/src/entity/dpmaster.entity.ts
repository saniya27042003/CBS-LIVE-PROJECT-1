import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { IDMASTER } from './customer-id.entity';
import { JointAcLink } from './joint-account.entity';
import { NOMINEELINK } from './nominee.entity';
import { ATTERONEYLINK } from './power-of-attorney.entity';
import { INTCATEGORYMASTER } from './interest-category-master.entity';
import { CATEGORYMASTER } from './category-master.entity';
import { OPERATIONMASTER } from './operation-master.entity';
import { BALACATA } from './minimum-balance-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { PGMASTER } from './pgmaster.entity';

@Entity()
@Unique(['BANKACNO'])
@Index('NDXDPMASTER', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'BANKACNO'])
@Index('NDXDPMASTER1', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'AC_NO'])
export class DPMASTER {
  @PrimaryGeneratedColumn()
  id: number;
  @Index('dpmasteracnotype')
  @Column()
  AC_ACNOTYPE: string;

  @Index('dpmasteractype')
  @Column()
  AC_TYPE: number;

  @Index('dpmasteracno')
  @Column()
  AC_NO: number;

  @Index('dpmasterbankacno')
  @Column({ length: 15 })
  BANKACNO: string;

  @Column({ nullable: true })
  AC_NAME: string;

  @Column({ nullable: true })
  AC_CATG: number;

  @Column({ nullable: true })
  AC_BALCATG: number;

  @Column({ nullable: true })
  AC_OPR_CODE: number;

  @Column({ nullable: true })
  AC_CUSTID: number;

  @Column({ nullable: true })
  AC_INTCATA: number;

  @Column({ nullable: true })
  AC_OPDATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SCHMAMT: number;

  @Column({ nullable: true })
  REF_ACNO: string;

  @Column({ nullable: true, default: 0 })
  AC_MINOR: string;

  @Column({ nullable: true })
  AC_MBDATE: string;

  @Column({ nullable: true })
  AC_GRDNAME: string;

  @Column({ nullable: true })
  AC_GRDRELE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_PAYABLEAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_INTERESTAMT: number;

  @Column({ nullable: true })
  AC_INTROBRANCH: number;
  @ManyToOne(() => OWNBRANCHMASTER, (BranchMaster) => BranchMaster.branch, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_INTROBRANCH' })
  BranchMaster: OWNBRANCHMASTER[];

  @Column({ nullable: true })
  AC_INTROID: string;

  @Column({ nullable: true, length: 15 })
  AC_INTRACNO: string;

  @Column({ nullable: true })
  AC_INTRNAME: string;

  @Column({ nullable: true })
  SIGNATURE_AUTHORITY: string;

  @Column({ default: 0 })
  IS_POST_INT_AC: number;

  //current Account field
  @Column({ nullable: true })
  AC_PROPRITOR_NAME: string;

  //Pigmy agent
  @Column({ nullable: true })
  PIGMY_ACTYPE: number;
  @ManyToOne(() => SCHEMAST, (PGDPMaster) => PGDPMaster.PGDPMaster, {
    cascade: true,
  })
  @JoinColumn({ name: 'PIGMY_ACTYPE' })
  PGDPMaster: SCHEMAST[];

  //INVESTMENT

  @Column({ nullable: true })
  INVEST_BANK: string;

  @Column({ nullable: true })
  INVEST_BRANCH: string;

  @Column({ nullable: true })
  AC_REF_RECEIPTNO: string;

  @Column({ nullable: true })
  AC_ASON_DATE: string;

  @Column({ nullable: true })
  AC_EXPDT: string;

  @Column({ nullable: true })
  AC_MONTHS: number;

  @Column({ nullable: true })
  AC_DAYS: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  AC_INTRATE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_MATUAMT: number;

  @Column({ nullable: true })
  AC_CLOSEDT: string;

  //Anamat form entity

  @Column({ nullable: true })
  DEBIT: string;

  @Column({ nullable: true })
  AC_PARTICULAR: string;

  @Column({ default: 0 })
  AC_IS_RECOVERY: number;

  @CreateDateColumn()
  SYSADD_DATETIME: Date;

  @Column({ nullable: true })
  SYSADD_LOGIN: string;

  @UpdateDateColumn()
  SYSCHNG_DATETIME: Date;

  @Column({ nullable: true })
  SYSCHNG_LOGIN: string;

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
  AC_MEMBTYPE: number;

  @Column({ nullable: true })
  AC_MEMBNO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_OP_BAL: number;

  //dormant field
  @Column({ default: false })
  IS_DORMANT: boolean;

  //term deposit field

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  IS_DISCOUNTED_INT_RATE: number;

  //relation

  @Column({ nullable: true })
  idmasterID: number;

  @Column({ nullable: true, default: 1 })
  status: number;

  @ManyToOne(() => IDMASTER, (idmaster) => idmaster.dpmaster, {
    cascade: true,
  })
  @JoinColumn({ name: 'idmasterID' })
  idmaster: IDMASTER[];

  @OneToMany(() => NOMINEELINK, (nomineeDetails) => nomineeDetails.dpmasterId, {
    cascade: ['insert', 'update'],
  })
  nomineeDetails: NOMINEELINK[];

  @OneToMany(() => JointAcLink, (jointAccounts) => jointAccounts.dpmasterId, {
    cascade: ['insert', 'update'],
  })
  jointAccounts: JointAcLink[];

  @OneToMany(
    () => ATTERONEYLINK,
    (powerOfAttorney) => powerOfAttorney.dpmasterId,
    {
      cascade: ['insert', 'update'],
    },
  )
  powerOfAttorney: ATTERONEYLINK[];

  @ManyToOne(
    () => INTCATEGORYMASTER,
    (intCategory) => intCategory.interestCategory,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'AC_INTCATA' })
  intCategory: INTCATEGORYMASTER[];

  @ManyToOne(
    () => CATEGORYMASTER,
    (CategoryMaster) => CategoryMaster.DPcategory,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'AC_CATG' })
  CategoryMaster: CATEGORYMASTER[];

  @ManyToOne(
    () => OPERATIONMASTER,
    (OperationMaster) => OperationMaster.operation,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'AC_OPR_CODE' })
  OperationMaster: OPERATIONMASTER[];

  @ManyToOne(
    () => BALACATA,
    (MinimumBalanceMaster) => MinimumBalanceMaster.minimumBalance,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'AC_BALCATG' })
  MinimumBalanceMaster: BALACATA[];

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BranchCodeMaster) => BranchCodeMaster.branchcode,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER[];

  @ManyToOne(() => SCHEMAST, (DPMaster) => DPMaster.DPschemecode, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_TYPE' })
  DPMaster: SCHEMAST[];

  @Column({ default: 0 })
  AC_CLOSED: number;

  @Column({ nullable: true })
  AC_PRODUCT: string;

  @Column({ nullable: true })
  AC_LINTEDT: string;

  @Column({ nullable: true })
  AC_BALDATE: string;

  @Column({ nullable: true })
  AC_ACTDATE: string;

  @Column({ nullable: true })
  AC_OP_CD: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PINT_OP: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PAYBLEINT_OP: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_ODEPINS: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PAID_INT_OP: number;

  @Column({ nullable: true })
  OP_CR_INT_FIN_YEAR: string;

  @Column({ nullable: true })
  OP_INT_PAID_FIN_YEAR: string;

  @Column({ nullable: true })
  LAST_TDS_DATE: string;

  @Column({ nullable: true })
  AC_LINTDT: string;

  @Column({ nullable: true })
  AC_KEYWORD: string;

  @Column({ nullable: true })
  LOCKER_NO: string;

  @Column({ nullable: true })
  RACK_NO: string;

  @Column({ nullable: true })
  TD_ACTYPE: Number;

  @Column({ nullable: true })
  TD_ACNO: string;

  @Column({ nullable: true })
  LAST_OD_INT_DATE: string;

  @Column({ nullable: true })
  AC_RECOMMEND_BY: string;

  @Column({ default: 0 })
  REQ_RENEW: number;
}
