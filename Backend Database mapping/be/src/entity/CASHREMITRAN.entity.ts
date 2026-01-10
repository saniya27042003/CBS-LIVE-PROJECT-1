import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CASHREMITRAN {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_NO: number

    @Column()
    TRAN_DATE: string

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column()
    BRANCH_CODE: number

    @Column()
    VOUCHER_NO: number

    @Column({ nullable: true })
    CASH_REMITED_TO_GLACNO: number

    @Column({ nullable: true })
    CASH_SEND_WITH_PERSON: string

    @Column({ nullable: true })
    CASH_ACCEPT_BY_PERSON: string

    @Column({ default: 0 })
    TRAN_STATUS: number

    @Column({ nullable: true })
    NARRATION: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    HO_SUB_GLACNO: number

    @Column({ nullable: true })
    TRAN_DRCR: string

    @ManyToOne(() => OWNBRANCHMASTER, (cashTran) => cashTran.cashTran, {
        cascade: true
    })
    @JoinColumn({ name: "BRANCH_CODE" })
    cashTran: OWNBRANCHMASTER[];
}
