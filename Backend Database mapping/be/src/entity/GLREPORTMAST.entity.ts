import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GLREPORTMAST {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    CODE: string

    @Column()
    NAME: string

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column({ nullable: true })
    FIRST_SRNO: string

    @Column({ nullable: true })
    SECOND_SRNO: string

    @Column({ nullable: true })
    THIRD_SRNO: string

    @Column({ nullable: true })
    FOURTH_SRNO: string

    @Column({ nullable: true })
    CODE_TYPE: string

    @Column({ nullable: true })
    REPORT_TYPE: string

    @Column({ nullable: true })
    PERCENTAGE: number

    @Column({ nullable: true })
    PERCENTAGE_OF_CODE: string

    @Column({ nullable: true })
    PERCENTAGE_CONSIDARATION: string

    @Column({ nullable: true })
    TEMP_AMOUNT: number

    @Column({ nullable: true })
    FINAL_AMOUNT: number

    @Column({ nullable: true })
    FINAL_AMOUNT1: number

    @Column({ nullable: true })
    FINAL_AMOUNT2: number

    @Column({ nullable: true })
    FINAL_HEADING1: string

    @Column({ nullable: true })
    FINAL_HEADING2: string

    @Column({ nullable: true })
    INPUT_ALLOWED: number

    @Column({ nullable: true })
    SUB_COLUMN_REQUIRED: number

    @Column({ nullable: true })
    IS_RATIO: number

    @Column({ nullable: true })
    ALTERNET_CODE: string

    @Column({ nullable: true })
    HO_LIQ_CODE1: number

    @Column({ nullable: true })
    HO_LIQ_CODE2: number

    @Column({ nullable: true })
    IS_PRINT_IN_REPORT: number

    @Column({ nullable: true })
    INNER_AMT_REQD: number

    @Column({ nullable: true })
    ADD_PL_AMOUNT: number

    @Column({ nullable: true })
    PRINT_AT_OUTER: number

    @Column({ nullable: true })
    ALTERNATE_BALANCE_CODE: string


}
