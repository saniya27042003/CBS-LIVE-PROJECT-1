import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SALARYDIVISIONMASTER } from './salary-division-master.entity';
@Entity()
export class SUBSALARYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100 })
  NAME: string;

  @Column({ length: 100, nullable: true })
  AT_POST: string;

  @Column({ length: 100, nullable: true })
  TALUKA_NAME: string;

  @Column({ length: 100, nullable: true })
  DISTRICT_NAME: string;

  @Column({ length: 100, nullable: true })
  AC_EMAILID: string;

  @Column({ nullable: true, length: 10 })
  PHNO: string;

  @Column({ nullable: true, length: 10 })
  MOBNO: string;

  @Column({ nullable: true })
  SAL_CODE: number;
  @ManyToOne(() => SALARYDIVISIONMASTER, (sub) => sub.subsalary, {
    cascade: true,
  })
  @JoinColumn({ name: 'SAL_CODE' })
  sub: SALARYDIVISIONMASTER[];

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BranchCodeMaster) => BranchCodeMaster.subsal,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER[];
}
