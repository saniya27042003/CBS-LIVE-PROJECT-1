import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { INTRATETD } from './interest-rate-for-term-deposit.entity';
@Entity()
export class TERMINTRATE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  FROM_DAYS: number

  @Column({ nullable: true })
  FROM_MONTHS: number

  @Column({ nullable: true })
  TO_DAYS: number

  @Column({ nullable: true })
  TO_MONTHS: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INT_RATE: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  PENAL_INT_RATE: number

  @Column({ unique: false })
  idRateID: number
  @ManyToOne(() => INTRATETD, (idRate) => idRate.rate, {
    cascade: true
  })
  @JoinColumn({ name: "idRateID" })
  idRate: INTRATETD[];
}