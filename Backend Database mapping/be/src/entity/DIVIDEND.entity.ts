import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DIVIDEND {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    WARRENT_DATE: string

    @Column()
    WARRENT_NO: number

    @Column()
    DIV_FROM_YEAR: number

    @Column()
    DIV_TO_YEAR: number

    @Column({ nullable: true })
    DIV_FROM_MONTH: number

    @Column({ nullable: true })
    DIV_TO_MONTH: number

    @Column()
    ACNOTYPE: string

    @Column({ default: 0 })
    ACTYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column({ nullable: true })
    TOTAL_SHARES: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TOTAL_SHARES_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DIVIDEND_AMOUNT: number

    @Column({ nullable: true })
    DIVIDEND_STATUS: number

    @Column({ nullable: true })
    DIV_PAID_DATE: string

    @Column({ nullable: true })
    DIV_TRANSFER_DATE: string

    @Column({ nullable: true })
    DIV_TRANSFER_BRANCH: number

    @Column({ nullable: true })
    DIV_TRANSFER_ACNOTYPE: string

    @Column({ nullable: true })
    DIV_TRANSFER_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    DIV_TRANSFER_ACNO: string

    @Column({ nullable: true })
    MEMBER_CLOSE_DATE: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    BONUS_AMOUNT: number


}
