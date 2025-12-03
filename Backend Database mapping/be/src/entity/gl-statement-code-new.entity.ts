import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Gl_STATEMENT_CODE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  head_name: string;

  @Column()
  parent_node: number;

  @Column()
  status: string;

  @Column()
  created_by: number;
}
