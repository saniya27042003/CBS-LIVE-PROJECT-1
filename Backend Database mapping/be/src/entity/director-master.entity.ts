import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CITYMASTER } from './city-master.entity';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
@Entity()
export class DIRECTORMASTER {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    CODE: number;

    @Column({ length: 100 })
    NAME: string;

    @Column({ length: 60, nullable: true })
    DESIGNATION: string;

    @Column({ length: 100, nullable: true })
    AC_ADDR1: string;

    @Column({ length: 100, nullable: true })
    AC_ADDR2: string;

    @Column({ length: 100, nullable: true })
    AC_ADDR3: string;

    @Column({ nullable: true })
    AC_PIN: string;

    @Column({ nullable: true, default: 0 })
    IS_CURRENT_BODY_MEMBER: string;

    @Column({ nullable: true, default: 0 })
    SMS_REQUIRED: string;

    @Column({ nullable: true })
    AC_MOBILENO: string;

    @Column({ nullable: true })

    AC_CTCODE: number;
    @ManyToOne(() => CITYMASTER, (directormaster) => directormaster.castmast, {
        cascade: true
    })
    @JoinColumn({ name: "idmasterID" })
    directormaster: CITYMASTER[];

    @Column({ nullable: true })
    BRANCH_CODE: number;

    @ManyToOne(() => OWNBRANCHMASTER, (BranchCodeMaster) => BranchCodeMaster.director, {
        cascade: true
    })
    @JoinColumn({ name: "BRANCH_CODE" })
    BranchCodeMaster: OWNBRANCHMASTER[];


}
