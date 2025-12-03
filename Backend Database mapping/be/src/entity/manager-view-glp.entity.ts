import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MANAGERVIEW {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SR_NO: number;

  @Column({ nullable: true })
  TYPE: string;

  @Column({ nullable: true })
  STATEMENT_CODE: string;

  @Column({ nullable: true })
  DESCRIPTION: string;

  @Column({ nullable: true })
  IS_DISPLAY: string;

  @Column({ nullable: true })
  PERCENTAGE_TO_WORKING_CAPITAL: string;
}
