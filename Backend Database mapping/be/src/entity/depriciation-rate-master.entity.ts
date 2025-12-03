import { DEPRCATEGORY } from './depriciation-category-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DEPRRATE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DEPR_RATE: number;

  @Column()
  EFFECT_DATE: string;

  @Column()
  CATEGORY: number;
  @ManyToOne(() => DEPRCATEGORY, (decategory) => decategory.deprerate, {
    cascade: true,
  })
  @JoinColumn({ name: 'CATEGORY' })
  decategory: DEPRCATEGORY[];
}
