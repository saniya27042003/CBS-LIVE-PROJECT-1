import { ACMASTER } from './gl-account-master.entity';
import { DEPRRATE } from './depriciation-rate-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'DEPRCATEGORY' })
export class DEPRCATEGORY {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100, nullable: false })
  NAME: string;

  // ---------- Depreciation Account ----------
  @Column({ nullable: true })
  AC_NO: number;

  @ManyToOne(() => ACMASTER)
  @JoinColumn({ name: 'AC_NO' })
  depaccountno: ACMASTER;   // ✅ SINGLE entity

  // ---------- Depreciation Rates ----------
  @OneToMany(() => DEPRRATE, rate => rate.decategory, {
    cascade: ['insert', 'update'],
  })
  deprerate: DEPRRATE[];

  // ---------- Branch ----------
  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(() => OWNBRANCHMASTER)
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER;  // ✅ SINGLE entity
}
