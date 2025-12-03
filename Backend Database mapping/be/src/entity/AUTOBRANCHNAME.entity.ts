import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AUTOBRANCHNAME {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  NAME: string;
}
