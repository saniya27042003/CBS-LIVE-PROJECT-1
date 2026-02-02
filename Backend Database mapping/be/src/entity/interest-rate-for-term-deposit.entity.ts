import { INTCATEGORYMASTER } from './interest-category-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TERMINTRATE } from './rate-for term.entity';
@Entity()
export class INTRATETD {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EFFECT_DATE: string;

  @Column({ nullable: true })
  TYPE: string;

  @OneToMany(() => TERMINTRATE, rate => rate.idRate, {
    cascade: ["insert", "update"]
  })
  rate: TERMINTRATE[];

  @Column({ nullable: true })
  ACNOTYPE: number;

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "ACNOTYPE" })
  scheme: SCHEMAST;

  @Column()
  INT_CATEGORY: number;

  @ManyToOne(() => INTCATEGORYMASTER)
  @JoinColumn({ name: "INT_CATEGORY" })
  category: INTCATEGORYMASTER;
}
