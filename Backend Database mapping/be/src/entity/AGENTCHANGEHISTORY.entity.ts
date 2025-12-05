import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SCHEMAST } from './schemeParameters.entity';
@Entity()
export class AGENTCHANGEHISTORY {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    CHANGE_DATE: string

    @Column({ nullable: true })
    AC_ACNOTYPE: string

    @Column()
    AC_TYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column({ nullable: true })
    AGENT_ACNOTYPE: number

    @Column()
    AGENT_ACTYPE: number

    @Column({ length: 15 })
    AGENT_ACNO: string

    @Column({ nullable: true })
    BRANCH_CODE: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column({ nullable: true })
    TRAN_STATUS: string

    @ManyToOne(() => SCHEMAST, (agentChange) => agentChange.agentChange, {
        cascade: true
    })
    @JoinColumn({ name: "AC_TYPE" })
    agentChange: SCHEMAST[];

    @ManyToOne(() => SCHEMAST, (agentACChange) => agentACChange.agentACChange, {
        cascade: true
    })
    @JoinColumn({ name: "AGENT_ACTYPE" })
    agentACChange: SCHEMAST[];


}
