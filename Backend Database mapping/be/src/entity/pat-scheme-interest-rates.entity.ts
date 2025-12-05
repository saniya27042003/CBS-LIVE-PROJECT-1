import { INTCATEGORYMASTER } from 'src/entity//interest-category-master.entity';
import { SCHEMAST } from 'src/entity//schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { INTRATE } from './interest-rate.entity'
@Entity()
export class INTRATEPATSCHEMES {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  EFFECT_DATE: string

  @Column({ nullable: true })
  TYPE: string;

  @OneToMany(() => INTRATE, rate => rate.idRate, {
    cascade: ["insert", "update"]
  })
  rate: INTRATE[];

  @Column({ nullable: true })
  AC_TYPE: number
  @ManyToOne(() => SCHEMAST, (scheme) => scheme.patscheme, {
    cascade: true
  })
  @JoinColumn({ name: "AC_TYPE" })
  scheme: SCHEMAST[];

  @Column({ nullable: true })
  INT_CATEGORY: number
  @ManyToOne(() => INTCATEGORYMASTER, (category) => category.patdeposit, {
    cascade: true
  })
  @JoinColumn({ name: "INT_CATEGORY" })
  category: INTCATEGORYMASTER[];


}
