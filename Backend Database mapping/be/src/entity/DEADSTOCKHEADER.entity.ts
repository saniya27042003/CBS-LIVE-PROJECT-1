import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DEADSTOCKDETAIL } from './DEADSTOCKDETAIL.entity'
@Entity()
export class DEADSTOCKHEADER {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_YEAR: string

    @Column()
    TRAN_DATE: string

    @Column()
    @Generated('increment')
    TRAN_NO: number

    @Column()
    BRANCH_CODE: number

    @Column()
    TRAN_TIME: string

    @Column()
    TRAN_TYPE: string

    @Column()
    TRAN_MODE: string

    @Column({ nullable: true })
    TRAN_DRCR: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    TRAN_GLACNO: number

    @Column({ nullable: true })
    CHEQUE_DATE: string

    @Column({ nullable: true })
    CHEQUE_SERIES: string

    @Column({ nullable: true })
    CHEQUE_NO: number

    @Column({ nullable: true })
    TRANSFER_ACNOTYPE: string

    @Column({ nullable: true })
    TRANSFER_ACTYPE: string

    @Column({ nullable: true })
    TRANSFER_ACNO: number

    @Column({ nullable: true })
    HO_SUB_GLACNO: number

    @Column({ nullable: true })
    TRAN_SUPPLIER_NAME: string

    @Column({ nullable: true })
    SUPPLIER_BILL_DATE: string

    @Column({ nullable: true })
    SUPPLIER_BILL_NO: number

    @Column({ nullable: true })
    RESO_NO: string

    @Column({ nullable: true })
    RESO_DATE: string

    @Column({ nullable: true })
    NARRATION: string

    @Column({ default: 0 })
    TRAN_STATUS: number

    @Column({ nullable: true })
    TRAN_ENTRY_TYPE: string

    @Column()
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    CGST_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    SGST_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    IGST_AMT: number

    @Column({ nullable: true })
    GST_NO: string

    @Column({ nullable: true })
    SYSCHNG_LOGIN: string;

    @Column({ nullable: true, default: 1 })
    status: number

    @OneToMany(() => DEADSTOCKDETAIL, (deadstockHead) => deadstockHead.deadstockHead)
    deadstockHead: DEADSTOCKDETAIL[]

}
