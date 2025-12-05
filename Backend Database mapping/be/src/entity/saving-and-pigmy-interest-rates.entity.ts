/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SCHEMAST } from './schemeParameters.entity';
import { INTCATEGORYMASTER } from './interest-category-master.entity';
@Entity()
export class INTRATESBPG {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EFFECT_DATE: string

  @Column({ nullable: true })
  ACNOTYPE: number

  @Column({ nullable: true })
  TYPE: string;

  @ManyToOne(() => SCHEMAST, (scheme) => scheme.sapint, {
    cascade: true
  })
  @JoinColumn({ name: "ACNOTYPE" })
  scheme: SCHEMAST[];

  @Column()
  INT_CATEGORY: number
  @ManyToOne(() => INTCATEGORYMASTER, (category) => category.sapintrate, {
    cascade: true
  })
  @JoinColumn({ name: "INT_CATEGORY" })
  category: INTCATEGORYMASTER[];


  @Column()
  INT_RATE: string
}
