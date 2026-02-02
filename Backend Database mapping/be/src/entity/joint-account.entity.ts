import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DPMASTER } from './dpmaster.entity';
import { PGMASTER } from './pgmaster.entity';

@Entity()
export class JointAcLink {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  JOINT_AC_CUSTID: number;

  @Column({ nullable: true })
  JOINT_ACNAME: string;

  @Column({ nullable: true })
  OPERATOR: string;

  @Column({ nullable: true })
  DPMasterID: number;

  @Column({ nullable: true })
  PGMasterID: number;

  @ManyToOne(() => DPMASTER, dp => dp.jointAccounts, { nullable: true })
  @JoinColumn({ name: 'DPMasterID' })
  dpmaster?: DPMASTER;

  @ManyToOne(() => PGMASTER, pg => pg.jointAccounts, { nullable: true })
  @JoinColumn({ name: 'PGMasterID' })
  pgmaster?: PGMASTER;
}
