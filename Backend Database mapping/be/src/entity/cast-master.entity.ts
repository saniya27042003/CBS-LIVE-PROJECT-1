import { IDMASTER } from './customer-id.entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CASTMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

  @OneToMany(() => IDMASTER, (cast) => cast.castMaster, {
    cascade: ['insert', 'update'],
  })
  cast: IDMASTER[];
}
