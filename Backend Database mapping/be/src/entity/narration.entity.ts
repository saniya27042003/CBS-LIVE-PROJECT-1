import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class NARRATIONMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2000, nullable: false })
  NARRATION: string;

}

