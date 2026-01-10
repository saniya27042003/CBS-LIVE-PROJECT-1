import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EXCESSCASH {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    TRAN_DATE: string

    @Column({ nullable: true })
    CASH_LIMIT: string

    @Column({ nullable: true })
    CLOSING_BALANCE: string

    @Column({ nullable: true })
    EXCESS_CASH: string

    @Column({ nullable: true })
    REASON: string
}
