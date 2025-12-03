import { BRANCHMASTER } from './clearing-branch-master.entity';
import { DEPRCATEGORY } from './depriciation-category-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Unique,
  Index,
} from 'typeorm';
@Entity()
@Unique(['AC_NO'])
export class ACMASTER {
  @PrimaryColumn()
  id: number;

  @Column()
  AC_NO: number;

  @Column()
  AC_NAME: string;

  @Column({ nullable: true })
  PARENT_NODE: string;

  @Column({ nullable: true })
  AC_BCD: string;

  @Column()
  BRANCH_CODE: number;

  @Column({ nullable: true })
  AC_OPDATE: string;

  @Column({ default: 0 })
  IS_POST_INT_AC: number;

  @Column({ nullable: true })
  AC_MEMBNO: number;

  @Column({ nullable: true })
  IS_DIRECT_ENTRY_ALLOW: boolean;

  @Column({ nullable: true })
  IS_RED_BALANCE_AC: boolean;

  @Column({ nullable: true })
  AC_IS_CASH_IN_TRANSIT: boolean;

  @Column({ nullable: true })
  IS_TAXABLEFOR_GST: boolean;

  @Column({ nullable: true })
  IS_ACTIVE: boolean;

  @Column({ default: 'GL' })
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;

  @Column({ nullable: true })
  AC_SUBSCODE: number;

  @Column({ nullable: true })
  AC_CLOSEDT: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_OP_BAL: number;

  @Column({ nullable: true })
  AC_OP_CD: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_PAYABLEAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AUTO_MATURED_INTERESTAMT: number;

  // @Column({ nullable: true })
  // AC_OPDATE: string

  // @Column({ nullable: true })
  // IS_POST_INT_AC: string

  // @Column({ nullable: true })
  // AC_MEMBNO: string

  //dormant field
  @Column({ default: false })
  IS_DORMANT: boolean;

  @OneToMany(() => BRANCHMASTER, (clearingBranch) => clearingBranch.accountNo, {
    cascade: ['insert', 'update'],
  })
  clearingBranch: BRANCHMASTER[];

  @OneToMany(() => OWNBRANCHMASTER, (ownBranch) => ownBranch.accNo, {
    cascade: ['insert', 'update'],
  })
  ownBranch: OWNBRANCHMASTER[];

  @OneToMany(() => DEPRCATEGORY, (deprecat) => deprecat.depaccountno, {
    cascade: ['insert', 'update'],
  })
  deprecat: DEPRCATEGORY[];

  @ManyToOne(() => SCHEMAST, (glAcMaster) => glAcMaster.glAcMaster, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_TYPE' })
  glAcMaster: SCHEMAST[];
}
