import { INTCATEGORYMASTER } from './interest-category-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { INTRATE } from '../entity/interest-rate.entity';

@Entity()
export class INTRATEPATSCHEMES {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  EFFECT_DATE: string;

  @Column({ nullable: true })
  TYPE: string;

  @OneToMany(() => INTRATE, rate => rate.idRate, {
    cascade: ["insert", "update"]
  })
  rate: INTRATE[];

  @Column({ nullable: true })
  AC_TYPE: number;

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "AC_TYPE" })
  scheme: SCHEMAST;

  @Column({ nullable: true })
  INT_CATEGORY: number;

  @ManyToOne(() => INTCATEGORYMASTER)
  @JoinColumn({ name: "INT_CATEGORY" })
  category: INTCATEGORYMASTER;
}
