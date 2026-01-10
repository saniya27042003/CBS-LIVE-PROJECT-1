import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FORMIXMASTER {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    REPORT_TYPE: string

    @Column({ nullable: true })
    TRAN_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OVERDUE_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PRIORITY_AMOUNT: number

}
