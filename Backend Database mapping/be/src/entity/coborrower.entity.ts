import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IDMASTER } from './customer-id.entity';
import { LNMASTER } from './term-loan-master.entity';

@Entity()
export class COBORROWER {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_TYPE: string

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column({ length: 15 })
    AC_NO: string

    @Column({ nullable: true })
    AC_NAME: string

    @Column()
    @Generated('increment')
    SERIAL_NO: number

    @Column({ nullable: true })
    CAC_CUSTID: string

    @Column()
    lnmasterID: number
    @ManyToOne(() => LNMASTER, (lnmaster) => lnmaster.CoborrowerMaster, {
        cascade: true
    })
    @JoinColumn({ name: "lnmasterID" })
    lnmaster: LNMASTER[];
}