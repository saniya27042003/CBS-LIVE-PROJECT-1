import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DEDUTRAN {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    MONTHYEAR: string

    @Column({ nullable: true })
    EMP_NO: number

    @Column({ nullable: true })
    PAY_FIELD: string

    @Column({ nullable: true })
    BANK_FIELD: string

    @Column({ nullable: true })
    S_NAME: string

    @Column({ nullable: true })
    AC_TYPE: string

    @Column({ nullable: true })
    AC_NO: number

    @Column({ nullable: true })
    TRAN_AMOUNT: number

}
