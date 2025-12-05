import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class REBITINTTRAN {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })
    TRAN_NO: number

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column({ nullable: true })
    BRANCH_CODE: number

    @Column({ nullable: true })
    TRAN_DATE: string

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column({ nullable: true })
    TRAN_ACNOTYPE: string

    @Column()
    TRAN_ACTYPE: number

    @Column({ length: 15, default: 0 })
    TRAN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    REBIT_PAID_DATE: string

    @Column({ nullable: true })
    REBIT_FROM_YEAR: number

    @Column({ nullable: true })
    REBIT_TO_YEAR: number

    @Column({ nullable: true })
    PROCESS_DATE: string




}
