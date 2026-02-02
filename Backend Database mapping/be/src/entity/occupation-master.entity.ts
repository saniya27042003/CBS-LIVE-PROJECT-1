
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
//import { IDMASTER } from './customer-id.entity'
@Entity()
export class OCCUPATIONMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

//  @ManyToOne(() => OCCUPATIONMASTER)
// @JoinColumn({ name: "AC_OCODE" })
// occupMaster: OCCUPATIONMASTER;


}
