import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HISTORYGENERALMEETING {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    MEETING_DATE: string

    @Column({ nullable: true })
    MEETING_FROM_YEAR: number

    @Column({ nullable: true })
    MEETING_TO_YEAR: number

    @Column()
    ACNOTYPE: string

    @Column()
    ACTYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column()
    MEETING_STATUS: string

    @Column({ nullable: true })
    MEMBER_CLOSE_DATE: string

    @Column({ nullable: true })
    AC_SALARYDIVISION_CODE: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string
}
