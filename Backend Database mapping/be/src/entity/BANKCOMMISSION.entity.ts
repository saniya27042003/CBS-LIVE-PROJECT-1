import { BANKMASTER } from './bank-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BANKCOMMISSION {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  BANK_CODE: number;

  @Column({ nullable: true })
  EFFECTIVE_DATE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FROM_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TO_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RATE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  RATE_PER_UNIT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  MIN_COMMISSION: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  MAX_COMMISSION: number;

  @ManyToOne(() => BANKMASTER, (bankComm) => bankComm.bankComm, {
    cascade: true,
  })
  @JoinColumn({ name: 'BANK_CODE' })
  bankComm: BANKMASTER[];
}
