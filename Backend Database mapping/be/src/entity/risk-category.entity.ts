import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IDMASTER } from './customer-id.entity';
@Entity()
export class RISKCATEGORYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

  @OneToMany(() => IDMASTER, (riskMaster) => riskMaster.riskCategory, {
    cascade: ['insert', 'update'],
  })
  riskMaster: IDMASTER[];
}
