import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGDIRECTDETAILS {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    MEETING_YEAR: number

    @Column()
    MEETING_NO: number

    @Column({ nullable: true })
    SUB_SRNO: number

    @Column({ nullable: true })
    DIR_SRNO: number

    @Column({ nullable: true })
    DIR_NAME: string

    @Column({ nullable: true })
    DIR_DESIGNATION: string

    @Column({ nullable: true })
    PRESENTY: number


}
