import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class INTINSTRUCTIONSLOG {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    TRAN_DATE: string

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column({ nullable: true })
    INSTRUCTION_NO: number

    @Column({ nullable: true })
    SUCCESS_STATUS: string

    @Column({ nullable: true })
    DAILYTRAN_TRAN_NO: number

    @Column()
    EXPECTED_EXECUTION_DATE: string

    @Column({ nullable: true })
    LAST_INT_DATE: string

    @Column({ nullable: true })
    PARTICULARS: string

    @Column({ nullable: true })
    CR_ACNOTYPE: string

    @Column({ nullable: true })
    CR_ACTYPE: number

    @Column({ length: 15 })
    CR_AC_NO: string

    @Column({ nullable: true })
    HO_SUB_GLACNO: number

    @Column({ nullable: true })
    TRAN_AMOUNT: number

    @Column({ nullable: true })
    DR_ACNOTYPE: string

    @Column({ nullable: true })
    DR_ACTYPE: number

    @Column({ length: 15 })
    DR_AC_NO: string

    @Column({ nullable: true })
    ADV_NARRATION: string

}
