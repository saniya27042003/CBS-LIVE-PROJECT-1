import { Column, Entity, PrimaryGeneratedColumn, Check, Index } from "typeorm";

@Entity()
@Check(`"TRAN_DRCR" IN ('D', 'C')`)
@Check(`"TRAN_TYPE" IN ('CS', 'TR', 'JV', 'CL', 'IBT')`)
@Index("NDXPIGMYTRAN", ["BRANCH_CODE", "TRAN_DATE", "TRAN_ACNOTYPE", "TRAN_ACTYPE", "TRAN_ACNO"])
@Index("NDXPIGMYTRAN1", ["BRANCH_CODE", "TRAN_DATE", "TRAN_NO", "SERIAL_NO"])
export class PIGMYTRAN {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_NO: number;

    @Column()
    SERIAL_NO: number;

    @Column()
    BRANCH_CODE: number;

    @Column()
    TRAN_DATE: string;

    @Column()
    TRAN_TIME: string;

    @Column()
    TRAN_TYPE: string;

    @Column()
    TRAN_DRCR: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PENAL_INTEREST: number;

    @Column({ nullable: true })
    TRAN_SOURCE_TYPE: string

    @Column({ default: 0 })
    TRAN_MODE: number;

    @Column({ nullable: true })
    TRAN_STATUS: number;

    @Column({ nullable: true })
    ENTRY_TYPE: string;

    @Column({ nullable: true })
    AGENT_ACNOTYPE: string;

    @Column({ nullable: true })
    AGENT_ACTYPE: number;

    @Column({ nullable: true, length: 15 })
    AGENT_ACNO: string;

    @Column({ nullable: true })
    TRAN_ACNOTYPE: string;

    @Column()
    TRAN_ACTYPE: number;

    @Column({ nullable: true, length: 15 })
    TRAN_ACNO: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TRAN_AMOUNT: number;

    @Column({ nullable: true })
    TRAN_GLACNO: number;

    @Column({ nullable: true })
    CHEQUE_DATE: string;

    @Column({ nullable: true })
    CHEQUE_SERIES: string;

    @Column({ nullable: true })
    CHEQUE_NO: string;

    @Column({ nullable: true })
    WITHDRAW_NO: string;

    @Column({ nullable: true })
    NARRATION: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    INTEREST_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PENAL_INT_AMOUNT: number

    @Column({ nullable: true })
    INTEREST_DATE: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    RECPAY_INT_AMOUNT: number;

    @Column({ nullable: true })
    USER_CODE: string;

    @Column({ nullable: true })
    OFFICER_CODE: string;

    @Column({ nullable: true })
    CASHIER_CODE: string;

    @Column({ default: 0 })
    IS_INTEREST_ENTRY: number;

    @Column({ nullable: true })
    CHART_NO: number;

    @Column({ nullable: true })
    RECEIPT_NO: string;

    @Column({ nullable: true })
    EDIT_USER: string;

    @Column({ nullable: true })
    EDIT_DATE: string;

    @Column({ nullable: true })
    AUTO_VOUCHER_DATE: string;

    @Column({ nullable: true })
    AUTO_VOUCHER_NO: string;

    @Column({ nullable: true })
    TRAN_ENTRY_TYPE: string;

    @Column({ nullable: true })
    AC_CLOSED: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER1_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER2_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER3_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER4_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER5_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER6_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER7_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER8_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER9_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER10_AMOUNT: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER11_AMOUNT: number;

}