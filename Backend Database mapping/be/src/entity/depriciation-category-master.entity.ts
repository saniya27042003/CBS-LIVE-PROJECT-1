import { ACMASTER } from './gl-account-master.entity';
import { DEPRRATE } from './depriciation-rate-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
@Entity()
export class DEPRCATEGORY {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100, nullable: false })
  NAME: string;

  @Column({ nullable: true })
  AC_NO: number;
  @ManyToOne(() => ACMASTER, (depaccountno) => depaccountno.deprecat, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_NO' })
  depaccountno: ACMASTER[];

  @OneToMany(() => DEPRRATE, (deprerate) => deprerate.decategory, {
    cascade: ['insert', 'update'],
  })
  deprerate: DEPRRATE[];

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BranchCodeMaster) => BranchCodeMaster.depre,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER[];
}
