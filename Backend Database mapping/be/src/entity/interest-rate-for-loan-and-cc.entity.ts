import { INTCATEGORYMASTER } from './interest-category-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
// import { SCHEMDATA } from 'src/entity//SCHEMDATA.entity';
// import { SCHEMDATA } from 'src/entity/SCHEMDATA.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LNCCLOAN } from './loan-and-cc.entity';
@Entity()
export class INTRATELOAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EFFECT_DATE: string

  @Column({nullable: true})
  ACNOTYPE: number

  @ManyToOne(() => SCHEMAST)
  @JoinColumn({ name: "ACNOTYPE" })
  scheme: SCHEMAST[];

  @Column()
  INT_CATEGORY: number

  @ManyToOne(() => INTCATEGORYMASTER)
  @JoinColumn({ name: "INT_CATEGORY" })
  category: INTCATEGORYMASTER;

  @OneToMany(() => LNCCLOAN, rate => rate.idRate)
  rate: LNCCLOAN[];
}

