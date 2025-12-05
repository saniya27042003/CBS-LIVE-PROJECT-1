import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IDMASTER } from './customer-id.entity'
import { CITYMASTER } from './city-master.entity'
@Entity()
export class CUSTOMERADDRESS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_HONO: string;

    @Column({ nullable: true })
    AC_WARD: string;

    @Column({ nullable: true })
    AC_ADDR: string;

    @Column({ nullable: true })
    AC_GALLI: string;

    @Column({ nullable: true })
    AC_AREA: string;

    @Column({ nullable: true })
    AC_CTCODE: number;

    @Column({ nullable: true })
    AC_PIN: string;

    @Column({ default: false })
    AC_ADDFLAG: boolean

    @Column({ default: 'P' })
    AC_ADDTYPE: string

    @Column({ unique: false })
    idmasterID: number
    @ManyToOne(() => IDMASTER, (idmaster) => idmaster.custAddress, {
        cascade: true
    })
    @JoinColumn({ name: "idmasterID" })
    idmaster: IDMASTER[];

    @ManyToOne(() => CITYMASTER, (city) => city.cityMaster, {
        cascade: true
    })
    @JoinColumn({ name: "AC_CTCODE" })
    city: CITYMASTER[];
}