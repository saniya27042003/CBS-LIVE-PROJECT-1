import { CITYMASTER } from './city-master.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class APPLGUARANTERS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_YEAR: string

    @Column()
    TRAN_DATE: string

    @Column()
    TRAN_NO: number

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column({ nullable: true })
    MEMBER_TYPE: string

    @Column({ nullable: true })
    MEMBER_NO: number

    @Column({ nullable: true })
    NAME: string

    @Column({ nullable: true })
    AC_ADDR1: string

    @Column({ nullable: true })
    AC_ADDR2: string

    @Column({ nullable: true })
    AC_ADDR3: string

    @Column()
    CTCODE: number

    @ManyToOne(() => CITYMASTER, (cityCode) => cityCode.cityCode, {
        cascade: true
    })
    @JoinColumn({ name: "CTCODE" })
    cityCode: CITYMASTER[];
}
