import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { COMPANYGROUPMASTER } from './company-group-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { COMPANYGROUPLINKGRIDMASTER } from './company-link-grid.entity';
@Entity()
export class COMPANYGROUPLINKMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5 })
  CODE: string;

  @Column({ length: 15 })
  FROM_AC: string;

  @Column({ length: 15 })
  TO_AC: string;

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BranchCodeMaster) => BranchCodeMaster.comapnylink,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BranchCodeMaster: OWNBRANCHMASTER[];

  @Column()
  COMP_CODE: number;
  @ManyToOne(() => COMPANYGROUPMASTER, (comapny) => comapny.comapnylink, {
    cascade: true,
  })
  @JoinColumn({ name: 'COMP_CODE' })
  comapny: COMPANYGROUPMASTER[];

  @OneToMany(
    () => COMPANYGROUPLINKGRIDMASTER,
    (comapnylink) => comapnylink.comapny,
  )
  comapnylink: COMPANYGROUPLINKGRIDMASTER;
}
