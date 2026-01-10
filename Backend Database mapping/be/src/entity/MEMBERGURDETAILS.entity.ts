import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEMBERGURDETAILS {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    MEMBER_ACNOTYPE: string

    @Column()
    MEMBER_ACTYPE: string

    @Column()
    MEMBER_ACNO: number

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column()
    LN_ACNOTYPE: string

    @Column()
    LN_ACTYPE: string

    @Column()
    LN_ACNO: number

    @Column()
    LN_ACNAME: string

    @Column({ nullable: true })
    LN_SANCTIONAMT: number

    @Column({ nullable: true })
    LN_OPDATE: string

    @Column({ nullable: true })
    LN_EXPDT: string

    @Column({ nullable: true })
    GUR_NO1: number

    @Column({ nullable: true })
    GUR_NO2: number

    @Column({ nullable: true })
    LN_AC_CLOSED: number

    @Column({ nullable: true })
    LN_CLOSEDT: string

    @Column({ nullable: true })
    AC_BRANCH: number


}
