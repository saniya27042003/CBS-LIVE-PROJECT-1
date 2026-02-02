import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IDMASTER } from './customer-id.entity';

@Entity()
export class TDSFORMSUBMIT {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    FIN_YEAR: string;

    @Column({ nullable: true })
    SUBMIT_DATE: string;

    @Column({ nullable: true })
    FORM_TYPE: string;

    @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
    TDS_RATE: number;

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TDS_LIMIT: number;

    @Column({ default: true })
    IS_EXEMPT_TDS: boolean

    @CreateDateColumn()
    SYSADD_DATETIME: Date;

    @Column({ nullable: true })
    SYSADD_LOGIN: string;

    @UpdateDateColumn()
    SYSCHNG_DATETIME: Date;

    @Column({ nullable: true })
    SYSCHNG_LOGIN: string;

    @Column({ nullable: true })
    idmasterID: number

   @ManyToOne(() => IDMASTER, { nullable: true })
@JoinColumn({ name: 'idmasterID' })
idmaster?: IDMASTER;

}