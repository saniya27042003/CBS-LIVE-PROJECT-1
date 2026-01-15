
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Unique, Index } from 'typeorm';
import { IDMASTER } from './customer-id.entity';
import { NOMINEELINK } from './nominee.entity';
// import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { JointAcLink } from './joint-account.entity';

import { ATTERONEYLINK } from './power-of-attorney.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { PIGMYCHARTMASTER } from './pigmyChart.entity'
@Entity()
@Unique(['BANKACNO'])
@Index("NDXPGMASTER", ["BRANCH_CODE", "AC_ACNOTYPE", "AC_TYPE", "BANKACNO"])
@Index("NDXPGMASTER1", ["BRANCH_CODE", "AC_ACNOTYPE", "AC_TYPE", "AC_NO"])
export class PGMASTER {

  @PrimaryGeneratedColumn()
  id: number;

  @Index('pgmasteracnotype')
  @Column()
  AC_ACNOTYPE: string;

  @Index('pgmasteractype')
  @Column()
  AC_TYPE: number;

  @Column({ nullable: true })
  AC_NAME: string;

  @Index('pgmasteracno')
  @Column()
  AC_NO: number;

  @Index('pgmasterbankacno')
  @Column({ length: 15 })
  BANKACNO: string

  @Column({ nullable: true })
  AC_CUSTID: number;

  @Column({ nullable: true })
  AC_SHORT_NAME: string;

  @Column({ nullable: true })
  REF_ACNO: string;

  @Column({ nullable: true })
  AC_MEMBTYPE: number;

  @Column({ nullable: true })
  AC_MEMBNO: number;

  @Column({ nullable: true })
  AC_AGE: number;

  @Column({ nullable: true })
  AC_OPDATE: string;

  @Column({ nullable: true })
  AC_RENEW_DATE: string;

  @Column({ nullable: true })
  AC_LINTEDT: string;


  @Column({ nullable: true })
  AC_EXPDT: string;

  @Column({ nullable: true })
  AC_OCODE: string;

  @Column({ nullable: true })
  AC_CATG: number;

  @Column({ nullable: true })
  AC_OPR_CODE: number;

  @Column({ nullable: true })
  AC_INTCATA: number;

  @Column({ nullable: true })
  AC_MONTHS: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SCHMAMT: number;

  @Column({ nullable: true })
  AGENT_BRANCH: number;

  @Column({ nullable: true })
  AGENT_ACTYPE: number;

  @Column({ nullable: true, length: 15 })
  AGENT_ACNO: string;

  @Column({ nullable: true, default: 0 })
  AC_MINOR: number

  @Column({ nullable: true })
  AC_MBDATE: string

  @Column({ nullable: true })
  AC_GRDNAME: string;

  @Column({ nullable: true })
  AC_GRDRELE: string;

  @Column({ nullable: true })
  AC_INTROBRANCH: string;

  @Column({ nullable: true })
  AC_INTROID: number;

  @Column({ nullable: true })
  AC_INTRACNO: string;

  @Column({ nullable: true })
  AC_INTRNAME: string;

  @Column({ nullable: true })
  SIGNATURE_AUTHORITY: string

  @Column({ nullable: true, default: 0 })
  PG_COMM_TYPE: string;

  @Column({ nullable: true })
  AC_IS_RECOVERY: boolean;

  @Column({ nullable: true })
  AC_REF_RECEIPTNO: string

  @Column({ nullable: true })
  AC_ASON_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_MATUAMT: number;

  @Column({ nullable: true })
  IS_DISCOUNTED_INT_RATE: boolean;

  //freez account fields
  @Column({ nullable: true })
  AC_FREEZE_STATUS: string

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_FREEZE_AMOUNT: number

  @Column({ nullable: true })
  AC_FREEZE_DATE: string

  @Column({ nullable: true })
  AC_FREEZE_REASON: string

  @Column({ default: 0 })
  IS_POST_INT_AC: number

  //dormant field
  @Column({ default: false })
  IS_DORMANT: boolean;

  //overdraft fields
  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_ODAMT: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SODAMT: number

  @Column({ nullable: true })
  AC_ODDAYS: number

  @Column({ nullable: true })
  AC_ODDATE: string

  @Column({ nullable: true, default: 1 })
  status: number

  @Column({ nullable: true })
  AC_CLOSEDT: string

  @CreateDateColumn()
  SYSADD_DATETIME: Date;

  @Column({ nullable: true })
  SYSADD_LOGIN: string;

  @UpdateDateColumn()
  SYSCHNG_DATETIME: Date;

  @Column({ nullable: true })
  SYSCHNG_LOGIN: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_PAYABLEAMT: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_INTERESTAMT: number
  //relation

  @Column({ unique: false })
  idmasterID: number

  @ManyToOne(() => IDMASTER, (idmaster) => idmaster.pgmaster, {
    cascade: true
  })
  @JoinColumn({ name: "idmasterID" })
  idmaster: IDMASTER[];

  @OneToMany(() => NOMINEELINK, (nomineeDetails) => nomineeDetails.pgmasterId, {
    cascade: ["insert", "update"]
  })
  nomineeDetails: NOMINEELINK[]

  @OneToMany(() => JointAcLink, (jointAccounts) => jointAccounts.pgmasterId, {
    cascade: ["insert", "update"]
  })
  jointAccounts: JointAcLink[]

  @OneToMany(() => ATTERONEYLINK, (powerOfAttorney) => powerOfAttorney.pgmasterId, {
    cascade: ["insert", "update"]
  })
  powerOfAttorney: ATTERONEYLINK[]

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(() => OWNBRANCHMASTER, (BranchCodeMaster) => BranchCodeMaster.branchCodePG, {
    cascade: true
  })
  @JoinColumn({ name: "BRANCH_CODE" })
  BranchCodeMaster: OWNBRANCHMASTER[];


  @ManyToOne(() => SCHEMAST, (PGMaster) => PGMaster.PGschemecode, {
    cascade: true
  })
  @JoinColumn({ name: "AC_TYPE" })
  PGMaster: SCHEMAST[];


  @OneToMany(() => PIGMYCHARTMASTER, (pigmychart) => pigmychart.accountId, {
    cascade: ["insert", "update"]
  })
  pigmychart: PIGMYCHARTMASTER[]

  // @OneToMany(() => DPMASTER, (pgmasterdata) => pgmasterdata.pgmasterdata, {
  //   cascade: ["insert", "update"]
  // })
  // pgmasterdata: DPMASTER[]

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PAYBLEINT_OP: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_OP_BAL: number;

  @Column({ nullable: true })
  AC_OP_CD: string

  @Column({ default: 0 })
  AC_CLOSED: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_PRODUCT: number

  @Column({ nullable: true })
  AC_BALDATE: string

  @Column({ nullable: true })
  AC_ACTDATE: string

  @Column({ nullable: true })
  AC_LINTDT: string

  @Column({ nullable: true })
  LAST_OD_INT_DATE: string;

  @Column({ nullable: true })
  AC_RECOMMEND_BY: number
}

