import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SIZEWISEBALANCE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  SR_NO: number;

  @Column({ nullable: true })
  ACNOTYPE: string;

  @Column({ nullable: true })
  SLAB_TYPE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AMOUNT_FROM: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AMOUNT_TO: number;

  @Column({ nullable: true, default: 0 })
  UNIT_OF_PERIOD: string;

  @Column({ nullable: true, default: 0 })
  FROM_MONTHS: number;

  @Column({ nullable: true, default: 0 })
  FROM_DAYS: number;

  @Column({ nullable: true, default: 0 })
  TO_MONTHS: number;

  @Column({ nullable: true, default: 0 })
  TO_DAYS: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  DEDUCTION_PERCENT: number;
}
