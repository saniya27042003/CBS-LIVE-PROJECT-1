import { DEPRCATEGORY } from './depriciation-category-master.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  
  @ManyToOne(() => DEPRCATEGORY)
  @JoinColumn({ name: 'DEPR_CATEGORY_ID' })   // use your real FK column
  decategory: DEPRCATEGORY;   // 🔴 NAME MUST MATCH

}
