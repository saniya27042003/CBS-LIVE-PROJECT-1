import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HOLIDAYSMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  T_DATE: string;

  @Column()
  T_DESC: string;

  @Column()
  BRANCH_CODE: number;
}
