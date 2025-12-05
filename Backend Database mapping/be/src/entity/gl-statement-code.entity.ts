
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class ACCOHEAD {

 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  A_BALCODE: number;


  @Column({ type: 'varchar', length: 250})
  A_ACHEAD: string;


  @Column({  length: 20})
  A_ACTYPE: string;

  @Column({ nullable:true, length: 20 })
  ALTERNATE_CODE: string;


  @Column({nullable:true})
  IS_PRINT_HEAD_IN_ONESIDE: boolean;


  
  
}
