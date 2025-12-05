import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RENEWALHISTORY {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    RENEWAL_DATE: string

    @Column({ nullable: true })
    AC_RENEWAL_COUNTER: number

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column({ default: 0 })
    AC_TYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column({ nullable: true })
    OLD_MONTH: number

    @Column({ nullable: true })
    OLD_EXPIRY_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OLD_SANCTION_LIMIT: number

    @Column({ nullable: true })
    OLD_SANCTION_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OLD_SECURITY_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OLD_DRAWING_POWER: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    NEW_MONTH: number

    @Column({ nullable: true })
    NEW_DAYS: number

    @Column({ nullable: true })
    NEW_OPEN_DATE: string

    @Column({ nullable: true })
    NEW_ASON_DATE: string

    @Column({ nullable: true })
    NEW_EXPIRY_DATE: string

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    NEW_INTEREST_RATE: number

    @Column()
    OLD_AC_ACNOTYPE: string

    @Column({ nullable: true })
    OLD_AC_TYPE: number

    @Column({ nullable: true, length: 15 })
    OLD_AC_NO: string

    @Column({ nullable: true })
    OLD_AC_OPEN_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OLD_AC_SCHMAMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OLD_MATUAMT: number

    @Column({ nullable: true })
    OLD_DAYS: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    OLD_INTEREST_RATE: number

    @Column()
    BRANCH_CODE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OLD_AC_INSTALLMENT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    RENEWAL_AMOUNT: number

    @Column({ nullable: true })
    NEW_RECEIPTNO: string

    @Column({ nullable: true })
    NEW_INT_CODE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    NEW_MATURITY_AMOUNT: number

    @Column({ nullable: true })
    OLD_ACNOTYPE: string

    @Column({ nullable: true })
    OLD_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    OLD_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OLD_AC_SCHEME_AMT: number

    @Column({ nullable: true })
    OLD_RECEIPT_NO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PENAL_INTEREST: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    NORMAL_INTEREST: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PAYABLE_INTEREST: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    INTEREST_PAID_AMT: number

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    INTEREST_DATE: string

    @Column({ nullable: true })
    IS_ASON_AC: number

    @Column({ nullable: true })
    TRAN_STATUS: string

    @Column({ nullable: true })
    TRAN_NO: number

    @Column({ nullable: true })
    NORMAL_INT_TRTYPE: string

    @Column({ nullable: true })
    PAY_INT_TRTYPE: string

    @Column({ nullable: true })
    NORMAL_INT_TR_SCHEME: number

    @Column({ nullable: true, length: 15 })
    NORMAL_INT_TR_ACNO: string

    @Column({ nullable: true })
    PAY_INT_TR_SCHEME: number

    @Column({ nullable: true, length: 15 })
    PAY_INT_TR_ACNO: string

    @Column({ nullable: true })
    NEW_LAST_TRNDATE: string

    @Column({ nullable: true })
    OLD_LAST_TRNDATE: string

    @Column({ nullable: true })
    OLD_ASON_DATE: string

    @Column({ nullable: true })
    OLD_INT_CODE: number

    @Column({ nullable: true })
    NEW_INT_CATA: number

    @Column({ nullable: true })
    OLD_INTEREST_DATE: string

    @Column({ nullable: true })
    TRAN_TYPE: string

    @Column({ nullable: true })
    SYSCHNG_LOGIN: string;

    @Column({ nullable: true })
    AC_RESO_DATE: string;

    @Column({ nullable: true })
    AC_RESO_NO: number;

    @Column({ nullable: true, default: 1 })
    status: number

    @ManyToOne(() => SCHEMAST, (renewalHistory) => renewalHistory.renewalHistory, {
        cascade: true
    })
    @JoinColumn({ name: "AC_TYPE" })
    renewalHistory: SCHEMAST[];
}
