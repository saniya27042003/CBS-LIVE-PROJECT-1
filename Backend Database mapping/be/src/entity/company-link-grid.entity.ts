import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { COMPANYGROUPMASTER } from './company-group-master.entity';
import { COMPANYGROUPLINKMASTER } from './company-group-link-master.entity';
@Entity()
export class COMPANYGROUPLINKGRIDMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_TYPE: number;

  @Column({ length: 15 })
  AC_NO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DEFAULT_AMOUNT: number;

  @Column()
  COMP_LINK_CODE: number;
  @ManyToOne(() => COMPANYGROUPLINKMASTER, (comapny) => comapny.comapnylink, {
    cascade: true,
  })
  @JoinColumn({ name: 'COMP_LINK_CODE' })
  comapny: COMPANYGROUPMASTER[];
}
