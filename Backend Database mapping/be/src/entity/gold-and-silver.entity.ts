import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GOLDSILVER {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string;

    @Column({ default: 0 })
    AC_TYPE: number;

    @ManyToOne(() => SCHEMAST)
    @JoinColumn({ name: "AC_TYPE" })

    goldsilver: SCHEMAST[];

    @Column({ length: 15 })
    AC_NO: string;

    @Column({ nullable: true })
    SECU_CODE: number;
    @ManyToOne(() => SECURITYMASTER, (silvergold) => silvergold.silvergold, {
        cascade: true
    })
    @JoinColumn({ name: "SECU_CODE" })
    silvergold: SECURITYMASTER[];

    @Column({ nullable: true })
    SUBMISSION_DATE: string;

    @Column({ nullable: true })
    ARTICLE_NAME: string;

    @Column({ nullable: true })
    BAG_RECEIPT_NO: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TOTAL_VALUE: number;

    @Column({ nullable: true })
    NOMINEE: string;

    @Column({ nullable: true })
    NOMINEE_RELATION: string;

    @Column({ nullable: true })
    RETURN_DATE: string;

    @Column({ nullable: true })
    TRAN_STATUS: string;

    @Column({ nullable: true })
    USER_CODE: string;

    @Column({ nullable: true })
    OFFICER_CODE: string;

    @Column({ nullable: true })
    ITEM_TYPE: string;

    @Column({ type: 'numeric', precision: 20, scale: 4, default: 0 })
    TOTAL_WEIGHT_GMS: number;

    @Column({ type: 'numeric', precision: 20, scale: 4, default: 0 })
    CLEAR_WEIGHT_GMS: number;

    @Column({ type: 'numeric', precision: 7, scale: 2, default: 0 })
    RATE: number;

    @Column({ nullable: true })
    GOLD_BOX_NO: string;

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    MARGIN: number;

    @Column({ nullable: true })
    REMARK: string;

    @Column({ nullable: true })
    SECURITY_TYPE: string;

    @Column({ nullable: true })
    BRANCH_CODE: number;
    @ManyToOne(() => OWNBRANCHMASTER)
    @JoinColumn({ name: "BRANCH_CODE" })
    goldsilverbranchcode: OWNBRANCHMASTER[];

}