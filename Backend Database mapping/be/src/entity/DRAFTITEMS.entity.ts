import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DRAFTITEMS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    DD_TRAN_NO: number

    @Column({ nullable: true })
    DD_TRAN_DATE: string

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column({ nullable: true })
    BANK_CODE: number

    @Column({ nullable: true })
    CITY_CODE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DRAFT_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    BANK_COMMISSION_AMOUNT: number

    @Column({ nullable: true })
    DRAFT_TYPE: string

    @Column({ nullable: true })
    DRAWEE_NAME: string

    @Column({ nullable: true })
    DRAFT_SERIES: string

    @Column({ nullable: true })
    DRAFT_NO: number

    @Column({ nullable: true })
    ISSUE_BY: string

    @Column({ nullable: true })
    IS_PRINTED: number
}
