import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class PREFIX {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SR_NO: number;

  @Column({ length: 100 })
  PREFIX: string;

  @Column({ length: 100, nullable: true })
  PREFIX_REG: string;

  @Column({ length: 100 })
  SEX: string;
}
