import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PLEDGESTOCK {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string;

    @Column()
    AC_TYPE: number;
    @ManyToOne(() => SCHEMAST, (pledge) => pledge.pledge, {
        cascade: true
    })
    @JoinColumn({ name: "AC_TYPE" })

    pledge: SCHEMAST[];

    @Column({ length: 15, default: 0 })
    AC_NO: string;

    @Column({ nullable: true })
    SECU_CODE: number;
    @ManyToOne(() => SECURITYMASTER, (stock) => stock.stock, {
        cascade: true
    })
    @JoinColumn({ name: "SECU_CODE" })
    stock: SECURITYMASTER[];

    @Column({ nullable: true })
    STORAGE_MEMO_NO: string;

    @Column({ nullable: true })
    STORAGE_DATE: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    GOODS_QTY: number;

    @Column({ nullable: true })
    MANUF_MILL: string;

    @Column({ nullable: true })
    DISCRIPTION: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    BALANCE_QTY: number;

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    RATE: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    VALUE: number;

    @Column({ nullable: true })
    SECURITY_TYPE: string;

    @Column({ nullable: true })
    BRANCH_CODE: number;
    @ManyToOne(() => OWNBRANCHMASTER, (pleadgebranchcode) => pleadgebranchcode.pleadgebranchcode, {
        cascade: true
    })
    @JoinColumn({ name: "BRANCH_CODE" })
    pleadgebranchcode: OWNBRANCHMASTER[];

    @Column({ nullable: true })
    SUBMISSION_DATE: string;

    @Column({ nullable: true })
    REMARK: string;

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    MARGIN: number;
}