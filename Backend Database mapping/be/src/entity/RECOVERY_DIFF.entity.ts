import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RECOVERY_DIFF {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })
    MEMBER_NO: number

    @Column({ nullable: true })
    AC_NAME: string

    @Column({ nullable: true })
    AC_TYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    BALANCE: number

    @Column({ nullable: true })
    REASON: string

    @Column({ nullable: true })
    SALNAME: string




}
