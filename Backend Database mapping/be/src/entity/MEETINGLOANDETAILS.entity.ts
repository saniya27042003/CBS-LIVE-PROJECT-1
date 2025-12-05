import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGLOANDETAILS {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    MEETING_NO: number

    @Column()
    MEETING_YEAR: number

    @Column({ nullable: true })
    SUB_SRNO: number

    @Column({ nullable: true })
    AC_SRNO: number

    @Column({ nullable: true })
    AC_NAME: string

    @Column({ nullable: true })
    LOANDATE: string

    @Column({ nullable: true })
    REF_NAME: string

    @Column({ nullable: true })
    LOAN_TYPE: string

    @Column({ nullable: true })
    DEMAND_AMOUNT: number

    @Column({ nullable: true })
    RESSOLUTION: string


}
