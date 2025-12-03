import { ACMASTER } from './gl-account-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class BRANCHMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100, nullable: false })
  NAME: string;

  @Column({ nullable: true })
  AC_NO: string;

  @ManyToOne(() => ACMASTER, (accountNo) => accountNo.clearingBranch, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_NO' })
  accountNo: ACMASTER[];
}
