import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ nullable: true })
  DPMasterID: number;
  
@ManyToOne(() => DPMASTER, { nullable: true })
@JoinColumn({ name: 'DPMasterID' })
dpmaster?: DPMASTER;


  @Column({ nullable: true })
  PGMasterID: number;

  @ManyToOne(() => PGMASTER, { nullable: true })
@JoinColumn({ name: 'PGMasterID' }) // 🔥 IMPORTANT
pgMaster?: PGMASTER;

}
