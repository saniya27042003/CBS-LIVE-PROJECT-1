import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MONTHLYRECOVERY {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    PROCESS_YEAR: number

    @Column()
    PROCESS_MONTH: number

    @Column({ nullable: true })
    AC_RECOVERYID: number

    @Column({ nullable: true })
    TRAN_NO: number

    @Column({ length: 15 })
    AC_NO: string

    @Column()
    AC_TYPE: number

    @Column({ nullable: true })
    AC_SALARYDIVISION: number

    @Column({ nullable: true })
    AC_SALARYDIVISIONNAME: string

    @Column({ nullable: true })
    T_MEMBCONT_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_MEMBCONT_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMBCONT_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMBCONT_TOTINST: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMBCONT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_KALYANNIDHI: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_KAYAMTHEV_INST: number

    @Column({ nullable: true, length: 15 })
    T_KAYAMTHEV_ACNO: string

    @Column({ nullable: true })
    T_KAYAMTHEV_ACTYPE: number

    @Column({ nullable: true })
    T_LOAN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_LOAN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_LOAN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_LOAN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_LOAN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_LOAN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_LOAN_PENAL_INT: number

    @Column({ nullable: true })
    T_EMRGLN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_EMRGLN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_EMRGLN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_EMRGLN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_EMRGLN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_EMRGLN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_EMRGLN_PENAL_INT: number

    @Column({ nullable: true })
    T_MEMRGLN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_MEMRGLN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMRGLN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMRGLN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMRGLN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMRGLN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMRGLN_PENAL_INT: number

    @Column({ nullable: true })
    T_HPLN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_HPLN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_HPLN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_HPLN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_HPLN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_HPLN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_HPLN_PENAL_INT: number

    @Column({ nullable: true })
    T_DPLN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_DPLN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_DPLN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_DPLN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_DPLN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_DPLN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_DPLN_PENAL_INT: number

    @Column({ nullable: true })
    T_GRAHLOAN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_GRAHLOAN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_GRAHLOAN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_GRAHLOAN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_GRAHLOAN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_GRAHLOAN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_GRAHLOAN_PENAL_INT: number

    @Column({ nullable: true })
    T_BLDGLN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_BLDGLN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_BLDGLN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_BLDGLN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_BLDGLN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_BLDGLN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_BLDGLN_PENAL_INT: number

    @Column({ nullable: true })
    T_SALARYLN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_SALARYLN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SALARYLN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SALARYLN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SALARYLN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SALARYLN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SALARYLN_PENAL_INT: number

    @Column({ nullable: true })
    T_VHCLLN_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_VHCLLN_ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_VHCLLN_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_VHCLLN_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_VHCLLN_INT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_VHCLLN_RECINT_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_VHCLLN_PENAL_INT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MASIKTHEV_INST: number

    @Column({ nullable: true, length: 15 })
    T_MASIKTHEVACNO: string

    @Column({ nullable: true })
    T_MASIKTHEV_ACTYPE: number

    @Column({ nullable: true })
    T_NO_OF_MASIKTHEVAC: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SAVING_INST: number

    @Column({ nullable: true, length: 15 })
    T_SAVINGACNO: string

    @Column({ nullable: true })
    T_SAVING_ACTYPE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_ANAMAT_INST: number

    @Column({ nullable: true, length: 15 })
    T_ANAMATACNO: string

    @Column({ nullable: true })
    T_ANAMAT_ACTYPE: number

    @Column({ nullable: true })
    T_NO_OF_ANAMATAC: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OTHER_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_OTHER1AMT: number

    @Column({ nullable: true })
    T_OTHER1ACNO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_OTHER2AMT: number

    @Column({ nullable: true })
    T_OTHER2ACNO: string

    @Column({ nullable: true })
    POSTED: string

    @Column({ nullable: true })
    AC_POSTING: number

    @Column({ nullable: true })
    AC_POST_DATE: string

    @Column({ nullable: true, length: 15 })
    EMP_NO: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_RECURRING_INST: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_UNICONT_INST: number

    @Column({ nullable: true, length: 15 })
    T_UNICONT_ACNO: string

    @Column({ nullable: true })
    T_UNICONT_ACTYPE: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_UNICONT_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_RECURRING_INST_OTHER: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SAVING_BAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AC_SUBSALDIV: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_LOAN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_EMRGLN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMRGLN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_HPLN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_DPLN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_GRAHLOAN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_BLDGLN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_SALARYLN_RECPENAL: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_VHCLLN_RECPENAL: number

    @Column({ nullable: true })
    TRAN_DATE: string

    @Column({ nullable: true })
    T_KALYANNIDHI_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_KALYANNIDHI_ACNO: string

    @Column({ nullable: true })
    T_RECURRING_ACTYPE_OTHER: number

    @Column({ nullable: true })
    T_RECURRING_ACNO_OTHER: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_KAYAMTHEV_PENAL_INT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_UNICONT_PENAL_INT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_RECURRING_PENAL_INT_OTHER: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MEMBCONT_PENAL_INT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_MASIKTHEV_PENAL_INT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    T_RECURRING_PENAL_INT: number

    @Column({ nullable: true })
    T_NIDHI1_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_NIDHI1_ACNO: string

    @Column({ nullable: true })
    T_NIDHI1_INST: number

    @Column({ nullable: true })
    T_NIDHI2_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_NIDHI2_ACNO: string

    @Column({ nullable: true })
    T_NIDHI2_INST: number

    @Column({ nullable: true })
    T_NIDHI3_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_NIDHI3_ACNO: string

    @Column({ nullable: true })
    T_NIDHI3_INST: number

    @Column({ nullable: true })
    T_NIDHI4_ACTYPE: number

    @Column({ nullable: true, length: 15 })
    T_NIDHI4_ACNO: string

    @Column({ nullable: true })
    T_NIDHI4_INST: number


}
