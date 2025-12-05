import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DEADSTOCKHEADER } from './DEADSTOCKHEADER.entity';

@Entity()
export class DEADSTOCKDETAIL {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_YEAR: string

    @Column()
    TRAN_DATE: string

    @Column()
    TRAN_NO: number

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column({ nullable: true })
    TRAN_DRCR: string

    @Column()
    ITEM_TYPE: number

    @Column({ nullable: true })
    ITEM_CODE: number

    @Column({ nullable: true })
    ITEM_NAME: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    ITEM_RATE: number

    @Column({ nullable: true })
    ITEM_QTY: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    TRAN_ACTYPE: string

    @Column({ nullable: true })
    TRAN_ACNO: number

    @Column({ nullable: true })
    TRAN_REF_NO: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DEPR_RATE: number

    @Column({ nullable: true })
    deadstockHeader: number

    @ManyToOne(() => DEADSTOCKHEADER, (deadstockHead) => deadstockHead.deadstockHead, {
        cascade: true
    })
    @JoinColumn({ name: "deadstockHeader" })
    deadstockHead: DEADSTOCKHEADER[];

}
