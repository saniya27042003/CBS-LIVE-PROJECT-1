import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DPMASTER } from './dpmaster.entity';
import { PGMASTER } from './pgmaster.entity';
@Entity()
export class ATTERONEYLINK {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ATTERONEY_NAME: string;

  @Column({ nullable: true })
  DATE_APPOINTED: string;

  @Column({ nullable: true })
  DATE_EXPIRY: string;

  @Column({ unique: false, nullable: true })
  DPMasterID: number;

  @ManyToOne(() => DPMASTER, (dpmasterId) => dpmasterId.powerOfAttorney, {
    cascade: true,
  })
  @JoinColumn({ name: 'DPMasterID' })
  dpmasterId: DPMASTER[];

  @Column({ unique: false, nullable: true })
  PGMasterID: number;

  @ManyToOne(() => PGMASTER, (pgmasterId) => pgmasterId.powerOfAttorney, {
    cascade: true,
  })
  @JoinColumn({ name: 'PGMasterID' })
  pgmasterId: PGMASTER[];
}
