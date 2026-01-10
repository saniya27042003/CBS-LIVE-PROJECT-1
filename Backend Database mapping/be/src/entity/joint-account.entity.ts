import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DPMASTER } from './dpmaster.entity';
import { PGMASTER } from './pgmaster.entity';
@Entity()
export class JointAcLink {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    JOINT_AC_CUSTID: number

    @Column({ nullable: true })
    JOINT_ACNAME: string

    @Column({ nullable: true })
    OPERATOR: string

    @Column({ unique: false, nullable: true })
    DPMasterID: number

    @ManyToOne(() => DPMASTER, (dpmasterId) => dpmasterId.jointAccounts, {
        cascade: true
    })
    @JoinColumn({ name: "DPMasterID" })
    dpmasterId: DPMASTER[];

    @Column({ unique: false, nullable: true })
    PGMasterID: number

    @ManyToOne(() => PGMASTER, (pgmasterId) => pgmasterId.jointAccounts, {
        cascade: true
    })
    @JoinColumn({ name: "PGMasterID" })
    pgmasterId: PGMASTER[];
}
