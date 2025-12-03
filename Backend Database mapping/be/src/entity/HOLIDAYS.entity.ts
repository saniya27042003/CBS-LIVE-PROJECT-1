import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HOLIDAYS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  HOLIDAY: string;

  @Column()
  DESCRIPTION: string;
}
