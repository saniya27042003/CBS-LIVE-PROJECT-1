import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CHARGES } from './scheme-type-charges.entity';

@Entity()
export class CHARGESAMT {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SERIAL_NO: number;

  @Column({ length: 15 })
  FROM_RANGE: string;

  @Column({ length: 15 })
  TO_RANGE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  CHARGES_AMT: number;

  @Column({ unique: false })
  idRateID: number
  @ManyToOne(() => CHARGES, (idRate) => idRate.rate, {
    cascade: true
  })
  @JoinColumn({ name: "idRateID" })
  idRate: CHARGES[];
}