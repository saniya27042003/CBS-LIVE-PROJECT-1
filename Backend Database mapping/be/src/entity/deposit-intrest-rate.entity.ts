import { INTCATEGORYMASTER } from './interest-category-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { INTMULTI } from './slab-int.entity';

@Entity()
export class INTRATETDMULTI {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => INTMULTI, rate => rate.idRate, {
    cascade: ["insert", "update"]
  })
  rate: INTMULTI[];

  @Column({ nullable: true })
  ACNOTYPE: number;

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "ACNOTYPE" })
  scheme: SCHEMAST;

  @Column({ nullable: true })
  INT_CATEGORY: number;

  @ManyToOne(() => INTCATEGORYMASTER)
  @JoinColumn({ name: "INT_CATEGORY" })
  category: INTCATEGORYMASTER;
}
