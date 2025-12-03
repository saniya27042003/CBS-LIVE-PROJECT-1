import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PRIORITYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column()
  NAME: string;

  @Column()
  SUB1_CODE: number;

  @Column()
  SUB2_CODE: number;

  @Column({ nullable: true })
  SUB3_CODE: number;
}
