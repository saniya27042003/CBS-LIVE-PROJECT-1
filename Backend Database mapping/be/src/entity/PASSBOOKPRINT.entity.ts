import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PASSBOOKPRINT {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column({ nullable: true })
    AC_TYPE: string

    @Column({ nullable: true })
    AC_NO: string

    @Column({ nullable: true })
    AC_NAME: string

    @Column({ nullable: true })
    AC_OP_CD: string

    @Column({ nullable: true })
    OP_BALANCE: number

    @Column({ nullable: true })
    TRAN_NO: number

    @Column({ nullable: true })
    TRAN_DATE: string

    @Column({ nullable: true })
    NARRATION: string

    @Column({ nullable: true })
    CHEQUE_NO: number

    @Column({ nullable: true })
    WITHDRAW_NO: string

    @Column({ nullable: true })
    DR_AMOUNT: number

    @Column({ nullable: true })
    CR_AMOUNT: number

    @Column({ nullable: true })
    OTHER_AMOUNT: number

    @Column({ nullable: true })
    OTHER_DRCR: string

}
