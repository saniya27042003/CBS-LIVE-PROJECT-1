import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TDSRATE {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FIN_YEAR: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  INTEREST_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TDS_RATE: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  SURCHARGE_RATE: number;

  @Column()
  EFFECT_DATE: string;

}







