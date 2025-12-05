import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGEXPDETAILS {

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
    AMOUNT: number

    @Column({ nullable: true })
    RESSOLUTION: string


}
 