import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PIGMYCHART } from './pigmy-chart.entity';
import { PGMASTER } from './pgmaster.entity';

@Entity()
export class PIGMYCHARTMASTER {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  SERIAL_NO: number;

  @Column({ default: 'PG', length: 2 })
  TRAN_ACNOTYPE: string;

  @Column()
  TRAN_ACTYPE: number;

  @Column()
  TRAN_ACNO: number;

  @Column({ length: 15 })
  TRAN_BANKACNO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TRAN_AMOUNT: number;

  @Column()
  TRAN_GLACNO: number;

  @Column({ nullable: true })
  RECEIPT_NO: number;

  @Column({ nullable: true })
  CHART_NO: number;

  @Column()
  PIGMYCHARTID: number;

  @Column()
  pigmyAccountID: number;

  // ✅ FIX 1: NO inverse lambda
  // ✅ FIX 2: SINGLE object, not array
  @ManyToOne(() => PIGMYCHART, { nullable: true })
  @JoinColumn({ name: 'PIGMYCHARTID' })
  pigmyChart?: PIGMYCHART;

  // ✅ SAME FIX HERE
  @ManyToOne(() => PGMASTER, { nullable: true })
  @JoinColumn({ name: 'pigmyAccountID' })
  account?: PGMASTER;
}
