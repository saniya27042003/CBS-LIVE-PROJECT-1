import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PIGMYDAYEND {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  'PIGMY_PREVIOUS_DATE': string;

  @Column({ nullable: true })
  'PIGMY_CURRENT_DATE': string;

  @Column({ nullable: true })
  'BRANCH_CODE': number;
}
