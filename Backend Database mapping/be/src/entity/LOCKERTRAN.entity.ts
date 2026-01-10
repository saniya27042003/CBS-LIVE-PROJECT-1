import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LOCKERTRAN {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    TRAN_NO: number

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column()
    TRAN_DATE: string

    @Column()
    TRAN_TIME: string

    @Column({ nullable: true })
    TRAN_ACNOTYPE: string

    @Column({ nullable: true })
    TRAN_ACTYPE: string

    @Column({ nullable: true })
    TRAN_ACNO: string

    @Column({ nullable: true })
    LOCKER_OPENING_TIME: string

    @Column({ nullable: true })
    LOCKER_CLOSING_TIME: string

    @Column({ nullable: true })
    OPENING_USER_CODE: string

    @Column({ nullable: true })
    CLOSING_USER_CODE: string

    @Column({ nullable: true })
    NARRATION: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    TRAN_STATUS: string

    @Column({ nullable: true })
    BRANCH_CODE: number

}
