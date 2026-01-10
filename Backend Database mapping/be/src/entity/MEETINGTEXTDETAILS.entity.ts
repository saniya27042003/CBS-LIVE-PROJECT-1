import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGTEXTDETAILS {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    MEETING_NO: number

    @Column()
    MEETING_YEAR: number

    @Column({ nullable: true })
    SUB_SRNO: number

    @Column({ nullable: true })
    SUBJECT_DETAILS: string


}
