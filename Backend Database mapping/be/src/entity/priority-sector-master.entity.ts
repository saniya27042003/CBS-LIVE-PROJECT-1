import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class PRIORITYSECTORMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ nullable: true })
  SUB1_CODE: string;

  @Column({ nullable: true })
  SUB2_CODE: string;

  @Column({ nullable: true })
  SUB3_CODE: string;

  @Column({ type: 'varchar', length: 300 })
  NAME: string;
}
