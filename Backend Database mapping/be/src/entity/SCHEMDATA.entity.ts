import { INTRATELOAN } from './interest-rate-for-loan-and-cc.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SCHEMDATA {

    @PrimaryGeneratedColumn()
    id: number;



    @Column()
    S_ACNOTYPE: string

    @Column({ nullable: true })
    S_NAME: string

    @Column({ nullable: true })
    S_LOCAL_CLEARING: string

    @Column({ nullable: true })
    S_CHEQUE_BOOK: string

    @Column({ nullable: true })
    S_TEMP_OVERDRFT: string

    @Column({ nullable: true })
    S_PERIODCL_OVERDRFT: string

    @Column({ nullable: true })
    S_SPECIAL_INSTRUCTION: string

    @Column({ nullable: true })
    S_SINGLE_VOUCHER: string

    @Column({ nullable: true })
    S_MULTY_VOUCHER: string

    @Column({ nullable: true })
    S_DEMAND_DRAFT: string

    @Column({ nullable: true })
    S_FREEZE_APPLICABLE: string

    @Column({ nullable: true })
    S_CASH_PAID_MIN_AMT: string

    @Column({ nullable: true })
    IS_PO_APPL: string

    @Column({ nullable: true })
    S_SUB_PRINT: string

    @Column({ nullable: true })
    S_CASH_PAID_LOCK: string


    // @OneToMany(() => INTRATELOAN, intloancc => intloancc.scheme, {
    //     cascade: ["insert", "update"]
    // })
    // intloancc: INTRATELOAN[];
}
