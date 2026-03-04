import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CASTMASTER {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

}