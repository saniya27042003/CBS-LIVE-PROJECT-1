import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BATCHVOUCHERTRAN {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_NO: number

    @Column()
    TRAN_DATE: string

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column({ default: 0 })
    TRAN_STATUS: number

    @Column()
    COMP_CODE: number

    @Column()
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column()
    BRANCH_CODE: number

    @Column({ nullable: true })
    CHEQUE_DATE: string

    @Column({ nullable: true })
    CHEQUE_SERIES: string

    @Column({ nullable: true })
    CHEQUE_NO: string

    @Column({ nullable: true })
    FILE_IMPORT: number

    @ManyToOne(() => OWNBRANCHMASTER, (voucherBranch) => voucherBranch.voucherBranch, {
        cascade: true
    })
    @JoinColumn({ name: "BRANCH_CODE" })
    voucherBranch: OWNBRANCHMASTER[];
}
