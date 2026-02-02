import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class INTINSTRUCTION {
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
  NEXT_EXE_DATE: string

  @Column({ nullable: true })
  EXECUTION_DAY: string

  @Column({ nullable: true })
  DR_ACTYPE: number

  @Column({ length: 15 })
  DR_AC_NO: string

  @Column({ default: 0 })
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

  @Column()
  TRAN_TYPE: string

  @Column({ nullable: true })
  ADV_NARRATION: string

  @Column({ default: '0' })
  DEFAULT_INTEREST_APPLICABLE: string

  @Column({ nullable: true })
  REVOKE_DATE: string

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

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "DR_ACTYPE" })
  interestDr: SCHEMAST[];

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "CR_ACTYPE" })
  interestCr: SCHEMAST[];
}
