import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TERMMASTER {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    SR_NO: number

    @Column({ nullable: true })
    ACNOTYPE: string

    @Column({ nullable: true })
    TERM_TYPE: string

    @Column({ nullable: true, default: 0 })
    PERIOD_FROM: number

    @Column({ nullable: true, default: 0 })
    PERIOD_TO: number
}