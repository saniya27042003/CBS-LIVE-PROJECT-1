import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SYSPARA } from './system-master-parameters.entity';

@Entity()
export class SHARECAPITALAMTDETAILS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    FROM_DATE: string

    @Column()
    TO_DATE: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    AMOUNT: number

    @Column()
    SYSID: number

   @ManyToOne(() => SYSPARA, { nullable: true })
@JoinColumn({ name: 'SYSID' })
syspara?: SYSPARA;

}
