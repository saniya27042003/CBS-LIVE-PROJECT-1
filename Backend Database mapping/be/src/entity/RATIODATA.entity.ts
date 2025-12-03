import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RATIODATA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  SERIAL_NO: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ nullable: true })
  RATIO_NAME: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AMOUNT1: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AMOUNT2: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  IS_PERCENTAGE: number;
}
