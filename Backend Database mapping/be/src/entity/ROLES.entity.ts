import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ROLES {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  USERID: string;

  @Column({ nullable: true })
  NAME: string;

  @Column({ nullable: true })
  PASSWORD: string;
}
