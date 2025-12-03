import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FRIDAYLIQUIDITYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CODE: string;

  @Column()
  NAME: string;

  @Column({ default: 0 })
  FSRNO: number;

  @Column({ default: 0 })
  SSRNO: number;

  @Column({ default: 0 })
  TSRNO: number;

  @Column({ nullable: true })
  BALTYPE: string;

  @Column({ nullable: true })
  LAST_FRI_TOT_REQUIRED: number;

  @Column({ nullable: true })
  LAST_FRI_DED_REQUIRED: number;

  @Column({ nullable: true })
  FRI_TOT_REQUIRED: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  PERCENTAGE: number;

  @Column({ nullable: true })
  PERCENTAGE_CONSIDARATION: string;

  @Column({ nullable: true })
  PERCENTAGE_OF_CODE: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  CALCULATE_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  CREDIT_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DEBIT_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  LAST_FRIDAY_TOTAL: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT: number;

  @Column({ nullable: true })
  SERIAL_NO: number;

  @Column({ nullable: true })
  CASH_ASSET_FLAG: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT1: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT2: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT3: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT4: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT5: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT6: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT7: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT8: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT9: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT10: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT11: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT12: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT13: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT14: number;

  @Column({ nullable: true })
  INPUT_ALLOWED: number;

  @Column({ nullable: true })
  ALTERNATIVE_FRIDAY_NAME: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  FINAL_AMOUNT15: number;
}
