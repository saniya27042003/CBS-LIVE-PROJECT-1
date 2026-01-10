import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class STOCKSTATEMENT {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string;

    @Column({ nullable: true })
    AC_TYPE: number;
    @ManyToOne(() => SCHEMAST, (stockstatement) => stockstatement.stockstatement, {
        cascade: true
    })
    @JoinColumn({ name: "AC_TYPE" })

    stockstatement: SCHEMAST[];

    @Column({ length: 15 })
    AC_NO: string;

    @Column({ nullable: true })
    BRANCH_CODE: number;
    @ManyToOne(() => OWNBRANCHMASTER, (stockbranchcode) => stockbranchcode.stockbranchcode, {
        cascade: true
    })
    @JoinColumn({ name: "BRANCH_CODE" })
    stockbranchcode: OWNBRANCHMASTER[];

    @Column({ nullable: true })
    SECU_CODE: number;
    @ManyToOne(() => SECURITYMASTER, (stockstat) => stockstat.stockstat, {
        cascade: true
    })
    @JoinColumn({ name: "SECU_CODE" })
    stockstat: SECURITYMASTER[];

    // @Column({ nullable: true })
    // SR_NO:string;

    @Column({ nullable: true })
    SUBMISSION_DATE: string;

    @Column({ nullable: true })
    STATEMENT_DATE: string;

    @Column({ nullable: true })
    RAW_MATERIAL: string;

    @Column({ nullable: true })
    WORK_PROGRESS: string;

    @Column({ nullable: true })
    FINISHED_GOODS: string;

    @Column({ nullable: true })
    RAW_MARGIN: string;

    @Column({ nullable: true })
    WORK_MARGIN: string;

    @Column({ nullable: true })
    FINISHED_MARGIN: string;

    @Column({ nullable: true })
    REMARK: string;

    @Column({ nullable: true })
    SECURITY_TYPE: string;
}