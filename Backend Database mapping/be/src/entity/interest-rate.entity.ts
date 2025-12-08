import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { INTRATEPATSCHEMES } from './pat-scheme-interest-rates.entity'

@Entity()
export class INTRATE {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SERIAL_NO: number;

  @Column({ default: 0 })
  MONTHS: string

  @Column({ default: 0 })
  DAYS: number

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INT_RATE: number

  @Column({ unique: false })
  idRateID: number
  @ManyToOne(() => INTRATEPATSCHEMES, (idRate) => idRate.rate, {
    cascade: true
  })
  @JoinColumn({ name: "idRateID" })
  idRate: INTRATEPATSCHEMES[];
}