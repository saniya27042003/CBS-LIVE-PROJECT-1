import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DPMASTER } from './dpmaster.entity';
@Entity()
export class OPERATIONMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

  @OneToMany(() => DPMASTER, (operation) => operation.OperationMaster, {
    cascade: ['insert', 'update'],
  })
  operation: DPMASTER[];
}
