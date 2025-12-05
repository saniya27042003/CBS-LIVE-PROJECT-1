import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PASSBOOKHISTORY {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column()
    AC_TYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column({ nullable: true })
    LAST_PRINT_DATE: string

    @Column({ nullable: true })
    LAST_PRINT_TRANNO: number

    @Column({ default: 0 })
    PS_LINES_PRINTED: number
}
