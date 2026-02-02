import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from 'typeorm';
import { SCHEMAST } from './schemeParameters.entity'
import { PGMASTER } from './pgmaster.entity';


@Entity()
@Check(`"TRAN_DRCR" IN ('D', 'C')`)
export class PIGMYCHART {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  TRAN_NO: number;

  @Column({ nullable: true })
  BRANCHCODE: number;

  @Column({ nullable: true })
  BRANCH_ID: number;

  @Column()
  TRAN_DATE: string

  @Column()
  TRAN_TIME: string

  @Column({ default: "CS", length: 2 })
  TRAN_TYPE: string

  @Column({ default: "C", length: 1 })
  TRAN_DRCR: string

  @Column({ default: 1 })
  TRAN_MODE: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number

  @Column({ default: 1 })
  TRAN_STATUS: number

  @Column({ default: "CH", length: 2 })
  ENTRY_TYPE: string

  @Column({ default: "AG", length: 2 })
  AGENT_ACNOTYPE: string

  @Column()
  AGENT_ACTYPE: number

  @Column()
  AGENT_ACNO: number

  @Column({ length: 15 })
  AGENT_BANKACNO: string

  @Column({ nullable: true })
  CASHIER_CODE: string

  @Column()
  USER_CODE: string

  @Column()
  OFFICER_CODE: string

  @Column({ type: 'date', nullable: true })
  AUTO_VOUCHER_DATE: string

  @Column({ nullable: true })
  AUTO_VOUCHER_NO: number

  @Column()
  CHART_NO: number

  @Column({ nullable: true })
  BRANCH_CODE: number;

/* ✅ BRANCH RELATION (child side only) */
  @ManyToOne(() => OWNBRANCHMASTER)
  @JoinColumn({ name: 'BRANCHCODE' })
  branch: OWNBRANCHMASTER;


 @ManyToOne(() => SCHEMAST)
@JoinColumn({ name: 'SCHEMA_CODE' }) // or actual FK column
scheme: SCHEMAST;

@ManyToOne(() => PGMASTER, pg => pg.pigmycharts)
@JoinColumn({ name: 'AC_NO' })
pgmaster: PGMASTER;



}
