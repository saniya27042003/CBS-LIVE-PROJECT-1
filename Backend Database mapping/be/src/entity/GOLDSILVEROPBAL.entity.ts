import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GOLDSILVEROPBAL {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    BRANCH_CODE: number

    @Column({ nullable: true })
    ITEM_CODE: string

    @Column({ type: 'numeric', precision: 20, scale: 4, default: 0 })
    GROSS_WT: number

    @Column({ type: 'numeric', precision: 20, scale: 4, default: 0 })
    CLEAR_WT: number

    @Column({ nullable: true })
    NO_OF_ITEMS: number

    @Column({ nullable: true })
    BAL_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OP_BALANCE: number

}
