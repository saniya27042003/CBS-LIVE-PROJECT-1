import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGDUESDETAILS {

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
    LOAN_TYPE: string

    @Column({ nullable: true })
    DUEDATE: string

    @Column({ nullable: true })
    LEDGERBALANCE: number

    @Column({ nullable: true })
    OVERDUEAMOUNT: number

    @Column({ nullable: true })
    SHARESAMOUNT: number

    @Column({ nullable: true })
    DEPOSITAMOUNT: number

    @Column({ nullable: true })
    RESSOLUTION: string


}
