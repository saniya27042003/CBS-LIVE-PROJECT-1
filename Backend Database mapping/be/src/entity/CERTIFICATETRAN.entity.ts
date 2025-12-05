import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CERTIFICATETRAN {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    CERTIFICATE_NO: number

    @Column()
    MEMBER_NO: number

    @Column({ nullable: true })
    NO_OF_SHARES: number

    @Column({ nullable: true })
    SH_FROM_DISNO: number

    @Column({ nullable: true })
    SH_TO_DISNO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    SH_FROM_DATE: string

    @Column({ nullable: true })
    SH_TO_DATE: string

    @Column({ nullable: true })
    AC_SALARYDIVISION: number

    @Column({ nullable: true })
    USER_CODE: string





}
