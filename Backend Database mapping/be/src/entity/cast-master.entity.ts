//import { IDMASTER } from './customer-id.entity'
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class CASTMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

 @ManyToOne(() => CASTMASTER)
@JoinColumn({ name: "AC_CAST" })
castMaster: CASTMASTER;

}
