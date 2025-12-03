import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HISTORYDENO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TRAN_DATE: string;

  @Column()
  CASHIER_CODE: string;

  @Column({ default: 0 })
  DENO_1000: number;

  @Column({ default: 0 })
  DENO_500: number;

  @Column({ default: 0 })
  DENO_100: number;

  @Column({ default: 0 })
  DENO_50: number;

  @Column({ default: 0 })
  DENO_20: number;

  @Column({ default: 0 })
  DENO_10: number;

  @Column({ default: 0 })
  DENO_5: number;

  @Column({ default: 0 })
  DENO_2: number;

  @Column({ default: 0 })
  DENO_1: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DENO_COINS_AMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TOTAL_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OPENING_CASH: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DEPOSITS: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  WITHDRAWAL: number;

  @Column({ default: 0 })
  DENO_2000: number;

  @Column({ default: 0 })
  DENO_200: number;

  @Column({ nullable: true })
  BRANCH_CODE: number;
}
