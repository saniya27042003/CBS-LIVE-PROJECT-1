import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LOCKERRENTTRAN {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })
    TRAN_NO: number

    @Column()
    TRAN_DATE: string

    @Column()
    TRAN_TIME: string

    @Column({ nullable: true })
    TRAN_ACNOTYPE: string

    @Column({ nullable: true })
    TRAN_ACTYPE: number

    @Column({ length: 15 })
    TRAN_ACNO: string

    @Column()
    TRAN_TYPE: string

    @Column({ nullable: true })
    TRAN_DRCR: string

    @Column()
    TRAN_MODE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    RENT_FROM_DATE: string

    @Column({ nullable: true })
    RENT_UPTO_DATE: string

    @Column({ nullable: true })
    RECEIPT_NO: number

    @Column({ nullable: true })
    TRF_ACNOTYPE: string

    @Column({ nullable: true })
    TRF_ACTYPE: number

    @Column({ length: 15 })
    TRF_ACNO: string

    @Column({ nullable: true })
    TRAN_STATUS: string

    @Column({ nullable: true })
    AC_CLOSED: number

    @Column({ nullable: true })
    BRANCH_CODE: number

    @Column()
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    TRAN_ENTRY_TYPE: string


}
