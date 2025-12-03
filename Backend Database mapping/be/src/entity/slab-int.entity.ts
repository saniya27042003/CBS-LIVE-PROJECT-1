import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { INTRATETDMULTI } from './deposit-intrest-rate.entity';

@Entity()
export class INTMULTI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SERIAL_NO: number;

  @Column({ nullable: true })
  EFFECT_DATE: string;

  @Column({ nullable: true })
  INT_RATE: string;

  @Column({ unique: false })
  idRateID: number;
  @ManyToOne(() => INTRATETDMULTI, (idRate) => idRate.rate, {
    cascade: true,
  })
  @JoinColumn({ name: 'idRateID' })
  idRate: INTRATETDMULTI[];
}
