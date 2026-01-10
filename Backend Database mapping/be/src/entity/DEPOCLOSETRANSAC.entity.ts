import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DEPOCLOSETRAN } from './DEPOCLOSETRAN.entity';

@Entity()
export class DEPOCLOSETRANSAC {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_DATE: string

    @Column()
    TRAN_NO: number

    @Column()
    SERIAL_NO: number

    @Column({ nullable: true })
    TRANSFER_ACNOTYPE: string

    @Column({ nullable: true })
    TRANSFER_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    TRANSFER_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    HO_SUB_GLACNO: number

    @Column({ nullable: true })
    NARRATION: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    REC_PENAL_INT_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    RECPAY_INT_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PENAL_INT_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    INTEREST_AMOUNT: number

    @Column({ default: 0 })
    AC_CLOSED: number

    @Column({ nullable: true })
    depoclosetran: number


    @ManyToOne(() => SCHEMAST, (depoCloseTranAc) => depoCloseTranAc.depoCloseTranAc, {
        cascade: true
    })
    @JoinColumn({ name: "TRANSFER_ACTYPE" })
    depoCloseTranAc: SCHEMAST[];


    @ManyToOne(() => DEPOCLOSETRAN, (depocloseTranNo) => depocloseTranNo.depocloseTranNo, {
        cascade: true
    })
    @JoinColumn({ name: "depoclosetran" })
    depocloseTranNo: DEPOCLOSETRAN[];

}
