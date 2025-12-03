import { BANKMASTER } from './bank-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BANKBRANCHMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  BANK_CODE: number;

  @Column()
  BRANCH_CODE: number;

  @Column()
  HOLIDAYOPEN: number;

  @Column()
  CLEARINGDAY: number;

  @Column()
  HOLIDAY: string;

  @Column()
  CLEARINGDAYS: number;

  @Column({ nullable: true })
  PHONE: string;

  @Column({ nullable: true })
  ADDRESS: string;

  @Column()
  HALF_DAY: number;

  @Column({ nullable: true })
  CLEARING_HOUSE: number;

  @Column({ nullable: true })
  SBI_BANKCODE: string;

  @ManyToOne(() => BANKMASTER, (BankCode) => BankCode.BankCode, {
    cascade: true,
  })
  @JoinColumn({ name: 'BANK_CODE' })
  BankCode: BANKMASTER[];

  @ManyToOne(
    () => OWNBRANCHMASTER,
    (BBranchMaster) => BBranchMaster.BBranchMaster,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'BRANCH_CODE' })
  BBranchMaster: OWNBRANCHMASTER[];
}
