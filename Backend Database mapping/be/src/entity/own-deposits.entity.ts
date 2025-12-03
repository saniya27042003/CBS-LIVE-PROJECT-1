import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OWNDEPOSIT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column()
  AC_TYPE: number;
  @ManyToOne(() => SCHEMAST, (actypeowndepo) => actypeowndepo.actypeowndepo, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_TYPE' })
  actypeowndepo: SCHEMAST[];

  @Column({ default: 0, length: 15 })
  AC_NO: string;

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(() => OWNBRANCHMASTER, (owndeposit) => owndeposit.owndeposit, {
    cascade: true,
  })
  @JoinColumn({ name: 'BRANCH_CODE' })
  owndeposit: OWNBRANCHMASTER[];

  @Column({ nullable: true })
  DEPO_AC_TYPE: number;
  @ManyToOne(() => SCHEMAST, (depoactype) => depoactype.depoactype, {
    cascade: true,
  })
  @JoinColumn({ name: 'DEPO_AC_TYPE' })
  depoactype: SCHEMAST[];

  @Column({ nullable: true })
  SECU_CODE: number;
  @ManyToOne(() => SECURITYMASTER, (deposit) => deposit.deposit, {
    cascade: true,
  })
  @JoinColumn({ name: 'SECU_CODE' })
  deposit: SECURITYMASTER[];

  @Column({ length: 15 })
  DEPO_AC_NO: string;

  @Column({ nullable: true })
  SUBMISSION_DATE: string;

  @Column({ nullable: true })
  RECEIPT_NO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DEPOSIT_AMT: number;

  @Column({ nullable: true })
  REMARK: string;

  @Column({ nullable: true })
  MATURITY_DATE: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  MARGIN: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  LEDGER_BAL: number;

  //lien mark clear fields
  @Column({ nullable: true })
  AC_EXPIRE_DATE: string;

  @Column({ default: '0' })
  IS_LIEN_MARK_CLEAR: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  BALANCE_OF_LOAN_ACCOUNT: number;
}
