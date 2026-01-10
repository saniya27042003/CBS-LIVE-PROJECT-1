import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OVERDUEDISCOUNT {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    AC_ACNOTYPE: string

    @Column()
    AC_TYPE: string

    @Column()
    AC_NO: number

    @Column()
    EFFECT_DATE: string

    @Column({ nullable: true })
    DISCOUNT_MONTHS: number


}
