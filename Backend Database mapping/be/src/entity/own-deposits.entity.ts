import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OWNDEPOSIT {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  // ---------------- Account Type ----------------
  @Column()
  AC_TYPE: number;
  
@ManyToOne(() => SCHEMAST)
@JoinColumn({ name: 'AC_TYPE' })
accountTypeScheme: SCHEMAST;


  // ---------------- Account No ----------------
  @Column({ default: 0, length: 15 })
  AC_NO: string;

  // ---------------- Branch ----------------
  @Column({ nullable: true })
  BRANCH_CODE: number;

@ManyToOne(() => OWNBRANCHMASTER)
@JoinColumn({ name: 'BRANCH_CODE' })
branch: OWNBRANCHMASTER;


  // ---------------- Deposit Scheme ----------------
  @Column({ nullable: true })
  DEPO_AC_TYPE: number;

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: 'DEPO_AC_TYPE' })
  depoactype: SCHEMAST;      // ✅ SINGLE

  // ---------------- Security ----------------
  @Column({ nullable: true })
  SECU_CODE: number;

@ManyToOne(() => SECURITYMASTER, s => s.deposits)
@JoinColumn({ name: 'SECU_CODE' })
security: SECURITYMASTER;


  // ---------------- Other Fields ----------------
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

  @Column({ nullable: true })
  AC_EXPIRE_DATE: string;

  @Column({ default: '0' })
  IS_LIEN_MARK_CLEAR: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  BALANCE_OF_LOAN_ACCOUNT: number;
}
