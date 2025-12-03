import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MIGRATIONSTATUS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TABLENAME: string;

  @Column({ default: 0 })
  STATUS: number;
}
