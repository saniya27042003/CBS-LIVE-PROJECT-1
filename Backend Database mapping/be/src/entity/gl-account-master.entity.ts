import { DEPRCATEGORY } from './depriciation-category-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, Unique } from 'typeorm';
@Entity()
@Unique(['AC_NO'])
export class ACMASTER {
  @PrimaryColumn()
  id: number;

  @Column()
  AC_NO: number

  @Column()
  AC_NAME: string

  @Column({ nullable: true })
  PARENT_NODE: string

  @Column({ nullable: true })
  AC_BCD: string

  @Column()
  BRANCH_CODE: number

  @Column({ nullable: true })
  AC_OPDATE: string

  @Column({ default: 0 })
  IS_POST_INT_AC: number

  @Column({ nullable: true })
  AC_MEMBNO: number

  @Column({ nullable: true })
  IS_DIRECT_ENTRY_ALLOW: boolean

  @Column({ nullable: true })
  IS_RED_BALANCE_AC: boolean

  @Column({ nullable: true })
  AC_IS_CASH_IN_TRANSIT: boolean

  @Column({ nullable: true })
  IS_TAXABLEFOR_GST: boolean

  @Column({ nullable: true })
  IS_ACTIVE: boolean

  @Column({ default: 'GL' })
  AC_ACNOTYPE: string

  @Column()
  AC_TYPE: number

  @Column({ nullable: true })
  AC_SUBSCODE: number

  @Column({ nullable: true })
  AC_CLOSEDT: string

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_OP_BAL: number;

  @Column({ nullable: true })
  AC_OP_CD: string

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_PAYABLEAMT: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_INTERESTAMT: number

  // @Column({ nullable: true })
  // AC_OPDATE: string

  // @Column({ nullable: true })
  // IS_POST_INT_AC: string

  // @Column({ nullable: true })
  // AC_MEMBNO: string

  //dormant field
  @Column({ default: false })
  IS_DORMANT: boolean;

 @ManyToOne(() => OWNBRANCHMASTER, branch => branch.clearingAccounts)
@JoinColumn({ name: 'CLEARING_BRANCH_ID' }) // use real FK column
clearingBranch: OWNBRANCHMASTER;

 
  @OneToMany(() => OWNBRANCHMASTER, branch => branch.accNo)
  ownBranches: OWNBRANCHMASTER[];


 @ManyToOne(() => DEPRCATEGORY)
@JoinColumn({ name: 'DEPR_CATEGORY_ID' })   // use real FK
deprecat: DEPRCATEGORY;


  @ManyToOne(() => SCHEMAST)
@JoinColumn({ name: 'AC_TYPE' })
glAcMaster: SCHEMAST;


}
