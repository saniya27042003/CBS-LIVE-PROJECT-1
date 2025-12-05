import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NPADATA {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    SERIAL_NO: number

    @Column({ nullable: true })
    REPORT_DATE: string

    @Column()
    AC_ACNOTYPE: string

    @Column()
    AC_TYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column({ nullable: true })
    SECU_STATUS: string

    @Column({ nullable: true })
    AC_NPA_DATE: string

    @Column({ nullable: true })
    AC_OPDATE: string

    @Column({ nullable: true })
    AC_EXPIRE_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AC_SANCTION_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AC_SECURITY_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    LEDGER_BALANCE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OVERDUE_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DUE_INSTALLMENT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    NPA_PROVISION_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    RECEIVABLE_INTEREST: number

    @Column({ nullable: true })
    NPA_CLASS: string

    @Column({ nullable: true })
    NPA_MONTHS: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    NPA_PERCENTAGE: number

    @Column({ nullable: true })
    NPA_DAYS: number

    @Column({ nullable: true })
    SUB_CLASS_NO: number

    @Column({ nullable: true })
    OVERDUE_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TOBE_RECOVER_AMT: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    UNSECURE_PROV_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    UNSECURE_PERCENTAGE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PROV_ON_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OVERDUE_INTEREST: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    CURRENT_INTEREST: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AC_INSTALLMENT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AMT_TOBE_RECOVER: number


}
