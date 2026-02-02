import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DPMASTER } from './dpmaster.entity';

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

  // Only keep relations that REALLY belong here
  @OneToMany(() => DPMASTER, dp => dp.CategoryMaster)
  DPcategory: DPMASTER[];
}
