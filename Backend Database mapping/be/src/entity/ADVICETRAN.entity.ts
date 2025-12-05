import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ADVICETRAN {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ADVICE_TYPE: string

    @Column()
    REG_SERIAL_NO: number

    @Column()
    TRAN_DATE: string

    @Column()
    INSTRUMENT_DATE: string

    @Column({ nullable: true })
    INSTRUMENT_TYPE: string

    @Column({ nullable: true })
    INSTRUMENT_SERIES: string

    @Column()
    INSTRUMENT_NO: number

    @Column()
    ISSUEING_BRANCH_CODE: number

    @Column()
    PARTY_ACNOTYPE: string

    @Column()
    PARTY_ACTYPE: string

    @Column()
    PARTY_ACNO: number

    @Column({ nullable: true })
    BANEFICIERY_NAME: string

    @Column()
    TRAN_AMOUNT: number

    @Column()
    TRAN_ACNOTYPE: string

    @Column()
    TRAN_ACTYPE: string

    @Column()
    TRAN_ACNO: number

    @Column({ nullable: true })
    TRAN_STATUS: string

    @Column({ nullable: true })
    NARRATION: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    IS_CLEAR: number


}
