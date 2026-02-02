import { SECURITYMASTER } from './security-code.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PLANTMACHINARY {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    AC_ACNOTYPE: string;

    @Column()
    AC_TYPE: number;
    @ManyToOne(() => SCHEMAST)
    @JoinColumn({ name: "AC_TYPE" })

    plantmachinary: SCHEMAST[];

    @Column({ length: 15 })
    AC_NO: string;

    @Column({ nullable: true })
    SECU_CODE: number;
    @ManyToOne(() => SECURITYMASTER, (plant) => plant.plant, {
        cascade: true
    })
    @JoinColumn({ name: "SECU_CODE" })
    plant: SECURITYMASTER[];

    @Column({ nullable: true })
    SUBMISSION_DATE: string;

    @Column({ nullable: true })
    MACHINE_NAME: string;

    @Column({ nullable: true })
    MACHINE_TYPE: string;

    @Column({ nullable: true })
    DISTINCTIVE_NO: string;

    @Column({ nullable: true })
    SPECIFICATION: string;

    @Column({ nullable: true })
    AQUISITION_DATE: string;

    @Column({ nullable: true, default: 0 })
    NEW_EQUIPEMENT: string;

    @Column({ nullable: true })
    SUPPLIER_NAME: string;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PURCHASE_PRICE: number;

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
    plantbranchcode: OWNBRANCHMASTER[];
}