import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CASHINTINSTRUCTIONS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_DATE: string

    @Column({ nullable: true })
    INSTRUCTION_NO: number

    @Column()
    TRAN_TYPE: string

    @Column()
    TRAN_ACNOTYPE: string

    @Column()
    TRAN_ACTYPE: string

    @Column()
    TRAN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    MONTHS: number

    @Column({ nullable: true })
    DAYS: number

    @Column({ nullable: true })
    PAID_DATE: string

    @Column({ nullable: true })
    PAID_VOUCHER_NO: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string
    @Column({ nullable: true })
    BRANCH_CODE: string

}
