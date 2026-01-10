import {
  Column,
  CreateDateColumn,
  Entity,
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

@Entity()
@Unique(['BANKACNO'])
@Index('NDXDPMASTER', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'BANKACNO'])
@Index('NDXDPMASTER1', ['BRANCH_CODE', 'AC_ACNOTYPE', 'AC_TYPE', 'AC_NO'])
export class DPMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
BANKACNO: number;


  @Column()
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;

  @Column()
  AC_NO: number;

//   @Column({ length: 15 })
//   BANKACNO: string;

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

  @Column({ nullable: true })
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

  /* ===================== FK COLUMNS ===================== */

  @Column({ nullable: true })
  AC_INTROBRANCH: number;

  @Column({ nullable: true })
  PIGMY_ACTYPE: number;

  @Column({ nullable: true })
  idmasterID: number;

  @Column({ nullable: true })
  BRANCH_CODE: number;

  /* ===================== RELATIONS (NO CASCADE) ===================== */

  @ManyToOne(() => OWNBRANCHMASTER, { cascade: false })
  @JoinColumn({ name: 'AC_INTROBRANCH' })
  BranchMaster?: OWNBRANCHMASTER;

  @ManyToOne(() => SCHEMAST, { cascade: false })
  @JoinColumn({ name: 'PIGMY_ACTYPE' })
  PGDPMaster?: SCHEMAST;

  @ManyToOne(() => IDMASTER, { cascade: false })
  @JoinColumn({ name: 'idmasterID' })
  idmaster?: IDMASTER;

  @ManyToOne(() => INTCATEGORYMASTER, { cascade: false })
  @JoinColumn({ name: 'AC_INTCATA' })
  intCategory?: INTCATEGORYMASTER;

  @ManyToOne(() => CATEGORYMASTER, { cascade: false })
  @JoinColumn({ name: 'AC_CATG' })
  CategoryMaster?: CATEGORYMASTER;

  @ManyToOne(() => OPERATIONMASTER, { cascade: false })
  @JoinColumn({ name: 'AC_OPR_CODE' })
  OperationMaster?: OPERATIONMASTER;

  @ManyToOne(() => BALACATA, { cascade: false })
  @JoinColumn({ name: 'AC_BALCATG' })
  MinimumBalanceMaster?: BALACATA;

  @ManyToOne(() => OWNBRANCHMASTER, { cascade: false })
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster?: OWNBRANCHMASTER;

  @ManyToOne(() => SCHEMAST, { cascade: false })
  @JoinColumn({ name: 'AC_TYPE' })
  DPMasterScheme?: SCHEMAST;

  /* ===================== CHILD COLLECTIONS ===================== */

  @OneToMany(() => NOMINEELINK, (n) => n.dpmasterId)
  nomineeDetails?: NOMINEELINK[];

  @OneToMany(() => JointAcLink, (j) => j.dpmasterId)
  jointAccounts?: JointAcLink[];

  @OneToMany(() => ATTERONEYLINK, (p) => p.dpmasterId)
  powerOfAttorney?: ATTERONEYLINK[];

  /* ===================== SYSTEM ===================== */

  @CreateDateColumn()
  SYSADD_DATETIME: Date;

  @UpdateDateColumn()
  SYSCHNG_DATETIME: Date;

  @Column({ nullable: true })
  SYSADD_LOGIN: string;

  @Column({ nullable: true })
  SYSCHNG_LOGIN: string;

  @Column({ default: 1 })
  status: number;
}
