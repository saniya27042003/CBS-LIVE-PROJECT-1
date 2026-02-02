import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DPMASTER } from './dpmaster.entity'
@Entity()
export class BALACATA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  BC_CODE: number;

  @Column({ length: 100 })
  BC_NAME: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  BC_MINBAL: number;

 @OneToMany(
  () => DPMASTER,
  (dp) => dp.MinimumBalanceMaster
)
dpMasters: DPMASTER[];

}
