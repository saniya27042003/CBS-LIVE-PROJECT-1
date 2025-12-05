
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CRARMASTER {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    CODE: number

    @Column({ nullable: true })
    NAME: string

    FIRST_SRNO: string

    @Column({ nullable: true })
    SECOND_SRNO: string

    @Column({ nullable: true })
    THIRD_SRNO: string

    @Column({ nullable: true })
    FOURTH_SRNO: string

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    PERCENTAGE: number

    @Column({ nullable: true })
    HEAD_TYPE: string

    @Column({ default: false })
    IS_INPUT: boolean

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AMOUNT: number

}
