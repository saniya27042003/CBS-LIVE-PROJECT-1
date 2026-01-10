
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class COMPANYGROUPLINK {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    COMP_CODE: number

    @Column()
    SERIAL_NO: number

    @Column()
    AC_ACNOTYPE: string

    @Column()
    AC_TYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DEFAULT_AMOUNT: number


}
