import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OIRTRAN {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    TRAN_DATE: string

    @Column()
    SERIAL_NO: number

    @Column({ nullable: true })
    TRAN_DRCR: string

    @Column()
    TRAN_ACNOTYPE: string

    @Column()
    TRAN_ACTYPE: number

    @Column({ length: 15 })
    TRAN_ACNO: string

    @Column()
    TRAN_GLACNO: number

    @Column()
    TRAN_MODE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OIR_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OVERDUE_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DUE_INSTALLMENT: number

    @Column({ nullable: true })
    NPA_DATE: string

    @Column({ default: 0 })
    TRAN_STATUS: number

    @Column({ nullable: true })
    USER_CODE: string


}
