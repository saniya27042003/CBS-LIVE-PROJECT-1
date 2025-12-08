/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique, Index } from 'typeorm';
import { IDMASTER } from './customer-id.entity';
import { NOMINEELINK } from './nominee.entity';
import { HISTORYDIVIDEND } from './shares-dividend.entity';
import { CATEGORYMASTER } from './category-master.entity'
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
@Entity()
@Unique(['BANKACNO'])
@Index("NDXSHMASTER", ["BRANCH_CODE", "AC_ACNOTYPE", "AC_TYPE", "BANKACNO"])
@Index("NDXSHMASTER1", ["BRANCH_CODE", "AC_ACNOTYPE", "AC_TYPE", "AC_NO"])
export class SHMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('shmasteractype')
  @Column()
  AC_TYPE: number

  @Index('shmasteracnotype')
  @Column()
  AC_ACNOTYPE: string

  @Index('shmasteracno')
  @Column()
  AC_NO: number

  @Column({ nullable: true })
  AC_CUSTID: number

  @Column({ nullable: true })
  AC_NAME: string

  @Index('shmasterbankacno')
  @Column({ length: 15 })
  BANKACNO: string

  @Column({ nullable: true })
  EMP_NO: string

  @Column({ default: '0' })
  AC_IS_RECOVERY: string

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_INSTALLMENT: number

  @Column({ nullable: true })
  AC_JOIN_DATE: string

  @Column({ nullable: true })
  AC_RETIRE_DATE: string

  @Column({ nullable: true })
  AC_OPDATE: string

  @Column({ nullable: true })
  AC_SHBALDATE: string

  @Column({ nullable: true })
  MEMBERSHIP_BY: string

  @Column({ nullable: true })
  AC_SREPRESENT: string

  @Column({ nullable: true })
  AC_CATG: number

  @Column({ nullable: true })
  AC_EXPDT: string

  @Column({ nullable: true })
  DEATH_DATE: string

  @Column({ nullable: true })
  AC_DIRECT: number

  @Column({ nullable: true })
  AC_BRANCH: string

  @Column({ nullable: true })
  AC_SALARYDIVISION_CODE: number

  @Column({ nullable: true })
  SUB_SALARYDIVISION_CODE: number

  @Column({ nullable: true, length: 20 })
  AC_SBNO: string

  @Column({ nullable: true })
  AC_RESNO: string

  @Column({ nullable: true })
  AC_RESDT: string

  @Column({ nullable: true })
  REF_ACNO: string

  @Column({ nullable: true })
  AC_NARR: string

  @Column({ nullable: true })
  AC_OP_SHNO: number

  @Column({ nullable: true })
  AC_FACE_VALUE: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_OP_BAL: string

  @Column({ nullable: true })
  AC_DEV_NAME: string

  @Column({ nullable: true })
  AC_DEV_WARD: string

  @Column({ nullable: true })
  AC_DEV_ADD: string

  @Column({ nullable: true })
  AC_DEV_GALLI: string

  @Column({ nullable: true })
  AC_DEV_AREA: string

  @Column({ nullable: true })
  AC_DEV_CITYCODE: string

  //dormant field
  @Column({ default: false })
  IS_DORMANT: boolean;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_PAYABLEAMT: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_INTERESTAMT: number

  //freez account fields
  @Column({ nullable: true })
  AC_FREEZE_STATUS: string

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_FREEZE_AMOUNT: number

  @Column({ nullable: true })
  AC_FREEZE_DATE: string

  @Column({ nullable: true })
  AC_FREEZE_REASON: string

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

  //relations
  @Column({ unique: false })
  idmasterID: number
  // dividend transfer fields
  @Column({ nullable: true })
  DIV_TRANSFER_BRANCH: number

  @Column({ nullable: true })
  DIV_TRANSFER_ACNOTYPE: string

  @Column({ nullable: true })
  DIV_TRANSFER_ACTYPE: number

  @Column({ nullable: true, length: 15 })
  DIV_TRANSFER_ACNO: string

  @ManyToOne(() => IDMASTER, (idmaster) => idmaster.shareMaster, {
    cascade: true
  })
  @JoinColumn({ name: "idmasterID" })
  idmaster: IDMASTER[];

  @OneToMany(() => NOMINEELINK, (nomineeDetails) => nomineeDetails.sharesId, {
    cascade: ["insert", "update"]
  })
  nomineeDetails: NOMINEELINK[]

  @OneToOne(() => HISTORYDIVIDEND, (shareDividend) => shareDividend.sharesId, {
    cascade: ["insert", "update"]
  })
  shareDividend: HISTORYDIVIDEND[]

  @ManyToOne(() => CATEGORYMASTER, (CategoryMaster) => CategoryMaster.category, {
    cascade: true
  })
  @JoinColumn({ name: "AC_CATG" })
  CategoryMaster: CATEGORYMASTER[];

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(() => OWNBRANCHMASTER, (BranchCodeMaster) => BranchCodeMaster.branchCodesh, {
    cascade: true
  })
  @JoinColumn({ name: "BRANCH_CODE" })
  BranchCodeMaster: OWNBRANCHMASTER[];

  @ManyToOne(() => SCHEMAST, (shareMaster) => shareMaster.shareCode, {
    cascade: true
  })
  @JoinColumn({ name: "AC_TYPE" })
  shareMaster: SCHEMAST[];

  @ManyToOne(() => OWNBRANCHMASTER, (divBranchMaster) => divBranchMaster.divBranch, {
    cascade: true
  })
  @JoinColumn({ name: "DIV_TRANSFER_BRANCH" })
  divBranchMaster: OWNBRANCHMASTER[];



  @Column({ nullable: true })
  AC_OP_CD: string


  @Column({ nullable: true })
  AC_CLOSED: string


}