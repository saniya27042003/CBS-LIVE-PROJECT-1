
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MORATORIUMPERIOD {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'LN' })
    AC_ACNOTYPE: string;

    @Column()
    AC_TYPE: number;

    @Column({length:15})
    AC_NO: string;

    @Column()
    INSTALLMENT_NO: number;

    @Column()
    PERIOD: number;

    @Column()
    TRAN_DATE: string;

    @Column()
    AC_RESO_NO: number;

    @Column()
    AC_RESO_DATE: string

    @Column()
    BRANCH_CODE: number;

    @ManyToOne(() => OWNBRANCHMASTER, (moratoriumBranch) => moratoriumBranch.moratoriumBranch, {
        cascade: true
    })
    @JoinColumn({ name: "BRANCH_CODE" })
    moratoriumBranch: OWNBRANCHMASTER[];

    @ManyToOne(() => SCHEMAST, (moratoriumScheme) => moratoriumScheme.moratoriumScheme, {
        cascade: true
    })
    @JoinColumn({ name: "AC_TYPE" })
    moratoriumScheme: SCHEMAST[];

}
