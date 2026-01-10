
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class COMMISSIONSLAB {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    INSTRUMENT_TYPE: string

    @Column({ nullable: true })
    EFFECTIVE_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    FROM_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TO_AMOUNT: number

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    RATE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    RATE_PER_UNIT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    MIN_COMMISSION: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    MAX_COMMISSION: number


}
