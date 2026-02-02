import { SCHEMAST } from './schemeParameters.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DEPOCLOSETRANSAC } from './DEPOCLOSETRANSAC.entity';

@Entity()
export class DEPOCLOSETRAN {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_NO: number

    @Column()
    TRAN_DATE: string

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column()
    TRAN_TYPE: string

    @Column()
    BRANCH_CODE: number

    @Column()
    TRAN_ACNOTYPE: string

    @Column({ nullable: true })
    TRAN_ACTYPE: number

    @Column({ length: 15 })
    TRAN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    LEDGER_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    EXCESS_INT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TDS_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    SURCHARGE_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    COMMISSION_CHARGES: number

    @Column({ nullable: true })
    COMMISSION_GLACNO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER_CHARGES_AMOUNT: number

    @Column({ nullable: true })
    OTHER_CHARGES_GLACNO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PENAL_INTEREST_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PAID_INTEREST_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    NET_INTEREST_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    UNPAID_CASHINT_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TOTAL_INTEREST_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    NET_PAYABLE_AMOUNT: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    INTEREST_RATE: number

    @Column({ nullable: true })
    IS_PREMATURE_CLOSE: number

    @Column({ nullable: true })
    TRAN_STATUS: number

    @Column({ default: 0 })
    TOKEN_NO: number

    @Column({ nullable: true })
    CASHIER_CODE: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    NARRATION: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PAYABLE_INTEREST_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AUTO_MATURED_PAYABLEAMT: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    AFT_MATURE_INT_RATE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AFT_MATURE_INT_AMT: number

    @Column({ nullable: true })
    CHEQUE_SERIES: string

    @Column({ nullable: true })
    CHEQUE_NO: string

    @Column({ nullable: true })
    CHEQUE_DATE: string
    @CreateDateColumn()
    SYSADD_DATETIME: Date;

    @Column({ nullable: true })
    SYSADD_LOGIN: string;

    @UpdateDateColumn()
    SYSCHNG_DATETIME: Date;

    @Column({ nullable: true })
    SYSCHNG_LOGIN: string;

    @Column({ nullable: true, default: 1 })
    status: number

    @OneToMany(
  () => DEPOCLOSETRANSAC,
  (d) => d.depocloseTran
)
depocloseTransacs: DEPOCLOSETRANSAC[];



    @ManyToOne(() => SCHEMAST)
    @JoinColumn({ name: "TRAN_ACTYPE" })
    depocloseTran: SCHEMAST[];

}
