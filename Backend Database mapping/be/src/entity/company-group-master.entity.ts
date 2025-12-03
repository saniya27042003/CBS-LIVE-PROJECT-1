import { SCHEMAST } from './schemeParameters.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { COMPANYGROUPLINKMASTER } from './company-group-link-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
@Entity()
export class COMPANYGROUPMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  COMP_CODE: number;

  @Column({ length: 200 })
  NAME: string;

  @Column({ length: 2000, nullable: true })
  ADDRESS: string;

  @Column()
  AC_ACNOTYPE: string;

  @Column({ length: 15 })
  AC_NO: string;

  @Column()
  AC_TYPE: number;
  @ManyToOne(() => SCHEMAST, (company) => company.scheme, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_TYPE' })
  company: SCHEMAST[];

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BranchCodeMaster) => BranchCodeMaster.comapny,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER[];

  @OneToMany(() => COMPANYGROUPLINKMASTER, (comapnylink) => comapnylink.comapny)
  comapnylink: COMPANYGROUPLINKMASTER;
}
