import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DRAFTTRAN {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    DD_TRAN_NO: number

    @Column()
    DD_TRAN_DATE: string

    @Column({ nullable: true })
    DD_TRAN_TIME: string

    @Column({ nullable: true })
    SOURCE_TYPE: string

    @Column()
    SOURCE_TRAN_NO: number

    @Column()
    SOURCE_TRAN_TYPE: string

    @Column()
    SOURCE_TRAN_MODE: string

    @Column({ nullable: true })
    SOURCE_TRAN_DRCR: string

    @Column()
    BRANCH_CODE: number

    @Column()
    SOURCE_TRAN_ACNOTYPE: string

    @Column()
    SOURCE_TRAN_ACTYPE: string

    @Column()
    SOURCE_TRAN_ACNO: number

    @Column({ nullable: true })
    TRAN_POSTING_NO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    VOUCHER_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    BANKERS_COMMISSION_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    BANK_COMMISSION_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER_AMOUNT: number

    @Column({ nullable: true })
    OTHER_GLACNO: number

    @Column({ nullable: true })
    TRAN_STATUS: number

    @Column({ nullable: true })
    PAYEE_NAME: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string


}
