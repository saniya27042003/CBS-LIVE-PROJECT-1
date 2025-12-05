import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LNRQTRAN {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    APPLICATION_NO: number

    @Column()
    APPLICATION_DATE: string

    @Column({ nullable: true })
    MEETING_DATE: string

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column({ nullable: true })
    AC_TYPE: number

    @Column({ length:15 })
    AC_NO: string

    @Column({ nullable: true })
    AC_OLDACNOTYPE: string

    @Column({ nullable: true })
    AC_OLDACTYPE: number

    @Column({ length: 15 })
    AC_OLDACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    REQUEST_AMOUNT: number

    @Column({ nullable: true })
    AC_SALARY: number

    @Column({ nullable: true })
    AC_SALARYDEDUCTION: number

    @Column({ nullable: true })
    RESON: number

    @Column({ nullable: true })
    APPLI_STATUS: string

    @Column({ nullable: true })
    AC_GURR1: number

    @Column({ nullable: true })
    AC_GURR2: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    SANCTION_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    SHARE_DEDUCT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    EMRFUND_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    KAYAM_DEPO_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AC_DRAWPOWER_AMT: number

    @Column({ nullable: true })
    APPLICATION_YEAR: string

    @Column({ nullable: true })
    REQUEST_ACTYPE: string

    @Column({ nullable: true })
    BASIC_DA: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    INT_RATE: number

    @Column({ nullable: true })
    MONTHS: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    SANCTION_AMOUNT: number

    @Column({ nullable: true })
    SANSTHA_SHIFARAS: number

    @Column({ nullable: true })
    OLD_LOAN_DUES: number

    @Column({ nullable: true })
    OLD_SHARE_DEDS: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DEPOSIT_AMOUNT: number

    @Column({ nullable: true })
    OTHER_SANSTHA_NAME: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER_DEDS: number

    @Column({ nullable: true })
    AC_REGNO: string

    @Column({ nullable: true })
    AC_GURR3: number

    @Column({ nullable: true })
    AC_GURR4: number

    @Column({ nullable: true })
    AC_SALARYDIVISION_CODE: number

    @Column({ nullable: true })
    SUB_SALARYDIVISION_CODE: number

    @Column({ nullable: true })
    AC_SHGURR1: string

    @Column({ nullable: true })
    AC_SHGURR2: string

    @Column({ nullable: true })
    AC_SHGURR3: string

    @Column({ nullable: true })
    AC_SHGURR4: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AC_INSTALLMENT: number

    @Column({ nullable: true })
    AC_MONTHS: number


}
