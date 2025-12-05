import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CHEQUEBOOKRECORD {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    DOC_NO: number

    @Column()
    CHEQUEBOOK_SERIES: string

    @Column()
    CHEQUE_NO: number

    @Column({ nullable: true })
    DEBIT_DATE: string

    @Column({ nullable: true })
    STOP_PAYMENT_DATE: string

    @Column({ nullable: true })
    STOP_PAYMENT_REASON: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    STOP_PAYMENT_CHARGES: number

    @Column({ nullable: true })
    REVOKE_DATE: string

    @Column({ nullable: true })
    LOST_INFO_DATE: string

    @Column({ nullable: true })
    RETURN_UNPAID_DATE: string

    @Column({ nullable: true })
    CHEQUE_RETURN_CODE: number

    @Column({ nullable: true })
    CHEQUE_SURRENDER_DATE: string

    @Column({ nullable: true })
    STATUS: string

    @Column({ nullable: true })
    USER_CODE: string


}
