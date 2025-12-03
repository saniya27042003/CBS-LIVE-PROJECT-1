import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WEAKERMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100 })
  NAME: string;
}
