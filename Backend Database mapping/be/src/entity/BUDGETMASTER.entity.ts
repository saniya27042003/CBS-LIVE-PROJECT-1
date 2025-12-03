import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BUDGETMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FIN_YEAR: string;

  @Column()
  AC_NO: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  BUDGET_AMOUNT: number;

  @Column()
  USER_CODE: string;
}
