import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn, Index } from 'typeorm';
import { CUSTOMERADDRESS } from './customer-address.entity'
import { SHMASTER } from './share-master.entity';
import { TDSFORMSUBMIT } from './tds-form.entity'
import { SECURITYDETAILS } from './security.entity'
import { CUSTDOCUMENT } from './document.entity'
import { LNMASTER } from './term-loan-master.entity'
import { DPMASTER } from './dpmaster.entity';
import { PGMASTER } from './pgmaster.entity';
import { CASTMASTER } from './cast-master.entity'
import { OCCUPATIONMASTER } from './ocuupation-master.entity'
import { RISKCATEGORYMASTER } from './risk-category.entity'
@Entity()
@Unique(['AC_NO'])
@Index("NDXIDMASTER", ["BRANCH_CODE", "AC_NO"])
export class IDMASTER {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    AC_NO: number;

    @Column({ nullable: true })
    AC_MEMBTYPE: number;

    @Column({ nullable: true })
    AC_MEMBNO: number;

    @Column({ nullable: true })
    AC_TITLE: string;

    @Column({ nullable: true })
    F_NAME: string;

    @Column({ nullable: true })
    L_NAME: string;

    @Column({ nullable: true })
    M_NAME: string;

    @Column({ nullable: true })
    AC_NAME: string;

    // @Column({ default: 0 })
    @Column({ nullable: true })
    AC_OCODE: number;

    @Column({ nullable: true, length: 14 })
    AC_ADHARNO: string;

    // @Column({ default: 0 })
    @Column({ nullable: true })
    AC_RISKCATG: number;

    @Column({ nullable: true })
    AC_BIRTH_DT: string;

    @Column({ nullable: true })
    AC_PANNO: string;

    // @Column({ nullable: true })
    // AC_SALARYDIVISION_CODE: string;

    @Column({ nullable: true, length: 13 })
    AC_MOBILENO: string;

    @Column({ nullable: true })
    AC_PHONE_RES: string;

    @Column({ nullable: true })
    AC_PHONE_OFFICE: string;

    @Column({ nullable: true })
    AC_EMAILID: string;

    @Column({ nullable: true, default: 0 })
    TDSDOCUMNET: string;

    // @Column({ nullable: true })
    // AC_IS_RECOVERY: string;

    @Column({ nullable: true, default: 0 })
    TDS_REQUIRED: string;

    @Column({ nullable: true, default: 0 })
    SMS_REQUIRED: string;

    @Column({ nullable: true, default: 0 })
    IS_KYC_RECEIVED: string;

    @CreateDateColumn({ nullable: true })
    SYSADD_DATETIME: Date;

    @Column({ nullable: true })
    SYSADD_LOGIN: string;

    @UpdateDateColumn()
    SYSCHNG_DATETIME: Date;

    @Column({ nullable: true })
    SYSCHNG_LOGIN: string;

    @Index('IDMASTERBRANCH')
    @Column({ nullable: true })
    BRANCH_CODE: number;

    @OneToMany(() => CUSTOMERADDRESS, custAddress => custAddress.idmaster, {
        cascade: ["insert", "update"]
    })
    custAddress: CUSTOMERADDRESS[];

    @OneToOne(() => TDSFORMSUBMIT, tdsForm => tdsForm.idmaster, {
        cascade: ["insert", "update"]
    })
    tdsForm: TDSFORMSUBMIT[];

    @OneToMany(() => SHMASTER, shareMaster => shareMaster.idmaster, {
        cascade: ["insert", "update"]
    })
    shareMaster: SHMASTER[];

    @OneToMany(() => DPMASTER, dpmaster => dpmaster.idmaster, {
        cascade: ["insert", "update"]
    })
    dpmaster: DPMASTER[];

    @OneToMany(() => CUSTDOCUMENT, custdocument => custdocument.idmaster, {
        cascade: ["insert", "update"]
    })
    custdocument: CUSTDOCUMENT[];

    @OneToMany(() => LNMASTER, termLoan => termLoan.idmaster, {
        cascade: ["insert", "update"]
    })
    termLoan: LNMASTER[];

    @OneToMany(() => PGMASTER, pgmaster => pgmaster.idmaster, {
        cascade: ["insert", "update"]
    })
    pgmaster: PGMASTER[];

    // @Column({ default: 0 })
    @Column({ nullable: true })
    AC_CAST: number;

    @Column({ nullable: true })
    AC_TITLE_REG: string
    @Column({ nullable: true })
    F_NAME_REG: string
    @Column({ nullable: true })
    M_NAME_REG: string
    @Column({ nullable: true })
    L_NAME_REG: string
    @Column({ nullable: true })
    AC_ADD_REG: string


    @Column({ nullable: true })
    ORA_AC_NO: number;

    @Column({ nullable: true })
    ORA_BRANCH: number;

    @ManyToOne(() => CASTMASTER, (castMaster) => castMaster.cast, {
        cascade: true
    })
    @JoinColumn({ name: "AC_CAST" })
    castMaster: CASTMASTER[];

    @ManyToOne(() => OCCUPATIONMASTER, (occupMaster) => occupMaster.occupation, {
        cascade: true
    })
    @JoinColumn({ name: "AC_OCODE" })
    occupMaster: OCCUPATIONMASTER[];

    @ManyToOne(() => RISKCATEGORYMASTER, (riskCategory) => riskCategory.riskMaster, {
        cascade: true
    })
    @JoinColumn({ name: "AC_RISKCATG" })
    riskCategory: RISKCATEGORYMASTER[];
}