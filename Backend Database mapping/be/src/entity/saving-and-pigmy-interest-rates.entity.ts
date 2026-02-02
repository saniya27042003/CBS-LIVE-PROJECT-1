import { INTCATEGORYMASTER } from './interest-category-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class INTRATESBPG {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EFFECT_DATE: string;

  @Column({ nullable: true })
  ACNOTYPE: number;

  @Column({ nullable: true })
  TYPE: string;

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "ACNOTYPE" })
  scheme: SCHEMAST;

  @Column()
  INT_CATEGORY: number;

  @ManyToOne(() => INTCATEGORYMASTER)
  @JoinColumn({ name: "INT_CATEGORY" })
  category: INTCATEGORYMASTER;

  @Column()
  INT_RATE: string;
}
