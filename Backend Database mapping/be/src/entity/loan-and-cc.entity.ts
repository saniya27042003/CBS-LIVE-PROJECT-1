import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { INTRATELOAN } from './interest-rate-for-loan-and-cc.entity';
@Entity()
export class LNCCLOAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FROM_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TO_AMOUNT: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  INT_RATE: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  PENAL_INT_RATE: number;

  @Column({ unique: false })
  idRateID: number;
  @ManyToOne(() => INTRATELOAN, (idRate) => idRate.rate, {
    cascade: true,
  })
  @JoinColumn({ name: 'idRateID' })
  idRate: INTRATELOAN[];
}
