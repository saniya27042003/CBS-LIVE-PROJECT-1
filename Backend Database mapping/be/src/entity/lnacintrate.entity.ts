import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LNMASTER } from './term-loan-master.entity';

@Entity()
export class LNACINTRATE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    AC_ACNOTYPE: string

    @Column({ type: 'date' })
    EFFECT_DATE: string

    @Column({default:0})
    AC_TYPE: number

    @Column({default:0})
    AC_NO: number

    @Column({length:15})
    BANKACNO: string

    @Column()
    BRANCH_CODE: number;

    @Column({ default: 1 })
    OPENING_ENTRY: number

    @Column({ default: 1 })
    SERIAL_NO: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    INT_RATE: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    PENAL_INT_RATE: number

    @Column({ default: 1 })
    UPDATEFLAG: Number

    @Column()
    LNMASTERID: number

    @ManyToOne(() => LNMASTER, (termLoan) => termLoan.termLoan, {
        cascade: true
    })
    @JoinColumn({ name: "LNMASTERID" })
    termLoan: LNMASTER[];
}
