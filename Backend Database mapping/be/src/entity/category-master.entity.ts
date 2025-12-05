import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SHMASTER } from './share-master.entity'
import { DPMASTER } from './dpmaster.entity'

@Entity()
export class CATEGORYMASTER {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;


  @Column({ type: 'varchar', length: 100 })
  NAME: string;

  @Column({ nullable: true })
  ACNOTYPE: string;

  @OneToMany(() => SHMASTER, (category) => category.CategoryMaster, {
    cascade: ["insert", "update"]
  })
  category: SHMASTER[];

  @OneToMany(() => DPMASTER, (category) => category.CategoryMaster, {
    cascade: ["insert", "update"]
  })
  DPcategory: DPMASTER[];
}
