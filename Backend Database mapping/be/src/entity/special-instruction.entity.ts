import { SCHEMAST } from './schemeParameters.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class SPECIALINSTRUCTION {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  INSTRUCTION_NO: number;

  @Column()
  INSTRUCTION_DATE: string;

  @Column({ nullable: true })
  TRAN_ACNO: string;

  @Column({ nullable: true })
  TRAN_ACTYPE: number;

  @Column({ nullable: true })
  DRCR_APPLY: string;

  @Column({ nullable: true })
  DETAILS: string;

  @Column({ nullable: true })
  FROM_DATE: string;

  @Column({ nullable: true })
  TO_DATE: string;

  @Column({ default: '0' })
  IS_RESTRICT: string;

  @Column({ nullable: true })
  REVOKE_DATE: string;

  @CreateDateColumn()
  SYSADD_DATETIME: Date;

  @Column({ nullable: true })
  SYSADD_LOGIN: string;

  @UpdateDateColumn()
  SYSCHNG_DATETIME: Date;

  @Column({ nullable: true })
  SYSCHNG_LOGIN: string;

  @ManyToOne(() => SCHEMAST, (specialIns) => specialIns.specialIns, {
    cascade: true,
  })
  @JoinColumn({ name: 'TRAN_ACTYPE' })
  specialIns: SCHEMAST[];
}
