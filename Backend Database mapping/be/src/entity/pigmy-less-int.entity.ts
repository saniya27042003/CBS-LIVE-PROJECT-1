import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PREMATULESSRATE } from './premature-pigmy-less-int-rate.entity';

@Entity()
export class PREMATULESS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SERIAL_NO: number;

  @Column()
  FROM_MONTHS: number;

  @Column()
  TO_MONTHS: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  LESS_INT_RATE: number;

  @Column({ unique: false })
  idRateID: number;
  @ManyToOne(() => PREMATULESSRATE, (idRate) => idRate.rate, {
    cascade: true,
  })
  @JoinColumn({ name: 'idRateID' })
  idRate: PREMATULESSRATE[];
}
