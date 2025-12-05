import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CHEQUELOCALTRAN {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_NO: number

    @Column()
    TRAN_YEAR: string

    @Column()
    BRANCH_CODE: number

    @Column()
    TRAN_DATE: string

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column({ nullable: true })
    TRAN_TYPE: string

    @Column({ nullable: true })
    TRAN_DRCR: string

    @Column({ nullable: true })
    TRAN_ACNOTYPE: string

    @Column({ nullable: true })
    TRAN_ACTYPE: string

    @Column({ nullable: true })
    TRAN_ACNO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column()
    TRAN_GLACNO: number

    @Column()
    CHEQUE_NO: number

    @Column()
    CHEQUE_DATE: string

    @Column()
    CLEARING_DAYS: number

    @Column({ default: 0 })
    TRAN_STATUS: number

    @Column({ nullable: true })
    NARRATION: string

    @Column()
    BANK_CODE: number

    @Column()
    BANK_BRANCH_CODE: number

    @Column({ nullable: true })
    EFFECTED: number

    @Column({ nullable: true })
    CASHIER_CODE: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    BOUNCE_DATE: string

    @Column({ nullable: true })
    BOUNCE_USER_CODE: string

    @Column({ nullable: true })
    BOUNCE_OFFICER_CODE: string

    @Column()
    ENTRY_DATE: string

    @Column()
    CLEARING_HOUSE: number

    @Column({ nullable: true })
    HO_SUB_GLACNO: number

    @Column({ nullable: true })
    EFFECT_DATE: string

    @Column({ nullable: true })
    AUTO_CLG_TALLY_TRAN_NO: number

    @Column({ nullable: true })
    IS_MICR_CHEQUE: number

    @Column({ nullable: true })
    TRAN_CODE: number

}
