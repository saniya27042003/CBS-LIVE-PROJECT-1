import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BOOKDEBTS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string;

    @Column({ nullable: true })
    BRANCH_CODE: number;
    @ManyToOne(() => OWNBRANCHMASTER)
    @JoinColumn({ name: "BRANCH_CODE" })
    bookbrach: OWNBRANCHMASTER[];


    @Column({ nullable: true, default: 0 })
    AC_NO: string;

    @Column({ nullable: true })
    SECU_CODE: number;
    @ManyToOne(() => SECURITYMASTER, (bookdebts) => bookdebts.bookdebts, {
        cascade: true
    })
    @JoinColumn({ name: "SECU_CODE" })
    bookdebts: SECURITYMASTER[];


    @Column({ nullable: true })
    SR_NO: number;

    @Column({ nullable: true })
    SUBMISSION_DATE: string;

    @Column({ nullable: true })
    STATEMENT_DATE: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DEBTORS_OP_BAL: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    CREDIT_SALE: number;

    @Column({ nullable: true })
    RECOVERY: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OVERAGED_DEBTORS: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    CLOSE_BAL: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    CRD_OUTSTAND_BAL: number;

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    MARGIN: number;

    @Column({ nullable: true })
    REMARK: string;

    @Column({ nullable: true })
    SECURITY_TYPE: string;

    @Column({ nullable: true })
    AC_TYPE: number;
    @ManyToOne(() => SCHEMAST)
    @JoinColumn({ name: "AC_TYPE" })
    scheme: SCHEMAST[];
}