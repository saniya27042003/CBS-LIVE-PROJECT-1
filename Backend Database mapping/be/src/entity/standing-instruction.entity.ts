import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class STANDINSTRUCTION {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  INSTRUCTION_NO: number

  @Column({ nullable: true })
  INSTRUCTION_DATE: string

  @Column({ nullable: true })
  FROM_DATE: string

  @Column({ nullable: true })
  TO_DATE: string

  @Column({ nullable: true })
  EXECUTION_DAY: string

  @Column({ nullable: true })
  DR_ACTYPE: number

  @Column({ length: 15 })
  DR_AC_NO: string

  @Column({ nullable: true })
  DAYS: number

  @Column({ nullable: true })
  DR_PARTICULARS: string

  @Column({ nullable: true })
  CR_ACTYPE: number

  @Column({ length: 15 })
  CR_AC_NO: string

  @Column({ nullable: true })
  CR_PARTICULARS: string

  @Column({ nullable: true })
  SI_FREQUENCY: string

  @Column({ nullable: true })
  LAST_EXEC_DATE: string

  @Column({ nullable: true })
  REVOKE_DATE: string

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  MIN_BAL: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PAYINT_AMOUNT: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number

  @Column({ default: false })
  IS_AUTO_CUT_LNPGCOM: boolean

  @CreateDateColumn()
  SYSADD_DATETIME: Date;

  @Column({ nullable: true })
  SYSADD_LOGIN: string;

  @UpdateDateColumn()
  SYSCHNG_DATETIME: Date;

  @Column({ nullable: true })
  SYSCHNG_LOGIN: string;

  @Column({ nullable: true })
  BRANCH_CODE: number;

  @ManyToOne(() => OWNBRANCHMASTER, (BranchCode) => BranchCode.branchCodeIns, {
    cascade: true
  })
  @JoinColumn({ name: "BRANCH_CODE" })
  BranchCode: OWNBRANCHMASTER[];

  @ManyToOne(() => SCHEMAST, (standingInsDr) => standingInsDr.standingInsDr, {
    cascade: true
  })
  @JoinColumn({ name: "DR_ACTYPE" })
  standingInsDr: SCHEMAST[];

  @ManyToOne(() => SCHEMAST, (standingInsCr) => standingInsCr.standingInsCr, {
    cascade: true
  })
  @JoinColumn({ name: "CR_ACTYPE" })
  standingInsCr: SCHEMAST[];
}
