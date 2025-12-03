import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FRIDAYLIQUIDITYDATEMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FRIDAY_DATE: string;

  @Column()
  FRIDAY_FROM_DATE: string;

  @Column()
  FRIDAY_TO_DATE: string;
}
