import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LNRQTRANDETAILS {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    TRAN_APPLI_NO: number

    @Column()
    TRAN_APPLI_DATE: string

    @Column()
    SERIAL_NO: number

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column()
    TRAN_TYPE: string

    @Column()
    TRAN_MODE: number

    @Column({ nullable: true })
    TRAN_DRCR: string

    @Column()
    TRAN_ACNOTYPE: string

    @Column({default:0})
    TRAN_ACTYPE: number

    @Column({length:15})
    TRAN_ACNO: string

    @Column({default:0})
    TRAN_GLACNO: number

    @Column({default:0})
    INTEREST_GLACNO: number

    @Column({default:0})
    RECPAY_INT_GLACNO: number

    @Column({ nullable: true })
    CHEQUE_DATE: string

    @Column({ nullable: true })
    CHEQUE_NO: number

    @Column({ nullable: true })
    CHEQUE_ACNO: number

    @Column({default:0})
    TRAN_STATUS: number

    @Column({ nullable: true })
    NARRATION: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    RECPAY_INT_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    INTEREST_AMOUNT: number

    @Column({ nullable: true })
    PENAL_INT_GLACNO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PENAL_INT_AMOUNT: number

    @Column({ nullable: true })
    REC_PENAL_INT_GLACNO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    REC_PENAL_INT_AMOUNT: number

    @Column({ nullable: true })
    INTEREST_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    SANCTION_AMOUNT: number

    @Column({ nullable: true })
    IS_INTEREST_ENTRY: number

    @Column({ nullable: true })
    AC_CLOSED: number

    @Column({ nullable: true })
    TRAN_SOURCE_TYPE: string

    @Column({ nullable: true })
    TRAN_SOURCE_NO: number

    @Column({ nullable: true })
    TRAN_ENTRY_TYPE: string

    @Column({ nullable: true })
    CLOSING_ENTRY: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    TRAN_APPLI_YEAR: string


}
