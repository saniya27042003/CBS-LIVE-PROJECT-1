import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SCANDOCHISTORY {

    @PrimaryGeneratedColumn()
    id: number;



    @Column({ nullable: true })
    AC_TYPE: string

    @Column({ nullable: true })
    AC_NO: number

    @Column({ nullable: true })
    SCAN_NO: number

    @Column({ nullable: true })
    SCAN_DATE: number

    @Column({ nullable: true })
    SUBJECT: string

    @Column({ nullable: true })
    SCANTYPE: number

    @Column({ nullable: true })
    PIC_PATH: string

    @Column({ nullable: true })
    TRAN_DATE: string

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string



}
