import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PGCOMMISSIONMASTER {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    SR_NO: number

    @Column({ nullable: true })
    EFFECT_DATE: string

    @Column({ nullable: true })
    SLAB_TYPE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AMOUNT_FROM: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AMOUNT_TO: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    PIGMY_COMMISSION_PERCENTAGE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    COMM_AGAINST_LN_PERCENT: number

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column({ nullable: true })
    AC_TYPE: number

    @Column({ nullable: true, length: 15 })
    AC_NO: string

    @Column({ nullable: true })
    PG_AC_ACNOTYPE: string

    @Column({ nullable: true })
    PG_AC_TYPE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PIGMY_SVR_CHARGE_RATE: number
}
