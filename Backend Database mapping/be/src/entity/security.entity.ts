import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { IDMASTER } from './customer-id.entity';
import { LNMASTER } from '../entity/term-loan-master.entity';
import { LNDISPUTEDETAILS } from './dispute-loan-master.entity';

@Entity()
export class SECURITYDETAILS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column({ nullable: true })
    AC_TYPE: string

    @Column({ length: 15 })
    AC_NO: string

    @Column()
    @Generated('increment')
    SERIAL_NO: number

    @Column({ nullable: true })
    SECURITY_CODE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    SECURITY_VALUE: number

    @Column()
    lnmasterID: number
    @ManyToOne(() => LNMASTER, (lnmaster) => lnmaster.securityMaster, {
        cascade: true
    })
    @JoinColumn({ name: "lnmasterID" })
    lnmaster: LNMASTER[];

    @ManyToOne(() => LNDISPUTEDETAILS, d => d.securityMaster)
@JoinColumn({ name: 'LNDISPUTE_ID' }) // use real FK column
lndispute: LNDISPUTEDETAILS;

}

