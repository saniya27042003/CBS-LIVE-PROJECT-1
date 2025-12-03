import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DAYHANDOVERBRANCHWISE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  branch_id: number;

  @Column({ default: 0 })
  flag: number;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  user_code: number;

  @Column({ default: 0 })
  admin_status: number;
}
