
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ITEMCATEGORYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100})
  NAME: string;


  
}
