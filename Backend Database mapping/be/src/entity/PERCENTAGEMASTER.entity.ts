import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PERCENTAGEMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  REPORT_TYPE: string;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ nullable: true })
  EFFECT_DATE: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  PERCENTAGE: number;
}
